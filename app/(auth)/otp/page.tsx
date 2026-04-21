"use client";

import { useI18n } from "@/components/provider/I18nProvider";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/authApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  otp: string[];
};

export default function OTPPage() {
  const { locale, t } = useI18n();
  const isRTL = locale === "ar";
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const router = useRouter();
  const { handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: { otp: ["", "", "", "", "", ""] },
  });

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const otpValues = watch("otp");
  const [error, setError] = useState<string>("");

  const onSubmit = async () => {
    const otp = otpValues.join("");
    const email = localStorage.getItem("resetEmail");

    const body = {
      email,
      otp,
    };

    try {
      const response = await verifyOtp(body).unwrap();
      // console.log("OTP verified:", response);
      router.push("/reset-password");
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
    const email = localStorage.getItem("resetEmail");
    try {
      // Assuming your backend expects the email to resend the OTP
      const response = await resendOtp({ email }).unwrap();

      if (response.success) {
        toast.success("OTP has been resent successfully!");
        router.push("/reset-password");
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
          {locale == "ar" ? "أدخل رمز التحقق (OTP)" : "Enter OTP"}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
          {locale == "ar"
            ? "لقد أرسلنا رمزًا إلى عنوان بريدك الإلكتروني المسجّل."
            : "We have sent a code to your registered email address"}
        </p>

        {error && <div className="text-center text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* OTP Inputs */}
          <div
            dir={isRTL ? "ltr" : "ltr"}
            className="flex justify-center gap-3"
          >
            {otpValues.map((_, index) => (
              <input
                dir={isRTL ? "ltr" : "ltr"}
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
          {/* <button
            type="button"
            className="w-full text-sm text-gray-500 dark:text-gray-400 py-3 rounded-md border border-gray-200 hover:underline cursor-pointer disabled:opacity-50"
            onClick={handleResendOtp}
            disabled={isResending}
          >
            {isResending ? "Resending..." : "Resend OTP"}
          </button> */}
        </form>
      </div>
    </div>
  );
}
