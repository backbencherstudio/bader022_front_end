"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authorize } from "@/lib/auth";
import { useI18n } from "@/components/provider/I18nProvider";

export default function BookingFailedPage() {
  const { locale, t } = useI18n();
  const router = useRouter();

  useEffect(() => {
    const auth = authorize(["User"]);
    if (!auth.authorized) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    // Show error toast
    toast.error("Payment Failed");
    // Redirect after 2 seconds
    const timer = setTimeout(() => {
      router.push("/user/bookings");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 text-center max-w-md w-full">
        {/* Icon */}
        <div className="text-red-500 text-5xl mb-4">❌</div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          {locale == "ar" ? "فشل الدفع" : "Payment Failed"}
        </h1>

        {/* Description */}
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          {locale == "ar"
            ? "حدث خطأ أثناء دفع الحجز الخاص بك. يرجى المحاولة مرة أخرى."
            : "Something went wrong with your booking payment. Please try again."}
        </p>

        {/* Button */}
        <button
          onClick={() => router.push("/user/bookings")}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-md transition"
        >
          {locale == "ar" ? "الذهاب إلى الحجوزات" : "Go to Bookings"}
        </button>
      </div>
    </div>
  );
}
