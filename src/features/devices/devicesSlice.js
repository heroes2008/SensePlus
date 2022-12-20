import React from "react";

import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const initialState = {
  pollingInterval: 5000,
  loading: "idle",
  positionsAndDevicesData: [],
};

//const devicesAdapter = createEntityAdapter();
//   {
//   sortComparer: (a, b) => a.id.localeCompare(b.id),
// }
const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    devicesLoading(state, action) {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    devicesReceived(state, action) {
      //if (state.loading === "idle") {
      //devicesAdapter.setAll(state, action.payload);
      console.log("In devicesReceived...");
      state.positionsAndDevicesData = [];
      state.positionsAndDevicesData = action.payload;
      //state.loading = "pending";
      //}
    },
    updatePollingInterval(state, action) {
      console.log(
        'interval changed from: "' +
          state.pollingInterval +
          '" to "' +
          action.payload +
          '"'
      );
      state.pollingInterval = action.payload;
    },
  },
});

export const { devicesLoading, devicesReceived, updatePollingInterval } =
  devicesSlice.actions;

export default devicesSlice.reducer;

export const selectPollingInterval = (state) => state.devices.pollingInterval;
