"use client";

import { useAllServicesQuery } from "@/redux/features/merchant/servicesApi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiX, FiImage } from "react-icons/fi";

type Staff = {
  id?: number;
  name: string;
  role: "admin" | "staff";
  service_id: number;
  image?: string;
};

type Props = {
  open: boolean;
  mode: "add" | "edit";
  initialData?: Staff | null;
  onClose: () => void;
  onSubmitStaff: (data: Staff) => void;
  isLoading: boolean;
};

export default function StaffModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmitStaff,
  isLoading,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Staff>();

  const { data: servicesData, isLoading: isServicesLoading } =
    useAllServicesQuery({});

  // Map API services to options
  const serviceOptions =
    servicesData?.data?.map((s: any) => ({
      id: s.id,
      name: s.service_name,
    })) || [];

  /* ---------------- Prefill on Edit ---------------- */
  useEffect(() => {
    if (mode === "edit" && initialData) {
      reset({
        name: initialData.name,
        role: initialData.role,
        service_id: initialData.service_id,
      });
    }

    if (mode === "add") {
      reset({
        name: "",
        role: "staff",
        service_id: undefined,
      });
    }
  }, [mode, initialData, reset]);

  if (!open) return null;
  const onSubmit = (data: Staff) => {
    onSubmitStaff({ ...initialData, ...data });
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50 dark:bg-gray-900 rounded-t-xl">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            {mode === "add" ? "Add Staff Member" : "Edit Staff Member"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-700 dark:text-gray-300"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Name + Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name", { required: true })}
                placeholder="Sarah Jones"
                className="mt-1 w-full border rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                {...register("role", { required: true })}
                className="mt-1 w-full border rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              >
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Assigned Services */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Assigned Service <span className="text-red-500">*</span>
            </label>

            <select
              {...register("service_id", { required: true })}
              className="mt-2 w-full border rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              disabled={isServicesLoading}
            >
              <option value="">Select service</option>
              {serviceOptions.map((service: any) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Staff Image{" "}
              {mode === "add" && <span className="text-red-500">*</span>}
            </label>

            <label
              className="
                mt-2 flex flex-col items-center justify-center
                border-2 border-dashed rounded-lg py-8 cursor-pointer
                border-gray-300 dark:border-gray-700
                bg-gray-50 dark:bg-gray-800
                hover:bg-gray-100 dark:hover:bg-gray-700
              "
            >
              <FiImage size={26} className="text-gray-400" />
              <span className="text-sm font-medium mt-2 text-gray-600 dark:text-gray-300">
                Click to upload
              </span>
              <input type="file" {...register("image")} className="hidden" />
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gray-900 dark:bg-blue-600 text-white cursor-pointer"
            >
              {isLoading
                ? "Saving..."
                : mode === "add"
                  ? "Add Staff"
                  : "Update Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
