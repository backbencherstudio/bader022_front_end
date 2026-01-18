"use client";
import React, { useEffect, useState } from "react";
import { useCreateAccount } from "./context/CreateAccount";
import AccountCreated from "./_components/AccountCreated";
import AddYourServices from "./_components/AddYourServices";
import AddYourTeam from "./_components/AddYourTeam";
import ChooseyourPlan from "./_components/ChooseyourPlan";
import FinalizingYourWebsite from "./_components/FinalizingYourWebsite";
import CompleteYourProfile from "./_components/CompliteYourProfile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/components/provider/I18nProvider";
import AccountCreation from "./_components/AccountCreation";
import BusinessInfo from "./_components/BusinessInfo";

interface CreateAccountData {
  step1: {
    businessName: string;
    businessAddress: string;
    category: string;
    // businessLogo: FileList | null;
    // workingHours: any[];
  };
  step2: {
    serviceName: string;
  };
  step3: {
    serviceName: string;
  };
  step4: {
    serviceName: string;
  };
  step5: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    category: string;
    remember: boolean;
  };
}

const steps = [1, 2, 3];

const LANGS = {
  en: { label: "English", flag: "/images/english_flag.png" },
  ar: { label: "Arabic", flag: "/images/arabic_flag.png" },
};
export default function CreateAccountPage() {
  const { locale, setLocale, t } = useI18n();
  const { step, setStep } = useCreateAccount();

  const [createAccountData, setCreateAccountData] = useState<CreateAccountData>(
    {
      step1: {
        businessName: "",
        businessAddress: "",
        category: "",
        // businessLogo: null,
        // workingHours: [],
      },
      step2: {
        serviceName: "",
      },
      step3: {
        serviceName: "",
      },
      step4: {
        serviceName: "",
      },
      step5: {
        fullName: "",
        email: "",
        phone: "",
        password: "",
        category: "",
        remember: false,
      },
    },
  );

  useEffect(() => {
    console.log("Create Account Data Updated:", createAccountData);
  }, [createAccountData]);

  const handleNext = <K extends keyof CreateAccountData>(
    stepKey: K,
    data: Partial<CreateAccountData[K]>,
  ) => {
    setCreateAccountData((prev) => ({
      ...prev,
      [stepKey]: {
        ...prev[stepKey],
        ...data,
      },
    }));

    if (step < 5) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <AccountCreation onNext={(data) => handleNext("step5", data)} />
          // <AccountCreated
          //   data={createAccountData.step1}
          //   onNext={(data) => handleNext("step1", data)}
          // />
        );
      case 2:
        return (
          <BusinessInfo
            data={createAccountData.step1}
            onNext={(data) => handleNext("step1", data)}
          />
          // <AddYourServices
          //   data={createAccountData.step2}
          //   onNext={(data) => handleNext("step2", data)}
          //   onPrevious={handlePrevious}
          // />
        );
      case 3:
        return (
          <ChooseyourPlan
            data={createAccountData.step4}
            onNext={(data) => handleNext("step3", data)}
            onPrevious={handlePrevious}
          />
          // <AddYourTeam
          //   data={createAccountData.step3}
          //   onNext={(data) => handleNext("step3", data)}
          //   onPrevious={handlePrevious}
          // />
        );
      case 4:
        return (
          <FinalizingYourWebsite />
          // <ChooseyourPlan
          //   data={createAccountData.step4}
          //   onNext={(data) => handleNext("step3", data)}
          //   onPrevious={handlePrevious}
          // />
        );

      case 5:
        return <CompleteYourProfile />;
      // return <FinalizingYourWebsite />;

      // case 6:
      //   return <CompleteYourProfile />;

      default:
        return null;
    }
  };

  return (
    <div className="space-y-5 p-5 h-fit container mx-auto">
      {/* Dynamic Step Title */}
      {step <= 3 ? (
        <div className="flex items-center justify-between  border-b border-b-[#dfe1e7] dark:border-b-[#2a2d35] pb-4">
          <div className="flex flex-col gap-2">
            <h1 className="capitalize font-inter font-medium text-2xl leading-5 tracking-[0.01em] text-black dark:text-white">
              {step === 1 && " Complete your Profile"}
              {step === 2 && " Add Your  Services"}
              {step === 3 && "Add Your Team"}
              {step === 4 && "Choose Your Plan"}
            </h1>

            <p className="font-inter font-normal text-base leading-6 tracking-[0.01em] text-[#777980] dark:text-[#a1a4ad]">
              {step === 1 &&
                `Step ${step} of ${steps.length} - Set up Your Business profile`}
              {step === 2 &&
                `Step ${step} of ${steps.length} - Define the Services Your Offer`}
              {step === 3 &&
                `Step ${step} of ${steps.length} - Define the Services Your Offer`}
              {step === 4 &&
                `Step ${step} of ${steps.length} - Select the plan that fits your business`}
            </p>
          </div>
          <div>
            {/* Language */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border px-3 py-1 text-[16px] text-slate-700 hover:bg-slate-100 cursor-pointer">
                  <Image
                    src={LANGS[locale].flag}
                    alt={LANGS[locale].label}
                    width={22}
                    height={22}
                  />
                  <span className="uppercase">{locale}</span>
                  <ChevronDown size={14} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-40 border rounded-md shadow-2xl bg-gray-100 dark:bg-blue-600 dark:text-white p-2"
              >
                {(Object.keys(LANGS) as Array<"en" | "ar">).map((key) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => setLocale(key)}
                    className="cursor-pointer flex items-center gap-2"
                  >
                    <Image
                      src={LANGS[key].flag}
                      alt={LANGS[key].label}
                      width={22}
                      height={22}
                    />
                    <span>{LANGS[key].label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ) : (
        ""
      )}

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
                    <div className="h-full w-full bg-black dark:bg-blue-600 rounded-full" />
                  )}

                  {/* Active */}
                  {isActive && (
                    <div className="h-full w-full bg-black dark:bg-blue-600 rounded-full" />
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
