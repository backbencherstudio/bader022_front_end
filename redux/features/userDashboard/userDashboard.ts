import { baseApi } from "@/redux/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    dashboardOverview: builder.query({
      query: () => ({
        url: "/admin/dashboard/activity",
        method: "GET",
      }),
    }),
  }),
});
export const
 {
     useDashboardOverviewQuery 


 } = dashboardApi;