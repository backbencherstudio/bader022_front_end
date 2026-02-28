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
    // getPaymentHistory: builder.query({
    //   query: () => ({
    //     url: `/admin/payment-history/index`,
    //     method: "GET",
    //   }),
    // }),
    getPaymentHistory: builder.query({
      query: ({ search = ""}) => ({
        url: `/admin/payment-history/index`,
        method: "GET",
        params: {
          search,
    
        },
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

    getSubscriptionsId: builder.query({
      query: (id: string | number) => ({
        url: `/admin/subscription/edit/${id}`,
        method: "GET",
      }),
    }),

    //EditSbcription

    updateSubscriptionsById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/subscription/update/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),

    //subcription data

    getSubscriptionsPlan: builder.query({
      query: () => ({
        url: `/admin/plan/index`,
        method: "GET",
      }),
      providesTags: ["Plan"],
    }),

    //add plan
    SubcriptionPost: builder.mutation({
      query: (body) => ({
        url: "/admin/plan/store",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Plan"],
    }),

    //tap key

    getTapkey: builder.query({
      query: () => ({
        url: `/admin/setting/index`,
        method: "GET",
      }),
      providesTags: ["Tapkey"],
    }),

    //Tap key update
    updateTapkey: builder.mutation({
      query: ({body }) => ({
        url: `admin/setting/update`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tapkey"],
    }),

    //subcription card data
    getsubcriptionSumary: builder.query({
      query: () => ({
        url: `/admin/subscription/summary`,
        method: "GET",
      }),
    }),

    //

    //setting personal

    getPersonaltHistory: builder.query({
      query: () => ({
        url: `/admin/profile-info`,
        method: "GET",
      }),
      providesTags: ["information"],
    }),

    // updateInformation: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/admin/saveinfo`,
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["information"],
    // }),

    //update setting info
    updateInformation: builder.mutation({
      query: (body) => ({
        url: `/admin/saveinfo`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["information"],
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
  useGetSubscriptionsIdQuery,
  useUpdateSubscriptionsByIdMutation,
  useGetSubscriptionsPlanQuery,
  useSubcriptionPostMutation,
  useGetTapkeyQuery,
  useUpdateTapkeyMutation,
  useGetPersonaltHistoryQuery,
  useUpdateInformationMutation,
  useGetsubcriptionSumaryQuery,
} = adminApi;
