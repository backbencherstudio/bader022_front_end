"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
// @ts-ignore
import "react-phone-number-input/style.css";
import { useI18n } from "@/components/provider/I18nProvider";
import { useMerchantRegMutation } from "@/redux/features/merchant/merchantRegitraion";
import Link from "next/link";

export type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
};

interface AccountCreationProps {
  onNext: (values: FormValues) => void;
  defaultValues?: Partial<FormValues>;
}

export default function AccountCreation({
  onNext,
  defaultValues,
}: AccountCreationProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  const [createUser, { data, isLoading, isError }] = useMerchantRegMutation();

  const [showPassword, setShowPassword] = useState(false);
  const { locale, t } = useI18n();
  const isRTL = locale === "ar";

  const onSubmit = (values: FormValues) => {
    // console.log("Form Data:", values);
    onNext(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Input
        label={t("AccountCreation.fullName")}
        icon={<FaUser />}
        placeholder={
          locale == "ar" ? "أدخل اسمك الكامل" : "Enter Your Full Name"
        }
        register={register("fullName", {
          required: "Full name is required",
        })}
        error={errors.fullName?.message}
        isRTL={isRTL}
      />

      <Input
        label={t("AccountCreation.email")}
        icon={<FaEnvelope />}
        type="email"
        placeholder={
          locale == "ar"
            ? "أدخل عنوان بريدك الإلكتروني"
            : "Enter Your Email Address"
        }
        register={register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address",
          },
        })}
        error={errors.email?.message}
        isRTL={isRTL}
      />

      {/* Phone */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("AccountCreation.phone")} *
        </label>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: "Phone number is required",
            validate: (value) => {
              const digits = value?.replace(/\D/g, "") || "";
              // must include 966 + more than 9 digits total
              if (!digits.startsWith("966")) {
                return "Phone number must start with +966";
              }
              if (digits.length <= 8) {
                return "Phone number must be more than 9 digits including 966";
              }

              return true;
            },
          }}
          render={({ field }) => (
            <PhoneInput
              international
              defaultCountry="SA"
              countryCallingCodeEditable={false}
              value={field.value || ""}
              onChange={field.onChange}
              className="
        w-full

        [&_input]:h-11
        [&_input]:w-full
        [&_input]:rounded-md
        [&_input]:border
        [&_input]:border-gray-300
        dark:[&_input]:border-gray-600
        [&_input]:bg-white
        dark:[&_input]:bg-gray-800
        [&_input]:px-3
        [&_.PhoneInputCountry]:pointer-events-none
        [&_.PhoneInputCountry]:opacity-70
      "
            />
          )}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("AccountCreation.password")} *
        </label>
        <div className="relative">
          <FaLock
            className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${
              isRTL ? "right-3" : "left-3"
            }`}
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder={t("AccountCreation.passwordPlaceholder")}
            {...register("password", {
              required: "Password is required",
              minLength: 6,
            })}
            className={`w-full rounded-md border border-gray-300
              bg-white dark:bg-gray-800
              py-3 text-sm text-gray-900 dark:text-white
              ${isRTL ? "pr-10 pl-12" : "pl-10 pr-12"}
            `}
          />

          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className={`absolute top-1/2 -translate-y-1/2 text-sm text-gray-500 ${
              isRTL ? "left-3" : "right-3"
            }`}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message || "Password is required"}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-4 w-full rounded-md bg-linear-to-r
        from-blue-500 to-purple-500 py-3 text-sm font-medium text-white cursor-pointer
        hover:opacity-90 transition"
      >
        {t("AccountCreation.submit")}
      </button>

      <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
        {t("AccountCreation.alreadyAccount")}{" "}
        <Link href="/login">
          <span className="text-blue-600 hover:underline">
            {t("AccountCreation.login")}
          </span>
        </Link>
      </p>
    </form>
  );
}

/* ---------------- Reusable Input ---------------- */

interface InputProps {
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  register: any;
  isRTL: boolean;
  error?: string;
}

function Input({
  label,
  icon,
  placeholder,
  type = "text",
  register,
  isRTL,
  error,
}: InputProps) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
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
          placeholder={placeholder}
          {...register}
          className={`w-full rounded-md border border-gray-300 bg-white py-3 text-sm
          text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white
          ${isRTL ? "pr-10 pl-3" : "pl-10 pr-3"}
        `}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
