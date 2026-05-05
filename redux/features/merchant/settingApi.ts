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

    //Tap key
    getMerchantTapkey: builder.query({
      query: () => ({
        url: `/admin/tap-payment/show`,
        method: "GET",
      }),
      providesTags: ["Setting"],
    }),

    //Tap key update
    updateMerchantTapkey: builder.mutation({
      query: ({ body }) => {
        // console.log("body in adminApi", body);
        return {
          url: "admin/tap-payment/upsert",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Setting"],
    }),

        //Tap key
    getMerchantDataShow: builder.query({
      query: () => ({
        url: `/admin/merchant-setting/show`,
        method: "GET",
      }),
      providesTags: ["Setting"],
    }),
   
  //  createBranch: builder.mutation({
  //     query: ({ body }) => {
  //       // console.log("body in adminApi", body);
  //       return {
  //         url: "admin/branch/store",
  //         method: "POST",
  //         body,
  //       };
  //     },
  //     invalidatesTags: ["Setting"],
  //   }),
      createBranch: builder.mutation({
      query: ({ body }) => ({
        url: "admin/branch/store",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Setting", "Branch"],
    }),

    updateBranch: builder.mutation({
      query: ({ id, body }) => ({
        url: `admin/branch/update/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Setting", "Branch"],
    }),

    deleteBranch: builder.mutation({
      query: (id) => ({
        url: `admin/branch/delete/${id}`,
        method: "DELETE", 
      }),
      invalidatesTags: ["Setting", "Branch"],
    }),

  }),
});

export const {
  useUpdateBusinessSettingMutation,
  useGetMerchantTapkeyQuery,
  useUpdateMerchantTapkeyMutation,
  useGetMerchantDataShowQuery,
  useCreateBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation
} = settingApi;
