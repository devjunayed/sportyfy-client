import { baseApi } from "../baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (categoryData) => ({
        url: "category",
        method: "POST",
        body: categoryData,
      }),

      invalidatesTags: ["category"],
    }),
    getCategories: builder.query({
      query: () => ({
        url: `category`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, categoryData }) => ({
        url: `/category/${id}`,
        method: "PUT",
        body: categoryData,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `category/${id}`,
        method: "DELETE",
      }),
    }),
    getSingleCategory: builder.query({
      query: (id: string) => ({
        url: `category/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetSingleCategoryQuery,
} = categoryApi;
