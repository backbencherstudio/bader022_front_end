"use client";

import { useI18n } from "@/components/provider/I18nProvider";
import Image from "next/image";
import React, { useMemo } from "react";

type ChooseItem = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

export default function WhyChooseBokli() {
  const { t } = useI18n();

  const items = useMemo(() => {
    const value = t("WhyChooseBokli.items");
    return Array.isArray(value) ? (value as ChooseItem[]) : [];
  }, [t]);

  return (
    <section className="bg-[#F9FAFB] w-full">
      <div className="container mx-auto py-20 px-4">
        {/* Heading */}
        <div className="flex flex-col items-center gap-5 py-10 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-semibold">
            {t("WhyChooseBokli.title")}
          </h2>
          <p className="w-11/12 md:w-9/12 lg:w-4/12 mx-auto text-center text-[#4A4C56]">
            {t("WhyChooseBokli.subtitle")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-amber-50 shadow rounded-md p-6 space-y-3"
            >
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-gray-100">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>

              <h3 className="text-xl font-semibold pt-5">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
