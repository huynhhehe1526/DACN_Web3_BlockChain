import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import rewardAPI from './rewardAPI';

export const getRewardForWinner = createAsyncThunk(
    'reward/getRewardForWinner',
    async (formData, thunkAPI) => {
        try {
            const data = await rewardAPI.getRewardForWinner(formData);
            console.log("Data từ backend:", data);
            return data; 
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || '');
        }
    }
);

const initialState = {
    rewardData: null, 
    error: null,
    loading: false,
};

const rewardSlice = createSlice({
    name: 'reward',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRewardForWinner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRewardForWinner.fulfilled, (state, action) => {
                state.loading = false;
                state.rewardData = action.payload.rewardDetails;
                state.error = null;
            })
            .addCase(getRewardForWinner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Có lỗi khi lấy dữ liệu';
            });
    },
});

export default rewardSlice.reducer;
