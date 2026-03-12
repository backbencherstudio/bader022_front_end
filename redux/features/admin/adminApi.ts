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
        params: { search },
      }),
      providesTags: ["Merchants"],
    }),

    //  Get Single Merchant
    getSingleMerchantById: builder.query({
      query: (id) => ({
        url: `/admin/merchant/show/${id}`,
        method: "GET",
      }),
      providesTags: ["Merchants"],
    }),

    //  Get Single Merchant
    updateMerchantById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/merchant/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Merchants"],
    }),

    //  PaymentHistory
    // getPaymentHistory: builder.query({
    //   query: () => ({
    //     url: `/admin/payment-history/index`,
    //     method: "GET",
    //   }),
    // }),
    getPaymentHistory: builder.query({
      query: ({ search = "" }) => ({
        url: `/admin/payment-history/index?search=${search}`,
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

    // redux/features/admin/adminApi.ts
    getSubscriptions: builder.query({
      query: (params) => {
        const searchParams = new URLSearchParams();

        if (params?.package) {
          searchParams.append("package", params.package);
        }

        if (params?.plan_type) {
          searchParams.append("plan_type", params.plan_type);
        }

        if (params?.status) {
          searchParams.append("status", params.status);
        }

        if (params?.search) {
          searchParams.append("search", params.search);
        }

        const queryString = searchParams.toString();

        return {
          url: queryString
            ? `/admin/subscription/index?${queryString}`
            : `/admin/subscription/index`,
          method: "GET",
        };
      },
      providesTags: ["Subscription"],
    }),

    // show subscription by id
    getSubscriptionsId: builder.query({
      query: (id: string | number) => ({
        url: `/admin/subscription/edit/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Subscription", id }],
    }),

    // update subscription by id
    updateSubscriptionsById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/subscription/update/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),

    // get subscription plan======qqqqqqqqqqqq
    getSubscriptionsPlan: builder.query({
      query: ({ search = "" }) => ({
        url: `/admin/plan/index?name=${search}`,
        method: "GET",
        // params: {
        //   search,
        // },
      }),
      providesTags: ["Plan"],
    }),

    //get package by id

    getPackageId: builder.query({
      query: (id: string | number) => ({
        url: `/admin/plan/show/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Plan", id }],
    }),

    //
    updatePlanById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/plan/update-status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Plan"],
    }),

    // create subscription plan
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
      query: ({ body }) => {
        console.log("body in adminApi", body); // <-- log here
        return {
          url: `admin/setting/update`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Tapkey"],
    }),
    //subcription card data
    getsubcriptionSumary: builder.query({
      query: () => ({
        url: `/admin/subscription/summary`,
        method: "GET",
      }),
    }),


   data: builder.query({
    query: (body)=>({
      url:`/add`,
      method:"POST",
      body,
    })
   }),
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

    //buesness analytics
    getBuesnessAnalytics: builder.query({
      query: () => ({
        url: `/admin/businessTypeAnalytics`,
        method: "GET",
      }),
      // providesTags: ["information"],
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
    useGetPackageIdQuery,
    useUpdatePlanByIdMutation,
  useSubcriptionPostMutation,
  useGetTapkeyQuery,
  useUpdateTapkeyMutation,
  useGetPersonaltHistoryQuery,
  useUpdateInformationMutation,
  useGetsubcriptionSumaryQuery,
  useGetBuesnessAnalyticsQuery,
} = adminApi;
