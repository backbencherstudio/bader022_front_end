"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/components/provider/I18nProvider";
import { Star } from "lucide-react";

type Row = { feature: string; free: string; premium: string };

export function FeatureComparison() {
  const { t, locale } = useI18n();

  const rows = useMemo(() => {
    const value = t("FeatureComparison.rows");
    return Array.isArray(value) ? (value as Row[]) : [];
  }, [t]);

  const sections = [
    { title: "Booking", items: rows.slice(0, 3) },
    { title: "Growth", items: rows.slice(3, 5) },
    { title: "Analytics", items: rows.slice(5) },
  ];

  const isLocked = (value: string) => {
    const v = value.trim();
    return ["✘", "❌", "x", "X"].includes(v);
  };

  return (
    <section className="container mx-auto py-20 px-4">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl md:text-5xl font-semibold text-black mb-4">
          {t("FeatureComparison.title")}
        </h2>
        <p className="text-[16px] text-gray-700">
          {t("FeatureComparison.subtitleLine1")}
          <br />
          {t("FeatureComparison.subtitleLine2")}
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid md:grid-cols-[1fr_1.15fr] gap-10 max-w-6xl mx-auto">
        {/* FREE PLAN */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-white border-2 border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.08)] p-8"
        >
          <h3 className="text-2xl font-bold text-black text-center mb-10">
            {t("FeatureComparison.columns.free")}
          </h3>

          {sections.map((section) => (
            <div key={section.title} className="mb-8">
              <div className="text-2xl border-b border-gray-400 leading-10 font-semibold text-gray-700 mb-4">
                {section.title}
              </div>

              <div className="space-y-4">
                {section.items.map((row, idx) => (
                  <div key={idx}>
                    <div className="font-medium text-gray-900 text-[18px]">
                      {row.feature}
                    </div>
                    <div
                      className={`text-[16px] ${
                        isLocked(row.free) ? "text-black my-2" : "text-black"
                      }`}
                    >
                      {isLocked(row.free)
                        ? t("FeatureComparison.upgrade") ?? "Upgrade to unlock"
                        : row.free}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* PREMIUM PLAN */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl border-2 border-[#3CB3FF]  shadow-[0_25px_70px_rgba(60,179,255,0.35)] p-10 pt-0"
        >
          {/* Badge */}
          <div className="flex justify-end pt-3">
            <span className="bg-linear-to-r gap-2 flex justify-center items-center w-40 from-blue-500 to-indigo-500 px-4 py-1 rounded-full text-sm font-medium shadow">
              <Star /> Most Popular
            </span>
          </div>

          <h3 className="text-3xl font-bold text-black text-center mb-8">
            {t("FeatureComparison.columns.premium")}
          </h3>

          {sections.map((section) => (
            <div key={section.title} className="mb-4">
              <div className="text-2xl border-b border-gray-400 leading-10 font-semibold text-gray-700 mb-2">
                {section.title}
              </div>

              <div className="space-y-3">
                {section.items.map((row, idx) => (
                  <div key={idx}>
                    <div className="font-semibold text-gray-900 mb-2 text-[18px]">
                      {row.feature}
                    </div>
                    <div className="text-[16px] font-medium text-[#7153FF]">
                      {row.premium}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
