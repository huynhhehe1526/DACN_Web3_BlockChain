import resultAPI from './resultAPI';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const getResult = createAsyncThunk(
    'result/getResult',
    async (_, thunkAPI) => {
        try {
            const data = await resultAPI.getResult();
            console.log("Check data từ redux getResult: ", data);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || '');
        }
    }
);

export const checkWinnerPrevious = createAsyncThunk(
    'result/checkWinnerPrevious',
    async (userId, thunkAPI) => {
        try {
            const data = await resultAPI.checkWinnerPrevious(userId);
            console.log("Check data từ redux checkWinnerPrevious: ", data);
            return data.isPreviousWinnerAllowedToPublish;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || '');
        }
    }
);

const initialState = {
    result: null,
    error: null,
    loading: false,
    previousWinner: null,
    isShowNoticePublish: false,
};
const resultSlice = createSlice({
    name: 'result',
    initialState,
    reducers: {
        setShowNoticePublish: (state, action) => {
            state.isShowNoticePublish = action.payload; // Lưu trạng thái
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getResult.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getResult.fulfilled, (state, action) => {
                state.loading = false;
                state.result = action.payload;
            })
            .addCase(getResult.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(checkWinnerPrevious.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkWinnerPrevious.fulfilled, (state, action) => {
                state.loading = false;
                state.previousWinner = action.payload;
            })
            .addCase(checkWinnerPrevious.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});
export const { setShowNoticePublish } = resultSlice.actions;
export default resultSlice.reducer;
