"use client";

import { cubicBezier, motion, useReducedMotion } from "framer-motion";
import { UserPlus, Settings, CalendarDays } from "lucide-react";
import { useI18n } from "@/components/provider/I18nProvider";

/* ------------------ ICONS ------------------ */
const ICONS = [UserPlus, Settings, CalendarDays];

/* ------------------ DESKTOP CARD VARIANTS ------------------ */
const desktopCardVariants = [
  {
    hidden: { opacity: 0, x: -72 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.35,
        ease: cubicBezier(0.25, 0.1, 0.25, 1),
      },
    },
    hover: {
      y: -6,
      boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)",
      transition: { duration: 0.3 },
    },
  },
  {
    hidden: { opacity: 0, y: 72 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.35,
        ease: cubicBezier(0.25, 0.1, 0.25, 1),
      },
    },
    hover: {
      y: -6,
      boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)",
      transition: { duration: 0.3 },
    },
  },
  {
    hidden: { opacity: 0, x: 72 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.35,
        ease: cubicBezier(0.25, 0.1, 0.25, 1),
      },
    },
    hover: {
      y: -6,
      boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)",
      transition: { duration: 0.3 },
    },
  },
];

/* ------------------ MOBILE VARIANTS ------------------ */
const mobileCardVariant = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

const desktopTitleVariant = {
  hidden: { opacity: 0, y: -48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },
};

const mobileTitleVariant = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

type HowItWorksStep = {
  step: string;
  title: string;
  desc: string;
};

export default function HowBokliWorks() {
  const { t, get } = useI18n();
  const reduceMotion = useReducedMotion();

  /** ✅ Correct way to read array data from i18n */
  const steps = get<HowItWorksStep[]>("HowItWorks.steps") ?? [];

  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        {/* ---------------- Title ---------------- */}
        <motion.div
          className="mx-auto text-center"
          variants={reduceMotion ? mobileTitleVariant : desktopTitleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-slate-900 md:text-[48px]">
            {t("HowItWorks.title")}
          </h2>

          <p className="mt-4 text-[16px] text-slate-600">
            {t("HowItWorks.subtitle")}
          </p>
        </motion.div>

        {/* ---------------- Cards ---------------- */}
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, index) => {
            const Icon = ICONS[index] ?? UserPlus;
            const variants = reduceMotion
              ? mobileCardVariant
              : desktopCardVariants[index % desktopCardVariants.length];

            return (
              <motion.div
                key={s.step}
                variants={variants}
                initial="hidden"
                whileInView="visible"
                whileHover={reduceMotion ? undefined : "hover"}
                viewport={{ once: true }}
                className="rounded-xl border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>

                  <span className="rounded-md bg-blue-50 px-3 py-1 text-[18px] font-medium text-blue-600">
                    {s.step}
                  </span>
                </div>

                <h3 className="my-6 text-xl font-semibold text-slate-900 md:text-[24px]">
                  {s.title}
                </h3>

                <p className="text-[16px] leading-7 text-slate-600">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
