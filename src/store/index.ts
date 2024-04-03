import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { videoApi } from "./api";

export const store = configureStore({
  reducer: {
    [videoApi.reducerPath]: videoApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(videoApi.middleware),
});

setupListeners(store.dispatch);
