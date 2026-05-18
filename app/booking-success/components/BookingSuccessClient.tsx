"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useBookingSuccessfullQuery } from "@/redux/features/userDashboard/booking";
import { useI18n } from "@/components/provider/I18nProvider";
import { 
  Check, 
  Calendar, 
  User, 
  Clock, 
  CreditCard, 
  FileText, 
  AlertTriangle, 
  Loader2, 
  Sparkles 
} from "lucide-react";

export default function BookingSuccessClient() {
  const { locale, t } = useI18n();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id");
  const isRTL = locale === "ar";

  const {
    data: bookingData,
    isLoading,
    error,
  } = useBookingSuccessfullQuery(
    { booking_id: bookingId! },
    { skip: !bookingId },
  );

  const previewInvoice = async () => {
    if (!bookingId) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/confirm-invoice/${bookingId}`,
      );
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (err) {
      console.error("Failed to fetch invoice preview", err);
    }
  };

  // --- Loading State Template ---
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 p-8 space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
        <p className="text-sm text-gray-500 animate-pulse font-medium">
          {isRTL ? "جاري تحميل تفاصيل الحجز..." : "Loading booking details..."}
        </p>
      </div>
    );
  }

  // --- Error State Template ---
  if (!bookingId || error || !bookingData) {
    return (
      <Card className="max-w-md mx-auto p-8 border-red-100 dark:border-red-950/50 bg-red-50/50 dark:bg-red-950/10 text-center rounded-2xl shadow-sm">
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-lg font-semibold text-red-900 dark:text-red-400 mb-2">
          {isRTL ? "حدث خطأ ما" : "Something went wrong"}
        </h3>
        <p className="text-sm text-red-600 dark:text-red-500 mb-6">
          {!bookingId 
            ? (isRTL ? "لم يتم توفير رقم الحجز" : "No booking ID provided")
            : (isRTL ? "فشل في جلب تفاصيل الحجز الخاص بك" : "Failed to fetch booking details")
          }
        </p>
        <Link href="/user/bookings" className="w-full">
          <Button variant="outline" className="w-full border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 hover:bg-red-100/50">
            {isRTL ? "العودة إلى الحجوزات" : "Back to Bookings"}
          </Button>
        </Link>
      </Card>
    );
  }

  const booking = bookingData.data;

  // Key-value data layout array using tailored Lucide icons
  const receiptItems = [
    { icon: <Sparkles className="w-4 h-4" />, label: isRTL ? "الخدمة:" : "Service", value: booking.service },
    { icon: <Calendar className="w-4 h-4" />, label: isRTL ? "التاريخ والوقت:" : "Date & Time", value: booking.date_time },
    { icon: <User className="w-4 h-4" />, label: isRTL ? "الموظف:" : "Staff", value: booking.staff },
    { icon: <Clock className="w-4 h-4" />, label: isRTL ? "المدة:" : "Duration", value: booking.duration },
    { icon: <CreditCard className="w-4 h-4" />, label: isRTL ? "طريقة الدفع:" : "Payment Method", value: booking.payment_method },
  ];

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6" dir={isRTL ? "rtl" : "ltr"}>
      <Card className="relative overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-xl text-center">
        
        {/* Stylized background radial light gradient effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />

        {/* Animated Celebration Success Check Rings */}
        <div className="flex items-center justify-center">
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-indigo-50 dark:bg-indigo-950/30 animate-pulse">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/60 transition-transform hover:scale-105 duration-300">
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
                <Check className="w-6 h-6 stroke-3" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Typography Header Section */}
        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
          {isRTL ? "تم تأكيد الحجز!" : "Booking Confirmed!"}
        </h3>
        
        <p className="inline-flex items-center gap-1.5 text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full font-medium text-gray-600 dark:text-gray-300">
          <span>{isRTL ? "رقم الحجز:" : "Booking ID:"}</span>
          <span className="font-bold text-gray-900 dark:text-white">{booking.booking_id}</span>
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed mt-4">
          {isRTL
            ? "تم حجز موعدك بنجاح. تم إرسال رسالة تأكيد إلى بريدك الإلكتروني."
            : "Your appointment is successfully booked. A confirmation email has been sent to your inbox."}
        </p>

        {/* Modern Receipt Detail List Box */}
        <div className="mt-8 rounded-2xl border border-gray-100 dark:border-gray-800/80 bg-gray-50/50 dark:bg-gray-950/30 p-5 space-y-4 text-left">
          {receiptItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center gap-4 text-xs sm:text-sm border-b border-dashed border-gray-200 dark:border-gray-800 last:border-0 pb-3 last:pb-0">
              <div className="flex items-center gap-2.5 text-gray-400 dark:text-gray-500">
                {item.icon}
                <span className="font-medium text-gray-500 dark:text-gray-400">{item.label}</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-gray-100 text-right">
                {item.value || "—"}
              </span>
            </div>
          ))}

          {/* Clean separation breakdown zone for the Total Amount accent element */}
          <div className="pt-2 flex justify-between items-center gap-4 text-sm sm:text-base font-bold border-t border-gray-200 dark:border-gray-700">
            <span className="text-gray-800 dark:text-gray-300">{isRTL ? "المبلغ الإجمالي:" : "Total Amount"}</span>
            <span className="text-emerald-600 dark:text-emerald-400 text-lg">
              {booking.amount}
            </span>
          </div>
        </div>

        {/* Action Bottom Layout Button Triggers */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3.5">
          <Button 
            onClick={previewInvoice} 
            className="flex-1 py-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white font-semibold transition-all gap-2 text-sm shadow-lg shadow-emerald-600/10 dark:shadow-none cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            {isRTL ? "تحميل الفاتورة" : "Download Invoice"}
          </Button>
          
          <Link href="/user/bookings" className="flex-1">
            <Button 
              variant="outline" 
              className="w-full py-6 rounded-xl border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold text-sm transition-all cursor-pointer"
            >
              {isRTL ? "الذهاب إلى لوحة التحكم" : "Go to Dashboard"}
            </Button>
          </Link>
        </div>

      </Card>
    </div>
  );
}