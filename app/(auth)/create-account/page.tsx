"use client";

import React, { useState } from "react";
import AccountCreation, { FormValues } from "./_components/AccountCreation";
import BusinessInfo from "./_components/BusinessInfo";
import ChooseyourPlan from "./_components/ChooseyourPlan";
import { useMerchantRegMutation } from "@/redux/features/merchant/merchantRegitraion";
import { useI18n } from "@/components/provider/I18nProvider";

type CreateAccountData = {
  step1: FormValues;
  step2: {
    business_name: string;
    address: string;
    business_category: string;
    number_of_branches: "1" | "2-5" | "6+";
  };
  step3: {
    plan_id: number;
  };
};

export default function CreateAccountPage() {
  const { t } = useI18n();
  const [step, setStep] = useState(1);

  const [createAccountData, setCreateAccountData] =
    useState<CreateAccountData>({
      step1: { fullName: "", email: "", phone: "", password: "" },
      step2: {
        business_name: "",
        address: "",
        business_category: "",
        number_of_branches: "1",
      },
      step3: { plan_id: 3 },
    });

  const [registerMerchant, { isLoading }] = useMerchantRegMutation();

  const handleNext = <K extends keyof CreateAccountData>(
    stepKey: K,
    data: Partial<CreateAccountData[K]>
  ) => {
    setCreateAccountData((prev) => ({
      ...prev,
      [stepKey]: { ...prev[stepKey], ...data },
    }));
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => setStep((prev) => Math.max(prev - 1, 1));

  const resetForm = () => {
    setStep(1);
    setCreateAccountData({
      step1: { fullName: "", email: "", phone: "", password: "" },
      step2: {
        business_name: "",
        address: "",
        business_category: "",
        number_of_branches: "1",
      },
      step3: { plan_id: 3 },
    });
  };

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
      number_of_branches: createAccountData.step2.number_of_branches,
      plan_id: finalPlanId,
    };

    try {
      const response = await registerMerchant(body).unwrap();
      console.log("Merchant Registered:", response);
      alert("Registration Successful!");
      resetForm();
    } catch (err: any) {
      alert(err?.data?.message || "Registration Failed!");
    }
  };

  const steps = [
    { key: "step1", label: t("Account Creation") },
    { key: "step2", label: t("Business Info") },
    { key: "step3", label: t("Choose Plan") },
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
            onNext={(data) => {
              setCreateAccountData((prev) => ({
                ...prev,
                step3: data,
              }));
              handleSubmit(data);
            }}
            onPrevious={handlePrevious}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-md shadow">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-6">
        {steps.map((s, i) => {
          const isActive = step === i + 1;
          const isCompleted = step > i + 1;

          return (
            <div key={s.key} className="flex-1 relative flex items-center">
              <div
                className={`h-10 w-10 flex items-center justify-center rounded-full text-sm font-medium
                  ${isCompleted || isActive
                    ? "bg-linear-to-r from-purple-500 to-indigo-500 text-white"
                    : "border border-gray-300 text-gray-400 bg-white dark:bg-gray-900 dark:border-gray-600"
                  }`}
              >
                {isCompleted ? "✓" : i + 1}
              </div>

              {i !== steps.length - 1 && (
                <div
                  className={`flex-1 h-2.5 ${isCompleted
                      ? "bg-linear-to-r from-purple-500 to-indigo-500"
                      : "bg-gray-200 dark:bg-gray-700"
                    }`}
                />
              )}

              <span
                className={`absolute top-12 text-xs ${isActive || isCompleted
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

      {/* Step Content */}
      <div className={isLoading ? "opacity-70 pointer-events-none" : ""}>
        {renderStep()}
      </div>
    </div>
  );
}