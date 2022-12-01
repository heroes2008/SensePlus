import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "sensePlusApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://13.232.30.234:8082/api/",
    prepareHeaders: (headers, { getState }) => {
      headers.set(
        "authorization",
        "Basic YWRtaW5AY2xhcmljZXN5c3RlbXMuaW46QWJjQDEyMw=="
      );
    },
  }),
  endpoints: (builder) => ({
    positions: builder.query({
      query: () => "/positions",
    }),
  }),
});

export const { usePositionsQuery } = apiSlice;
