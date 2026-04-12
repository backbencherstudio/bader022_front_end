"use client";

import { useI18n } from "@/components/provider/I18nProvider";
import {
  Zap,
  CreditCard,
  Clock,
  BarChart3,
  TrendingUp,
  Users,
} from "lucide-react";

export default function DetailsDemo() {
  const { t } = useI18n();

  const features = [
    {
      icon: Zap,
      title: t("DetailsDemo.feature_1_title"),
      desc: t("DetailsDemo.feature_1_desc"),
    },
    {
      icon: CreditCard,
      title: t("DetailsDemo.feature_2_title"),
      desc: t("DetailsDemo.feature_2_desc"),
    },
    {
      icon: Clock,
      title: t("DetailsDemo.feature_3_title"),
      desc: t("DetailsDemo.feature_3_desc"),
    },
    {
      icon: BarChart3,
      title: t("DetailsDemo.feature_4_title"),
      desc: t("DetailsDemo.feature_4_desc"),
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
        {t("DetailsDemo.heading")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
          >
            <f.icon className="w-8 h-8 text-indigo-600 mb-3" />
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">
              {f.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl bg-orange-500 text-white flex flex-col justify-center">
          <TrendingUp className="w-8 h-8 mb-3" />
          <h4 className="font-bold text-lg mb-1">
            {t("DetailsDemo.stat_1_title")}
          </h4>
          <p className="text-white/90 text-sm">
            {t("DetailsDemo.stat_1_desc")}
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-indigo-900 text-white flex flex-col justify-center">
          <Users className="w-8 h-8 mb-3" />
          <h4 className="font-bold text-lg mb-1">
            {t("DetailsDemo.stat_2_title")}
          </h4>
          <p className="text-white/90 text-sm">
            {t("DetailsDemo.stat_2_desc")}
          </p>
        </div>
      </div>

      <p className="text-center text-slate-500 dark:text-slate-400 text-sm font-medium">
        {t("DetailsDemo.footer")}
      </p>
    </div>
  );
}
