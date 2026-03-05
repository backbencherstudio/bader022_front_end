"use client";

import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  // console.log("ttttttt", useLoginMutation);

   const { token, user } = useAppSelector((state) => state.auth);
   console.log('====================================');
   console.log('token:', token);
   console.log('user:', user);
   console.log('====================================');

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      }).unwrap();
      if (response.success) {
        dispatch(
          setCredentials({
            token: response.token,
            user: {
              ...response.data.user,
              role: response.data.user_type,
            },
          }),
        );

        if (response.data.user_type === "Admin") {
          router.push("/admin/dashboard");
        } else if (response.data.user_type === "Merchant") {
          router.push("/merchant/dashboard");
        } else {
          router.push("/user/dashboard");
        }
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
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
          Login to Bokli
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
          Your all-in-one booking management platform
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email Address"
            icon={<FaEnvelope />}
            placeholder="john@example.com"
            type="email"
            register={register("email", { required: true })}
          />
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
                {...register("password", { required: true })}
                className="w-full pl-10 pr-10 py-3 border rounded-md
                  bg-white dark:bg-gray-700
                  border-gray-300 dark:border-gray-600
                  text-gray-900 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("remember")} />
              Remember me
            </label>
            <Link href={"/forgot-password"}>
              <button
                type="button"
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black dark:bg-blue-600 text-white py-3 rounded-md font-medium hover:opacity-90 cursor-pointer"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link href="/signup">
            <span className="text-blue-600 cursor-pointer hover:underline">
              Sign Up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ------------------ */
/* Reusable Input    */
/* ------------------ */
function Input({
  label,
  icon,
  register,
  placeholder,
  type = "text",
}: {
  label: string;
  icon: React.ReactNode;
  register: any;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
        {label} *
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          {...register}
          className="w-full pl-10 py-3 border rounded-md
            bg-white dark:bg-gray-700
            border-gray-300 dark:border-gray-600
            text-gray-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
