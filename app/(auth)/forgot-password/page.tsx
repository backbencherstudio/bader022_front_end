"use client";

import { Input } from "@/components/ui/input";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope } from "react-icons/fa";
import { Label } from '@/components/ui/label';
import { toast } from "sonner";

type FormValues = {
  email: string;
  Label:string;
};

export default function ForgotPasswordPage() {
  const { register, handleSubmit , formState: { errors }} = useForm<FormValues>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const click =()=>{
    console.log(click)
  }
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
//  console.log(forgotPassword,"dfsdfsd")
  const onSubmit = async (data: FormValues) => {
    // console.log(data,"data=============")
    try {
      setError(null);

      const response = await forgotPassword({
        email: data.email,
      }).unwrap();

      if (response.success) {
        localStorage.setItem("resetEmail", data.email);
        router.push("/otp");
      }
    } catch (err: any) {
      setError(
        err?.data?.message || "Failed to send OTP. Please try again."
      );
    }
    toast.error(error || "Failed to send OTP. Please try again.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">

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

        <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white py-4">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>

            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className={`pl-10 ${errors.email ? "border-red-500" : ""
                  }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>

            {/* Frontend validation error */}
            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black dark:bg-blue-600 text-white py-3 rounded-md font-medium hover:opacity-90 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}