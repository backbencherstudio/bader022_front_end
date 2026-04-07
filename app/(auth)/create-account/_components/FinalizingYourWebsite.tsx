"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiCheckCircle, FiTool } from "react-icons/fi";
import { useCreateAccount } from "../context/CreateAccount";
import { useI18n } from "@/components/provider/I18nProvider";

export default function FinalizingYourWebsite() {
  const { setStep } = useCreateAccount();
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

  // progress auto increase
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // move to step 5 when completed
  useEffect(() => {
    if (progress >= 100 && !hasAdvancedStep.current) {
      hasAdvancedStep.current = true;
      setStep(5);
      const timer = setTimeout(() => {
        setStep(5);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [progress, setStep]);

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
        <h1 className="text-2xl font-semibold">{t("finalizing.title")}</h1>
        <p className="text-gray-500">{t("finalizing.subtitle")}</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 overflow-hidden bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
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
                className={completed ? "text-blue-600" : "text-gray-300"}
              />
              <span className={completed ? "text-black" : "text-gray-400"}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
