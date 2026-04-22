"use client";

import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useI18n } from "@/components/provider/I18nProvider";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import Modal from "./Modal";

export default function UserLoginModal({
  isOpen,
  onClose,
  onOtpRequired,
}: any) {
  const { t, locale } = useI18n();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: any) => {
    try {
      const response = await login(data).unwrap();
      if (response.otp_required) {
        onOtpRequired(response.email); // Signals parent to switch to Verify modal
      } else {
        dispatch(setCredentials({ ...response }));
        toast.success(t("Auth.Login.success"));
        onClose(); // Close login modal on direct success
      }
    } catch (error: any) {
      toast.error(error?.message || t("Auth.Login.invalid"));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <h2 className="text-xl font-semibold text-center mb-6">
          {t("Auth.Login.title")}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* ... Inputs (Keep your existing JSX for fields here) ... */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md"
          >
            {isLoading ? "..." : t("Auth.Login.login")}
          </button>
        </form>
      </div>
    </Modal>
  );
}
