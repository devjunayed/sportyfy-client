import { baseApi } from "../baseApi";

const checkAvailabilityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkAvailability: builder.query({
      query: ({date, facilityId}: {date: string, facilityId: string}) => ({
        url: `/check-availability?date=${date}&facility=${facilityId}`,
        method: "GET",
        
      }),
    }),
  }),
});

export const { useCheckAvailabilityQuery } = checkAvailabilityApi;
