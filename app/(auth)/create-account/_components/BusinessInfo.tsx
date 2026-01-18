"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useI18n } from "@/components/provider/I18nProvider";

type Step1Data = {
  businessName: string;
  businessAddress: string;
  category: string;
};

interface Step1Props {
  data: Step1Data;
  onNext: (values: Step1Data) => void;
}

export default function BusinessInfo({ data, onNext }: Step1Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Data>({
    defaultValues: {
      businessName: data.businessName || "",
      businessAddress: data.businessAddress || "",
      category: data.category || "",
    },
  });

  const { t } = useI18n();

  return (
    <form
      onSubmit={handleSubmit(onNext)}
      className="space-y-6 rounded-xl bg-white p-4 sm:p-6 dark:bg-gray-900"
    >
      {/* Business Name */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          {t("BusinessInfo.businessName")} *
        </label>
        <input
          {...register("businessName", {
            required: t("BusinessInfo.businessNameRequired") || "Required",
          })}
          placeholder={t("BusinessInfo.businessNamePlaceholder")}
          className="w-full p-3 border rounded-md
                  bg-white dark:bg-gray-700
                  border-gray-300 dark:border-gray-600
                  text-gray-700 dark:text-gray-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.businessName && (
          <p className="text-xs text-red-500">{errors.businessName.message}</p>
        )}
      </div>

      {/* Business Category */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          {t("BusinessInfo.businessCategory")} *
        </label>
        <select
          {...register("category", { required: true })}
          className="w-full p-3 border rounded-md
                  bg-white dark:bg-gray-700
                  border-gray-300 dark:border-gray-600
                  text-gray-700 dark:text-gray-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{t("BusinessInfo.selectCategory")}</option>
          <option>{t("BusinessInfo.categories.beautySpa")}</option>
          <option>{t("BusinessInfo.categories.fitness")}</option>
          <option>{t("BusinessInfo.categories.consulting")}</option>
          <option>{t("BusinessInfo.categories.healthcare")}</option>
        </select>
      </div>

      {/* Business Address */}
      <div className="space-y-1">
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          {t("BusinessInfo.businessAddress")} *
        </label>
        <input
          {...register("businessAddress")}
          placeholder={t("BusinessInfo.businessAddressPlaceholder")}
          className="w-full p-3 border rounded-md
                  bg-white dark:bg-gray-700
                  border-gray-300 dark:border-gray-600
                  text-gray-700 dark:text-gray-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-black dark:bg-blue-600 text-white py-3 rounded-md font-medium hover:opacity-90 cursor-pointer"
      >
        {t("BusinessInfo.submit")}
      </button>
    </form>
  );
}
