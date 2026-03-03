import { baseApi } from "@/redux/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  analyticsOverview
    dashboardOverview: builder.query({
      query: () => ({
        url: "/admin/mer-dashboard/index",
        method: "GET",
      }),
    }),
    //  monthlyRevenue
    monthlyRevenue: builder.query({
      query: () => ({
        url: "/admin/mer-dashboard/revenue",
        method: "GET",
      }),
    }),
    //  weeklyRevenue
    weeklyRevenue: builder.query({
      query: () => ({
        url: "/admin/mer-dashboard/weeklyrevenue",
        method: "GET",
      }),
    }),
    //  todayAppointment
    todayAppointment: builder.query({
      query: () => ({
        url: "/admin/mer-dashboard/today",
        method: "GET",
      }),
    }),
  }),
});

export const {
    useDashboardOverviewQuery,
    useMonthlyRevenueQuery,
    useWeeklyRevenueQuery,
    useTodayAppointmentQuery,

} = dashboardApi;