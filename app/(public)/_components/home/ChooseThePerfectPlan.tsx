"use client";

import { useI18n } from "@/components/provider/I18nProvider";
import { useMemo, useState, useEffect } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { motion, cubicBezier } from "framer-motion";
import { Star } from "lucide-react";

type Billing = "monthly" | "annual";

interface PricingPlan {
  name: string;
  desc: string;
  priceMonthly: string;
  priceAnnual: string;
  cta: string;
  features: string[];
}

/* ---------------- MOBILE DETECTION (REAL BREAKPOINT) ---------------- */

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

/* ---------------- DESKTOP VARIANTS ---------------- */

const leftCardVariant = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: cubicBezier(0.25, 0.1, 0.25, 1),
    },
  },
};

const rightCardVariant = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: cubicBezier(0.25, 0.1, 0.25, 1),
    },
  },
};

const featureVariant = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.35,
      ease: cubicBezier(0.25, 0.1, 0.25, 1),
    },
  }),
};

/* ---------------- MOBILE (NO MOTION, NO X) ---------------- */

const mobileStatic = {
  hidden: { opacity: 1, x: 0 },
  visible: { opacity: 1, x: 0 },
};

export default function ChooseThePerfectPlan() {
  const { t, locale } = useI18n();
  const isMobile = useIsMobile();
  const [billing, setBilling] = useState<Billing>("monthly");

  const basic = useMemo(
    () => t("Pricing.plans.basic") as unknown as PricingPlan,
    [t]
  );

  const premium = useMemo(
    () => t("Pricing.plans.premium") as unknown as PricingPlan,
    [t]
  );

  const basicPrice =
    billing === "monthly" ? basic.priceMonthly : basic.priceAnnual;

  const premiumPrice =
    billing === "monthly" ? premium.priceMonthly : premium.priceAnnual;

  return (
    <section className="w-full bg-white overflow-x-hidden">
      <div className="container mx-auto py-20 px-4">
        {/* ---------------- Heading ---------------- */}
        <motion.div
          className="flex flex-col items-center gap-5 py-10 text-center"
          initial={isMobile ? false : { opacity: 0, y: -24 }}
          whileInView={isMobile ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{
            duration: 0.9,
            ease: cubicBezier(0.25, 0.1, 0.25, 1),
          }}
        >
          <h2 className="text-4xl lg:text-5xl font-semibold text-black">
            {t("Pricing.title")}
          </h2>

          <p className="w-11/12 md:w-9/12 lg:w-5/12 mx-auto text-[#4A4C56]">
            {t("Pricing.subtitle")}
          </p>

          {/* Billing Toggle */}
          <div className="bg-[#FAFAFA] p-2 flex items-center gap-2 rounded-full">
            {(["monthly", "annual"] as Billing[]).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={[
                  "py-2 px-4 rounded-full text-sm font-semibold transition cursor-pointer",
                  billing === b
                    ? "text-white bg-linear-to-r from-[#3CB3FF] to-[#7153FF]"
                    : "text-slate-700 hover:bg-white",
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
            viewport={{ once: false, amount: 0.6 }}
            className="bg-[#edeef0] p-5 rounded-xl transition-shadow hover:shadow-lg"
          >
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-3xl font-bold text-black">{basic.name}</h3>

              <p className="py-3 text-slate-700 text-[16px]">{basic.desc}</p>

              <p>
                <span className="text-4xl font-bold text-black">
                  {basicPrice}
                </span>
                <span className="text-sm text-slate-700 px-1">
                  /{t(`Pricing.billing.${billing}`)}
                </span>
              </p>

              <button className="mt-5 w-full bg-white cursor-pointer border text-black border-slate-200 px-6 py-3 rounded-md font-semibold flex justify-center gap-2 items-center group">
                {basic.cta}
                <MdArrowOutward className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {basic.features.map((f, i) => (
                <motion.p
                  key={i}
                  custom={i}
                  variants={isMobile ? mobileStatic : featureVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.8 }}
                  className="flex gap-3 items-center text-black"
                >
                  <IoIosCheckmarkCircleOutline
                    className="bg-linear-to-l from-indigo-500 to-blue-500 rounded-full text-white"
                    size={20}
                  />
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
            viewport={{ once: false, amount: 0.6 }}
            className="bg-linear-to-r from-blue-500 to-indigo-500 p-5 rounded-xl transition-shadow hover:shadow-xl"
          >
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center gap-4">
                <h3 className="text-3xl font-bold text-black">
                  {premium.name}
                </h3>

                <span className="bg-linear-to-r gap-2 flex justify-center items-center w-40 from-blue-500 to-indigo-500 px-4 py-1 rounded-full text-sm font-medium shadow">
                  <Star /> Most Popular
                </span>
              </div>

              <p className="py-4 text-slate-700 text-[16px]">{premium.desc}</p>

              <p>
                <span className="text-4xl font-bold text-black">
                  {premiumPrice}
                </span>
                <span className="text-sm text-slate-700 px-1">
                  /{t(`Pricing.billing.${billing}`)}
                </span>
              </p>

              <button className="mt-5 w-full bg-linear-to-r cursor-pointer from-blue-500 to-indigo-500 px-6 py-3 rounded-md font-semibold text-white flex justify-center gap-2 items-center group">
                {premium.cta}
                <MdArrowOutward
                  className={`transition-transform group-hover:translate-x-1 ${
                    locale === "ar" ? "rotate-270" : ""
                  }`}
                />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {premium.features.map((f, i) => (
                <motion.p
                  key={i}
                  custom={i}
                  variants={isMobile ? mobileStatic : featureVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.8 }}
                  className="flex gap-2 items-center text-white"
                >
                  <IoIosCheckmarkCircleOutline
                    size={20}
                    className="bg-white text-black rounded-full"
                  />
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
