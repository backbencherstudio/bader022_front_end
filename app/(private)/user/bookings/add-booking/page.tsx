"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useState } from "react";
import Step1 from "../../components/bookings/Step1";
import Step2 from "../../components/bookings/Step2";
import Step3 from "../../components/bookings/Step3";
import Step4 from "../../components/bookings/Step4";
import Step0 from "../../components/bookings/Step0";

type StepperProps = {
  steps: string[];
  currentStep: number; // 1-based
};

function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full flex items-center gap-3 sm:gap-4">
      {steps.map((_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div key={index} className="flex items-center w-full">
            {/* Circle */}
            <div
              className={cn(
                "h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold border",
                isCompleted && "bg-[#111827] border-[#111827] text-white",
                isActive && "bg-white border-[#111827] text-[#111827]",
                !isCompleted &&
                  !isActive &&
                  "bg-[#F4F6F8] border-border text-[#637381]"
              )}
            >
              {isCompleted ? <Check className="h-5 w-5" /> : stepNumber}
            </div>

            {/* Line */}
            {index !== steps.length - 1 && (
              <div
                className={cn(
                  "h-[3px] w-full mx-2 sm:mx-3 rounded-full",
                  stepNumber < currentStep ? "bg-[#111827]" : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function BookingCheckoutStepper() {
  const steps = [
    "Select Services",
    "Select Date",
    "Payment Info",
    "Card Info",
    "Confirmed",
  ];
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="w-full mx-auto py-8">
      {/* Stepper */}
      <Stepper steps={steps} currentStep={currentStep + 1} />

      {/* Title */}
      <h2 className="mt-8 text-xl sm:text-2xl font-semibold">
        {currentStep === 0 && "Select Services"}
        {currentStep === 1 && "Select Date Time & Staff"}
        {currentStep === 2 && "Payment Information"}
        {currentStep === 3 && "Card Information"}
        {currentStep === 4 && "Booking Confirmed!"}
      </h2>

      {/* Step Content */}
      <div className="mt-6">
        {currentStep === 0 && <Step0 onNext={() => setCurrentStep(1)} />}
        {currentStep === 1 && (
          <Step1
            onNext={() => setCurrentStep(2)}
            onBack={() => setCurrentStep(0)}
          />
        )}
        {currentStep === 2 && (
          <Step2
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        )}
        {currentStep === 3 && (
          <Step3
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        )}
        {currentStep === 4 && <Step4 />}
      </div>
    </div>
  );
}
