import { baseApi } from "@/redux/api/baseApi";

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  All Services
    allMiniSiteData: builder.query({
      query: () => ({
        url: "/admin/service/index",
        method: "GET",
      }),
      providesTags: ["MiniSite"],
    }),

    // Create MiniSite
    createMiniSite: builder.mutation<any, FormData>({
          query: (formData) => ({
            url: "/admin/mini-sites/store",
            method: "POST",
            body: formData,
          }),
          invalidatesTags: ["MiniSite"],
        }),

    
  }),
});

export const {
  useAllMiniSiteDataQuery,
  useCreateMiniSiteMutation,
} = servicesApi;