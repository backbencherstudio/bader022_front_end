"use client";

import React from "react";
import { useForm } from "react-hook-form";

type WorkingHour = {
  day: string;
  enabled: boolean;
  from: string;
  to: string;
};

type Step1Data = {
  businessName: string;
  businessAddress: string;
  businessLogo: FileList | null;
  workingHours: WorkingHour[];
};

interface Step1Props {
  data: Step1Data;
  onNext: (values: Step1Data) => void;
}

export default function AccountCreated({ data, onNext }: Step1Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Data>({
    defaultValues: {
      businessName: data.businessName || "",
      businessAddress: data.businessAddress || "",
      businessLogo: null,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onNext)}
      className="space-y-6 rounded-xl bg-white p-4 sm:p-6 dark:bg-gray-900"
    >
      {/* Business Name */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Business Name
        </label>
        <input
          {...register("businessName", {
            required: "Business name is required",
          })}
          placeholder="Your Business Name"
          className="w-full rounded-md border bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-black dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-white"
        />
        {errors.businessName && (
          <p className="text-xs text-red-500">{errors.businessName.message}</p>
        )}
      </div>

      {/* Business Address */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Business Address
        </label>
        <input
          {...register("businessAddress")}
          placeholder="123 Main St, City, State, ZIP"
          className="w-full rounded-md border bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-black dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-white"
        />
      </div>

      {/* Logo Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Logo Upload
        </label>

        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-6 text-center dark:border-gray-700">
          <input
            type="file"
            accept="image/png, image/jpeg"
            {...register("businessLogo")}
            className="hidden"
            id="logoUpload"
          />
          <label
            htmlFor="logoUpload"
            className="cursor-pointer text-sm text-gray-600 dark:text-gray-400"
          >
            Upload Your Logo
            <div className="text-xs text-gray-400">JPG or PNG (max 5MB)</div>
          </label>
        </div>
      </div>
      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-black dark:bg-blue-600 text-white py-3 rounded-md font-medium hover:opacity-90 cursor-pointer"
      >
        Continue to Services
      </button>
    </form>
  );
}
