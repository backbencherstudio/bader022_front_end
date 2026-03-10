"use client";

import { cubicBezier, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useI18n } from "@/components/provider/I18nProvider";
import Link from "next/link";

/* ------------------ Variants ------------------ */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: cubicBezier(0, 0, 0.2, 1),
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: cubicBezier(0, 0, 0.2, 1),
    },
  },
};

export default function Banner() {
  const { t, locale } = useI18n();

  return (
    <section id="hero" className="relative container mx-auto">
      {/* TEXT is the trigger */}
      <motion.div
        className="relative z-10 px-4 pt-16 md:pt-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.35, // trigger when TEXT is visible
        }}
      >
        <div className="mx-auto text-center">
          <motion.h1
            variants={itemVariants}
            className="text-[28px] md:text-[44px] xl:text-[60px] font-bold text-slate-900"
          >
            {t("Banner.titleLine1")}
            <br className="hidden md:block" />
            {t("Banner.titleLine2")}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 text-[16px] md:text-[18px] text-black"
          >
            {t("Banner.subtitleLine1")}
            <br />
            {t("Banner.subtitleLine2")}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-col sm:flex-row justify-center gap-3"
          >
            <Link
              href={"/create-account"}
              className="h-12 px-4 bg-linear-to-l justify-center from-indigo-500 to-blue-500 text-white rounded-md flex items-center font-medium cursor-pointer"
            >
              {t("Banner.primaryBtn")}
              <ArrowUpRight
                size={18}
                className={`ml-1 ${locale === "ar" ? "rotate-270" : ""}`}
              />
            </Link>

            <Link
              href={"/create-account"}
              className="h-12 px-4 text-black border-[1.8px] justify-center cursor-pointer border-blue-500 rounded-md flex items-center font-medium"
            >
              {t("Banner.secondaryBtn")}
              <ArrowUpRight
                size={18}
                className={`ml-1 ${locale === "ar" ? "rotate-270" : ""}`}
              />
            </Link>
          </motion.div>
        </div>

        {/* Image still participates in stagger, but does NOT trigger it */}
        <motion.div variants={imageVariants} className="mt-10 mx-auto pb-10">
          <Image
            src="/images/dashboard.png"
            alt="Dashboard preview"
            width={1600}
            height={1000}
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
