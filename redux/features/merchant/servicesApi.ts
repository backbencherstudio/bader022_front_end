import { baseApi } from "@/redux/api/baseApi";



export const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  All Services
    allServices: builder.query({
      query: () => ({
        url: "/admin/service/index",
        method: "GET",
      }),
      providesTags: ["Services"],
    }),

    // Create Service
    createService: builder.mutation<any, FormData>({
          query: (formData) => ({
            url: "/admin/service/store",
            method: "POST",
            body: formData,
          }),
          invalidatesTags: ["Services"],
        }),

    // Update Service
    updateServiceById: builder.mutation<any, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/admin/service/update/${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Services"],
    }),

    // Delete Service
    deleteServiceById: builder.mutation<any, string>({
    query: (id) => ({
      url: `/admin/service/delete/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Services"],
  }),
    
  }),
});

export const {
  useAllServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceByIdMutation,
  useDeleteServiceByIdMutation
} = servicesApi;