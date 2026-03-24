"use client";

import { authorize } from "@/lib/auth";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { toast } from "sonner";

type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = authorize(["Merchant", "Admin", "User"]);
    if (auth.authorized) {
      router.push("/");
    }
  }, []);

  const onSubmit = async (data: FormValues) => {
    console.log(" Form submitted:", data);

    try {
      const response = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      console.log("Login response:", response);

      if (response.success) {
        setError(null);

        dispatch(
          setCredentials({
            token: response?.token,
            user: {
              ...response?.data?.user,
              role: response?.data?.user_type,
            },
          }),
        );

        const role = response.data.user_type;
        console.log(" User role:", role);

        // Add a small delay to ensure state is updated
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
      toast.success("Login successful");
    } catch (error: any) {
      // console.error("Login error:", error);

      const message =
        error?.data?.message || error?.message || "Invalid credentials";

      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
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

        <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white py-4">
          Login to Bokli
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
          Your all-in-one booking management platform
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)(e);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Email Address *
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="john@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full pl-10 py-3 border rounded-md
                  bg-white dark:bg-gray-700
                  border-gray-300 dark:border-gray-600
                  text-gray-900 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Password *
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
                autoComplete="current-password"
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
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
            {error && !errors.password && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 pt-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("remember")} />
              Remember me
            </label>

            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black dark:bg-blue-600 text-white py-3 rounded-md font-medium hover:opacity-90 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Login"}
            {/* login */}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
          Don't have an account?{" "}
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
