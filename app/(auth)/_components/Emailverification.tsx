"use client";
import { useI18n } from "@/components/provider/I18nProvider";
import {
  useLoginVerifyMutation,
  useResendOtpMutation,
} from "@/redux/features/auth/authApi";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  otp: string[];
};

type EmailVerificationProps = {
  email: string;
};

export default function Emailverification({ email }: EmailVerificationProps) {
  const { handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: { otp: ["", "", "", "", "", ""] },
  });
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  const router = useRouter();
  const [loginVerify, { isLoading }] = useLoginVerifyMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const otpValues = watch("otp");
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    const otp = otpValues.join("");
    // const email = localStorage.getItem("resetEmail");
    const body = {
      email,
      otp,
    };

    try {
      const response = await loginVerify(body).unwrap();
      //   console.log("OTP verified:", response);
      if (response.success) {
        setError(null);
        dispatch(
          setCredentials({
            token: response?.token,
            remember_token: response.data.remember_token,
            user: {
              ...response?.data?.user,
              role: response?.data?.user_type,
            },
          }),
        );
        // localStorage.setItem("remember_token", response.data.remember_token);
        toast.success(t("Auth.Login.success"));
        const role = response.data.user_type;
        setTimeout(() => {
          if (role === "Admin") {
            router.replace("/admin/dashboard");
          } else if (role === "Merchant") {
            router.replace("/merchant/dashboard");
          } else {
            router.replace("/user/dashboard");
          }
        }, 100);
      }
    } catch (error: any) {
      // console.error("Error verifying OTP:", error);
      if (error?.data?.message === "OTP expired") {
        setError("The OTP has expired. Please request a new one.");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    }
  };

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    setValue(`otp.${index}`, value);
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = async () => {
    try {
      // Assuming your backend expects the email to resend the OTP
      const response = await resendOtp({ email }).unwrap();

      if (response.success) {
        toast.success("OTP has been resent successfully!");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to resend OTP. Please try again.",
      );
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        {/* Logo */}
        <Link href={"/"}>
          <div className="flex justify-center">
            <Image
              src="/images/image 259.png"
              alt="Company Logo"
              width={120}
              height={40}
              priority
              className="h-auto w-auto object-contain dark:brightness-0 dark:invert"
            />
          </div>
        </Link>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white py-4">
          Enter OTP
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
          We have sent a code to your registered email address
        </p>

        {error && <div className="text-center text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* OTP Inputs */}
          <div className="flex justify-center gap-3">
            {otpValues.map((_, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                maxLength={1}
                inputMode="numeric"
                className="w-12 h-12 text-center text-lg font-semibold
                  rounded-md border
                  bg-white dark:bg-gray-700
                  border-gray-300 dark:border-gray-600
                  text-gray-900 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={otpValues[index]}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
              />
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black dark:bg-blue-600 text-white py-3 rounded-md font-medium hover:opacity-90 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Verifying..." : "Submit"}
          </button>

          {/* Resend */}
          <button
            type="button"
            className="w-full text-sm text-gray-500 dark:text-gray-400 py-3 rounded-md border border-gray-200 hover:underline cursor-pointer disabled:opacity-50"
            onClick={handleResendOtp}
            disabled={isResending}
          >
            {isResending ? "Resending..." : "Resend OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
