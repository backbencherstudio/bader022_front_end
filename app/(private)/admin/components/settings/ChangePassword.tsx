"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hooks";

type PasswordFormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePasswordCard() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const form = useForm<PasswordFormData>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: PasswordFormData) => {
    try {
      const response = await changePassword({
        id: user?.id, // will be used in URL
        body: {
          current_password: data.oldPassword,
          new_password: data.newPassword,
          new_password_confirmation: data.confirmPassword,
        },
      }).unwrap();

      console.log("Password changed successfully:", response);
      form.reset();
    } catch (error) {
      console.error("Password change failed:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white px-10 py-8 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        <Card className="rounded-xl p-6 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
          <h3 className="text-[18px] font-semibold mb-4">Change Password</h3>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Old Password */}
            <div className="space-y-2">
              <label className="text-[14px] font-medium">Old Password</label>
              <div className="relative">
                <Input
                  className="w-full py-5 mt-2"
                  type={showOld ? "text" : "password"}
                  placeholder="Enter your current password"
                  {...form.register("oldPassword", { required: true })}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                  onClick={() => setShowOld(!showOld)}
                >
                  {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="text-[14px] font-medium">New Password</label>
              <div className="relative">
                <Input className="w-full py-5 mt-2"
                  type={showNew ? "text" : "password"}
                  placeholder="Enter your new password"
                  {...form.register("newPassword", { required: true })}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                  onClick={() => setShowNew(!showNew)}
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-[14px] font-medium">Confirm Password</label>
              <div className="relative">
                <Input
                  className="w-full py-5 mt-2"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm your new password"
                  {...form.register("confirmPassword", { required: true })}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Changing..." : "Save Change"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}