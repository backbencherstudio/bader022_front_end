"use client";

import { cubicBezier, motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { useI18n } from "@/components/provider/I18nProvider";
import { UserPlus, Settings, CalendarDays } from "lucide-react";

const ICONS = [UserPlus, Settings, CalendarDays];

/* ------------------ VERY SLOW CARD VARIANTS ------------------ */
const cardVariants = [
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
      transition: {
        duration: 0.3,
        ease: cubicBezier(0.25, 0.1, 0.25, 1),
      },
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
      transition: {
        duration: 0.3,
        ease: cubicBezier(0.25, 0.1, 0.25, 1),
      },
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
      transition: {
        duration: 0.3,
        ease: cubicBezier(0.25, 0.1, 0.25, 1),
      },
    },
  },
];

export default function HowBokliWorks() {
  const { t } = useI18n();

  const steps = t("HowItWorks.steps") as unknown as Array<{
    step: string;
    title: string;
    desc: string;
  }>;

  /* ------------------ Title Controls ------------------ */
  const titleControls = useAnimationControls();

  useEffect(() => {
    titleControls.start({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: cubicBezier(0.25, 0.1, 0.25, 1),
      },
    });
  }, [titleControls]);

  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        {/* ---------------- Title ---------------- */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 36 }}
          animate={titleControls}
        >
          <h2 className="text-3xl md:text-[48px] font-semibold text-slate-900">
            {t("HowItWorks.title")}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-slate-600">
            {t("HowItWorks.subtitle")}
          </p>
        </motion.div>

        {/* ---------------- Cards ---------------- */}
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, index) => {
            const Icon = ICONS[index] ?? UserPlus;
            const variants = cardVariants[index % cardVariants.length];

            return (
              <motion.div
                key={s.step}
                variants={variants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{
                  once: false,
                  amount: 0.85, // 🔥 trigger when almost fully visible
                }}
                className="rounded-xl border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>

                  <span className="rounded-md bg-blue-50 px-3 py-1 text-[14px] font-medium text-blue-600">
                    {s.step}
                  </span>
                </div>

                <h3 className="mt-5 text-xl md:text-[24px] font-semibold text-slate-900">
                  {s.title}
                </h3>

                <p className="mt-2 text-[16px] leading-relaxed text-slate-600">
                  {s.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
