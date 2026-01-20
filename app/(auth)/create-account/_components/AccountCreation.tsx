"use client";

import React, { useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import { useI18n } from "@/components/provider/I18nProvider";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
};

interface AccountCreationProps {
  onNext: (values: FormValues) => void;
}

export default function AccountCreation({ onNext }: AccountCreationProps) {
  const { register, handleSubmit } = useForm<FormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const { locale, t } = useI18n();

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4 ">
      <Input
        label={t("AccountCreation.fullName")}
        icon={<FaUser />}
        placeholder={t("AccountCreation.fullNamePlaceholder")}
        register={register("fullName", { required: true })}
      />

      <Input
        label={t("AccountCreation.email")}
        icon={<FaEnvelope />}
        type="email"
        placeholder={t("AccountCreation.emailPlaceholder")}
        register={register("email", { required: true })}
      />

      {/* Phone */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("AccountCreation.phone")} *
        </label>

        <div className="relative flex items-center">
          <span className="absolute left-3 text-gray-400">
            <FaPhoneAlt />
          </span>

          <input
            placeholder={t("AccountCreation.phonePlaceholder")}
            {...register("phone", { required: true })}
            className="w-full rounded-md border border-gray-300 bg-white py-3 pl-10 pr-3 text-sm
              text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500
              dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("AccountCreation.password")} *
        </label>

        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder={t("AccountCreation.passwordPlaceholder")}
            {...register("password", { required: true })}
            className="w-full rounded-md border border-gray-300 bg-white py-3 pl-10 pr-12 text-sm
              text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500
              dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />

          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
          >
            <div className="flex items-center gap-2">
              {showPassword ? <FaEye /> : <FaEyeSlash />}
              {locale !== "ar" && (showPassword ? "Hide" : "Show")}
            </div>
          </button>
        </div>
      </div>

      {/* Continue Button */}
      <button
        type="submit"
        className="mt-4 w-full rounded-md bg-linear-to-r
          from-blue-500 to-purple-500 py-3 text-sm font-medium text-white
          hover:opacity-90 transition cursor-pointer"
      >
        {t("AccountCreation.submit")}
      </button>

      {/* Helper text */}
      <p className="text-center text-xs text-gray-400">
        Takes less than 2 minutes
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
  register: ReturnType<UseFormRegister<FormValues>>;
}

function Input({
  label,
  icon,
  placeholder,
  type = "text",
  register,
}: InputProps) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
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
          className="w-full rounded-md border border-gray-300 bg-white py-3 pl-10 pr-3 text-sm
            text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500
            dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>
    </div>
  );
}
