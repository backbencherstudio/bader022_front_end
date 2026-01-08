"use client";
import React from "react";
import { useCreateBooking } from "./context/BookingContext";
import SelectedServicrs from "./_components/SelectedServicrs";
import SelectDateTimeStaff from "./_components/SelectDateTimeStaff";
import PaymentInformation from "./_components/PaymentInformation";
import Cardinformation from "./_components/Cardinformation";
import BookingConfirmed from "./_components/BookingConfirmed";

const steps = [1, 2, 3, 4];
export default function BookingPage() {
  const { step, setStep } = useCreateBooking();

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <SelectedServicrs onNext={handleNext} />;
      case 2:
        return <SelectDateTimeStaff />;
      case 3:
        return <PaymentInformation />;
      case 4:
        return (
          <Cardinformation
            onNext={handleNext}
            details={{
              bookingId: "BOK91385",
              service: "Haircut & Styling",
              dateTime: "2025-11-30 10:00 AM",
              staff: "Sara Jonson",
              duration: "30 min",
              totalAmount: "109 SAR",
              paymentMethod: "Credit Card",
            }}
          />
        );

      case 5:
        return (
          <BookingConfirmed
            details={{
              bookingId: "BOK91385",
              service: "Haircut & Styling",
              dateTime: "2025-11-30 10:00 AM",
              staff: "Sara Jonson",
              duration: "30 min",
              totalAmount: "109 SAR",
              paymentMethod: "Credit Card",
            }}
            onDownloadInvoice={() => console.log("Download")}
            onGoToDashboard={() => console.log("Dashboard")}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-5 border border-[#dfe1e7] dark:border-[#2a2d35] rounded-xl p-5 pr-14 h-fit bg-white dark:bg-[#121318]">
      {/* Dynamic Step Title */}
      <div className="">
        <button
          onClick={handlePrevious}
          className="rounded-md border px-6 py-2 text-sm cursor-pointer"
        >
          Back
        </button>
      </div>

      {/* Progress Bars */}
      {step <= steps.length && (
        <div className="flex gap-5 w-full">
          {steps.map((item) => {
            const isCompleted = item < step;
            const isActive = item === step;
            const isUpcoming = item > step;

            return (
              <div key={item} className="flex-1 flex flex-col gap-2">
                <div className="w-full h-2 rounded-full bg-[#e6e8ee] dark:bg-[#2a2d35] overflow-hidden">
                  {/* Completed */}
                  {isCompleted && (
                    <div className="h-full w-full bg-green-500 dark:bg-green-400 rounded-full" />
                  )}

                  {/* Active */}
                  {isActive && (
                    <div className="h-full w-full bg-green-500 dark:bg-green-400 rounded-full" />
                  )}

                  {/* Upcoming */}
                  {isUpcoming && (
                    <div className="h-full w-full bg-[#f5f6f8] dark:bg-[#1e2026] rounded-full" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* Step Component */}
      {renderStep()}
    </div>
  );
}
