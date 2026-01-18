"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import { useCreateAccount } from "./context/CreateAccount";
import { useI18n } from "@/components/provider/I18nProvider";

import AccountCreation from "./_components/AccountCreation";
import BusinessInfo from "./_components/BusinessInfo";
import ChooseyourPlan from "./_components/ChooseyourPlan";
import FinalizingYourWebsite from "./_components/FinalizingYourWebsite";
import CompleteYourProfile from "./_components/CompliteYourProfile";

interface CreateAccountData {
  step1: {
    businessName: string;
    businessAddress: string;
    category: string;
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

const steps = [1, 2, 3] as const;
const TOTAL_STEPS = steps.length;

const LANGS = {
  en: { label: "English", flag: "/images/english_flag.png" },
  ar: { label: "Arabic", flag: "/images/arabic_flag.png" },
} as const;

export default function CreateAccountPage() {
  const { locale, setLocale, t } = useI18n();
  const { step, setStep } = useCreateAccount();

  const [createAccountData, setCreateAccountData] = useState<CreateAccountData>(
    {
      step1: {
        businessName: "",
        businessAddress: "",
        category: "",
      },
      step2: { serviceName: "" },
      step3: { serviceName: "" },
      step4: { serviceName: "" },
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
      [stepKey]: { ...prev[stepKey], ...data },
    }));

    if (step < 5) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <AccountCreation onNext={(data) => handleNext("step5", data)} />;
      case 2:
        return (
          <BusinessInfo
            data={createAccountData.step1}
            onNext={(data) => handleNext("step1", data)}
          />
        );
      case 3:
        return (
          <ChooseyourPlan
            data={createAccountData.step4}
            onNext={(data) => handleNext("step3", data)}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return <FinalizingYourWebsite />;
      case 5:
        return <CompleteYourProfile />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto h-fit space-y-5 p-5">
      {/* Header */}
      {step <= 3 && (
        <div className="flex items-center justify-between border-b border-b-[#dfe1e7] pb-4 dark:border-b-[#2a2d35]">
          <div className="flex flex-col gap-2">
            <h1 className="font-inter text-2xl font-medium text-black dark:text-white">
              {step === 1 && t("createAccount.step1Title")}
              {step === 2 && t("createAccount.step2Title")}
              {step === 3 && t("createAccount.step3Title")}
              {/* {step === 4 && t("createAccount.step4Title")} */}
            </h1>
            <p className="font-inter text-base text-[#777980] dark:text-[#a1a4ad]">
              {step === 1 &&
                t("createAccount.step1Desc", { step, total: TOTAL_STEPS })}

              {step === 2 &&
                t("createAccount.step2Desc", { step, total: TOTAL_STEPS })}

              {step === 3 &&
                t("createAccount.step3Desc", { step, total: TOTAL_STEPS })}

              {/* {step === 4 &&
                t("createAccount.step4Desc", { step, total: TOTAL_STEPS })} */}
            </p>
          </div>

          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1 text-[16px] text-slate-700 hover:bg-slate-100 dark:text-white">
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
              className="w-40 rounded-md border bg-gray-100 p-2 shadow-2xl dark:bg-blue-600 dark:text-white"
            >
              {(Object.keys(LANGS) as Array<keyof typeof LANGS>).map((key) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => setLocale(key)}
                  className="flex cursor-pointer items-center gap-2"
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
      )}

      {/* Progress */}
      {step <= steps.length && (
        <div className="flex w-full gap-5">
          {steps.map((item) => (
            <div key={item} className="flex-1">
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#e6e8ee] dark:bg-[#2a2d35]">
                <div
                  className={`h-full rounded-full ${
                    item <= step
                      ? "bg-black dark:bg-blue-600"
                      : "bg-[#f5f6f8] dark:bg-[#1e2026]"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step Content */}
      {renderStep()}
    </div>
  );
}
