"use client";

import { useI18n } from "@/components/provider/I18nProvider";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { FaCheckCircle } from "react-icons/fa";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  email: string;
  phone: string;
}

export function SuccessModal({
  isOpen,
  onClose,
  userName,
  email,
  phone,
}: SuccessModalProps) {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-8 text-center bg-white dark:bg-gray-900 border-none shadow-2xl rounded-3xl">
        <div className="flex flex-col items-center gap-4">
          {/* Green Check Icon */}
          <div className="text-green-500 text-6xl">
            <FaCheckCircle />
          </div>

          <DialogHeader>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
              {locale == "ar"
                ? "تم استلام طلبك بنجاح"
                : "Your request has been successfully received"}
            </h2>
            <p className="text-2xl font-semibold text-rose-500 mt-2 text-center">
              {userName}! 🎉
            </p>
          </DialogHeader>

          <p className="text-gray-600 dark:text-gray-300 text-center">
            {locale == "ar"
              ? "سيقوم أحد مستشاري بوكلي بالتواصل معك خلال دقائق لتحديد موعد اجتماعك"
              : "One of Bokli consultants will contact you within minutes to schedule your meeting"}
          </p>

          {/* Details Box */}
          <div className="w-full bg-slate-50 dark:bg-gray-800 p-4 rounded-xl mt-4 border border-slate-100 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2">
              📧 {locale == "ar" ? "البريد الإلكتروني" : "Email"}:{" "}
              <span className="text-rose-500">{email}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2 mt-2">
              📱 {locale == "ar" ? "رقم الهاتف" : "Phone"}:{" "}
              <span className="text-rose-500">{phone}</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
