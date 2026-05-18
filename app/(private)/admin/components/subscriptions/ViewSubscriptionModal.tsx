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
  Building2, 
  Mail, 
  Layers, 
  CreditCard, 
  CalendarDays, 
  CheckCircle2, 
  AlertCircle,
  Loader2 
} from "lucide-react";
import { useGetSubscriptionsIdQuery } from "@/redux/features/admin/adminApi";
import { useI18n } from "@/components/provider/I18nProvider";

// --- Date Formatter Helper (Converts ISO to clean human-readable text) ---
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

export function ViewSubscriptionModal({ id }: { id: string }) {
  const { locale } = useI18n();
  const { data, isLoading } = useGetSubscriptionsIdQuery(id);
  const isRTL = locale === "ar";

  const subscription = data?.data;
  const status = subscription?.status?.toLowerCase();

  // Dictionary for clean English/Arabic translations
  const uiText = {
    title: isRTL ? "تفاصيل الاشتراك" : "Subscription Details",
    loading: isRTL ? "جاري تحميل البيانات..." : "Loading subscription...",
    business: isRTL ? "الشركة:" : "Business",
    email: isRTL ? "البريد الإلكتروني:" : "Email",
    plan: isRTL ? "الخطة المعتمدة:" : "Active Plan",
    price: isRTL ? "قيمة الاشتراك:" : "Price",
    statusLabel: isRTL ? "حالة الاشتراك:" : "Status",
    start: isRTL ? "تاريخ البدء:" : "Start Date",
    end: isRTL ? "تاريخ الانتهاء:" : "End Date",
    close: isRTL ? "إغلاق النافذة" : "Close Details",
    currency: isRTL ? "رس" : "SAR",
    active: isRTL ? "نشط" : "Active",
    expired: isRTL ? "منتهي" : "Expired",
    pending: isRTL ? "معلق" : "Pending",
  };

  // Dynamic Badge Color Configuration matching subscription status states
  const getStatusBadge = (statusStr: string) => {
    switch (statusStr) {
      case "active":
        return "border-emerald-100 bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400";
      case "expired":
        return "border-rose-100 bg-rose-50/60 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400";
      default:
        return "border-amber-100 bg-amber-50/60 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400";
    }
  };

  return (
    <Dialog>
      {/* Trigger Button component */}
      <DialogTrigger asChild>
        <button className="h-10 w-10 cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/60 flex items-center justify-center transition-all duration-200 shadow-sm">
          <Eye className="h-4 w-4" />
        </button>
      </DialogTrigger>

      {/* Content Container Modal View */}
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
          <div className="flex flex-col items-center justify-center py-14 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <p className="text-sm font-medium text-gray-400 dark:text-gray-500">{uiText.loading}</p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            
            {/* Contextual Status Banner card block */}
            <div className={`flex items-center gap-3.5 rounded-2xl border p-4 ${getStatusBadge(status)}`}>
              <div className="shrink-0">
                {status === "active" ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <AlertCircle className="h-5 w-5" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs opacity-80 uppercase tracking-wider font-semibold">
                  {uiText.statusLabel}
                </p>
                <p className="text-sm font-bold capitalize mt-0.5">
                  {status === "active" ? uiText.active : status === "expired" ? uiText.expired : uiText.pending}
                </p>
              </div>
            </div>

            {/* Stylized Receipt Field Details Box */}
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/20 p-5 space-y-4">
              
              {/* Row: Business Name */}
              <div className="flex justify-between items-center gap-4 text-sm border-b border-dashed border-gray-200 dark:border-gray-800/80 pb-3">
                <div className="flex items-center gap-2.5 text-gray-400 dark:text-gray-500">
                  <Building2 className="h-4 w-4" />
                  <span className="font-medium text-gray-600 dark:text-gray-400">{uiText.business}</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-gray-200 text-right">
                  {subscription?.user?.name || "—"}
                </span>
              </div>

              {/* Row: Account Email */}
              <div className="flex justify-between items-center gap-4 text-sm border-b border-dashed border-gray-200 dark:border-gray-800/80 pb-3">
                <div className="flex items-center gap-2.5 text-gray-400 dark:text-gray-500">
                  <Mail className="h-4 w-4" />
                  <span className="font-medium text-gray-600 dark:text-gray-400">{uiText.email}</span>
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-300 text-right truncate max-w-[200px]">
                  {subscription?.user?.email || "—"}
                </span>
              </div>

              {/* Row: Selected Plan */}
              <div className="flex justify-between items-center gap-4 text-sm border-b border-dashed border-gray-200 dark:border-gray-800/80 pb-3">
                <div className="flex items-center gap-2.5 text-gray-400 dark:text-gray-500">
                  <Layers className="h-4 w-4" />
                  <span className="font-medium text-gray-600 dark:text-gray-400">{uiText.plan}</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-gray-200 text-right">
                  {subscription?.plan?.name || "—"}
                </span>
              </div>

              {/* Row: Price Zone */}
              <div className="flex justify-between items-center gap-4 text-sm border-b border-dashed border-gray-200 dark:border-gray-800/80 pb-3">
                <div className="flex items-center gap-2.5 text-gray-400 dark:text-gray-500">
                  <CreditCard className="h-4 w-4" />
                  <span className="font-medium text-gray-600 dark:text-gray-400">{uiText.price}</span>
                </div>
                <span className="font-bold text-blue-600 dark:text-blue-400 text-right">
                  {subscription?.plan?.price} {uiText.currency}
                </span>
              </div>

              {/* Row: Dynamic Live Formatted Starts Timestamp */}
              <div className="flex justify-between items-center gap-4 text-xs border-b border-dashed border-gray-200 dark:border-gray-800/80 pb-3">
                <div className="flex items-center gap-2.5 text-gray-400">
                  <CalendarDays className="h-3.5 w-3.5" />
                  <span className="font-medium text-gray-500 dark:text-gray-400">{uiText.start}</span>
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-300 text-right">
                  {formatDate(subscription?.starts_at, locale)}
                </span>
              </div>

              {/* Row: Dynamic Live Formatted Ends Timestamp */}
              <div className="flex justify-between items-center gap-4 text-xs last:border-0 pb-0">
                <div className="flex items-center gap-2.5 text-gray-400">
                  <CalendarDays className="h-3.5 w-3.5" />
                  <span className="font-medium text-gray-500 dark:text-gray-400">{uiText.end}</span>
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-300 text-right">
                  {formatDate(subscription?.ends_at, locale)}
                </span>
              </div>
            </div>

            {/* Modal Closer Buttons footer link layout zone */}
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