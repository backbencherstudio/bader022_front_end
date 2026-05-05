"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/provider/I18nProvider";
import { useCreateBranchMutation } from "@/redux/features/merchant/settingApi";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { baseApi } from "@/redux/api/baseApi";

interface BranchFormData {
  name: string;
  phone: string;
  address: string;
}

export default function BranchSettings() {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [createBranch, { isLoading }] = useCreateBranchMutation();

  const form = useForm<BranchFormData>({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });

  const onSubmit = async (data: BranchFormData) => {
    try {
      const response = await createBranch({
        body: {
          name: data.name,
          phone: data.phone,
          address: data.address,
        },
      }).unwrap();

      //   console.log("response==", response);

      toast.success(
        locale == "ar" ? "تم إنشاء الفرع بنجاح" : "Branch Created successfully",
      );
      dispatch(baseApi.util.invalidateTags(["Branch", "Setting"]));
      router.refresh();
      form.reset();
    } catch (error: any) {
      // console.log(error);
      toast.error(
        error?.data?.message,
        // locale == "ar" ? "فشل في إنشاء الفرع" : "Failed to Create branch",
      );
    }
  };

  return (
    <div className="flex flex-col gap-8 p-6 w-full">
      {/* Branch Settings Section */}
      <Card className="rounded-xl p-8 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
        <h3 className="text-[18px] font-semibold">
          {locale == "ar" ? "إنشاء فرع" : "Branch Create"}
        </h3>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Branch Name */}
          <div>
            <label className="text-[14px] font-medium">
              {locale == "ar" ? "اسم الفرع" : "Branch Name"}
            </label>
            <Input
              type="text"
              placeholder={
                locale == "ar" ? "أدخل اسم الفرع" : "Enter branch name"
              }
              {...form.register("name", {
                required: locale == "ar" ? "الاسم مطلوب" : "Name is required",
              })}
              className="w-full py-5 mt-2"
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Branch Phone */}
          <div>
            <label className="text-[14px] font-medium">
              {locale == "ar" ? "رقم الهاتف" : "Phone Number"}
            </label>
            <Input
              type="text"
              placeholder={
                locale == "ar" ? "أدخل رقم الهاتف" : "Enter phone number"
              }
              {...form.register("phone", {
                required:
                  locale == "ar" ? "رقم الهاتف مطلوب" : "Phone is required",
              })}
              className="w-full py-5 mt-2"
            />
            {form.formState.errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          {/* Branch Address */}
          <div>
            <label className="text-[14px] font-medium">
              {locale == "ar" ? "العنوان" : "Address"}
            </label>
            <Input
              type="text"
              placeholder={
                locale == "ar" ? "أدخل عنوان الفرع" : "Enter branch address"
              }
              {...form.register("address", {
                required:
                  locale == "ar" ? "العنوان مطلوب" : "Address is required",
              })}
              className="w-full py-5 mt-2"
            />
            {form.formState.errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.address.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              className="cursor-pointer"
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? locale == "ar"
                  ? "جاري الحفظ..."
                  : "Saving..."
                : locale == "ar"
                  ? "حفظ التغييرات"
                  : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
