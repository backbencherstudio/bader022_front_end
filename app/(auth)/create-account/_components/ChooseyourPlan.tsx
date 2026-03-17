"use client";

import PaymentDetailsModal from "@/app/(private)/merchant/dashboard/components/modal/PaymentDetailsModal";
import { useI18n } from "@/components/provider/I18nProvider";
import React, { useMemo, useState, useEffect } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { motion, cubicBezier } from "framer-motion";
import { useMerchentPlanPriceQuery } from "@/redux/features/merchant/merchantRegitraion";

type Billing = "monthly" | "annual";

interface PricingPlan {
  name: string;
  desc: string;
  priceMonthly: string;
  priceAnnual: string;
  cta: string;
  features: string[];
}

type Step3Data = {
  plan_id: number;
};

interface Step3Props {
  defaultPlan: number;
  onNext: (values: Step3Data) => void;
  onPrevious: () => void;
}

/* ---------------- MOBILE DETECTION ---------------- */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

/* ---------------- MOTION VARIANTS ---------------- */
const leftCardVariant = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.1, ease: cubicBezier(0.25, 0.1, 0.25, 1) },
  },
};

const rightCardVariant = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.1, ease: cubicBezier(0.25, 0.1, 0.25, 1) },
  },
};

const mobileStatic = {
  hidden: { opacity: 1, x: 0 },
  visible: { opacity: 1, x: 0 },
};

