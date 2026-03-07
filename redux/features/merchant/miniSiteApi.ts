import { baseApi } from "@/redux/api/baseApi";

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  All MiniSite Data
    allMiniSiteData: builder.query({
      query: () => ({
        url: "/admin/service/index",
        method: "GET",
      }),
      providesTags: ["MiniSite"],
    }),

    // Get MiniSite By Domain Name
    miniSiteByDomainName: builder.query({
      query: (domainName: string) => ({
        url: `/bokli/${domainName}`,
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

    // Create Why Choose Us
    createWhyChooseUs: builder.mutation<any, FormData>({
          query: (formData) => ({
            url: "/admin/whychooseus/upsert",
            method: "POST",
            body: formData,
          }),
          invalidatesTags: ["MiniSite"],
        }),

      // Create Global Setting
        createGlobalSetting: builder.mutation<any, FormData>({
          query: (formData) => ({
            url: "/admin/global-setting/store",
            method: "POST",
            body: formData,
          }),
          invalidatesTags: ["MiniSite"],
        }),

    
  }),
});

export const {
  useAllMiniSiteDataQuery,
  useMiniSiteByDomainNameQuery,
  useCreateMiniSiteMutation,
  useCreateWhyChooseUsMutation,
  useCreateGlobalSettingMutation,
} = servicesApi;