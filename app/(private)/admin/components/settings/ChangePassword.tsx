"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import { useI18n } from "@/components/provider/I18nProvider";

type PasswordFormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePasswordCard() {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const form = useForm<PasswordFormData>();

  const onSubmit = async (data: PasswordFormData) => {
    try {
      await changePassword({
        id: user?.id,
        body: {
          current_password: data.oldPassword,
          new_password: data.newPassword,
          new_password_confirmation: data.confirmPassword,
        },
      }).unwrap();

      toast.success(t("ChangePassword.success"));
      form.reset();
    } catch (error: any) {
      toast.error(t("ChangePassword.error"));
    }
  };

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="w-full min-h-screen bg-white px-10 py-8 dark:bg-gray-900"
    >
      <div className="max-w-3xl mx-auto">
        <Card className="rounded-xl p-6 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
          <h3 className="text-[18px] font-semibold mb-4">
            {t("ChangePassword.title")}
          </h3>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Old Password */}
            <div>
              <label className="text-[14px] font-medium">
                {t("ChangePassword.oldPassword")}
              </label>

              <div className="relative">
                <Input
                  type={showOld ? "text" : "password"}
                  placeholder={t("ChangePassword.oldPlaceholder")}
                  {...form.register("oldPassword", {
                    required: t("ChangePassword.validation.oldRequired"),
                  })}
                  className="w-full py-5 mt-2"
                />

                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${
                    isRTL ? "left-4" : "right-4"
                  }`}
                >
                  {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {form.formState.errors.oldPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.oldPassword.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className="text-[14px] font-medium">
                {t("ChangePassword.newPassword")}
              </label>

              <div className="relative">
                <Input
                  type={showNew ? "text" : "password"}
                  placeholder={t("ChangePassword.newPlaceholder")}
                  {...form.register("newPassword", {
                    required: t("ChangePassword.validation.newRequired"),
                    minLength: {
                      value: 6,
                      message: t("ChangePassword.validation.min"),
                    },
                  })}
                  className="w-full py-5 mt-2"
                />

                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${
                    isRTL ? "left-4" : "right-4"
                  }`}
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {form.formState.errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-[14px] font-medium">
                {t("ChangePassword.confirmPassword")}
              </label>

              <div className="relative">
                <Input
                  type={showConfirm ? "text" : "password"}
                  placeholder={t("ChangePassword.confirmPlaceholder")}
                  {...form.register("confirmPassword", {
                    required: t("ChangePassword.validation.confirmRequired"),
                    validate: (value) =>
                      value === form.getValues("newPassword") ||
                      t("ChangePassword.validation.match"),
                  })}
                  className="w-full py-5 mt-2"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${
                    isRTL ? "left-4" : "right-4"
                  }`}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {form.formState.errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.confirmPassword.message}
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
                  ? t("ChangePassword.changing")
                  : t("ChangePassword.save")}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
