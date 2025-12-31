"use client";

import { useI18n } from "@/components/provider/I18nProvider";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

type Props = {
  bgSrc?: string;
};

export default function GrowYourBusiness({
  bgSrc = "/images/growbusiness2.png",
}: Props) {
  const { t, locale } = useI18n();

  return (
    <div
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section className="relative container">
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto text-center">
            <h1 className="text-[28px] leading-tight text-white md:text-[44px] xl:text-[60px] md:leading-[1.2] font-bold">
              {t("GrowBusiness.titleLine1")}
              <br className="hidden md:block" />
              {t("GrowBusiness.titleLine2")}
            </h1>

            <p className="mt-4 text-[16px] md:text-[18px] text-white leading-relaxed">
              {t("GrowBusiness.subtitleLine1")}
              <br className="hidden md:block" />
              <span>{t("GrowBusiness.subtitleLine2")}</span>
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button className="h-12 rounded-md text-[16px] px-4 font-semibold text-white bg-linear-to-l from-indigo-500 to-blue-500 hover:opacity-90 border-none cursor-pointer">
                {t("GrowBusiness.button")}
                <ArrowUpRight
                  size={18}
                  className={`font-semibold ${
                    locale === "ar" ? "rotate-270 ml-0 mr-2" : "ml-2"
                  }`}
                />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
