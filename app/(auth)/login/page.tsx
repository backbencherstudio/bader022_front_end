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
import { useI18n } from "@/components/provider/I18nProvider";

type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

export default function LoginPage() {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";

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
    const auth = authorize(["User", "Merchant", "Admin"]);
    if (auth.authorized) {
      const role = auth.user?.role;
      const roleRedirectMap: Record<string, string> = {
        Admin: "/admin/dashboard",
        Merchant: "/merchant/dashboard",
        User: "/user/dashboard",
      };
      router.push(roleRedirectMap[role] || "/");
    }
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (response.success) {
        setError(null);

        dispatch(
          setCredentials({
            token: response?.token,
            user: {
              ...response?.data?.user,
              role: response?.data?.user_type,
              miniSiteAccess: response?.data?.has_mini_site_menu,
            },
          }),
        );

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
      const message = error?.message || t("Auth.Login.invalid");
      if (error?.status === 403) {
        toast.error(message);
      } else {
        setError(message);
      }
    }
  };

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4"
    >
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

        {/* Title */}
        <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white py-4">
          {t("Auth.Login.title")}
        </h2>

        <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
          {t("Auth.Login.subtitle")}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)(e);
          }}
          className="space-y-4"
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              {t("Auth.Login.email")}
            </label>

            <div className="relative">
              <FaEnvelope
                className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${
                  isRTL ? "right-3" : "left-3"
                }`}
              />

              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                className={`w-full py-3 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isRTL ? "pr-10 text-right" : "pl-10"
                }`}
              />
            </div>

            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              {t("Auth.Login.password")}
            </label>

            <div className="relative">
              <FaLock
                className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${
                  isRTL ? "right-3" : "left-3"
                }`}
              />

              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                })}
                className={`w-full py-3 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isRTL ? "pr-10 pl-10 text-right" : "pl-10 pr-10"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${
                  isRTL ? "left-3" : "right-3"
                }`}
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

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 pt-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("remember")} />
              {t("Auth.Login.remember")}
            </label>

            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              {t("Auth.Login.forgot")}
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black dark:bg-blue-600 text-white py-3 rounded-md font-medium hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? t("Auth.Login.loading") : t("Auth.Login.login")}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
          {t("Auth.Login.noAccount")}{" "}
          <Link href="/create-account">
            <span className="text-blue-600 hover:underline">
              {t("Auth.Login.signup")}
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
