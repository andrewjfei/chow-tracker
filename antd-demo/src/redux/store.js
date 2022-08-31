import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { apiSlice, chowSlice } from './slices';

export const store = configureStore({
  reducer: {
    // auth: authSlice.reducer,
    chow: chowSlice.reducer,
    // chowListFilter: chowListFilterSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