/* ---------------- COMPONENT ---------------- */
export default function ChooseyourPlan({
  defaultPlan,
  onNext,
  onPrevious,
}: Step3Props) {
  const { t, get, locale } = useI18n();
  const isMobile = useIsMobile();
  const [billing, setBilling] = useState<Billing>("monthly");
  const [open, setOpen] = useState(false);

  const basic = useMemo(() => get<PricingPlan>("Pricing.plans.basic"), [get]);
  const premium = useMemo(
    () => get<PricingPlan>("Pricing.plans.premium"),
    [get],
  );

  const { data, isLoading } = useMerchentPlanPriceQuery({});

  useEffect(() => {
    if (!isLoading && data) {
      console.log(data, "-=-=-=-=-0=-");
    }
  }, [data, isLoading]);



  const plan = data?.data?.find((p: any) => p.id === defaultPlan);
const premiumPrice = plan ? plan.price : "-"; 
console.log(plan.id,"")

const getPlanPrice = (planId: number, billingType: Billing) => {
  const matchedPlan = data?.data?.find(
    (p: any) =>
      p.id === planId &&
      ((billingType === "monthly" && p.package.toLowerCase() === "monthly") ||
       (billingType === "annual" && p.package.toLowerCase() === "annual"))
  );
  return matchedPlan ? matchedPlan.price : "-";
};

  const basicFeatures = Array.isArray(basic?.features) ? basic.features : [];
  const premiumFeatures = Array.isArray(premium?.features)
    ? premium.features
    : [];

  const basicPrice =
    billing === "monthly" ? basic?.priceMonthly : basic?.priceAnnual;

  

  const handleBasicPlan = () => {
    onNext({ plan_id: 1 });
    // onNext({ plan_id: 3 });
  };

  const handlePremiumPlan = () => {

    window.location.href = "https://checkout.tap.company/?mode=page&themeMode=&language=en&token=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY5YjY0ZWFjYzY3OTdhNTQ3ZjZkZjQzNSJ9.fBHtE1hQvo_M1hLSad345aUOqfajI-KO4PpU2FoL36s";
  };

  const handlePremiumNext = () => {
    setOpen(false);
    onNext({ plan_id: 3 });
    setTimeout(() => onNext({ plan_id: 4 }), 500);
  };

  return (
    <section className="w-full bg-white dark:bg-gray-900">
      <div className="container mx-auto py-5 md:px-4">
        {/* Billing Toggle */}
        <div className="flex justify-center mb-5 gap-2 w-[300px] mx-auto bg-[#FAFAFA] dark:bg-gray-800 p-2 rounded-full">
          {(["monthly", "annual"] as Billing[]).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBilling(b)}
              className={[
                "py-2 px-4 rounded-full text-sm font-semibold transition cursor-pointer",
                billing === b
                  ? "text-white bg-linear-to-r from-[#3CB3FF] to-[#7153FF]"
                  : "text-slate-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700",
              ].join(" ")}
            >
              {t(`Pricing.billing.${b}`)}
            </button>
          ))}
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Basic */}
          <motion.div
            variants={isMobile ? mobileStatic : leftCardVariant}
            initial="hidden"
            whileInView="visible"
            className="bg-[#F9FAFB] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 md:p-5 rounded-md"
          >
            <div className="bg-white dark:bg-gray-900 shadow rounded-md p-5">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {basic?.name}
              </h3>
              <p className="py-3 text-slate-700 dark:text-gray-400">
                {basic?.desc}
              </p>
              <p className="text-gray-900 dark:text-white">
                <span className="text-4xl font-bold">{basicPrice}</span>
                <span className="text-sm text-slate-500 dark:text-gray-400">
                  /{t(`Pricing.billing.${billing}`)}
                </span>
              </p>
              <div className="inline-block p-0.5 rounded-md bg-linear-to-r from-[#3CB3FF] to-[#7153FF] my-5">
                <button
                  type="button"
                  onClick={handleBasicPlan} // Trigger step 4 directly after basic plan
                  className="bg-white dark:bg-gray-900 px-6 py-3 rounded-md font-semibold text-gray-900 dark:text-white flex gap-3 items-center hover:opacity-90 cursor-pointer"
                >
                  {basic?.cta} 
                  <MdArrowOutward
                    className={locale === "ar" ? "rotate-270" : ""}
                  />
                </button>
              </div>
            </div>

            <div className="p-5 space-y-3">
              {basicFeatures.map((f, idx) => (
                <p
                  key={idx}
                  className="flex gap-2 items-center text-slate-700 dark:text-gray-300"
                >
                  <IoIosCheckmarkCircleOutline />
                  {f}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Premium */}
          <motion.div
            variants={isMobile ? mobileStatic : rightCardVariant}
            initial="hidden"
            whileInView="visible"
            className="bg-linear-to-r from-[#3CB3FF] to-[#7153FF] p-5 rounded-md"
          >
            <div className="bg-[#F9FAFB] dark:bg-gray-900 shadow rounded-md p-5">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {premium?.name}
              </h3>
              <p className="py-3 text-slate-700 dark:text-gray-400">
                {premium?.desc}
              </p>
              <p className="text-gray-900 dark:text-white">
                <span className="text-4xl font-bold">{premiumPrice}</span>
                <span className="text-sm text-slate-500 dark:text-gray-400">
                  /{t(`Pricing.billing.${billing}`)}
                </span>
              </p>
              <button
                type="button"
                onClick={handlePremiumPlan} // Proceed with Premium plan
                className="bg-linear-to-r from-[#3CB3FF] to-[#7153FF] px-6 py-3 rounded-md font-semibold flex gap-3 items-center text-white my-5 hover:opacity-90 cursor-pointer"
              >
              
                {premium?.cta}
                <MdArrowOutward
                  className={locale === "ar" ? "rotate-270" : ""}
                />
              </button>
            </div>
            <div className="p-5 space-y-3">
              {premiumFeatures.map((f, idx) => (
                <p key={idx} className="flex gap-2 items-center text-white">
                  <IoIosCheckmarkCircleOutline />
                  {f}
                </p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onPrevious}
            className="rounded-md cursor-pointer border px-6 py-2 text-sm text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {t("Pricing.BusinessInfo.backButton") || "Back"}
          </button>
        </div>
      </div>

      <PaymentDetailsModal
        open={open}
        onClose={() => setOpen(false)}
        onNext={handlePremiumNext}
      />

    </section>
  );
}
