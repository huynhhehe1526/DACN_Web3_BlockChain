import { configureStore } from '@reduxjs/toolkit';
import guessBitCoinReducer from '../redux/guessBitCoin/guessBitcoinSlice';
import resultReducer from '../redux/result/resultSlice';
import rewardReducer from '../redux/reward/rewardSlice';

const rootReducer = {
  guessBitCoin: guessBitCoinReducer,
  result: resultReducer,
  reward: rewardReducer
};

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export default store;