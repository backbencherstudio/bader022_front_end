"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiX, FiImage } from "react-icons/fi";

type Staff = {
  id?: number;
  name: string;
  role: "Admin" | "Staff";
  services: string[];
  avatar?: string;
};

type Props = {
  open: boolean;
  mode: "add" | "edit";
  initialData?: Staff | null;
  onClose: () => void;
  onSubmitStaff: (data: Staff) => void;
};

const AVAILABLE_SERVICES = [
  "Haircut & Styling",
  "Hair Coloring",
  "Wellness",
  "Scalp Treatment",
  "Hair Extensions",
];

export default function StaffModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmitStaff,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Staff>();

  const [serviceInput, setServiceInput] = useState("");
  const services = watch("services") || [];

  /* ---------------- Prefill on Edit ---------------- */
  useEffect(() => {
    if (mode === "edit" && initialData) {
      reset({
        name: initialData.name,
        role: initialData.role,
        services: initialData.services,
      });
    }

    if (mode === "add") {
      reset({ role: "Staff", services: [] });
    }
  }, [mode, initialData, reset]);

  if (!open) return null;

  /* ---------------- Handlers ---------------- */
  const addService = (service: string) => {
    if (!services.includes(service)) {
      setValue("services", [...services, service]);
    }
    setServiceInput("");
  };

  const removeService = (service: string) => {
    setValue(
      "services",
      services.filter((s) => s !== service)
    );
  };

  const onSubmit = (data: Staff) => {
    onSubmitStaff({ ...initialData, ...data });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
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
                <option value="Staff">Staff</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Assigned Services */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Assigned Services <span className="text-red-500">*</span>
            </label>

            <div className="mt-2 flex gap-2">
              <select
                value={serviceInput}
                onChange={(e) => addService(e.target.value)}
                className="flex-1 border rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              >
                <option value="">Select service</option>
                {AVAILABLE_SERVICES.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Services */}
            <div className="flex flex-wrap gap-2 mt-3">
              {services.map((service) => (
                <span
                  key={service}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg"
                >
                  {service}
                  <button type="button" onClick={() => removeService(service)}>
                    <FiX size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Image
            </label>
            <label className="mt-2 flex flex-col items-center justify-center border-2 border-dashed rounded-lg py-8 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
              <FiImage size={28} className="text-gray-400 dark:text-gray-300" />
              <span className="text-sm font-medium mt-2 text-gray-700 dark:text-gray-200">
                Click to upload
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-300">
                JPG or PNG (max 3MB)
              </span>
              <input type="file" className="hidden" />
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gray-900 dark:bg-blue-600 text-white cursor-pointer"
            >
              {mode === "add" ? "Add Staff" : "Update Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
