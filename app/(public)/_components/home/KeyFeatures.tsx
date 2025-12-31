"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { useI18n } from "@/components/provider/I18nProvider";

type Feature = {
  title: string;
  desc: string;
  img: string;
  colSpan?: string;
};

export default function KeyFeatures() {
  const { t, locale } = useI18n();

  const features = useMemo(() => {
    const value = t("KeyFeatures.features");
    return Array.isArray(value) ? (value as Feature[]) : [];
  }, [t]);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-sky-50 via-white to-indigo-50" />

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
        {/* Header row */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl md:text-5xl font-semibold text-slate-900">
              {t("KeyFeatures.title")}
            </h2>

            <p className="mt-4 max-w-xl text-[18px] leading-relaxed text-slate-600">
              {t("KeyFeatures.subtitle")}
            </p>
          </div>

          <Button className="w-fit rounded-lg px-5 py-6 text-[16px] text-white font-semibold cursor-pointer bg-linear-to-l from-indigo-500 to-blue-500 hover:opacity-90">
            {t("KeyFeatures.button")}
            <ArrowUpRight
              size={18}
              className={`ml-2 ${
                locale === "ar" ? "rotate-270 ml-0 mr-2" : ""
              }`}
            />
          </Button>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12">
          {features.map((f) => (
            <div
              key={f.title}
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
              {/* Image area */}
              <div className="relative w-full h-[150px] md:h-40 rounded-lg overflow-hidden bg-white">
                <Image
                  src={f.img}
                  alt={f.title}
                  fill
                  className="object-contain"
                />
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
