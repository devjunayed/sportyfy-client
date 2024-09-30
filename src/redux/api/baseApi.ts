import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sports-facility-booking-platform-delta.vercel.app/api",
  }),
  endpoints: () => ({}),
});
