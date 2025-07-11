import { baseApi } from "../baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSlot: builder.mutation({
      query: (slotData) => ({
        url: "/slots",
        method: "POST",
        body: slotData,
      }),
    }),
  }),
});

export const { useCreateSlotMutation } = slotApi;
