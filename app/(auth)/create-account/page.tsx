"use client";
import React, { useEffect, useState } from "react";
import { useCreateAccount } from "./context/CreateAccount";
import AccountCreated from "./_components/AccountCreated";
import AddYourServices from "./_components/AddYourServices";

interface CreateAccountData {
  step1: {
    businessName: string;
    bussinessAddress: string;
  };
  step2: {
    serviceName: string;
  };
}

const steps = [
  {
    id: 1,
    title: "Location & Contact",
    desc: "Where is your event?",
  },
  {
    id: 2,
    title: "Event Details",
    desc: "Tell us about your event",
  },
];
export default function CreateAccountPage() {
  const { step, setStep } = useCreateAccount();

  const [createAccountData, setCreateAccountData] = useState<CreateAccountData>(
    {
      step1: {
        businessName: "",
        bussinessAddress: "",
      },
      step2: {
        serviceName: "",
      },
    }
  );

  useEffect(() => {
    console.log("Create Account Data Updated:", createAccountData);
  }, [createAccountData]);

  const handleNext = <K extends keyof CreateAccountData>(
    stepKey: K,
    data: Partial<CreateAccountData[K]>
  ) => {
    setCreateAccountData((prev) => ({
      ...prev,
      [stepKey]: {
        ...prev[stepKey],
        ...data,
      },
    }));

    if (step < 6) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <AccountCreated
            data={createAccountData.step1}
            onNext={(data) => handleNext("step1", data)}
          />
        );
      case 2:
        return (
          <AddYourServices
            data={createAccountData.step2}
            onNext={(data) => handleNext("step2", data)}
            onPrevious={handlePrevious}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-5 border border-[#dfe1e7] dark:border-[#2a2d35] rounded-xl p-5 pr-14 h-fit bg-white dark:bg-[#121318]">
      {/* Dynamic Step Title */}
      <div className="flex flex-col gap-2 border-b border-b-[#dfe1e7] dark:border-b-[#2a2d35] pb-4">
        <h1 className="capitalize font-inter font-medium text-2xl leading-5 tracking-[0.01em] text-black dark:text-white">
          {step === 1 && " Complete your Profile"}
          {step === 2 && " Event Details"}
          {step === 3 && " Date & Time"}
        </h1>

        <p className="font-inter font-normal text-base leading-6 tracking-[0.01em] text-[#777980] dark:text-[#a1a4ad]">
          {step === 1 &&
            `Step ${step} of ${steps.length} - Set up Your Bussiness profile`}
          {step === 2 && "Tell us about your event"}
        </p>
      </div>

      {/* Progress Bars */}
      <div className="flex gap-5 w-full">
        {steps.map((item) => {
          const isCompleted = item.id < step;
          const isActive = item.id === step;
          const isUpcoming = item.id > step;

          return (
            <div key={item.id} className="flex-1 flex flex-col gap-2">
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

      {/* Step Component */}
      {renderStep()}
    </div>
  );
}
