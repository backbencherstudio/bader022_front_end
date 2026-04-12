"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaBusinessTime,
} from "react-icons/fa";
import Image from "next/image";

import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { authorize } from "@/lib/auth";
import { toast } from "sonner";
import { useI18n } from "@/components/provider/I18nProvider";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
};

export default function CreateDemo() {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [registerUser, { isLoading }] = useRegisterMutation();

  // useEffect(() => {
  //   const auth = authorize(["Merchant", "Admin", "User"]);
  //   if (auth.authorized) {
  //     router.push("/");
  //   }
  // }, []);
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
      await registerUser({
        name: data.fullName,
        email: data.email,
        phone: data.phone,
      }).unwrap();

      toast.success(t("Auth.Signup.success"));
      router.push("/user-login");
    } catch (error: any) {
      toast.error(error?.data?.message || t("Auth.Signup.error"));
    }
  };

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen flex items-center justify-center px-4 flex-col gap-8 p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm"
    >
      <div className="w-full max-w-md">
        <Link href={"/"}>
          <div className="flex justify-center">
            <Image
              src="/images/image 259.png"
              alt="Company Logo"
              width={120}
              height={40}
              className="dark:brightness-0 dark:invert"
            />
          </div>
        </Link>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white py-4">
          {/* {t("Auth.Signup.title")} */}
          {locale == "ar" ? "" : "Book a Meeting with Us"}
        </h2>
        <p className="text-center mb-4">
          {" "}
          {locale == "ar"
            ? ""
            : "Plan your successful journey with Bokli and discover how you can increase your sales"}
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-white dark:bg-gray-800 rounded-xl shadow-md p-8"
        >
          <Input
            label={t("Auth.Signup.fullName")}
            icon={<FaUser />}
            register={register("fullName", { required: true })}
            error={errors.fullName && "Full Name is Required"}
            isRTL={isRTL}
          />

          <Input
            label={t("Auth.Signup.email")}
            icon={<FaEnvelope />}
            type="email"
            register={register("email", { required: true })}
            error={errors.email && "Email is Required"}
            isRTL={isRTL}
          />

          <Input
            label={locale == "ar" ? "" : "Your Business Name"}
            // label={t("Auth.Signup.fullName")}
            icon={<FaBusinessTime />}
            register={register("businessName", { required: true })}
            error={errors.businessName && "Business Name is Required"}
            isRTL={isRTL}
          />

          <Input
            label={t("Auth.Signup.phone")}
            icon={<FaPhoneAlt />}
            register={register("phone", { required: true })}
            error={errors.phone && "Phone Number is Required"}
            isRTL={isRTL}
          />
          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black dark:bg-blue-600 text-white py-3 rounded-md font-medium cursor-pointer"
          >
            {/* {isLoading ? t("Auth.Signup.loading") : t("Auth.Signup.signup")} */}
            {locale == "ar" ? "" : "Book Demo"}
          </button>
          {/* Footer */}
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
            {/* {t("Auth.Signup.alreadyAccount")}{" "} */}
            ⭐⭐⭐⭐⭐ 4.9/5 from 1000+ clients
            <Link href="/user-login">
              <span className="text-blue-600 hover:underline">
                {/* {t("Auth.Signup.login")} */}
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

/* Reusable Input */
function Input({ label, icon, register, type = "text", error, isRTL }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
        {label} *
      </label>

      <div className="relative">
        <span
          className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${
            isRTL ? "right-3" : "left-3"
          }`}
        >
          {icon}
        </span>

        <input
          type={type}
          {...register}
          className={`w-full py-3 border rounded-md bg-white dark:bg-gray-700 ${
            isRTL ? "pr-10 text-right" : "pl-10"
          } ${error ? "border-red-500" : "border-gray-300"}`}
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
