"use client";

import PaymentDetailsModal from "@/app/(private)/merchant/dashboard/components/modal/PaymentDetailsModal";
import { useI18n } from "@/components/provider/I18nProvider";
import React, { useMemo, useState, useEffect } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { motion, cubicBezier } from "framer-motion";
import { useMerchentPlanPriceQuery } from "@/redux/features/merchant/merchantRegitraion";

type Billing = "monthly" | "annual";
interface Plan {
  id: number;
  name: string;
  title: string;
  price: string;
  currency: string;
  package: string;
  day: number;
  features: string[];
  status: boolean;
}

function getPlansByBilling(plans: Plan[], billing: Billing): Plan[] {
  const freePlan = plans.find((plan) => plan.package.toLowerCase() === "free");

  const matchedPlan = plans.find(
    (plan) =>
      plan.package.toLowerCase() === billing &&
      plan.package.toLowerCase() !== "free",
  );

  const result: Plan[] = [];

  if (freePlan) result.push(freePlan);
  if (matchedPlan) result.push(matchedPlan);

  return result;
}

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

  const plans = data?.data || [];

  const basicPlan = plans.find((p: Plan) => p.package.toLowerCase() === "free");
  const monthlyPlan = plans.find(
    (p: Plan) => p.package.toLowerCase() === "monthly",
  );
  const annualPlan = plans.find(
    (p: Plan) => p.package.toLowerCase() === "annual",
  );

  const currentPremiumPlan = billing === "monthly" ? monthlyPlan : annualPlan;

  const basicFeatures = Array.isArray(basic?.features) ? basic.features : [];
  const premiumFeatures = Array.isArray(premium?.features)
    ? premium.features
    : [];

  const basicPrice =
    billing === "monthly" ? basic?.priceMonthly : basic?.priceAnnual;

  const handleBasicPlan = async () => {
    // console.log("basicPlan======", basicPlan);
    if (basicPlan) {
      onNext({ plan_id: basicPlan.id });
    } else {
      onNext({ plan_id: 1 });
    }
  };

  const handlePremiumPlan = async () => {
    // console.log("currentPremiumPlan==========", currentPremiumPlan);
    if (currentPremiumPlan) {
      onNext({ plan_id: currentPremiumPlan.id });
    } else if (monthlyPlan && billing === "monthly") {
      onNext({ plan_id: monthlyPlan.id });
    } else if (annualPlan && billing === "annual") {
      onNext({ plan_id: annualPlan.id });
    } else {
      onNext({ plan_id: billing === "monthly" ? 2 : 3 });
    }
  };

  const handlePremiumNext = () => {
    setOpen(false);
    onNext({ plan_id: 3 });
    setTimeout(() => onNext({ plan_id: 4 }), 500);
  };

  const [basicplan, premeumPlan] = getPlansByBilling(plans, billing);

  return (
    <section className="w-full bg-white dark:bg-gray-900">
      <div className="container mx-auto py-5 md:px-4">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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
                  onClick={handleBasicPlan}
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
                <span className="text-4xl font-bold">
                  {premeumPlan?.price || currentPremiumPlan?.price}
                </span>
                <span className="text-sm text-slate-500 dark:text-gray-400">
                  /{t(`Pricing.billing.${billing}`)}
                </span>
              </p>
              <button
                type="button"
                onClick={handlePremiumPlan}
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
