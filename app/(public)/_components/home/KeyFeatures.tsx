"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { motion, cubicBezier } from "framer-motion";
import { useI18n } from "@/components/provider/I18nProvider";
import Link from "next/link";

type Feature = {
  title: string;
  desc: string;
  img: string;
  colSpan?: string;
};

/* ------------------ Motion Variants ------------------ */

const headerLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.0,
      ease: cubicBezier(0.25, 0.1, 0.25, 1),
    },
  },
};

const headerRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.0,
      ease: cubicBezier(0.25, 0.1, 0.25, 1),
    },
  },
};

const featureVariant = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: cubicBezier(0.25, 0.1, 0.25, 1),
    },
  },
};

export default function KeyFeatures() {
  const { t, locale, get } = useI18n();

  const features = useMemo<Feature[]>(() => {
    return get<Feature[]>("KeyFeatures.features") ?? [];
  }, [get]);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-sky-50 via-white to-indigo-50" />

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
        {/* ---------------- Header (SCROLL BASED) ---------------- */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left side */}
          <motion.div
            variants={headerLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-semibold text-slate-900">
              {t("KeyFeatures.title")}
            </h2>

            <p className="mt-4 max-w-xl text-[18px] leading-relaxed text-slate-600">
              {t("KeyFeatures.subtitle")}
            </p>
          </motion.div>

          {/* Right side */}
          <motion.div
            variants={headerRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.6 }}
          >
            <Link href={"/create-account"}>
              {" "}
              <Button className="w-fit rounded-lg px-5 py-6 text-[16px] text-white font-semibold cursor-pointer bg-linear-to-l from-indigo-500 to-blue-500 hover:opacity-90">
                {t("KeyFeatures.button")}
                <ArrowUpRight
                  size={18}
                  className={`ml-2 ${
                    locale === "ar" ? "rotate-270 ml-0 mr-2" : ""
                  }`}
                />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* ---------------- Grid ---------------- */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-12">
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={featureVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.85,
              }}
              whileHover={{ y: -6 }}
              transition={{
                duration: 0.35,
                ease: cubicBezier(0.25, 0.1, 0.25, 1),
              }}
              className={[
                "rounded-xl border border-slate-100 bg-white",
                f.colSpan === "md:col-span-6"
                  ? "md:flex md:items-start md:gap-6"
                  : "",
                "shadow-[0_10px_30px_rgba(15,23,42,0.06)]",
                "p-6",
                f.colSpan ?? "md:col-span-4",
              ].join(" ")}
            >
              {/* Image */}
              <div className="relative w-full h-[150px] md:h-40 rounded-lg overflow-hidden bg-white">
                <motion.div
                  className="relative w-full h-full"
                  whileHover={{ scale: 1.04 }}
                  transition={{
                    duration: 0.4,
                    ease: cubicBezier(0.25, 0.1, 0.25, 1),
                  }}
                >
                  <Image
                    src={f.img}
                    alt={f.title}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </div>

              {/* Text */}
              <div
                className={f.colSpan === "md:col-span-6" ? "md:mt-0 mt-5" : ""}
              >
                <h3 className="mt-5 text-[24px] font-semibold text-slate-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-[16px] leading-relaxed text-slate-600">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
