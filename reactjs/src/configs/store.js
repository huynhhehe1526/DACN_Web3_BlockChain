import { configureStore } from '@reduxjs/toolkit';
import guessBitCoinReducer from '../redux/guessBitCoin/guessBitcoinSlice';
import resultReducer from '../redux/result/resultSlice';

const rootReducer = {
  guessBitCoin: guessBitCoinReducer,
  result: resultReducer
};

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export default store;