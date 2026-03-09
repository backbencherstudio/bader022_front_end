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
    }),

    //  Login
    
    login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),

    //  Send OTP
    sendOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/send-otp",
        method: "POST",
        body,
      }),
    }),

    //  Verify OTP
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: "/verify-otp",
        method: "POST",
        body,
      }),
    }),

    //  Forgot Password
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/forgot-password",
        method: "POST",
        body,
      }),
    }),

    //  Reset Password
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
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
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
