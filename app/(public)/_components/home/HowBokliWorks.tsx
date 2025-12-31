"use client";

import { useI18n } from "@/components/provider/I18nProvider";
import { UserPlus, Settings, CalendarDays } from "lucide-react";

const ICONS = [UserPlus, Settings, CalendarDays];

export default function HowBokliWorks() {
  const { t, locale } = useI18n();

  // steps list from JSON
  console.log(t);
  const steps = t("HowItWorks.steps") as unknown as Array<{
    step: string;
    title: string;
    desc: string;
  }>;
  console.log(steps);

  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-[48px] font-semibold text-slate-900">
            {t("HowItWorks.title")}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-slate-600">
            {t("HowItWorks.subtitle")}
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, index) => {
            const Icon = ICONS[index] ?? UserPlus;

            return (
              <div
                key={s.step}
                className="rounded-xl border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]"
              >
                <div className="flex items-start justify-between">
                  {/* Icon bubble */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>

                  {/* Step tag */}
                  <span className="rounded-md bg-blue-50 px-3 py-1 text-[14px] font-medium text-blue-600">
                    {s.step}
                  </span>
                </div>

                <h3 className="mt-5 text-xl md:text-[24px] font-semibold text-slate-900">
                  {s.title}
                </h3>

                <p className="mt-2 text-[16px] leading-relaxed text-slate-600">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
