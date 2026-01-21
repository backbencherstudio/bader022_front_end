"use client";
import React, { useState } from "react";
import { FiCopy } from "react-icons/fi";

interface MiniSiteCopyLinkProps {
  copyLink?: string;
}

export default function MiniSiteCopyLink({
  copyLink = "http://localhost:3000/merc",
}: MiniSiteCopyLinkProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(copyLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 gap-4">
      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 w-full">
        <span className="shrink-0">Live at:</span>

        <input
          readOnly
          value={copyLink}
          className="w-full bg-transparent outline-none text-gray-900 dark:text-white font-medium"
        />
      </div>

      <button
        onClick={handleCopy}
        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition shrink-0 cursor-pointer"
      >
        <FiCopy size={16} />
        {!copied ? "Copy Link" : "Coped"}
      </button>
    </div>
  );
}
