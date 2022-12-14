import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import routingReducer from '../features/routing/routingSlice';
import searchListReducer from '../features/searchList/searchListSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    searchList: searchListReducer,
    routing: routingReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;