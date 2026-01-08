import Link from "next/link";
import React from "react";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";

export default function AccountSuccess() {
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
          <h1 className="text-3xl font-semibold text-[#0f172a]">Successful</h1>
          <p className="text-gray-500">
            Congratulations! Your password has been successfully Sign In. Click
            Get Started to login..
          </p>
        </div>
        {/* CTA */}
        <Link href="/admin/dashboard">
          <button className="mx-auto flex items-center gap-2 rounded-lg bg-[#0f172a] px-6 py-3 text-sm font-medium text-white cursor-pointer">
            Get Started
            <FiArrowUpRight />
          </button>
        </Link>
      </div>
    </div>
  );
}
