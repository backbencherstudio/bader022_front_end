import { baseApi } from "@/redux/api/baseApi";

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  analyticsOverview
    analyticsOverview: builder.query({
      query: () => ({
        url: "/admin/analytics/index",
        method: "GET",
      }),
       providesTags: ["Analytics"],
    }),
    //  monthlyRevenue
    monthlyRevenue: builder.query({
      query: () => ({
        url: "/admin/analytics/monthlyrevenue",
        method: "GET",
      }),
      providesTags: ["Analytics"],
    }),
    //  weeklyRevenue
    weeklyRevenue: builder.query({
      query: () => ({
        url: "/admin/analytics/weeklyrevenue",
        method: "GET",
      }),
      providesTags: ["Analytics"],
    }),
    //  newReturn
    newReturn: builder.query({
      query: () => ({
        url: "/admin/analytics/newreturn",
        method: "GET",
      }),
      providesTags: ["Analytics"],
    }),
    //  staffPerformance
    staffPerformance: builder.query({
      query: () => ({
        url: "/admin/analytics/staffPerformance",
        method: "GET",
      }),
      providesTags: ["Analytics"],
    }),

  }),
});

export const {
  useAnalyticsOverviewQuery,
    useMonthlyRevenueQuery,
    useWeeklyRevenueQuery,
    useNewReturnQuery,
    useStaffPerformanceQuery,
} = analyticsApi;
