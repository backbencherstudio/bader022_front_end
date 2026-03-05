import { baseApi } from "@/redux/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    dashboardActivity: builder.query({
      query: () => ({
        url: "/admin/dashboard/activity",
        method: "GET",
      }),
    }),

    //payment history
    userPaymentHistory: builder.query({
      query: () => ({
        url: "/admin/dashboard/payment-history",
        method: "GET",
      }),
    }),
    DashboardbookingHistory: builder.query({
      query: () => ({
        url: "/admin/dashboard/history",
        method: "GET",
      }),
    }),

    //upcomming

    Upcomming: builder.query({
      query: () => ({
        url: "/admin/dashboard/upcoming",
        method: "GET",
      }),
    }),
  }),
});
export const
 {
     useDashboardActivityQuery ,
      useUserPaymentHistoryQuery,
      useDashboardbookingHistoryQuery,
      useUpcommingQuery,


 } = dashboardApi;