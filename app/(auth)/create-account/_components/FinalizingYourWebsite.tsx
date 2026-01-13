"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiCheckCircle, FiTool } from "react-icons/fi";
import { useCreateAccount } from "../context/CreateAccount";

const FINALIZING_STEPS = [
  "Creating website template",
  "Setting up your products and services",
  "Configuring your business settings",
  "Creating your content",
  "Finishing your website setup",
];

export default function FinalizingYourWebsite() {
  const { step, setStep } = useCreateAccount();

  const [progress, setProgress] = useState(0);
  const hasAdvancedStep = useRef(false); // prevent double increment

  // auto progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 60); // speed control

    return () => clearInterval(interval);
  }, []);

  // move to next step when complete
  useEffect(() => {
    if (progress === 100 && !hasAdvancedStep.current) {
      hasAdvancedStep.current = true;
      setTimeout(() => {
        setStep(step + 1);
      }, 500); // small delay for UX
    }
  }, [progress, setStep, step]);

  // calculate active step based on progress
  const activeStepIndex = Math.floor(
    (progress / 100) * FINALIZING_STEPS.length
  );

  return (
    <div className="p-8 space-y-8 min-h-screen">
      {/* Icon */}
      <div className="flex justify-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-[#0f172a] dark:bg-blue-600">
          <FiTool className="text-white text-3xl" />
        </div>
      </div>

      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-black dark:text-white">
          Finalizing Your Website...
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Finishing setting up your website...
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 overflow-hidden">
        <div
          className="h-full bg-[#0f172a] dark:bg-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {FINALIZING_STEPS.map((label, index) => {
          const completed = index < activeStepIndex;

          return (
            <div key={index} className="flex items-center gap-3">
              <FiCheckCircle
                className={`text-lg ${
                  completed
                    ? "text-[#0f172a] dark:text-blue-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
              <span
                className={`text-sm ${
                  completed
                    ? "text-gray-900 dark:text-gray-200"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
