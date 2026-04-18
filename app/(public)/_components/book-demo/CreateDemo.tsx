"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaBusinessTime,
} from "react-icons/fa";
import Image from "next/image";
// @ts-ignore
import "react-phone-number-input/style.css";
import { useBookDemoMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { authorize } from "@/lib/auth";
import { toast } from "sonner";
import { useI18n } from "@/components/provider/I18nProvider";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { SuccessModal } from "./SuccessModal";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
};

export default function CreateDemo() {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();
  const [createDemo, { isLoading }] = useBookDemoMutation();
  useEffect(() => {
    const auth = authorize(["User", "Merchant", "Admin"]);
    if (auth.authorized) {
      const role = auth.user?.role;
      const roleRedirectMap: Record<string, string> = {
        Admin: "/admin/dashboard",
        Merchant: "/merchant/dashboard",
        User: "/user/dashboard",
      };
      router.push(roleRedirectMap[role] || "/");
    }
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      await createDemo({
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        business_name: data.businessName,
      }).unwrap();

      // console.log("data===========", data);
      setSubmittedData(data);
      setIsModalOpen(true);
      toast.success(
        locale == "ar"
          ? "تم إنشاء حجز العرض التوضيحي بنجاح"
          : "Book Demo Created Successfully",
      );
      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || t("Auth.Signup.error"));
    }
  };

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen flex items-center justify-center px-4 flex-col gap-8 p-6 md:p-8 text-black"
    >
      <div className="w-full max-w-md">
        <Link href={"/"}>
          <div className="flex justify-center">
            <Image
              src="/images/image 259.png"
              alt="Company Logo"
              width={120}
              height={40}
              className=""
            />
          </div>
        </Link>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center py-4">
          {/* {t("Auth.Signup.title")} */}
          {locale == "ar" ? "احجز اجتماعًا معنا" : "Book a Meeting with Us"}
        </h2>
        <p className="text-center mb-4">
          {" "}
          {locale == "ar"
            ? "خطط لرحلة نجاحك مع بوكلي واكتشف كيف يمكنك زيادة مبيعاتك"
            : "Plan your successful journey with Bokli and discover how you can increase your sales"}
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 text-black p-8 bg-white border border-slate-100 shadow-sm rounded-xl transition-shadow hover:shadow-lg"
        >
          <Input
            label={t("Auth.Signup.fullName")}
            icon={<FaUser />}
            register={register("fullName", { required: true })}
            error={errors.fullName && "Full Name is Required"}
            isRTL={isRTL}
          />

          <Input
            label={t("Auth.Signup.email")}
            icon={<FaEnvelope />}
            type="email"
            register={register("email", { required: true })}
            error={errors.email && "Email is Required"}
            isRTL={isRTL}
          />

          <Input
            label={locale == "ar" ? "اسم نشاطك التجاري" : "Your Business Name"}
            icon={<FaBusinessTime />}
            register={register("businessName", { required: true })}
            error={errors.businessName && "Business Name is Required"}
            isRTL={isRTL}
          />

          {/* Phone */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              {t("AccountCreation.phone")} *
            </label>
            <Controller
              name="phone"
              control={control}
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <PhoneInputWithCountrySelect
                  international
                  defaultCountry="SA"
                  countryCallingCodeEditable={false}
                  value={field.value || ""}
                  onChange={field.onChange}
                  className="
        w-full

        [&_input]:h-11
        [&_input]:w-full
        [&_input]:rounded-md
        [&_input]:border
        [&_input]:border-gray-300
        dark:[&_input]:border-gray-300
        [&_input]:bg-white
        dark:[&_input]:bg-white
        [&_input]:px-3

        [&_.PhoneInputCountry]:pointer-events-none
        [&_.PhoneInputCountry]:opacity-70
      "
                />
              )}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-md font-medium cursor-pointer bg-white border border-slate-100 shadow-sm transition-shadow hover:shadow-lg"
          >
            {/* {isLoading ? t("Auth.Signup.loading") : t("Auth.Signup.signup")} */}
            {locale == "ar" ? "احجز عرضًا تجريبيًا" : "Book Demo"}
          </button>
          {/* Footer */}
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
            ⭐⭐⭐⭐⭐{" "}
            {locale == "ar"
              ? "4.9/5 من أكثر من 1000 عميل"
              : "4.9/5 from 1000+ clients"}
          </p>
        </form>
      </div>

      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userName={submittedData?.fullName || ""}
        email={submittedData?.email || ""}
        phone={submittedData?.phone || ""}
      />
    </div>
  );
}

/* Reusable Input */
function Input({ label, icon, register, type = "text", error, isRTL }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label} *</label>

      <div className="relative">
        <span
          className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${
            isRTL ? "right-3" : "left-3"
          }`}
        >
          {icon}
        </span>

        <input
          type={type}
          {...register}
          className={`w-full py-3 border rounded-md bg-white dark:bg-white ${
            isRTL ? "pr-10 text-right" : "pl-10"
          } ${error ? "border-red-500" : "border-gray-300"}`}
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
