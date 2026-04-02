"use client";

import { useI18n } from "@/components/provider/I18nProvider";
import { useMemo, useState, useEffect } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { motion, cubicBezier } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import Link from "next/link";
import { useMerchentPlanPriceQuery } from "@/redux/features/merchant/merchantRegitraion";

type Billing = "monthly" | "annual";

interface Plan {
  id: number;
  name: string;
  title: string;
  price: string;
  currency: string;
  package: string;
}

interface PricingPlan {
  name: string;
  desc: string;
  priceMonthly: string;
  priceAnnual: string;
  cta: string;
  features: string[];
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

const featureVariant = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.35,
      ease: cubicBezier(0.25, 0.1, 0.25, 1),
    },
  }),
};

const mobileStatic = {
  hidden: { opacity: 1, x: 0 },
  visible: { opacity: 1, x: 0 },
};

export default function ChooseThePerfectPlan() {
  const { t, get } = useI18n();
  const isMobile = useIsMobile();
  const [billing, setBilling] = useState<Billing>("monthly");

  const basic = useMemo(() => get<PricingPlan>("Pricing.plans.basic"), [get]);
  const premium = useMemo(
    () => get<PricingPlan>("Pricing.plans.premium"),
    [get],
  );
  const { data, isLoading } = useMerchentPlanPriceQuery({});

  const plans = data?.data || [];
  // console.log(plans);

  const monthlyPlan = plans.find(
    (p: Plan) => p.package.toLowerCase() === "monthly",
  );
  const annualPlan = plans.find(
    (p: Plan) => p.package.toLowerCase() === "annual",
  );
  const currentPremiumPlan = billing === "monthly" ? monthlyPlan : annualPlan;

  const basicPrice =
    billing === "monthly" ? basic?.priceMonthly : basic?.priceAnnual;

  // console.log(currentPremiumPlan);

  // /*  USE get() FOR OBJECTS */
  // const basic = useMemo(() => get<PricingPlan>("Pricing.plans.basic"), [get]);

  // const premium = useMemo(
  //   () => get<PricingPlan>("Pricing.plans.premium"),
  //   [get],
  // );

  // const basicPrice =
  //   billing === "monthly" ? basic.priceMonthly : basic.priceAnnual;

  // const premiumPrice =
  //   billing === "monthly" ? premium.priceMonthly : premium.priceAnnual;

  return (
    <section className="w-full bg-white overflow-x-hidden">
      <div className="container mx-auto py-20 px-4">
        {/* ---------------- Heading ---------------- */}
        <motion.div
          className="flex flex-col items-center gap-5 py-10 text-center"
          initial={isMobile ? false : { opacity: 0, y: -24 }}
          whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-4xl lg:text-5xl font-semibold text-black">
            {t("Pricing.title")}
          </h2>

          <p className="w-11/12 md:w-9/12 lg:w-5/12 mx-auto text-[#4A4C56]">
            {t("Pricing.subtitle")}
          </p>

          <div className="bg-[#FAFAFA] p-2 flex gap-2 rounded-full shadow-sm">
            {(["monthly", "annual"] as Billing[]).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={[
                  "py-2 px-4 rounded-full font-semibold transition-all duration-300",
                  billing === b
                    ? "text-white bg-linear-to-r from-[#3CB3FF] to-[#7153FF] cursor-pointer"
                    : "text-slate-700 hover:bg-white cursor-pointer",
                ].join(" ")}
              >
                {t(`Pricing.billing.${b}`)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ---------------- Plans ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ---------------- Basic ---------------- */}
          <motion.div
            variants={isMobile ? mobileStatic : leftCardVariant}
            initial="hidden"
            whileInView="visible"
            className="bg-[#edeef0] text-black p-5 rounded-xl"
          >
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-3xl font-bold">{basic.name}</h3>
              <p className="py-4">{basic.desc}</p>

              <p className="py-4">
                <span className="text-4xl font-bold">{basicPrice}</span>
                <span className="px-1">/{t(`Pricing.billing.${billing}`)}</span>
              </p>
              <Link href={"/create-account"}>
                <button
                  type="button"
                  className="bg-white dark:bg-gray-900 px-6 py-3 rounded-md font-semibold text-gray-900 dark:text-white flex gap-3 items-center hover:opacity-90 cursor-pointer"
                >
                  {basic?.cta} free
                  <MdArrowOutward />
                </button>
              </Link>
            </div>

            <div className="p-6 space-y-5">
              {(basic.features ?? []).map((f, i) => (
                <motion.p
                  key={i}
                  custom={i}
                  variants={featureVariant}
                  initial="hidden"
                  whileInView="visible"
                  className="flex gap-3 items-center"
                >
                  <IoIosCheckmarkCircleOutline size={20} />
                  {f}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* ---------------- Premium ---------------- */}
          <motion.div
            variants={isMobile ? mobileStatic : rightCardVariant}
            initial="hidden"
            whileInView="visible"
            className="bg-linear-to-r from-blue-500 to-indigo-500 p-5 rounded-xl"
          >
            <div className="bg-white text-black rounded-xl p-6">
              <h3 className="text-3xl font-bold">{premium.name}</h3>
              <p className="py-4">{premium.desc}</p>

              <p>
                <span className="text-4xl font-bold">
                  {currentPremiumPlan?.price}
                </span>
                <span className="px-1">/{t(`Pricing.billing.${billing}`)}</span>
              </p>
              <Link href={"/create-account"}>
                <button
                  type="button"
                  className="bg-linear-to-r from-[#3CB3FF] to-[#7153FF] px-6 py-3 rounded-md font-semibold flex gap-3 items-center text-white my-5 hover:opacity-90 cursor-pointer"
                >
                  {premium?.cta}
                  <MdArrowOutward />
                </button>
              </Link>
            </div>

            <div className="p-6 space-y-5">
              {(premium.features ?? []).map((f, i) => (
                <motion.p
                  key={i}
                  custom={i}
                  variants={featureVariant}
                  initial="hidden"
                  whileInView="visible"
                  className="flex gap-2 items-center text-white"
                >
                  <IoIosCheckmarkCircleOutline size={20} />
                  {f}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
