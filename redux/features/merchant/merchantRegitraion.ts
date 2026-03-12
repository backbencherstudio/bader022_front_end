import { baseApi } from "@/redux/api/baseApi";


export const MerchantRegistraion = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  merchant registraion
    MerchantReg: builder.mutation({
      query: (body) => ({
        url: "/marchant/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Merchants"],
    }),
  }),
});

export const { useMerchantRegMutation } = MerchantRegistraion;
