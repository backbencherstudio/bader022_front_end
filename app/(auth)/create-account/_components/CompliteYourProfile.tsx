"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FiCheck, FiCopy, FiArrowUpRight } from "react-icons/fi";

interface CompleteYourProfileProps {
  subscriptionLink?: string;
}

export default function CompleteYourProfile({
  subscriptionLink = "https://bokli.io/dfg",
}: CompleteYourProfileProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(subscriptionLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-xl text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative flex size-20 items-center justify-center rounded-full bg-[#0f172a]">
            <FiCheck className="text-white text-3xl" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-[#0f172a]">
            Your Account Has Been Successfully Created!
          </h1>
          <p className="text-gray-500">
            Share the subscription link with your customers
          </p>
        </div>

        {/* Link Copy */}
        <div className="flex items-center gap-2 rounded-lg border bg-gray-50 px-3 py-2">
          <input
            readOnly
            value={subscriptionLink}
            className="flex-1 bg-transparent text-sm outline-none text-gray-700"
          />

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-md bg-[#0f172a] px-4 py-2 text-sm text-white"
          >
            <FiCopy />
            {copied ? "Copied" : "Copy Link"}
          </button>
        </div>

        {/* button */}
        <Link href={"/merchant/dashboard"}>
          <button className="mx-auto flex items-center gap-2 rounded-lg bg-[#0f172a] px-6 py-3 text-sm font-medium text-white cursor-pointer">
            Go to the dashboard
            <FiArrowUpRight />
          </button>
        </Link>
      </div>
    </div>
  );
}
