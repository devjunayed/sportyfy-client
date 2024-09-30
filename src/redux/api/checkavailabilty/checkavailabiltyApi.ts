import { baseApi } from "../baseApi";

const checkAvailabilityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkAvailability: builder.query({
      query: (date: string) => ({
        url: `/check-availability?date=${date}`,
        method: "GET",
        
      }),
    }),
  }),
});

export const { useCheckAvailabilityQuery } = checkAvailabilityApi;
