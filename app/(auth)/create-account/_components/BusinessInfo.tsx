"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  Scissors,
  Dumbbell,
  HeartPulse,
  Leaf,
  Home,
  PlusCircle,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  House,
  Car,
  GraduationCap,
  Ticket,
} from "lucide-react";
import { useI18n } from "@/components/provider/I18nProvider";
import { FaPaw } from "react-icons/fa";

type Step1Data = {
  business_name: string;
  address: string;
  business_category: string;
  number_of_branches: "1" | "3" | "6";
  error?: string;
};

interface Step1Props {
  data: Step1Data;
  onNext: (values: Step1Data) => void;
  onPrevious: () => void;
}

const CATEGORIES = [
  {
    key: "Beauty & Personal Care",
    label: "Beauty & Personal Care",
    icon: Scissors,
  },
  {
    key: "Wellness & Lifestyle",
    label: "Wellness & Lifestyle",
    icon: Sparkles,
  },
  { key: "Fitness & Training", label: "Fitness & Training", icon: Dumbbell },
  { key: "Medical & Clinics", label: "Medical & Clinics", icon: Stethoscope },
  { key: "Home & Maintenance", label: "Home & Maintenance", icon: House },
  { key: "Automotive & Detailing", label: "Automotive & Detailing", icon: Car },
  {
    key: "Education & Skills",
    label: "Education & Skills",
    icon: GraduationCap,
  },
  {
    key: "Events & Experiences",
    label: "Events & Experiences",
    icon: Ticket,
  },
  {
    key: "Professional Services",
    label: "Professional Services",
    icon: ShieldCheck,
  },
  {
    key: "Pet Care & Grooming",
    label: "Pet Care & Grooming",
    icon: FaPaw,
  },
  { key: "others", label: "Other Service", icon: PlusCircle },
];

const BRANCH_OPTIONS = [
  { key: "1", label: "1 Branch" },
  { key: "3", label: "2–5 Branches" },
  { key: "6", label: "6+ Branches" },
] as const;

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

  const selectedCategory = watch("business_category");
  const selectedBranches = watch("number_of_branches");

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      {/* Business Name */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          {t("BusinessInfo.businessName")} *
        </label>
        <input
          {...register("business_name", {
            required: "Business Name is required",
          })}
          // placeholder={t("BusinessInfo.businessNamePlaceholder")}
          className="w-full rounded-md border border-gray-300 bg-white p-3 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
        {errors.business_name && (
          <p className="mt-1 text-xs text-red-500">
            {errors.business_name.message}
          </p>
        )}
      </div>

      {/* Business Address */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          {t("BusinessInfo.businessAddress")} *
        </label>
        <input
          {...register("address", { required: "Address is required" })}
          // placeholder={t("BusinessInfo.businessAddressPlaceholder")}
          className="w-full rounded-md border border-gray-300 bg-white p-3 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
        {errors.address && (
          <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>
        )}
      </div>

      {/* Business Category */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 cursor-pointer">
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
                  setValue("business_category", key, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                className={`flex flex-col items-center justify-center gap-2 rounded-lg border p-3 text-sm transition cursor-pointer
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

        <input
          type="hidden"
          {...register("business_category", { required: true })}
        />

        {errors.business_category && (
          <p className="mt-1 text-xs text-red-500">
            {t("BusinessInfo.selectCategory")}
          </p>
        )}
      </div>

      {/* Number of Branches */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          {t("BusinessInfo.numberOfBranches")} *
        </label>

        <div className="grid grid-cols-3 gap-3">
          {BRANCH_OPTIONS.map(({ key, label }) => {
            const active = selectedBranches === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() =>
                  setValue("number_of_branches", key, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                className={`flex items-center justify-center rounded-lg border p-4 text-sm font-medium transition
                  ${
                    active
                      ? "border-purple-600 bg-purple-50 text-purple-700 dark:bg-purple-900/30"
                      : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                  }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <input
          type="hidden"
          {...register("number_of_branches", { required: true })}
        />

        {errors.number_of_branches && (
          <p className="mt-1 text-xs text-red-500">
            {t("BusinessInfo.selectBranches")}
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
          className="rounded-md bg-linear-to-r from-purple-500 to-indigo-500 px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 cursor-pointer"
        >
          {t("BusinessInfo.submit")}
        </button>
      </div>
    </form>
  );
}
