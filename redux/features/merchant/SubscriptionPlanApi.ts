import { baseApi } from "@/redux/api/baseApi";

export const SubscriptionPlanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // GET Plans
    getSubscriptionPlan: builder.query({
      query: () => ({
        url: `/plan`,
        method: "GET",
      }),
      providesTags: ["Plan"],
    }),

    //  CREATE Subscription
    subscription: builder.mutation({
      query: (data: { email: string; plan_id: number }) => ({
        url: `/renew`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Plan"],
    }),
   
  }),
});

export const {
  useGetSubscriptionPlanQuery,
  useSubscriptionMutation
} = SubscriptionPlanApi;
