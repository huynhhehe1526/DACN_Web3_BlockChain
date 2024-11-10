import { configureStore } from '@reduxjs/toolkit';


const rootReducer = {

};

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export default store;