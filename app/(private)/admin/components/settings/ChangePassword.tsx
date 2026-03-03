"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";

type PasswordFormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePasswordCard() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  const [changePassword, { isLoading }] = useChangePasswordMutation();
  console.log(changePassword,"kay")

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
        current_password: data.oldPassword,
        new_password: data.newPassword,
        new_password_confirmation: data.confirmPassword,
      }).unwrap();

      console.log("Success:", response);
      form.reset();

    } catch (error) {
      console.error("Failed:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white px-10 py-8  dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        {/*  Card */}
        <Card className="rounded-xl p-6 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
          <h3 className="text-[18px] font-semibold">Change Password</h3>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Old Password */}
            <div className="space-y-8">
              <label className="text-[14px] font-medium">Old Password</label>

              <div className="relative">
                <Input
                  type={showOld ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full py-5 mt-2"
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
              <label className="text-[14px] font-medium">Create Password</label>

              <div className="relative">
                <Input
                  type={showNew ? "text" : "password"}
                  className="w-full py-5 mt-2"
                  placeholder="Enter your password"
                  {...form.register("newPassword", { required: true })}
                />

                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-[14px] font-medium">
                Confirm Password
              </label>

              <div className="relative">
                <Input
                  type={showConfirm ? "text" : "password"}
                  className="w-full py-5 mt-2"
                  placeholder="Enter your password"
                  {...form.register("confirmPassword", { required: true })}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </form>
          {/* Button outside card, bottom right */}
          <div className="flex justify-end mt-8">
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              {isLoading ? "Changing..." : "Save Change"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
