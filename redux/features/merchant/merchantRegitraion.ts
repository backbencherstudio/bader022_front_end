import { baseApi } from "@/redux/api/baseApi";

export const merchantRegistrationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    merchantReg: builder.mutation({
      query: (body) => ({
        url: "/marchant/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Merchants"],
    }),

    //merchant plan price
    merchentPlanPrice: builder.query({
      query: () => ({
        url: `/plan`,
        method: "GET",
      }),
      // providesTags: ["MiniSite"],
    }),
  }),
});


export const { useMerchantRegMutation,
  useMerchentPlanPriceQuery,
 } = merchantRegistrationApi;
