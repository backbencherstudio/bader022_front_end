"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiX, FiImage } from "react-icons/fi";

type Service = {
  id?: number;
  title: string;
  duration: string;
  price: number;
  description?: string;
  image?: string;
};

type Props = {
  open: boolean;
  mode: "add" | "edit";
  initialData?: Service | null;
  onClose: () => void;
  onSubmitService: (data: Service) => void;
};

export default function ServiceModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmitService,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Service>();

  // Populate form on Edit
  useEffect(() => {
    if (mode === "edit" && initialData) {
      reset({
        title: initialData.title,
        duration: initialData.duration.replace(" min", ""),
        price: initialData.price,
        description: initialData.description,
      });
    }

    if (mode === "add") {
      reset({});
    }
  }, [mode, initialData, reset]);

  if (!open) return null;

  const onSubmit = (data: Service) => {
    onSubmitService({ ...initialData, ...data });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="w-full max-w-lg rounded-xl shadow-lg bg-white dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-t-xl">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            {mode === "add" ? "Add New Service" : "Edit Service"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Service Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("title", { required: true })}
              className="
                mt-1 w-full rounded-lg px-4 py-2
                bg-white dark:bg-gray-800
                border border-gray-300 dark:border-gray-700
                text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2
                focus:ring-gray-300 dark:focus:ring-gray-700
              "
            />
          </div>

          {/* Duration */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Duration (minutes) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("duration", { required: true })}
              className="
                mt-1 w-full rounded-lg px-4 py-2
                bg-white dark:bg-gray-800
                border border-gray-300 dark:border-gray-700
                text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2
                focus:ring-gray-300 dark:focus:ring-gray-700
              "
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              className="
                mt-1 w-full rounded-lg px-4 py-2
                bg-white dark:bg-gray-800
                border border-gray-300 dark:border-gray-700
                text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2
                focus:ring-gray-300 dark:focus:ring-gray-700
              "
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              {...register("description")}
              className="
                mt-1 w-full h-24 resize-none rounded-lg px-4 py-2
                bg-white dark:bg-gray-800
                border border-gray-300 dark:border-gray-700
                text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2
                focus:ring-gray-300 dark:focus:ring-gray-700
              "
            />
          </div>

          {/* Image */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Service Image{" "}
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
              className="
                px-4 py-2 rounded-lg
                bg-gray-100 dark:bg-gray-700
                text-gray-800 dark:text-gray-200
                hover:bg-gray-200 dark:hover:bg-gray-600
              "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="
                px-4 py-2 rounded-lg
                bg-gray-900 dark:bg-white
                text-white dark:text-gray-900
                hover:opacity-90
              "
            >
              {mode === "add" ? "Add Service" : "Update Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
