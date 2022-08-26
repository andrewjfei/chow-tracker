import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  apiSlice,
  authSlice,
  chowListSlice,
  chowListFilterSlice,
} from './slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    chowList: chowListSlice.reducer,
    chowListFilter: chowListFilterSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
