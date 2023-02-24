//import { forceQueryFnSymbol } from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import moment from "moment-timezone";
import devicesSlice, { devicesReceived } from "../devices/devicesSlice";

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
        //console.log(args);
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
        console.log(mergedArr);
        queryApi.dispatch(devicesReceived(mergedArr));

        return mergedArr ? { data: mergedArr } : { error: devices.error };
      },
    }),
    devices: builder.query({
      async queryFn(args, queryApi, extraOptions, fetchWithBQ) {
        // 2. Call the devices API for max and min threshold
        const devices = await fetchWithBQ(
          "http://claricesystems.in:8080/api/v1/devices?userId=1"
        );

        console.log("devices");
        console.log(devices);
        //queryApi.dispatch(devicesReceived(mergedRoutesArr));

        return devices ? { data: devices.data } : { error: devices.error };
      },
    }),
    routes: builder.query({
      async queryFn(args, queryApi, extraOptions, fetchWithBQ) {
        const startTime = args.startDate
          ? moment(args.startDate).utc().format()
          : moment().utc().subtract(35, "minutes").format();

        const endTime = args.endDate
          ? moment(args.endDate).utc().format()
          : moment().utc().subtract(5, "minutes").format();

        console.log(startTime + " - " + endTime);
        //const routeUrl = `https://www.claricesystems.in/api/reports/route?type=allEvents&deviceId=${args}&from=2022-12-22T17:20:15.000Z&to=2022-12-22T17:24:26.000Z`;
        //const routeUrl = `https://www.claricesystems.in/api/reports/route?type=allEvents&deviceId=${args}&from=${startTime}&to=${endTime}`;
        const routeUrl = `http://claricesystems.in:8080/api/v1/positions?deviceId=${args.selectedDevice}&from=${startTime}&to=${endTime}`;
        // 1. Call the routes API to read temp and humidity etc.
        const routes = await fetchWithBQ(routeUrl);
        const routesArr = [];
        routes.data?.map((route) =>
          routesArr.push({
            id: route.deviceid,
            deviceName: args.selectedDeviceName,
            deviceDate: moment.utc(route.devicetime).format("DD/MM/YYYY"),
            deviceTime: moment.utc(route.devicetime).format("HH:mm:ss"),
            latitude: route.latitude,
            longitude: route.longitude,
            speed: route.speed.toFixed(2),
            event: route.attributes.event,
            address: route.address,
            humidity: Number(Number(route.attributes.adc1 * 0.033).toFixed(2)),
            temp: Number(route.attributes.temp1).toFixed(2),
          })
        );
        if (routesArr.length === 0) {
          routesArr.push({
            deviceTime: "No Data",
          });
        }
        console.log("routes");
        console.log(routesArr);
        //});

        //let mergedRoutesArr = [];
        //debugger;
        // Merge the device array into routes array based on id
        // for (let i = 0; i < routesArr.length; i++) {
        //   mergedRoutesArr.push({
        //     ...routesArr[i],
        //     ...devices.data?.find(
        //       (innerItem) => innerItem.id === routesArr[i].id
        //     ),
        //   });
        // }
        //debugger;
        //console.log(mergedRoutesArr);
        //queryApi.dispatch(devicesReceived(mergedRoutesArr));

        return routesArr ? { data: routesArr } : { error: routes.error };
      },
    }),
  }),
});

export const {
  usePositionsQuery,
  usePositionsAndDevicesQuery,
  useDevicesQuery,
  useRoutesQuery,
} = apiSlice;
