"use client";

import { useI18n } from "@/components/provider/I18nProvider";
import Image from "next/image";
import React, { useMemo } from "react";
import { motion, cubicBezier } from "framer-motion";

type ChooseItem = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

/* ------------------ Motion Variants ------------------ */

const titleVariant = {
  hidden: {
    opacity: 0,
    y: -40,
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

const cardVariant = {
  hidden: {
    opacity: 0,
    y: 48,
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

export default function WhyChooseBokli() {
  const { t, get } = useI18n();

  const items = useMemo(() => {
    return get<ChooseItem[]>("WhyChooseBokli.items") ?? [];
  }, [get]);
  return (
    <section className="bg-[#F9FAFB] w-full">
      <div className="container mx-auto py-20 px-4">
        {/* ---------------- Heading (SCROLL BASED, FROM TOP) ---------------- */}
        <motion.div
          className="flex flex-col items-center gap-5  text-center"
          variants={titleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.6,
          }}
        >
          <h2 className="text-2xl md:text-3xl text-black lg:text-3xl font-semibold">
            {t("WhyChooseBokli.title")}
          </h2>
          <p className=" text-center text-[#4A4C56] py-4">
            {t("WhyChooseBokli.subtitle")}
          </p>
        </motion.div>

        {/* ---------------- Grid ---------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.7,
              }}
              whileHover={{ y: -6 }}
              transition={{
                duration: 0.3,
                ease: cubicBezier(0.25, 0.1, 0.25, 1),
              }}
              className="bg-white border border-slate-100 shadow-sm rounded-xl p-6 space-y-4 transition-shadow hover:shadow-lg"
            >
              {/* Icon */}
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 mx-auto">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>

              <h3 className="text-xl font-semibold pt-4 text-center text-black">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-relaxed text-center">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
