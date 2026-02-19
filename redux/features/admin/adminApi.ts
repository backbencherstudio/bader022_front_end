import { baseApi } from "@/redux/api/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  dashboard-overview
    dashboardOverview: builder.query({
      query: () => ({
        url: "/admin/dashboard-overview",
        method: "GET",
      }),
    }),
    //  weeklyPaymentCount
    weeklyPaymentCount: builder.query({
      query: () => ({
        url: "/admin/weeklyPaymentCount",
        method: "GET",
      }),
    }),
    //  monthlypaymentCount
    monthlypaymentCount: builder.query({
      query: () => ({
        url: "/admin/monthlypaymentCount",
        method: "GET",
      }),
    }),
    //  Merchants
    getAllMerchants: builder.query({
      query: () => ({
        url: "/admin/merchant/index",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useDashboardOverviewQuery,
  useWeeklyPaymentCountQuery,
  useMonthlypaymentCountQuery,
  useGetAllMerchantsQuery,
} = adminApi;
