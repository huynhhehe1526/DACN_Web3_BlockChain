import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import guessBitcoinAPI from './guessBitcoinAPI';


export const postGuessBitCoin = createAsyncThunk(
    'guess/postGuessBitCoin',
    async (formData, thunkAPI) => {
        try {
            const data = await guessBitcoinAPI.postGuessBitCoin(formData);
            console.log("Check data từ redux: ", data);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || '');
        }
    }
);

const initialState = {
    totalBalance: 0,
    bitcoinData: [],
    error: null,
    loading: false,
};
const guessBitcoinSlice = createSlice({
    name: 'guess',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(postGuessBitCoin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postGuessBitCoin.fulfilled, (state, action) => {
                state.loading = false;
                state.totalBalance = action.payload.totalBalance;
                state.bitcoinData = action.payload.data.data;
                state.error = null;
            })
            .addCase(postGuessBitCoin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });

    },
});

export default guessBitcoinSlice.reducer;
