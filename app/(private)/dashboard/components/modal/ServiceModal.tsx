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

  //  Populate form on Edit
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
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50 rounded-t-xl">
          <h3 className="font-semibold text-lg">
            {mode === "add" ? "Add New Service" : "Edit Service"}
          </h3>
          <button onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm font-medium">
              Service Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("title", { required: true })}
              className="mt-1 w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="text-sm font-medium">
              Duration (minutes) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("duration", { required: true })}
              className="mt-1 w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-medium">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              className="mt-1 w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              {...register("description")}
              className="mt-1 w-full border rounded-lg px-4 py-2 h-24 resize-none"
            />
          </div>

          {/* Image */}
          <div>
            <label className="text-sm font-medium">
              Service Image{" "}
              {mode === "add" && <span className="text-red-500">*</span>}
            </label>
            <label className="mt-2 flex flex-col items-center justify-center border-2 border-dashed rounded-lg py-8 cursor-pointer">
              <FiImage size={26} className="text-gray-400" />
              <span className="text-sm font-medium mt-2">Click to upload</span>
              <input type="file" {...register("image")} className="hidden" />
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gray-900 text-white"
            >
              {mode === "add" ? "Add Service" : "Update Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
