"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useI18n } from "@/components/provider/I18nProvider";

const tickerImages = [
  "/images/company1.png",
  "/images/company2.png",
  "/images/company3.png",
  "/images/company4.png",
  "/images/company5.png",
  "/images/company6.png",
];
export default function TrustedCompanies() {
  const { t } = useI18n();
  return (
    // Infinite scrolling ticker of images
    <div className="flex justify-center items-center bg-white py-12 w-full">
      <div className="relative w-full overflow-hidden">
        <p className="text-xl mt-4 text-center text-[#4A4C56]">
          {t("TrustedCompaniesStateMent.title")}
        </p>
        <motion.div
          className="flex gap-6"
          animate={{ x: [0, "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...tickerImages, ...tickerImages].map((img, idx) => (
            <div
              key={idx}
              className="relative shrink-0 w-64 gap-8 h-26 rounded-lg mb-8"
            >
              <Image
                src={img}
                alt="infinity scrolling logo"
                fill
                className="object-contain p-8"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
