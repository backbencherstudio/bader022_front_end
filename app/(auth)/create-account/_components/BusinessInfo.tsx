"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  Scissors,
  Dumbbell,
  HeartPulse,
  Leaf,
  Home,
  Car,
  PawPrint,
  GraduationCap,
  Wrench,
  MoreHorizontal,
} from "lucide-react";
import { useI18n } from "@/components/provider/I18nProvider";

type Step1Data = {
  businessName: string;
  businessAddress: string;
  category: string;
};

interface Step1Props {
  data: Step1Data;
  onNext: (values: Step1Data) => void;
  onPrevious: () => void;
}

const CATEGORIES = [
  { key: "beautySpa", label: "Beauty & Spa", icon: Scissors },
  { key: "fitness", label: "Fitness", icon: Dumbbell },
  { key: "healthcare", label: "Healthcare", icon: HeartPulse },
  { key: "wellness", label: "Wellness", icon: Leaf },
  { key: "homeServices", label: "Home Services", icon: Home },
  { key: "automotive", label: "Automotive", icon: Car },
  { key: "petServices", label: "Pet Services", icon: PawPrint },
  { key: "education", label: "Education & Training", icon: GraduationCap },
  { key: "maintenance", label: "Maintenance", icon: Wrench },
  { key: "other", label: "Other", icon: MoreHorizontal },
];

export default function BusinessInfo({ data, onNext, onPrevious }: Step1Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step1Data>({
    defaultValues: data,
  });

  const { t } = useI18n();
  const selectedCategory = watch("category");

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      {/* Business Name */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          {t("BusinessInfo.businessName")} *
        </label>
        <input
          {...register("businessName", { required: true })}
          placeholder={t("BusinessInfo.businessNamePlaceholder")}
          className="w-full rounded-md border border-gray-300 bg-white p-3
            text-sm
            dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Business Address */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          {t("BusinessInfo.businessAddress")} *
        </label>
        <input
          {...register("businessAddress", { required: true })}
          placeholder={t("BusinessInfo.businessAddressPlaceholder")}
          className="w-full rounded-md border border-gray-300 bg-white p-3
            text-sm 
            dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Business Category */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          {t("BusinessInfo.businessCategory")} *
        </label>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {CATEGORIES.map(({ key, label, icon: Icon }) => {
            const active = selectedCategory === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() =>
                  setValue("category", key, { shouldValidate: true })
                }
                className={`flex flex-col items-center justify-center gap-2 rounded-lg border p-3 text-sm transition
                  ${
                    active
                      ? "border-purple-600 bg-purple-50 text-purple-700 dark:bg-purple-900/30"
                      : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                  }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium text-center">{label}</span>
              </button>
            );
          })}
        </div>

        {errors.category && (
          <p className="mt-1 text-xs text-red-500">
            {t("BusinessInfo.selectCategory")}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onPrevious}
          className="rounded-md cursor-pointer border px-6 py-2 text-sm text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Back
        </button>

        <button
          type="submit"
          className="rounded-md bg-linear-to-r from-purple-500 to-indigo-500
            px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 cursor-pointer"
        >
          {t("BusinessInfo.submit")}
        </button>
      </div>
    </form>
  );
}
