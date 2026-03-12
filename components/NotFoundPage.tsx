"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6">
      <div className="text-center max-w-lg">
        {/* 404 Number */}
        <h1 className="text-7xl font-bold text-gray-900 dark:text-white">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/">
            <button className="px-6 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
              Back to Home
            </button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
