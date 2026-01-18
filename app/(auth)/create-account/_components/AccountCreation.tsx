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

  // ---------------- i18n ----------------
  const { t } = useI18n();

  return (
    <form
      onSubmit={handleSubmit(onNext)}
      className="space-y-6 rounded-xl bg-white p-4 sm:p-6 dark:bg-gray-900 h-full"
    >
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

      <Input
        label={t("AccountCreation.phone")}
        icon={<FaPhoneAlt />}
        placeholder={t("AccountCreation.phonePlaceholder")}
        register={register("phone", { required: true })}
      />

      {/* Password */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          {t("AccountCreation.password")} *
        </label>

        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder={t("AccountCreation.passwordPlaceholder")}
            {...register("password", { required: true })}
            className="w-full pl-10 pr-10 py-3 border rounded-md
              bg-white dark:bg-gray-700
              border-gray-300 dark:border-gray-600
              text-gray-900 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-black py-3 font-medium text-white hover:opacity-90 dark:bg-blue-600 cursor-pointer"
      >
        {t("AccountCreation.submit")}
      </button>
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
