"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useGetTapkeyQuery,
  useUpdateTapkeyMutation,
} from "@/redux/features/admin/adminApi";
import { toast } from "sonner";
import { useI18n } from "@/components/provider/I18nProvider";

type TapkeyFormData = {
  tap_mode: string;
  tap_public_key: string;
  tap_secret_key: string;
};

export default function Tapkey() {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";

  const { data, isLoading, isError } = useGetTapkeyQuery({});
  const [updateTapkey, { isLoading: isUpdating }] = useUpdateTapkeyMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TapkeyFormData>();

  // Populate form
  useEffect(() => {
    if (data?.data) {
      reset({
        tap_mode: data.data.tap_mode || "",
        tap_public_key: data.data.tap_public_key || "",
        tap_secret_key: data.data.tap_secret_key || "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: TapkeyFormData) => {
    try {
      const result = await updateTapkey({ body: formData }).unwrap();

      reset(result.data);

      toast.success(t("TapKey.success"));
    } catch (err) {
      toast.error(t("TapKey.error"));
    }
  };

  if (isLoading) return <div>{t("TapKey.loading")}</div>;
  if (isError)
    return <div className="text-red-500">{t("TapKey.loadError")}</div>;

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="max-w-3xl mx-auto my-10 p-6 border rounded-lg shadow-sm"
    >
      <h2 className="text-xl font-semibold mb-4">{t("TapKey.title")}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Mode */}
        <div>
          <label className="block mb-1 font-medium">{t("TapKey.mode")}</label>

          <select
            {...register("tap_mode", {
              required: t("TapKey.validation.mode"),
            })}
            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">{t("TapKey.selectMode")}</option>
            <option value="local">{t("TapKey.test")}</option>
            <option value="live">{t("TapKey.live")}</option>
          </select>

          {errors.tap_mode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.tap_mode.message}
            </p>
          )}
        </div>

        {/* Public Key */}
        <div>
          <label className="block mb-1 font-medium">
            {t("TapKey.publicKey")}
          </label>

          <Input
            {...register("tap_public_key", {
              required: t("TapKey.validation.publicKey"),
            })}
          />

          {errors.tap_public_key && (
            <p className="text-red-500 text-sm mt-1">
              {errors.tap_public_key.message}
            </p>
          )}
        </div>

        {/* Secret Key */}
        <div>
          <label className="block mb-1 font-medium">
            {t("TapKey.secretKey")}
          </label>

          <Input
            {...register("tap_secret_key", {
              required: t("TapKey.validation.secretKey"),
            })}
          />

          {errors.tap_secret_key && (
            <p className="text-red-500 text-sm mt-1">
              {errors.tap_secret_key.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="pt-4">
          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? t("TapKey.updating") : t("TapKey.update")}
          </Button>
        </div>
      </form>
    </div>
  );
}
