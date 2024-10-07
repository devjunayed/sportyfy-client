import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://sports-facility-booking-platform-delta.vercel.app/api",
    baseUrl: "http://localhost:5000/api",

    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState)?.user?.token;

      console.log(token);

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
