import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { mapApi } from '../routes/app/map/MapService';
import mapReducer from '../routes/app/map/MapSlice';

export const store = configureStore({
  reducer: {
    map: mapReducer,
    [mapApi.reducerPath]: mapApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mapApi.middleware),
});

setupListeners(store.dispatch);
