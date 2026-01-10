"use client";

import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  otp: string[];
};

export default function OTPPage() {
  const router = useRouter();
  const { handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: { otp: ["", "", "", "", "", ""] },
  });

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const otpValues = watch("otp");

  const onSubmit = () => {
    const otp = otpValues.join("");
    console.log("OTP:", otp);
    router.push("/reset-password");
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
    index: number
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
            <span className="text-blue-600">B</span>Bokli
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
          Enter OTP
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
          We have sent a code to your registered email address
        </p>

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
                className="
                  w-12 h-12 text-center text-lg font-semibold
                  rounded-md border
                  bg-white dark:bg-gray-700
                  border-gray-300 dark:border-gray-600
                  text-gray-900 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
                value={otpValues[index]}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
              />
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black dark:bg-blue-600 text-white py-3 rounded-md font-medium hover:opacity-90"
          >
            Submit
          </button>

          {/* Resend */}
          <button
            type="button"
            className="w-full text-sm text-gray-500 dark:text-gray-400 hover:underline"
          >
            Resend OTP
          </button>
        </form>
      </div>
    </div>
  );
}
