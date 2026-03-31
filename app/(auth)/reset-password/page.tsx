"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import AccountSuccess from "../_components/AccountSuccess";
import Image from "next/image";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type FormValues = {
  password: string;
  password_confirmation: string; // Ensure it's a string for password comparison
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    setEmail(storedEmail);
  }, []);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const onSubmit = async (data: FormValues) => {
    if (!email) {
      // alert("Email is required.");
      toast.error("Email is required.");
      return;
    }

    const payload = {
      email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    };

    // console.log(payload);

    try {
      const response = await resetPassword(payload).unwrap();
      // console.log("Password reset successful:", response);
      toast.success("Password reset successful");
      router.push("/login");
    } catch (error) {
      // console.error("Error resetting password:", error);
      toast.error("Error resetting password");
      // alert("Password reset failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      {!successful ? (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          {/* Logo */}
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

          {/* Title */}
          <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white py-4">
            Reset Your Password
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
            Enter your new password below
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Password *
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className="w-full pl-10 pr-10 py-3 border rounded-md
                  bg-white dark:bg-gray-700
                  border-gray-300 dark:border-gray-600
                  text-gray-900 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Confirm Password *
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={confirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password_confirmation", {
                    required: "Confirm password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className="w-full pl-10 pr-10 py-3 border rounded-md
                  bg-white dark:bg-gray-700
                  border-gray-300 dark:border-gray-600
                  text-gray-900 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password_confirmation && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password_confirmation.message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setConfirmPassword(!confirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                >
                  {confirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black dark:bg-blue-600 text-white py-3 rounded-md font-medium hover:opacity-90"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      ) : (
        <AccountSuccess />
      )}
    </div>
  );
}
