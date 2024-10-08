import { TBooking } from "../../../types/shared.type";
import { baseApi } from "../baseApi";



const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingData: TBooking) => ({
        url: "/bookings",
        method: "POST",
        body: bookingData
      }),
    }),
    getAllBooking: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
    }),
    getBooking: builder.query({
      query: () => ({
        url: "/bookings/user",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateBookingMutation, useGetBookingQuery useGetAllBookingQuery } = bookingApi;
