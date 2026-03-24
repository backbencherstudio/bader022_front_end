import { baseApi } from "@/redux/api/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get Payment Status
    getPaymentStatus: builder.query({
      query: ({ user_id }) => ({
        url: `/payment-status/${user_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetPaymentStatusQuery,
} = paymentApi;
