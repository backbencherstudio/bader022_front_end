"use client";
import { useI18n } from "@/components/provider/I18nProvider";
import React, { useState } from "react";
import { FiCopy } from "react-icons/fi";

interface MiniSiteCopyLinkProps {
  subdomain?: string;
}

const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL!;

export default function MiniSiteCopyLink({ subdomain }: MiniSiteCopyLinkProps) {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  const [copied, setCopied] = useState(false);

  const domain = `${frontendUrl}/${subdomain}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(domain);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 gap-4">
      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 w-full">
        <span className="shrink-0">
          {" "}
          {locale == "ar" ? "مباشر في:" : "Live at:"}
        </span>

        <input
          readOnly
          value={domain}
          className="w-full bg-transparent outline-none text-gray-900 dark:text-white font-medium"
        />
      </div>

      <button
        onClick={handleCopy}
        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition shrink-0 cursor-pointer"
      >
        <FiCopy size={16} />
        {!copied ? (
          <>{locale == "ar" ? "نسخ الرابط" : "Copy Link"}</>
        ) : (
          <>{locale == "ar" ? "تم النسخ" : "Copied"}</>
        )}
      </button>
    </div>
  );
}
