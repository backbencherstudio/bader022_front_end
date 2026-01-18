"use client";

import React from "react";
import { useForm } from "react-hook-form";

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

  return (
    <form
      onSubmit={handleSubmit(onNext)}
      className="space-y-6 rounded-xl bg-white p-4 sm:p-6 dark:bg-gray-900"
    >
      {/* Business Name */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Business Name *
        </label>
        <input
          {...register("businessName", {
            required: "Business name is required",
          })}
          placeholder="Your Business Name"
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
          Business Category *
        </label>
        <select
          {...register("category", { required: true })}
          className="w-full p-3 border rounded-md
                  bg-white dark:bg-gray-700
                  border-gray-300 dark:border-gray-600
                  text-gray-700 dark:text-gray-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select category</option>
          <option>Beauty & Spa</option>
          <option>Fitness</option>
          <option>Consulting</option>
          <option>Healthcare</option>
        </select>
      </div>

      {/* Business Address */}
      <div className="space-y-1">
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Business Address *
        </label>
        <input
          {...register("businessAddress")}
          placeholder="123 Main St, City, State, ZIP"
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
        Continue to Package Selection
      </button>
    </form>
  );
}
