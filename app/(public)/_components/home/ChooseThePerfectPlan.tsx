"use client";

import { useI18n } from "@/components/provider/I18nProvider";
import React, { useMemo, useState } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { motion, cubicBezier } from "framer-motion";

type Billing = "monthly" | "annual";

interface PricingPlan {
  name: string;
  desc: string;
  priceMonthly: string;
  priceAnnual: string;
  cta: string;
  features: string[];
}

/* ------------------ Motion Variants ------------------ */

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

  const basicPrice =
    billing === "monthly" ? basic?.priceMonthly : basic?.priceAnnual;

  const premiumPrice =
    billing === "monthly" ? premium?.priceMonthly : premium?.priceAnnual;

  return (
    <section className="w-full bg-white">
      <div className="container mx-auto py-20 px-4">
        {/* ---------------- Heading ---------------- */}
        <motion.div
          className="flex flex-col items-center gap-5 py-10 text-center"
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{
            duration: 0.9,
            ease: cubicBezier(0.25, 0.1, 0.25, 1),
          }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-semibold">
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
          {/* ---------------- Basic (FROM LEFT) ---------------- */}
          <motion.div
            variants={leftCardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.6 }}
            className="bg-[#F9FAFB] p-5 rounded-xl transition-shadow hover:shadow-lg"
          >
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold">{basic?.name}</h3>
              <p className="py-3 text-slate-700">{basic?.desc}</p>

              <p>
                <span className="text-4xl font-bold">{basicPrice}</span>
                <span className="text-sm text-slate-500">
                  /{t(`Pricing.billing.${billing}`)}
                </span>
              </p>

              <button className="mt-5 w-full bg-white border border-slate-200 px-6 py-3 rounded-md font-semibold flex justify-center gap-2 items-center group">
                {basic?.cta}
                <MdArrowOutward className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="p-6 space-y-3">
              {basic?.features?.map((f, i) => (
                <motion.p
                  key={i}
                  custom={i}
                  variants={featureVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.8 }}
                  className="flex gap-2 items-center text-slate-700"
                >
                  <IoIosCheckmarkCircleOutline />
                  {f}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* ---------------- Premium (FROM RIGHT) ---------------- */}
          <motion.div
            variants={rightCardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.6 }}
            className="relative bg-linear-to-r from-[#3CB3FF] to-[#7153FF] p-5 rounded-xl transition-shadow hover:shadow-xl"
          >
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-indigo-600 px-4 py-1 rounded-full text-sm font-semibold shadow">
              Most Popular
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold">{premium?.name}</h3>
              <p className="py-3 text-slate-700">{premium?.desc}</p>

              <p>
                <span className="text-4xl font-bold">{premiumPrice}</span>
                <span className="text-sm text-slate-500">
                  /{t(`Pricing.billing.${billing}`)}
                </span>
              </p>

              <button className="mt-5 w-full bg-linear-to-r from-[#3CB3FF] to-[#7153FF] px-6 py-3 rounded-md font-semibold text-white flex justify-center gap-2 items-center group">
                {premium?.cta}
                <MdArrowOutward
                  className={`transition-transform group-hover:translate-x-1 ${
                    locale === "ar" ? "rotate-270" : ""
                  }`}
                />
              </button>
            </div>

            <div className="p-6 space-y-3">
              {premium?.features?.map((f, i) => (
                <motion.p
                  key={i}
                  custom={i}
                  variants={featureVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.8 }}
                  className="flex gap-2 items-center text-white"
                >
                  <IoIosCheckmarkCircleOutline />
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
