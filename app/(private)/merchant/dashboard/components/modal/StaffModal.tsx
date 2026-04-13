"use client";

import { useI18n } from "@/components/provider/I18nProvider";
import { getImageUrl } from "@/helper/formatImage";
import { useAllServicesQuery } from "@/redux/features/merchant/servicesApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiX, FiImage } from "react-icons/fi";

type Service = {
  id: number;
  service_name: string;
};

type Staff = {
  id?: number;
  name: string;
  role: "admin" | "staff";
  service_ids: string[];
  services?: Service[]; // Defined to satisfy TypeScript
  image?: any;
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
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  const [preview, setPreview] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
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
        const serviceIds =
          initialData?.services?.map((s: any) => String(s.id)) || [];
        reset({
          name: initialData.name,
          role: initialData.role,
          service_ids: serviceIds,
        });
      } else {
        reset({
          name: "",
          role: "staff",
          // service_id: undefined,
          service_ids: [],
        });
        setPreview(null);
      }
    }
  }, [open, mode, initialData, reset]);

  // // Early return if modal is closed OR if not mounted to prevent hydration errors
  if (!open || !mounted) return null;

  const onSubmit = (data: Staff) => {
    onSubmitStaff({ ...initialData, ...data });
    reset();
    setPreview(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50 dark:bg-gray-900 rounded-t-xl">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            {mode === "add" ? (
              <div>{locale == "ar" ? "إضافة موظف" : "Add Staff Member"}</div>
            ) : (
              <div>
                {locale == "ar" ? "تعديل بيانات الموظف" : "Edit Staff Member"}
              </div>
            )}
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
                {locale == "ar" ? "الاسم الكامل" : "Full Name"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name", { required: true })}
                placeholder=""
                className="mt-1 w-full border rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {locale == "ar" ? "الدور" : "Role"}{" "}
                <span className="text-red-500">*</span>
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
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {locale == "ar" ? "الخدمات المخصصة" : "Assigned Services "}{" "}
                <span className="text-red-500">*</span>
              </label>

              <div className="mt-2 grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-300 dark:border-gray-600 p-2 rounded-lg">
                {serviceOptions.map((service: any) => (
                  <label
                    key={service.id}
                    className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <input
                      type="checkbox"
                      value={service.id}
                      {...register("service_ids")}
                      className="rounded border-gray-300 text-blue-600"
                    />
                    {service.name}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {locale == "ar" ? "صورة الموظف" : "Staff Image"}
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
                      {locale == "ar" ? "تغيير الصورة" : "Change Image"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center py-8">
                  <FiImage size={26} className="text-gray-400" />
                  <span className="text-sm font-medium mt-2 text-gray-600 dark:text-gray-300">
                    {locale == "ar" ? "انقر للرفع" : "Click to upload"}
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
              disabled={isLoading}
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer"
            >
              {locale == "ar" ? "إلغاء" : "Cancel"}
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gray-900 dark:bg-blue-600 text-white cursor-pointer"
            >
              {isLoading ? (
                "Saving..."
              ) : mode === "add" ? (
                <div>{locale == "ar" ? "إضافة موظف" : "Add Staff"}</div>
              ) : (
                <div>
                  {locale == "ar" ? "تحديث بيانات الموظف" : "Update Staff"}
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
