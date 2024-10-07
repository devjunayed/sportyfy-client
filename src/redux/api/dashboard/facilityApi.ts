import { baseApi } from "../baseApi";

const facilityApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        createFacility: builder.mutation({
            query: (facilityData)=>({
                url: 'facility',
                method: "POST",
                body: facilityData
            })
        }),
        getFacilities: builder.query({
            query: () => ({
                url: 'facility',
                method: "GET"
            })
        })
    })
})

export const {useCreateFacilityMutation, useGetFacilitiesQuery} = facilityApi;