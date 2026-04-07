"use client";

import React, { useEffect, useState } from "react";
import AccountCreation, { FormValues } from "./_components/AccountCreation";
import BusinessInfo from "./_components/BusinessInfo";
import ChooseyourPlan from "./_components/ChooseyourPlan";
import { useMerchantRegMutation } from "@/redux/features/merchant/merchantRegitraion";
import { useI18n } from "@/components/provider/I18nProvider";
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
import { useRouter, useSearchParams } from "next/navigation";
import { authorize } from "@/lib/auth";
import { useGetPaymentStatusQuery } from "@/redux/features/payment/paymentApi";
import { toast } from "sonner";
import { useCreateAccount } from "./context/CreateAccount";

const LANGS = {
  en: { label: "English", flag: "/images/english_flag.png" },
  ar: { label: "Arabic", flag: "/images/arabic_flag.png" },
} as const;

type CreateAccountData = {
  step1: FormValues;
  step2: {
    business_name: string;
    address: string;
    business_category: string;
    number_of_branches: "1" | "3" | "6";
  };
  step3: {
    plan_id: number;
  };
};

export default function CreateAccountPage() {
  const { t, locale, setLocale } = useI18n(); // localization
  // const [step, setStep] = useState(4);
  const { step, setStep } = useCreateAccount();
  const [domain, setDomain] = useState("barik");
  const router = useRouter();
  useEffect(() => {
    const auth = authorize(["User", "Merchant", "Admin"]);
    if (auth.authorized) {
      const role = auth.user?.role;
      const roleRedirectMap: Record<string, string> = {
        Admin: "/admin/dashboard",
        Merchant: "/merchant/dashboard",
        User: "/user/dashboard",
      };
      router.push(roleRedirectMap[role] || "/");
    }
  }, []);
  // console.log(step);
  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");
  // console.log(userId);
  const { data: paymentStatus, isLoading: paymentLoading } =
    useGetPaymentStatusQuery({ user_id: userId }, { skip: !userId });
  useEffect(() => {
    if (paymentStatus?.data?.status === "paid") {
      setStep(4);
    }
  }, [paymentStatus]);

  const [createAccountData, setCreateAccountData] = useState<CreateAccountData>(
    {
      step1: { fullName: "", email: "", phone: "", password: "" },
      step2: {
        business_name: "",
        address: "",
        business_category: "",
        number_of_branches: "1",
      },
      step3: { plan_id: 3 },
    },
  );

  const [registerMerchant, { isLoading }] = useMerchantRegMutation();

  const handleNext = <K extends keyof CreateAccountData>(
    stepKey: K,
    data: Partial<CreateAccountData[K]>,
  ) => {
    setCreateAccountData((prev: any) => ({
      ...prev,
      [stepKey]: { ...prev[stepKey], ...data },
    }));
    setStep(step + 1);
  };

  const handlePrevious = () => setStep(Math.max(step - 1, 1));

  const handleSubmit = async (step3Data?: { plan_id: number }) => {
    const finalPlanId = step3Data?.plan_id ?? createAccountData.step3.plan_id;
    const body = {
      name: createAccountData.step1.fullName,
      email: createAccountData.step1.email,
      phone: createAccountData.step1.phone,
      password: createAccountData.step1.password,
      password_confirmation: createAccountData.step1.password,
      business_name: createAccountData.step2.business_name,
      address: createAccountData.step2.address,
      business_category: createAccountData.step2.business_category,
      number_of_branches: Number(createAccountData.step2.number_of_branches),
      plan_id: finalPlanId,
    };
    // console.log("body===========", body);
    setDomain(body.name);
    try {
      const response = await registerMerchant(body).unwrap();
      // console.log(response);
      if (response?.success) {
        if (response?.tap_payment_url) {
          router.push(response.tap_payment_url);
        } else if (response?.token) {
          setStep(4);
        }
      }
    } catch (err: any) {
      // console.log(err);
      const errors = err?.data?.errors;
      if (errors) {
        Object.values(errors).forEach((msgs: any) => {
          toast.error(msgs?.[0]);
        });
        return;
      }
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  const steps = [
    { key: "step1", label: t("createAccount.steps.accountCreation") },
    { key: "step2", label: t("createAccount.steps.accountCreation") },
    { key: "step3", label: t("createAccount.steps.choosePlan") },
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <AccountCreation
            defaultValues={createAccountData.step1}
            onNext={(data) => handleNext("step1", data)}
          />
        );
      case 2:
        return (
          <BusinessInfo
            data={createAccountData.step2}
            onNext={(data) => handleNext("step2", data)}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <ChooseyourPlan
            defaultPlan={createAccountData.step3.plan_id}
            onNext={async (data) => {
              const updatedData = {
                ...createAccountData,
                step3: data,
              };
              setCreateAccountData(updatedData);
              await handleSubmit(data);
            }}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return <FinalizingYourWebsite />;
      case 5:
        return <CompleteYourProfile domain={domain} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-md shadow">
      {/* Header Section */}
      {step != 5 && (
        <div>
          {step <= 3 && (
            <div className="flex items-center justify-between pb-4">
              <div className="flex flex-col gap-2">
                <h1 className="font-inter text-2xl font-medium text-black dark:text-white">
                  {step === 1 && t("createAccount.step1Title")}
                  {step === 2 && t("createAccount.step2Title")}
                  {step === 3 && t("createAccount.step3Title")}
                </h1>
                <p className="font-inter text-base text-[#777980] dark:text-[#a1a4ad]">
                  {step === 1 &&
                    t("createAccount.step1Desc", { step, total: 3 })}

                  {step === 2 &&
                    t("createAccount.step2Desc", { step, total: 3 })}

                  {step === 3 &&
                    t("createAccount.step3Desc", { step, total: 3 })}
                </p>
              </div>

              {/* Language Dropdown for Step 1 */}
              <div className="flex justify-end mb-4">
                {step === 1 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1 text-[16px] text-slate-700 hover:bg-slate-100 hover:dark:bg-blue-600 dark:text-white">
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
                      className="w-40 rounded-md border bg-gray-100 p-2 shadow-2xl dark:bg-blue-600 dark:text-white  z-10"
                    >
                      {(Object.keys(LANGS) as Array<keyof typeof LANGS>).map(
                        (key) => (
                          <DropdownMenuItem
                            key={key}
                            onClick={() => setLocale(key)}
                            className="flex cursor-pointer items-center gap-2 py-1"
                          >
                            <Image
                              src={LANGS[key].flag}
                              alt={LANGS[key].label}
                              width={22}
                              height={22}
                            />
                            <span>{LANGS[key].label}</span>
                          </DropdownMenuItem>
                        ),
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          )}
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-10">
            {steps.map((s, i) => {
              const isActive = step === i + 1;
              const isCompleted = step > i + 1;

              return (
                <div key={s.key} className="flex-1 relative flex items-center">
                  <div
                    className={`h-10 w-10 flex items-center justify-center rounded-full text-sm font-medium
                  ${
                    isCompleted || isActive
                      ? "bg-linear-to-r from-purple-500 to-indigo-500 text-white"
                      : "border border-gray-300 text-gray-400 bg-white dark:bg-gray-900 dark:border-gray-600"
                  }`}
                  >
                    {isCompleted ? "✓" : i + 1}
                  </div>

                  {i !== steps.length - 1 && (
                    <div
                      className={`flex-1 h-2.5 ${
                        isCompleted
                          ? "bg-linear-to-r from-purple-500 to-indigo-500"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  )}

                  <span
                    className={`absolute top-12 text-xs ${
                      isActive || isCompleted
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className={isLoading ? "opacity-70 pointer-events-none" : ""}>
        {renderStep()}
      </div>
    </div>
  );
}
