//import { forceQueryFnSymbol } from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const devicesAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.id.localeCompare(a.id),
});

export const apiSlice = createApi({
  reducerPath: "sensePlusApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://13.232.30.234:8082/api/",
    prepareHeaders: (headers, { getState }) => {
      headers.set(
        "authorization",
        "Basic YWRtaW5AY2xhcmljZXN5c3RlbXMuaW46QWJjQDEyMw=="
      );
      headers.set("Accept", "application/json");
    },
  }),
  endpoints: (builder) => ({
    positions: builder.query({
      query: () => "/positions",
    }),
    positionsAndDevices: builder.query({
      async queryFn(args, queryApi, extraOptions, fetchWithBQ) {
        // First call the positions API
        const positions = await fetchWithBQ("/positions");
        const positionsArr = [];
        positions.data?.map((pos) =>
          //let obj = { id: pos.deviceId, temp: pos.attributes.temp1 }
          //devicesAdapter.upsertOne({ id: pos.deviceId, temp: pos.attributes.temp1 }) // Fetch only useful properties
          positionsArr.push({
            id: pos.deviceId,
            temp: pos.attributes.temp1,
            humidity: pos.attributes.adc1,
          })
        );
        const devices = await fetchWithBQ(
          "http://claricesystems.in:8080/api/v1/devices?userId=1"
        );
        debugger;
        let mergedArr = [];
        // Merge the device array into positions array based on id
        for (let i = 0; i < positionsArr.length; i++) {
          mergedArr.push({
            ...positionsArr[i],
            ...devices.data?.find(
              (innerItem) => innerItem.id === positionsArr[i].id
            ),
          });
        }
        debugger;
        //devicesAdapter.upsertMany(queryApi.getState(), deviceArr);
        return mergedArr ? { data: mergedArr } : { error: devices.error };
      },
    }),
  }),
});

export const { usePositionsQuery, usePositionsAndDevicesQuery } = apiSlice;
