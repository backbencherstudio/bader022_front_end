"use client";

import React from "react";
import { BellDot } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/components/provider/I18nProvider";
import { useGetNotificationsQuery } from "@/redux/features/admin/adminApi";

// Helper to extract initials from notification message
const getInitials = (message: string) => {
  if (!message) return "N";
  // Take first two words' initials or first 2 chars
  const words = message.split(" ");
  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  return message.slice(0, 2).toUpperCase();
};

// Helper to format date string
const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  return dateStr;
};

// Format message: highlight the user name part
const formatMessage = (message: string) => {
  // e.g. "Md Habibur Rahman your subscription is confirmed"
  // Try to split on " your" to get name
  const match = message.match(/^(.+?)(\s+your\s)/i);
  if (match) {
    return {
      name: match[1].trim(),
      rest: match[2] + message.slice(match.index! + match[0].length),
    };
  }
  return { name: message, rest: "" };
};

export interface NotificationItem {
  message: string;
  date: string;
}

interface NotificationDropdownProps {
  isRTL?: boolean;
}

export default function NotificationDropdown({ isRTL = false }: NotificationDropdownProps) {
  const { locale } = useI18n();
  const { data: apiResponse, isLoading } = useGetNotificationsQuery({});
  const notifications: NotificationItem[] = apiResponse?.data || [];
  const totalCount = notifications.length;
  

  return (
    <DropdownMenu dir={isRTL ? "rtl" : "ltr"}>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Notifications"
          className="relative p-2 sm:p-2.5 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition outline-none"
        >
          <BellDot className="w-5 h-5 text-black dark:text-white" />
          {totalCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
              {totalCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="end" 
        className="w-80 p-0 sm:w-96 rounded-xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800"
      >
        {/* Header Block matching UI layout */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <span className="font-semibold text-gray-900 dark:text-white text-base"> {locale=='ar'?"الإشعارات":"Notifications"}</span>
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
            {String(totalCount).padStart(2, "0")}  {locale=='ar'?"الإشعارات":"Notifications"}
          </span>
        </div>

        {/* Scrollable Container*/}
        <div className="max-h-90 overflow-y-auto bg-white dark:bg-gray-900 scrollbar-thin">
          {notifications.map((notif, index) => {
            const { name, rest } = formatMessage(notif.message);
            return (
              <DropdownMenuItem
                key={`${notif.message}-${index}`}
                className="flex items-start gap-3 p-4 border-b border-gray-50 dark:border-gray-800/50 cursor-pointer transition focus:bg-gray-50 dark:focus:bg-gray-800 outline-none"
              >
                {/* Initials Circle */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  {getInitials(name)}
                </div>

                {/* Copy Context */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-900 dark:text-white leading-relaxed wrap-break-word">
                    <span className="font-semibold">
                      {name}
                    </span>
                    {rest}
                  </p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">
                    {formatDate(notif.date)}
                  </p>
                </div>
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}