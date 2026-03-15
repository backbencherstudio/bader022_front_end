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
  }),
});

export const { useMerchantRegMutation } = merchantRegistrationApi;
