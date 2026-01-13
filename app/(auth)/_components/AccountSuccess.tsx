import Link from "next/link";
import React from "react";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";

export default function AccountSuccess() {
  return (
    <div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 shadow-md p-8">
      <div className="w-full max-w-xl text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative flex size-20 items-center justify-center rounded-full bg-[#0f172a] dark:bg-indigo-600">
            <FiCheck className="text-white text-3xl" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-[#0f172a] dark:text-white">
            Successful
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Congratulations! Your password has been successfully signed in.
            Click Get Started to login.
          </p>
        </div>

        {/* CTA */}
        <Link href="/admin/dashboard">
          <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#0f172a] dark:bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition cursor-pointer">
            Get Started
            <FiArrowUpRight />
          </button>
        </Link>
      </div>
    </div>
  );
}
