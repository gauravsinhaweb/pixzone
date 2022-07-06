import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import dataSlice from "./reducers/dataSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    data: dataSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
