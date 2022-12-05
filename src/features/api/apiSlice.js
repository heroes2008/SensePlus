//import { forceQueryFnSymbol } from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "sensePlusApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://claricesystems.in:8082/api/",
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
      query: (user) => "/positions",
    }),
    positionsAndDevices: builder.query({
      async queryFn(args, queryApi, extraOptions, fetchWithBQ) {
        console.log(args);
        // 1. Call the positions API to read temp and humidity etc.
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

        // 2. Call the devices API for max and min threshold
        const devices = await fetchWithBQ(
          "http://claricesystems.in:8080/api/v1/devices?userId=1"
        );

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
        console.log(queryApi.getState());
        //devicesAdapter.setAll(queryApi.getState(), mergedArr);
        //useDispatch(devicesReceived(mergedArr));
        return mergedArr ? { data: mergedArr } : { error: devices.error };
      },
    }),
  }),
});

export const { usePositionsQuery, usePositionsAndDevicesQuery } = apiSlice;
