"use client";

import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/components/provider/I18nProvider";

type FAQItem = { q: string; a: string };

export default function FrequentlyAskedQuestions() {
  const { t, locale } = useI18n();

  const items = useMemo(() => {
    const value = t("FAQ.items");
    return Array.isArray(value) ? (value as FAQItem[]) : [];
  }, [t]);

  const mid = Math.ceil(items.length / 2);
  const left = items.slice(0, mid);
  const right = items.slice(mid);

  return (
    <section className="bg-white w-full">
      <div className="container mx-auto py-20 px-4">
        {/* Heading */}
        <div className="flex flex-col items-center gap-5 py-10 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-semibold">
            {t("FAQ.title")}
          </h2>

          <p className="w-11/12 md:w-9/12 lg:w-5/12 mx-auto text-[#4A4C56]">
            {t("FAQ.subtitle")}
          </p>
        </div>

        {/* Accordions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left */}
          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-5"
          >
            {left.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`left-${idx}`}
                className="bg-white border border-gray-200 shadow-md rounded-md"
              >
                <AccordionTrigger
                  className={`mx-4 font-bold ${
                    locale === "ar" ? "text-right" : ""
                  }`}
                >
                  {item.q}
                </AccordionTrigger>

                <AccordionContent
                  className={`flex flex-col gap-4 text-balance mx-4 text-slate-600 ${
                    locale === "ar" ? "text-right" : ""
                  }`}
                >
                  <p>{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Right */}
          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-5"
          >
            {right.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`right-${idx}`}
                className="bg-white border border-gray-200 shadow-md rounded-md"
              >
                <AccordionTrigger
                  className={`mx-4 font-bold ${
                    locale === "ar" ? "text-right" : ""
                  }`}
                >
                  {item.q}
                </AccordionTrigger>

                <AccordionContent
                  className={`flex flex-col gap-4 text-balance mx-4 text-slate-600 ${
                    locale === "ar" ? "text-right" : ""
                  }`}
                >
                  <p>{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
