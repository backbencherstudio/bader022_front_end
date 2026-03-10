import { baseApi } from "@/redux/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  Merchant Dashboard Overview
    merchantDashboardOverview: builder.query({
      query: () => ({
        url: "/admin/mer-dashboard/index",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
    //  monthlyRevenue
    monthlyRevenue: builder.query({
      query: () => ({
        url: "/admin/mer-dashboard/revenue",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
    //  weeklyRevenue
    weeklyRevenue: builder.query({
      query: () => ({
        url: "/admin/mer-dashboard/weeklyrevenue",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
    //  todayAppointment
    todayAppointment: builder.query({
      query: () => ({
        url: "/admin/mer-dashboard/today",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
    useMerchantDashboardOverviewQuery,
    useMonthlyRevenueQuery,
    useWeeklyRevenueQuery,
    useTodayAppointmentQuery,

} = dashboardApi;