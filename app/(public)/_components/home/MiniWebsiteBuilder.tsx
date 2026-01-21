"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  Check,
  ImageIcon,
  Palette,
  LayoutGrid,
  Globe,
} from "lucide-react";
import { useMemo } from "react";
import { motion, cubicBezier } from "framer-motion";
import { useI18n } from "@/components/provider/I18nProvider";

const ICONS = [
  <Palette key="palette" className="h-4 w-4 text-blue-600" />,
  <ImageIcon key="image" className="h-4 w-4 text-blue-600" />,
  <LayoutGrid key="layout" className="h-4 w-4 text-blue-600" />,
  <Globe key="globe" className="h-4 w-4 text-blue-600" />,
];

/* ------------------ SLOW CINEMATIC MOTION ------------------ */

/* LEFT → RIGHT */
const leftVariant = {
  hidden: {
    opacity: 0,
    x: -80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.6, //
      ease: cubicBezier(0.2, 0.8, 0.2, 1),
    },
  },
};

/* RIGHT → LEFT */
const rightVariant = {
  hidden: {
    opacity: 0,
    x: 80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.6, //
      ease: cubicBezier(0.2, 0.8, 0.2, 1),
    },
  },
};

/* OPTION TILES (SOFT) */
const tileVariant = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: cubicBezier(0.2, 0.8, 0.2, 1),
    },
  },
};

export default function MiniWebsiteBuilder() {
  const { t, locale, get } = useI18n();
  const topOptions = useMemo<string[]>(() => {
    return get<string[]>("MiniWebsiteBuilder.topOptions") ?? [];
  }, [get]);

  const extraLeft = useMemo<string[]>(() => {
    return get<string[]>("MiniWebsiteBuilder.extraLeft") ?? [];
  }, [get]);

  const extraRight = useMemo<string[]>(() => {
    return get<string[]>("MiniWebsiteBuilder.extraRight") ?? [];
  }, [get]);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-sky-50 via-white to-indigo-50" />

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
          {/* ================= LEFT ================= */}
          <motion.div
            variants={leftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.55 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
              {t("MiniWebsiteBuilder.title")}
            </h2>

            <p className="mt-4 max-w-lg  leading-relaxed text-slate-600">
              {t("MiniWebsiteBuilder.subtitle")}
            </p>

            {/* OPTION TILES */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {topOptions.map((label, idx) => (
                <motion.div
                  key={label}
                  variants={tileVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.7 }}
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-3 rounded-lg border border-slate-100 bg-white px-4 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    {ICONS[idx]}
                  </div>
                  <p className=" font-semibold text-slate-900">{label}</p>
                </motion.div>
              ))}
            </div>

            {/* ADDITIONAL FEATURES */}
            <div className="mt-6 rounded-xl border border-slate-100 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
              <p className=" font-bold text-slate-900">
                {t("MiniWebsiteBuilder.additionalTitle")}
              </p>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[extraLeft, extraRight].map((list, idx) => (
                  <ul key={idx} className="space-y-3">
                    {list.map((txt) => (
                      <li
                        key={txt}
                        className={`flex items-center gap-2  text-slate-700 ${
                          locale === "ar"
                            ? "flex-row-reverse justify-end text-right"
                            : ""
                        }`}
                      >
                        <span className="flex h-4 w-4 items-center justify-center rounded bg-blue-600">
                          <Check className="h-3 w-3 text-white" />
                        </span>
                        {txt}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10">
              <Button className="group w-fit rounded-lg px-5 py-6 text-[16px] text-white font-semibold bg-linear-to-l from-indigo-500 to-blue-500 hover:opacity-90">
                {t("MiniWebsiteBuilder.cta")}
                <ArrowUpRight
                  size={18}
                  className={`ml-2 transition-transform group-hover:translate-x-1 ${
                    locale === "ar" ? "rotate-270 ml-0 mr-2" : ""
                  }`}
                />
              </Button>
            </div>
          </motion.div>

          {/* ================= RIGHT ================= */}
          <motion.div
            variants={rightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.55 }}
            className="lg:pl-6"
          >
            <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
              <div className="relative w-full h-[220px] md:h-[260px] overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
                <Image
                  src="/images/miniwebsitebuilder1.png"
                  alt="Mini website preview hero"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center">
                <div className="relative h-[160px] w-full overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
                  <Image
                    src="/images/miniwebsitebuilder2.png"
                    alt="Mini website preview section"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className={locale === "ar" ? "text-right" : ""}>
                  <h3 className="text-[16px] font-semibold text-slate-900">
                    {t("MiniWebsiteBuilder.preview.titleLine1")}
                    <br />
                    {t("MiniWebsiteBuilder.preview.titleLine2")}
                  </h3>

                  <p className="mt-2 text-[12px] leading-relaxed text-slate-600">
                    {t("MiniWebsiteBuilder.preview.desc")}
                  </p>

                  <button className="mt-3 inline-flex items-center rounded-md bg-orange-500 px-4 py-2 text-xs font-semibold text-white hover:opacity-90">
                    {t("MiniWebsiteBuilder.preview.button")}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
          {/* ================= END RIGHT ================= */}
        </div>
      </div>
    </section>
  );
}
