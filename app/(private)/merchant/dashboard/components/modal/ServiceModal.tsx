"use client";

import { getImageUrl } from "@/helper/formatImage";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiX, FiImage } from "react-icons/fi";

type Service = {
  id?: number;
  service_name: string;
  duration: string;
  price: number;
  description?: string;
  // image?: string;
  image?: any;
};

type Props = {
  open: boolean;
  mode: "add" | "edit";
  initialData?: Service | null;
  onClose: () => void;
  onSubmitService: (data: Service) => void;
  isLoading: boolean;
};

export default function ServiceModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmitService,
  isLoading,
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Service>();

  // Watch the image field
  const imageFile = watch("image");

  // Handle Hydration: Only render after mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle Image Preview logic
  useEffect(() => {
    if (imageFile && imageFile instanceof FileList && imageFile.length > 0) {
      const file = imageFile[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (mode === "edit" && initialData?.image) {
      setPreview(getImageUrl(initialData.image));
    } else {
      setPreview(null);
    }
  }, [imageFile, initialData, mode]);

  // Reset form and preview
  useEffect(() => {
    if (open) {
      if (mode === "edit" && initialData) {
        reset({
          service_name: initialData.service_name,
          duration: initialData.duration,
          price: initialData.price,
          description: initialData.description,
        });
      } else {
        reset({
          service_name: "",
          duration: "",
          price: 0,
          description: "",
        });
        setPreview(null);
      }
    }
  }, [open, mode, initialData, reset]);

  // Early return if modal is closed OR if not mounted to prevent hydration errors
  if (!open || !mounted) return null;

  const onSubmit = (data: Service) => {
    onSubmitService({ ...initialData, ...data });
    reset();
    setPreview(null);
    onClose();
  };

  // // Handle Image Preview logic
  // useEffect(() => {
  //   if (imageFile && imageFile.length > 0) {
  //     const file = imageFile[0];
  //     const objectUrl = URL.createObjectURL(file);
  //     setPreview(objectUrl);

  //     // Free memory when component unmounts or file changes
  //     return () => URL.revokeObjectURL(objectUrl);
  //   } else if (mode === "edit" && initialData?.image) {
  //     // Show existing image if editing and no new file selected
  //     setPreview(initialData.image);
  //   } else {
  //     setPreview(null);
  //   }
  // }, [imageFile, initialData, mode]);

  // // Reset form and preview
  // useEffect(() => {
  //   if (mode === "edit" && initialData) {
  //     reset({
  //       service_name: initialData.service_name,
  //       duration: initialData.duration,
  //       price: initialData.price,
  //       description: initialData.description,
  //       image: initialData.image,
  //     });
  //   }
  //   if (mode === "add") {
  //     reset({});
  //     setPreview(null);
  //   }
  // }, [mode, initialData, reset]);

  // if (!open) return null;

  // const onSubmit = (data: Service) => {
  //   // console.log(data);
  //   onSubmitService({ ...initialData, ...data });
  //   reset();
  //   setPreview(null);
  //   onClose();
  // };

  // Populate form on Edit
  // useEffect(() => {
  //   if (mode === "edit" && initialData) {
  //     reset({
  //       service_name: initialData.service_name,
  //       duration: initialData.duration,
  //       price: initialData.price,
  //       description: initialData.description,
  //     });
  //   }

  //   if (mode === "add") {
  //     reset({});
  //   }
  // }, [mode, initialData, reset]);

  // if (!open) return null;

  // const onSubmit = (data: Service) => {
  //   onSubmitService({ ...initialData, ...data });
  //   reset({
  //     service_name: "",
  //     duration: "",
  //     price: 0,
  //     description: "",
  //   });
  //   onClose();
  // };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 overflow-y-auto">
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
              {...register("service_name", { required: true })}
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
                  relative mt-2 flex flex-col items-center justify-center
                  border-2 border-dashed rounded-lg cursor-pointer
                  border-gray-300 dark:border-gray-700
                  bg-gray-50 dark:bg-gray-800
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  min-h-40 overflow-hidden"
            >
              {preview ? (
                <div className="relative w-full h-40">
                  <Image
                    src={preview || getImageUrl(initialData?.image)}
                    alt="Service preview"
                    fill
                    className="object-contain p-2"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-semibold bg-black/50 px-2 py-1 rounded">
                      Change Image
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center py-8">
                  <FiImage size={26} className="text-gray-400" />
                  <span className="text-sm font-medium mt-2 text-gray-600 dark:text-gray-300">
                    Click to upload
                  </span>
                </div>
              )}

              {/* Hidden Input */}
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="hidden"
              />
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
                hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer
              "
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="
                px-4 py-2 rounded-lg
                bg-gray-900 dark:bg-white
                text-white dark:text-gray-900
                hover:opacity-90 cursor-pointer
              "
            >
              {isLoading
                ? "Saving..."
                : mode === "add"
                  ? "Add Service"
                  : "Update Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
