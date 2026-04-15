import { baseApi } from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  Register
    register: builder.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
       invalidatesTags: ["Auth"],
    }),

    // Book Demo 
    bookDemo: builder.mutation({
      query: (body) => ({
        url: "/book-demo",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

//   login: builder.mutation({
//   query: (body) => ({
//     url: "/login",
//     method: "POST",
//     body,
//   }),
//   //  success response
//   transformResponse: (response: any) => {
//     return {
//       success: response?.success,
//       token: response?.token,
//       data: response?.data,
//     };
//   },
//   //  error response
//   transformErrorResponse: (error: any) => {
//     return {
//       status: error?.status,
//       message:
//         error?.data?.message ||
//         error?.data?.error ||
//         "Something went wrong",
//     };
//   },
//    invalidatesTags: ["Auth"],
// }),


  login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

  resendOtp: builder.mutation({
    query: (body) => ({
      url: "/reset-otp",
      method: "POST",
      body,
    }),
    invalidatesTags: ["Auth"],
  }),
    //Login  Verify 
    loginVerify: builder.mutation({
      query: (body) => ({
        url: "/login-otp",
        method: "POST",
        body,
      }),
       invalidatesTags: ["Auth"],
    }),

    // Register User Verify
    registerVerify:builder.mutation({
      query: (body) => ({
        url: "/verify-register-otp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    // Register Merchant Verify
    registerMerchantVerify:builder.mutation({
      query: (body) => ({
        url: "/marchant-verify-otp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    //  Send OTP
    sendOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/send-otp",
        method: "POST",
        body,
      }),
       invalidatesTags: ["Auth"],
    }),

    //  Verify OTP
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: "/verify-otp",
        method: "POST",
        body,
      }),
       invalidatesTags: ["Auth"],
    }),

    //  Forgot Password
    forgotPassword: builder.mutation({
      query: (body) => {
        // console.log(body);
        return {
          url: "/forgot-password",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Auth"],

    }),
    //  Reset Password
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/reset-password",
        method: "POST",
        body,
      }),
       invalidatesTags: ["Auth"],
    }),

    // Change Password
    changePassword: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/passwordchange/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useBookDemoMutation,
  useLoginMutation,
  useResendOtpMutation,
  useLoginVerifyMutation,
  useRegisterVerifyMutation,
  useRegisterMerchantVerifyMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
