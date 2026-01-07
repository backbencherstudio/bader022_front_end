"use client";

import PaymentDetailsModal from "@/app/(private)/merchant/dashboard/components/modal/PaymentDetailsModal";
import { useI18n } from "@/components/provider/I18nProvider";
import React, { useMemo, useState } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";

type Billing = "monthly" | "annual";

interface PricingPlan {
  name: string;
  desc: string;
  priceMonthly: string;
  priceAnnual: string;
  cta: string;
  features: string[];
}

export default function ChooseThePerfectPlan() {
  const { t, locale } = useI18n();
  const [billing, setBilling] = useState<Billing>("monthly");

  const basic = useMemo(
    () => t("Pricing.plans.basic") as unknown as PricingPlan,
    [t]
  );
  const premium = useMemo(
    () => t("Pricing.plans.premium") as unknown as PricingPlan,
    [t]
  );

  const basicFeatures = useMemo(() => {
    const f = basic?.features;
    return Array.isArray(f) ? f : [];
  }, [basic]);

  const premiumFeatures = useMemo(() => {
    const f = premium?.features;
    return Array.isArray(f) ? f : [];
  }, [premium]);

  const basicPrice =
    billing === "monthly" ? basic?.priceMonthly : basic?.priceAnnual;

  const premiumPrice =
    billing === "monthly" ? premium?.priceMonthly : premium?.priceAnnual;

  const [open, setOpen] = useState(false);

  return (
    <section className="w-full">
      <div className="container mx-auto py-20 px-4">
        {/* Heading */}
        <div className="flex flex-col items-center gap-5 py-10 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-semibold">
            {t("Pricing.title")}
          </h2>

          <p className="w-11/12 md:w-9/12 lg:w-5/12 mx-auto text-[#4A4C56]">
            {t("Pricing.subtitle")}
          </p>

          {/* Billing Toggle */}
          <div className="bg-[#FAFAFA] p-2 flex items-center gap-2 rounded-full">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={[
                "py-2 px-4 rounded-full text-sm font-semibold transition cursor-pointer",
                billing === "monthly"
                  ? "text-white bg-linear-to-r from-[#3CB3FF] to-[#7153FF]"
                  : "text-slate-700 hover:bg-white",
              ].join(" ")}
            >
              {t("Pricing.billing.monthly")}
            </button>

            <button
              type="button"
              onClick={() => setBilling("annual")}
              className={[
                "py-2 px-4 rounded-full text-sm font-semibold transition cursor-pointer",
                billing === "annual"
                  ? "text-white bg-linear-to-r from-[#3CB3FF] to-[#7153FF]"
                  : "text-slate-700 hover:bg-white",
              ].join(" ")}
            >
              {t("Pricing.billing.annual")}
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Basic */}
          <div className="bg-[#F9FAFB] border-amber-50 p-5 rounded-md">
            <div className="bg-white shadow rounded-md p-5">
              <h3 className="text-xl font-bold">{basic?.name}</h3>

              <p className="py-3 text-slate-700">{basic?.desc}</p>

              <p className="text-slate-900">
                <span className="text-4xl font-bold">{basicPrice}</span>
                <span className="text-sm text-slate-500">
                  /{t(`Pricing.billing.${billing}`)}
                </span>
              </p>

              <div className="inline-block p-0.5 rounded-md bg-linear-to-r from-[#3CB3FF] to-[#7153FF] my-5">
                <button className="bg-white px-6 py-3 rounded-md font-semibold text-gray-900 flex gap-3 items-center cursor-pointer">
                  {basic?.cta}
                  <MdArrowOutward
                    className={locale === "ar" ? "rotate-270" : ""}
                  />
                </button>
              </div>
            </div>

            <div className="p-5 space-y-3">
              {basicFeatures.map((f: string, idx: number) => (
                <p key={idx} className="flex gap-2 items-center text-slate-700">
                  <IoIosCheckmarkCircleOutline />
                  {f}
                </p>
              ))}
            </div>
          </div>

          {/* Premium */}
          <div className="bg-linear-to-r from-[#3CB3FF] to-[#7153FF] p-5 rounded-md">
            <div className="bg-[#F9FAFB] shadow rounded-md p-5">
              <h3 className="text-xl font-bold">{premium?.name}</h3>

              <p className="py-3 text-slate-700">{premium?.desc}</p>

              <p className="text-slate-900">
                <span className="text-4xl font-bold">{premiumPrice}</span>
                <span className="text-sm text-slate-500">
                  /{t(`Pricing.billing.${billing}`)}
                </span>
              </p>

              <button
                onClick={() => setOpen(true)}
                className="bg-linear-to-r from-[#3CB3FF] to-[#7153FF] px-6 py-3 rounded-md font-semibold flex gap-3 items-center text-white my-5 cursor-pointer"
              >
                {premium?.cta}
                <MdArrowOutward
                  className={locale === "ar" ? "rotate-270" : ""}
                />
              </button>
            </div>

            <div className="p-5 space-y-3">
              {premiumFeatures.map((f: string, idx: number) => (
                <p key={idx} className="flex gap-2 items-center text-white">
                  <IoIosCheckmarkCircleOutline />
                  {f}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <PaymentDetailsModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
