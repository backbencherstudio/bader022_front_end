"use client";

import { useI18n } from "@/components/provider/I18nProvider";
import Link from "next/link";
import React, { useState } from "react";
import { FiCheck, FiCopy, FiArrowUpRight } from "react-icons/fi";

interface CompleteYourProfileProps {
  subscriptionLink?: string;
}

export default function CompleteYourProfile({
  subscriptionLink = "https://bokli.io/login",
}: CompleteYourProfileProps) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(subscriptionLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black dark:bg-blue-600 shadow-lg">
            <FiCheck className="text-white text-4xl" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100">
            {t("completeProfile.title")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            {t("completeProfile.subtitle")}
          </p>
        </div>

        {/* Link Copy */}
        <div className="flex flex-col sm:flex-row items-center gap-2 rounded-lg border bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 px-3 py-2 transition-colors">
          <input
            readOnly
            value={subscriptionLink}
            className="flex-1 bg-transparent text-sm sm:text-base outline-none text-gray-900 dark:text-gray-100"
          />

          <button
            onClick={handleCopy}
            className="flex items-center cursor-pointer justify-center gap-2 rounded-md bg-gray-900 dark:bg-blue-600 text-white dark:text-gray-900 px-4 py-2 text-sm sm:text-base transition-colors hover:bg-gray-700 dark:hover:bg-gray-200"
          >
            <FiCopy />
            {copied ? t("completeProfile.copied") : t("completeProfile.copy")}
          </button>
        </div>

        {/* Dashboard Button */}
        <Link href="/login">
          <button className="mx-auto cursor-pointer mt-4 flex items-center justify-center gap-2 rounded-lg bg-gray-900 dark:bg-blue-600 px-6 py-3 text-sm sm:text-base font-medium text-white dark:text-gray-900 transition-colors hover:bg-gray-700 dark:hover:bg-gray-200">
            {t("completeProfile.dashboard")}
            <FiArrowUpRight />
          </button>
        </Link>
      </div>
    </div>
  );
}
