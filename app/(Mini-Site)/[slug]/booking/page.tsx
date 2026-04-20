"use client";

import BookingSuccessPage from "@/app/booking-success/page";
import { useI18n } from "@/components/provider/I18nProvider";
import { useMiniSiteByDomainNameQuery } from "@/redux/features/merchant/miniSiteApi";
import { useBookingServiceQuery } from "@/redux/features/userDashboard/booking";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Step0 from "./_components/Step0";
import Step1 from "./_components/Step1";
import Step2 from "./_components/Step2";
import Step3 from "./_components/Step3";

type Service = {
  id: number;
  name: string;
  duration: number;
  price: number;
  description?: string;
  service_name: string;
};

function Stepper({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: number;
}) {
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
              className={`h-5 w-5 p-5 rounded-full flex items-center justify-center text-sm font-semibold border ${
                isCompleted
                  ? "bg-[#111827] dark:bg-green-800 border-[#111827] dark:border-[#016630] text-white"
                  : isActive
                    ? "bg-white border-[#111827] dark:border-[#016630] text-[#111827]"
                    : "bg-[#F4F6F8] border-border text-[#637381]"
              }`}
            >
              {isCompleted ? "✓" : stepNumber}
            </div>

            {/* Line */}
            {index !== steps.length - 1 && (
              <div
                className={`h-0.75 w-full mx-2 sm:mx-3 rounded-full ${
                  stepNumber < currentStep
                    ? "bg-[#111827] dark:bg-green-800"
                    : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function BookingPage() {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  const params = useParams();
  const domain = params.slug;
  const steps = [
    "Select Services",
    "Select Date",
    "Payment Info",
    "Card Info",
    "Confirmed",
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toLocaleDateString("en-CA"),
  );
  const [selectedTime, setSelectedTime] = useState<string>("");

  //   const { data, isLoading, error } = useBookingServiceQuery(
  //     selectedService?.name || "",
  //     // { skip: !selectedService }
  //   );

  const { data } = useMiniSiteByDomainNameQuery(`${domain}`);

  console.log(data?.data?.services);

  return (
    <div className="container mx-auto py-8">
      {/* Stepper */}
      <Stepper steps={steps} currentStep={currentStep + 1} />

      {/* Title */}
      <h2 className="mt-8 text-xl sm:text-2xl font-semibold">
        {currentStep === 0 &&
          (locale == "ar" ? "اختر الخدمات" : "Select Services")}
        {currentStep === 1 &&
          (locale == "ar"
            ? "اختر التاريخ والوقت والموظف"
            : "Select Date Time & Staff")}
        {currentStep === 2 &&
          (locale == "ar" ? "معلومات الدفع" : "Payment Information")}
        {currentStep === 4 &&
          (locale == "ar" ? "تم تأكيد الحجز!" : "Booking Confirmed!")}
        {currentStep === 3 &&
          (locale == "ar" ? "معلومات البطاقة" : "Card Information")}
      </h2>

      {/* Step Content */}
      <div className="mt-6">
        {currentStep === 0 && (
          <Step0
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            data={data?.data?.services}
            onNext={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 1 && selectedService && (
          <Step1
            onNext={() => setCurrentStep(2)}
            onBack={() => setCurrentStep(0)}
            serviceId={selectedService.id}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            duration={selectedService.duration}
            price={selectedService.price}
            serviceName={selectedService.name}
          />
        )}

        {currentStep === 2 && selectedService && (
          <Step2
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(1)}
            service={selectedService}
            date={selectedDate}
            time={selectedTime}
          />
        )}

        {currentStep === 4 && <BookingSuccessPage />}

        {currentStep === 3 && selectedService && (
          <Step3
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        )}
      </div>
    </div>
  );
}
