import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
//import counterReducer from "../features/counter/counterSlice";
import { apiSlice } from "../features/api/apiSlice";
import devicesReducer from "../features/devices/devicesSlice";

export const store = configureStore({
  reducer: {
    //counter: counterReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    devices: devicesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
