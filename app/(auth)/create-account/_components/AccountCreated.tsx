"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";

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

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function AccountCreated({ data, onNext }: Step1Props) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step1Data>({
    defaultValues: {
      businessName: data.businessName || "",
      businessAddress: data.businessAddress || "",
      businessLogo: null,
      workingHours: DAYS.map((day) => ({
        day,
        enabled: day !== "Saturday" && day !== "Sunday",
        from: "08:00 AM",
        to: "08:00 PM",
      })),
    },
  });

  const onSubmit = (values: Step1Data) => {
    onNext(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Business Name */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Business Name</label>
        <input
          {...register("businessName", {
            required: "Business name is required",
          })}
          placeholder="Your Business Name"
          className="w-full rounded-md border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
        />
        {errors.businessName && (
          <p className="text-xs text-red-500">{errors.businessName.message}</p>
        )}
      </div>

      {/* Business Address */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Business Address</label>
        <input
          {...register("businessAddress")}
          placeholder="123 Main St, City, State, ZIP"
          className="w-full rounded-md border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Logo Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Logo Upload</label>

        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center">
          <input
            type="file"
            accept="image/png, image/jpeg"
            {...register("businessLogo")}
            className="hidden"
            id="logoUpload"
          />
          <label
            htmlFor="logoUpload"
            className="cursor-pointer text-sm text-gray-600"
          >
            Upload Your Logo
            <div className="text-xs text-gray-400">JPG or PNG (max 5MB)</div>
          </label>
        </div>
      </div>

      {/* Working Hours */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Working Hours</h3>

        {watch("workingHours")?.map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_1fr_auto_1fr] items-center gap-3"
          >
            {/* Day checkbox */}
            <Controller
              control={control}
              name={`workingHours.${index}.enabled`}
              render={({ field }) => (
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                  {DAYS[index]}
                </label>
              )}
            />

            {/* From */}
            <input
              {...register(`workingHours.${index}.from`)}
              className="rounded-md border px-3 py-2 text-sm"
            />

            <span className="text-xs text-gray-500">to</span>

            {/* To */}
            <input
              {...register(`workingHours.${index}.to`)}
              className="rounded-md border px-3 py-2 text-sm"
            />
          </div>
        ))}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-lg bg-black py-3 text-sm font-medium text-white cursor-pointer"
      >
        Continue to Services
      </button>
    </form>
  );
}
