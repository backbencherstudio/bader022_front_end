"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiCheckCircle, FiTool } from "react-icons/fi";
import { useI18n } from "@/components/provider/I18nProvider";
import Link from "next/link";

export default function FinalizingYourWebsite() {
    const { t } = useI18n();
    const [progress, setProgress] = useState(0);
    const hasCompleted = useRef(false);

    const FINALIZING_STEPS = [
        "Template Setup",
        "Products Setup",
        "Settings Setup",
        "Content Setup",
        "Finish",
    ];

    // Animate progress
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
        }, 60);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-[90vh] flex items-center justify-center p-6">
            <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 text-center space-y-6 border border-gray-200 dark:border-gray-700">

                {/* Icon */}
                <div className="flex justify-center">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#0f172a] dark:bg-blue-600">
                        {progress >= 100 ? (
                            <FiCheckCircle className="text-green-400 text-4xl" />
                        ) : (
                            <FiTool className="text-white text-4xl" />
                        )}
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {progress >= 100 ? "🎉 Website Ready!" : "Finalizing Your Website..."}
                </h1>

                {/* Subtitle */}
                <p className="text-gray-500 dark:text-gray-400">
                    {progress >= 100
                        ? "Your website has been successfully created. You can now log in and manage your business."
                        : "Please wait while we finalize your website."}
                </p>

                {/* Progress Bar */}
                <div className="w-full h-3 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <div
                        className={`h-full transition-all duration-300 ${progress >= 100 ? "bg-blue-500" : "bg-[#0f172a] dark:bg-blue-600"
                            }`}
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Steps */}
                <div className="space-y-2 mt-4">
                    {FINALIZING_STEPS.map((label, index) => {
                        const completed = (progress / 100) * FINALIZING_STEPS.length > index;
                        return (
                            <div key={index} className="flex gap-3 ">
                                <FiCheckCircle
                                    className={`text-lg ${completed ? "text-blue-500" : "text-gray-300 dark:text-gray-600"
                                        }`}
                                />
                                <span
                                    className={`text-sm ${completed ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"
                                        }`}
                                >
                                    {label}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Actions */}
                {progress >= 100 && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                        <Link
                            href="/login"
                            className="px-6 py-2.5 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium hover:opacity-90"
                        >
                            Go to Login
                        </Link>

                        <Link
                            href="/"
                            className="px-6 py-2.5 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            Back to Home
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}