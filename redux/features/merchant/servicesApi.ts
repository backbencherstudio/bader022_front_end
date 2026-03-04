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
    updateServiceById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/service/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),
    
  }),
});

export const {
  useAllServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceByIdMutation
} = servicesApi;