"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  CalendarDays, 
  CreditCard, 
  Layers, 
  Activity, 
  Loader2 
} from "lucide-react";
import { useGetPackageIdQuery } from "@/redux/features/admin/adminApi";
import { useI18n } from "@/components/provider/I18nProvider";

// --- Date Formatter Helper for 2026-04-08T08:45:22.000000Z ---
const formatDate = (dateString: string, locale: string) => {
  if (!dateString) return "—";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch (e) {
    return dateString;
  }
};

export function ViewPackage({ id }: { id: number }) {
  const { locale } = useI18n();
  const { data, isLoading } = useGetPackageIdQuery(id);
  const isRTL = locale === "ar";

  const packageInfo = data?.data;

  // Localized Strings Dictionary
  const uiText = {
    title: isRTL ? "تفاصيل الاشتراك" : "Subscription Details",
    loading: isRTL ? "جاري التحميل..." : "Loading details...",
    packageName: isRTL ? "اسم الباقة:" : "Package Name",
    businessType: isRTL ? "نوع العمل:" : "Business Type",
    duration: isRTL ? "المدة:" : "Duration",
    price: isRTL ? "السعر:" : "Price",
    start: isRTL ? "تاريخ البدء:" : "Start Date",
    end: isRTL ? "تاريخ الانتهاء:" : "End Date",
    close: isRTL ? "إغلاق" : "Close",
    currency: isRTL ? "رس" : "SAR",
    daysUnit: isRTL ? "أيام" : "days",
    subtitle: isRTL ? "تفاصيل خطة" : "Details for",
    bannerStatus: isRTL ? "باقة" : "Package",
  };

  return (
    <Dialog>
      {/* Trigger Button Component */}
      <DialogTrigger asChild>
        <button className="h-10 w-10 cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/60 flex items-center justify-center transition-all duration-200 shadow-sm">
          <Eye className="h-4 w-4" />
        </button>
      </DialogTrigger>

      {/* Main Dialog View Wrapper */}
      <DialogContent 
        dir={isRTL ? "rtl" : "ltr"}
        className="sm:max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden p-0 border border-gray-100 dark:border-gray-800"
      >
        <DialogHeader className="p-6 pb-4 border-b border-gray-50 dark:border-gray-800/60">
          <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">
            {uiText.title}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Loader2 className="h-7 w-7 animate-spin text-blue-500" />
            <p className="text-sm font-medium text-gray-400 dark:text-gray-500">{uiText.loading}</p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            
            {/* Elegant Top Status Banner */}
            <div className="flex items-start gap-3.5 rounded-2xl border border-emerald-100 dark:border-emerald-950/40 bg-emerald-50/50 dark:bg-emerald-950/10 p-4">
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 shrink-0">
                <Activity className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-emerald-800 dark:text-emerald-400 capitalize">
                  {packageInfo?.status} {uiText.bannerStatus}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                  {uiText.subtitle} {packageInfo?.name}
                </p>
              </div>
            </div>

            {/* Clean Receipt/Details List Layout Container */}
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/20 p-5 space-y-4">
              
              {/* Row: Package Name */}
              <div className="flex justify-between items-center gap-4 text-sm border-b border-dashed border-gray-200 dark:border-gray-800 pb-3">
                <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                  <Layers className="h-4 w-4" />
                  <span className="font-medium text-gray-600 dark:text-gray-400">{uiText.packageName}</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-gray-200">{packageInfo?.name || "—"}</span>
              </div>

              {/* Row: Business Type */}
              <div className="flex justify-between items-center gap-4 text-sm border-b border-dashed border-gray-200 dark:border-gray-800 pb-3">
                <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                  <Activity className="h-4 w-4" />
                  <span className="font-medium text-gray-600 dark:text-gray-400">{uiText.businessType}</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-gray-200">{packageInfo?.package || "—"}</span>
              </div>

              {/* Row: Duration */}
              <div className="flex justify-between items-center gap-4 text-sm border-b border-dashed border-gray-200 dark:border-gray-800 pb-3">
                <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                  <CalendarDays className="h-4 w-4" />
                  <span className="font-medium text-gray-600 dark:text-gray-400">{uiText.duration}</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-gray-200">
                  {packageInfo?.day} {uiText.daysUnit}
                </span>
              </div>

              {/* Row: Price Zone */}
              <div className="flex justify-between items-center gap-4 text-sm border-b border-dashed border-gray-200 dark:border-gray-800 pb-3">
                <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                  <CreditCard className="h-4 w-4" />
                  <span className="font-medium text-gray-600 dark:text-gray-400">{uiText.price}</span>
                </div>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {packageInfo?.price} {uiText.currency}
                </span>
              </div>

              {/* Row: Dynamic Live Formatted Start Timestamp */}
              <div className="flex justify-between items-center gap-4 text-xs border-b border-dashed border-gray-200 dark:border-gray-800 pb-3">
                <span className="font-medium text-gray-400 dark:text-gray-500">{uiText.start}</span>
                <span className="font-medium text-gray-700 dark:text-gray-300 text-right">
                  {formatDate(packageInfo?.created_at, locale)}
                </span>
              </div>

              {/* Row: Dynamic Live Formatted End Timestamp */}
              <div className="flex justify-between items-center gap-4 text-xs last:border-0 pb-0">
                <span className="font-medium text-gray-400 dark:text-gray-500">{uiText.end}</span>
                <span className="font-medium text-gray-700 dark:text-gray-300 text-right">
                  {formatDate(packageInfo?.updated_at, locale)}
                </span>
              </div>
            </div>

            {/* Close Actions Row */}
            <DialogClose asChild>
              <Button className="w-full py-5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-300 font-semibold border border-transparent transition-all cursor-pointer text-sm">
                {uiText.close}
              </Button>
            </DialogClose>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}