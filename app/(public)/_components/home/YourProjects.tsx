"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { cubicBezier, motion } from "framer-motion";
import { useI18n } from "@/components/provider/I18nProvider";

type ProjectItem = {
  id: string;
  label: string;
  img: string;
};

/* ------------------ CARD VARIANTS ------------------ */
const variants = {
  hiddenLeft: {
    opacity: 0,
    x: -80,
  },
  hiddenRight: {
    opacity: 0,
    x: 80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: cubicBezier(0.25, 0.1, 0.25, 1),
    },
  },
};

/* ------------------ TITLE VARIANT (TOP → DOWN) ------------------ */
const titleVariant = {
  hidden: {
    opacity: 0,
    y: -48,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: cubicBezier(0.25, 0.1, 0.25, 1),
    },
  },
};

export default function ProjectSelectorImages() {
  const { t, get } = useI18n();
  const [selected, setSelected] = useState<string>("");

  const items = useMemo<ProjectItem[]>(() => {
    return get<ProjectItem[]>("ProjectSelector.items") ?? [];
  }, [get]);

  return (
    <section id="services" className="w-full bg-white overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* ---------------- Heading (SCROLL BASED, FROM TOP) ---------------- */}
        <motion.div
          className="mx-auto text-center pb-6"
          variants={titleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.6,
          }}
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 pb-4">
            {t("ProjectSelector.title")}
          </h2>

          <p className="text-[16px] leading-relaxed text-slate-600">
            {t("ProjectSelector.subtitleLine1")}
            <br className="hidden md:block" />
            {t("ProjectSelector.subtitleLine2")}
          </p>
        </motion.div>

        {/* ---------------- Grid ---------------- */}
        <div className="mx-auto mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item, index) => {
            const active = selected === item.id;
            const fromLeft = index % 2 === 0;

            return (
              <motion.button
                key={item.id}
                initial={fromLeft ? "hiddenLeft" : "hiddenRight"}
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
                variants={variants}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.97 }}
                transition={{
                  duration: 0.3,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                onClick={() => setSelected(item.id)}
                className={[
                  "relative group rounded-2xl px-6 py-10 bg-white text-center",
                  "border transition-all",
                  "shadow-[0_14px_45px_rgba(15,23,42,0.10)]",
                  active
                    ? "border-blue-300 ring-4 ring-blue-200"
                    : "border-slate-100 hover:border-blue-200",
                ].join(" ")}
              >
                {/* Glow */}
                <div
                  className={[
                    "pointer-events-none absolute inset-0 rounded-2xl blur-xl transition-opacity",
                    active
                      ? "opacity-100 bg-blue-200/40"
                      : "opacity-0 group-hover:opacity-100 bg-blue-100/40",
                  ].join(" ")}
                />

                {/* Image */}
                <motion.div
                  className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white border border-slate-100 z-10"
                  whileHover={{ scale: 1.15, rotate: 2 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <div className="relative h-10 w-10">
                    <Image
                      src={item.img}
                      alt={item.label}
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>

                {/* Label */}
                <motion.p
                  className="relative z-10 mt-6 text-[18px] font-semibold"
                  animate={{
                    color: active ? "#2563EB" : "#0F172A",
                  }}
                  transition={{ duration: 0.25 }}
                >
                  {item.label}
                </motion.p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
