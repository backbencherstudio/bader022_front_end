import { baseApi } from "@/redux/api/baseApi";



export const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  all services
    allServices: builder.query({
      query: () => ({
        url: "/admin/service/index",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAllServicesQuery,
} = servicesApi;