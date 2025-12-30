"use client";

import { useForm } from "react-hook-form";
import { FiX, FiImage } from "react-icons/fi";

type AddServiceModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmitService: (data: FormData) => void;
};

export default function AddServiceModal({
  open,
  onClose,
  onSubmitService,
}: AddServiceModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (!open) return null;

  const onSubmit = (data: any) => {
    onSubmitService(data);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50 rounded-t-xl">
          <h3 className="font-semibold text-lg">Add New Service</h3>
          <button onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Service Name */}
          <div>
            <label className="text-sm font-medium">
              Service Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("title", { required: true })}
              placeholder="Hair Treatment"
              className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-200"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                Service name is required
              </p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label className="text-sm font-medium">
              Duration (minutes) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("duration", { required: true })}
              placeholder="30"
              className="mt-1 w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-medium">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              {...register("price", { required: true })}
              placeholder="109 SAR"
              className="mt-1 w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              {...register("description")}
              placeholder="Enter type description here..."
              className="mt-1 w-full border rounded-lg px-4 py-2 resize-none h-24"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium">
              Service Image <span className="text-red-500">*</span>
            </label>

            <label className="mt-2 flex flex-col items-center justify-center border-2 border-dashed rounded-lg py-8 cursor-pointer hover:bg-gray-50">
              <FiImage size={28} className="text-gray-400" />
              <span className="text-sm font-medium mt-2">Click to upload</span>
              <span className="text-xs text-gray-400">
                JPG or PNG (max 3MB)
              </span>
              <input
                type="file"
                {...register("image", { required: true })}
                className="hidden"
                accept="image/png, image/jpeg"
              />
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-sm bg-gray-900 text-white"
            >
              Add Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
