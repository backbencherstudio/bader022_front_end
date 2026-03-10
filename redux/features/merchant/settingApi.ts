import { baseApi } from "@/redux/api/baseApi";


export const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  Reset Password
    updateBusinessSetting: builder.mutation({
      query: (body) => ({
        url: "/admin/merchant-setting/store",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Setting"],
    }),
  }),
});

export const {
  useUpdateBusinessSettingMutation,
} = settingApi;
