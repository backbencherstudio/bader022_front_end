"use client";

import React from "react";
import { FiCheckCircle, FiTool } from "react-icons/fi";

type FinalizingProps = {
  progress?: number; // 0–100
};

const FINALIZING_STEPS = [
  "Creating website template",
  "Setting up your products and services",
  "Configuring your business settings",
  "Creating your content",
  "Finishing your website setup",
];

export default function FinalizingYourWebsite({
  progress = 80,
}: FinalizingProps) {
  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl border bg-white p-8 space-y-8">
      {/* Icon */}
      <div className="flex justify-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-[#0f172a]">
          <FiTool className="text-white text-3xl" />
        </div>
      </div>

      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-black">
          Finalizing Your Website...
        </h1>
        <p className="text-gray-500">Finishing setting up your website...</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-[#0f172a] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {FINALIZING_STEPS.map((step, index) => (
          <div key={index} className="flex items-center gap-3">
            <FiCheckCircle className="text-[#0f172a] text-lg" />
            <span className="text-sm text-gray-700">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
