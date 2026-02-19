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
      query: ({ search }) => ({
        url: "/admin/merchant/index",
        method: "GET",
        params: {
          search,
        },
      }),
    }),
    //  Get Single Merchant
    getSingleMerchantById: builder.query({
      query: (id) => ({
        url: `/admin/merchant/show/${id}`,
        method: "GET",
      }),
    }),

    //  Get Single Merchant
    updateMerchantById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/merchant/update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    //  PaymentHistory
    getPaymentHistory: builder.query({
      query: () => ({
        url: `/admin/payment-history/index`,
        method: "GET",
      }),
    }),

    //  SinglePaymentHistory
    getSinglePaymentHistory: builder.query({
      query: (id) => ({
        url: `/admin/payment-history/show/${id}`,
        method: "GET",
      }),
    }),

    //  Get Subscriptions
    getSubscriptions: builder.query({
      query: () => ({
        url: `/admin/subscription/index`,
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
  useGetSingleMerchantByIdQuery,
  useUpdateMerchantByIdMutation,
  useGetPaymentHistoryQuery,
  useGetSinglePaymentHistoryQuery,
  useGetSubscriptionsQuery,
} = adminApi;
