import { baseApi } from "../baseApi";

const facilityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFacility: builder.mutation({
      query: (facilityData) => ({
        url: "facility",
        method: "POST",
        body: facilityData,
      }),
      invalidatesTags: ["facility"]
    }),
    getFacilities: builder.query({
      query: () => ({
        url: "facility",
        method: "GET",
      }),
      providesTags: ['facility']
    }),
    updateFacility: builder.mutation({
      query: ({ id, facilityData }) => ({
        url: `/facility/${id}`,
        method: "PUT",
        body: facilityData,
      }),
    }),
    deleteFacility: builder.mutation({
      query: (id) => ({
        url: `facility/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateFacilityMutation,
  useGetFacilitiesQuery,
  useUpdateFacilityMutation,
  useDeleteFacilityMutation
} = facilityApi;
