//

"use client";

import { useMemo } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { useI18n } from "@/components/provider/I18nProvider";

type PrivacyItem = { title: string; content: string };

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function PrivacyPolicy() {
  const { t, locale, get } = useI18n();
  const isRTL = locale === "ar";
  const reduceMotion = useReducedMotion();

  const items = useMemo(() => {
    return get<PrivacyItem[]>("Privacy.items") ?? [];
  }, [get]);

  return (
    <section
      id="privacy-section"
      className="w-full bg-slate-50 py-20 scroll-mt-20"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div
          className={`mb-16 flex flex-col ${
            isRTL ? "items-end text-right" : "items-start text-left"
          }`}
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-3"
          >
            {t("Privacy.last_updated")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6"
          >
            {t("Privacy.title")}
          </motion.h1>

          <div className="h-1.5 w-24 bg-indigo-600 rounded-full mb-6" />

          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed whitespace-pre-line">
            {t("Privacy.subtitle")}
          </p>
        </div>

        {/* Content */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              variants={reduceMotion ? ({} as Variants) : itemVariant}
              className={`flex flex-col md:flex-row gap-6 md:gap-12 pb-12 border-b border-slate-200 last:border-0 ${
                isRTL ? "md:flex-row-reverse text-right" : "text-left"
              }`}
            >
              {/* Number */}
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm text-indigo-600 font-bold text-xl">
                  {idx + 1}
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                  {item.title}
                </h2>

                <div className="prose prose-slate max-w-none">
                  {item.content.split("\n").map((line, i) => {
                    // bullet points
                    if (line.trim().startsWith("•")) {
                      return (
                        <li
                          key={i}
                          className="ml-5 list-disc text-slate-600 text-lg"
                        >
                          {line.replace("• ", "")}
                        </li>
                      );
                    }

                    // empty line spacing
                    if (line.trim() === "") {
                      return <div key={i} className="h-2" />;
                    }

                    // sub-heading style (optional improvement)
                    if (
                      line === line.toUpperCase() &&
                      line.length < 50 &&
                      !line.includes(".")
                    ) {
                      return (
                        <p
                          key={i}
                          className="font-semibold text-slate-800 mt-3"
                        >
                          {line}
                        </p>
                      );
                    }

                    return (
                      <p
                        key={i}
                        className="text-slate-600 text-lg leading-relaxed"
                      >
                        {line}
                      </p>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className={`mt-16 p-8 rounded-2xl bg-indigo-50 border border-indigo-100 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          <h3 className="text-indigo-900 font-bold mb-2">
            {t("Privacy.contact_title")}
          </h3>

          <p className="text-indigo-800/80 whitespace-pre-line">
            {t("Privacy.contact_text")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
