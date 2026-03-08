import { baseApi } from "@/redux/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  Merchant Transaction Overview
    merchantTransactionOverview: builder.query({
      query: () => ({
        url: "/admin/transaction/index",
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
  }),
});

export const {
    useMerchantTransactionOverviewQuery,
} = dashboardApi;