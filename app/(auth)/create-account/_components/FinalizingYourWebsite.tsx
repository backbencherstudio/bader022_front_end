"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiCheckCircle, FiTool } from "react-icons/fi";
import { useCreateAccount } from "../context/CreateAccount";
import { useI18n } from "@/components/provider/I18nProvider";

type Step1Data = {
  business_name: string;
  address: string;
  business_category: string;
  number_of_branches: "1" | "3" | "6";
};
interface Step4Props {
  data: Step1Data;
  onNext: (values: Step1Data) => void;
  onPrevious: () => void;
}

export default function FinalizingYourWebsite({ onNext, onPrevious }: Step4Props) {
  const { step, setStep } = useCreateAccount();
  const { t } = useI18n();

  const [progress, setProgress] = useState(0);
  const hasAdvancedStep = useRef(false);

  const FINALIZING_STEPS = [
    t("finalizing.steps.template"),
    t("finalizing.steps.products"),
    t("finalizing.steps.settings"),
    t("finalizing.steps.content"),
    t("finalizing.steps.finish"),
  ];

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
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // move to next step when complete
  useEffect(() => {
    if (progress === 100 && !hasAdvancedStep.current) {
      hasAdvancedStep.current = true;
      setTimeout(() => {
        setStep(step + 1);
      }, 500);
    }
  }, [progress, setStep, step]);

  const activeStepIndex = Math.floor(
    (progress / 100) * FINALIZING_STEPS.length,
  );

  return (
    <div className="p-8 space-y-8">
      {/* Icon */}
      <div className="flex justify-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-[#0f172a] dark:bg-blue-600">
          <FiTool className="text-white text-3xl" />
        </div>
      </div>

      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-black dark:text-white">
          {t("finalizing.title")}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {t("finalizing.subtitle")}
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
      <button 
        type="button"
        onClick={onPrevious}
        className="rounded-md cursor-pointer border px-6 py-2 text-sm text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Back
      </button>

      <button onClick={() => onNext({
        business_name: "Example Business",
        address: "123 Street",
        business_category: "fitness_pro_gym",
        number_of_branches: "1",
      })}
        type="submit"
        className="rounded-md bg-linear-to-r from-purple-500 to-indigo-500 px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 cursor-pointer"
      >
        {t("BusinessInfo.submit")}
      </button>
    </div>
  );
}
