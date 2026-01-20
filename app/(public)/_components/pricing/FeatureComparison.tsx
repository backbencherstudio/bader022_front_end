"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/components/provider/I18nProvider";
import { CheckCircle2, Check, Lock, Star } from "lucide-react";

type Row = { feature: string; free: string; premium: string };

export function FeatureComparison() {
  const { t, get } = useI18n();
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  // ===== Pricing Config =====
  const currency = "SAR";
  const monthlyPrice = 210;
  const annualMonths = 12;
  const annualDiscount = 0.2; // 20%

  const annualFull = monthlyPrice * annualMonths;
  const annualPayable = Math.round(annualFull * (1 - annualDiscount));

  const premiumMainPrice = billing === "monthly" ? monthlyPrice : annualPayable;
  const premiumSuffix = billing === "monthly" ? "/ month" : "/ year";

  const formatMoney = (n: number) => `${n.toLocaleString()} ${currency}`;

  const rows = useMemo(() => {
    const value = get<Row[]>("FeatureComparison.rows");
    return Array.isArray(value) ? value : [];
  }, [get]);

  // Keep your original slicing logic if you prefer.
  const sections = [
    { title: "Booking", items: rows.slice(0, 1) },
    { title: "Growth", items: rows.slice(1, 5) },
    { title: "Analytics", items: rows.slice(5) },
  ];

  const normalize = (v: string) => (v ?? "").trim();

  const isLocked = (value: string) => {
    const v = normalize(value);
    return ["✘", "❌", "x", "X", "-", "—"].includes(v);
  };

  const isCheck = (value: string) => {
    const v = normalize(value);
    return ["✓", "✔", "✅", "true", "yes"].includes(v.toLowerCase());
  };

  const isUnlimited = (value: string) =>
    normalize(value).toLowerCase() === "unlimited";

  const Pill = ({
    children,
    tone = "gray",
    className = "",
  }: {
    children: React.ReactNode;
    tone?: "gray" | "purple";
    className?: string;
  }) => (
    <span
      className={[
        "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium",
        "whitespace-nowrap",
        tone === "purple"
          ? "bg-[#7A5CFF]/15 text-[#5C3BFF]"
          : "bg-gray-100 text-gray-600",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );

  const renderCellValue = (value: string, variant: "free" | "premium") => {
    if (isLocked(value)) {
      return (
        <Pill className="gap-2 max-w-47.5">
          <Lock className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">
            {t("FeatureComparison.upgrade") || "Upgrade to unlock"}
          </span>
        </Pill>
      );
    }

    if (isCheck(value)) {
      return (
        <span className="inline-flex items-center justify-center">
          <Check className="h-5 w-5 text-[#3CB371]" />
        </span>
      );
    }

    if (isUnlimited(value)) {
      return (
        <Pill tone="purple" className="min-w-23">
          Unlimited
        </Pill>
      );
    }

    const v = normalize(value);
    const looksPill = v.length <= 16 || /\/\s*month/i.test(v);
    if (looksPill) {
      return (
        <Pill
          tone={variant === "premium" ? "purple" : "gray"}
          className="min-w-23"
        >
          {v}
        </Pill>
      );
    }

    return (
      <span
        className={variant === "premium" ? "text-[#5C3BFF]" : "text-gray-700"}
      >
        {v}
      </span>
    );
  };

  return (
    <section className="container mx-auto py-16 md:py-20 px-4">
      {/* Header */}
      <motion.div
        className="text-center mb-8 md:mb-10"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-5xl font-semibold text-black mb-3 md:mb-4">
          {t("FeatureComparison.title")}
        </h2>
        <p className="text-[14px] md:text-[16px] text-gray-600">
          {t("FeatureComparison.subtitleLine1")}
          <br />
          {t("FeatureComparison.subtitleLine2")}
        </p>
      </motion.div>

      {/* Outer card */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="relative rounded-[28px] bg-white shadow-[0_18px_70px_rgba(0,0,0,0.10)] border border-gray-00 overflow-hidden">
          {/* Billing toggle (responsive) */}
          <div className="flex justify-end px-4 sm:px-6 pt-5 sm:pt-6">
            <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
              <div className="flex items-center rounded-full border border-gray-200 bg-white shadow-sm overflow-hidden">
                <button
                  type="button"
                  onClick={() => setBilling("monthly")}
                  className={[
                    "px-3 sm:px-4 py-1 text-xs sm:text-sm cursor-pointer font-medium transition",
                    billing === "monthly"
                      ? "bg-white text-[#401bf7]"
                      : "text-gray-500",
                  ].join(" ")}
                >
                  Monthly
                </button>

                <div className="h-6 w-[1px] bg-gray-200" />

                <button
                  type="button"
                  onClick={() => setBilling("annual")}
                  className={[
                    "px-3 sm:px-4 py-1 text-xs sm:text-sm cursor-pointer font-medium transition",
                    billing === "annual"
                      ? "bg-white text-[#401bf7]"
                      : "text-gray-500",
                  ].join(" ")}
                >
                  Annual
                </button>
              </div>

              {/* Save badge */}
              <span className="inline-flex items-center gap-2 rounded-full bg-[#5C3BFF] px-3 py-1 text-xs sm:text-sm font-medium text-white shadow">
                Save {Math.round(annualDiscount * 100)}%
                <Star className="h-4 w-4" />
              </span>
            </div>
          </div>

          {/* Responsive table wrapper (scroll on mobile) */}
          <div className="px-4 sm:px-6 pb-8 pt-6">
            <div className="overflow-x-auto">
              {/* min width forces horizontal scroll on small screens while preserving layout */}
              <div className="min-w-245">
                <div className="grid grid-cols-12 rounded-2xl border-r border-gray-100 overflow-hidden">
                  {/* Feature column header spacer */}
                  <div className="col-span-4">
                    <div className="h-35 border-b border-gray-100" />
                  </div>

                  {/* FREE header */}
                  <div className="col-span-4 bg-white border-2 border-gray-100 rounded-tl-lg">
                    <div className="pt-11 relative border-gray-100 flex flex-col items-center justify-center px-4">
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        Free Plan
                      </div>
                      <h1 className="absolute top-37 text-black text-3xl font-semibold">
                        0
                      </h1>
                      <button
                        type="button"
                        className="mt-4 top-49 absolute rounded-full bg-white text-black px-6 py-2 text-sm font-semibold shadow hover:opacity-95"
                      >
                        Start Free
                      </button>
                    </div>
                  </div>

                  {/* PREMIUM header (highlight) */}
                  <div className="col-span-4 border-gray-100 border-2 border-l-0 from-[#7A5CFF]/10 to-[#7A5CFF]/12">
                    <div className="py-6 relative flex flex-col items-center justify-center px-4">
                      <span className="absolute left-auto right-auto top-0 inline-flex items-center gap-2 rounded-full bg-[#7A5CFF] px-3 py-1 text-xs font-semibold text-white shadow">
                        <Star className="h-3.5 w-3.5" />
                        Most Popular
                      </span>

                      <div className="text-2xl font-bold text-gray-900 mt-6">
                        Premium Plan
                      </div>

                      <div className="text-3xl top-37 absolute font-semibold text-gray-900 leading-none">
                        {formatMoney(premiumMainPrice)}
                        <span className="text-sm font-medium text-gray-600">
                          {premiumSuffix}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="mt-4 absolute top-49 rounded-full bg-[#5C3BFF] px-6 py-2 text-sm font-semibold text-white shadow hover:opacity-95"
                      >
                        Start Premium
                      </button>
                    </div>
                  </div>

                  {/* Sections + rows */}
                  {sections.map((section) => (
                    <div
                      key={section.title}
                      className="col-span-12 grid grid-cols-12"
                    >
                      {/* Section header row */}
                      <div className="col-span-4 bg-white border-b border-gray-100 px-6 py-4">
                        <div className="text-lg font-semibold text-gray-800">
                          {section.title}
                        </div>
                      </div>
                      <div className="col-span-4 bg-white border-b border-gray-100 border-l-2" />
                      <div className="col-span-4 bg-linear-to-b from-[#7A5CFF]/10 to-[#7A5CFF]/12 border-b border-gray-100 border-l" />

                      {/* Feature rows */}
                      {section.items.map((row, idx) => (
                        <div
                          key={`${section.title}-${idx}`}
                          className="col-span-12 grid grid-cols-12"
                        >
                          {/* Feature name */}
                          <div className="col-span-4 bg-white border-b border-gray-100 px-6 py-5">
                            <div className="flex items-center gap-3 text-gray-900">
                              <CheckCircle2 className="h-5 w-5 text-gray-400" />
                              <span className="text-[16px] font-medium">
                                {row.feature}
                              </span>
                            </div>
                          </div>

                          {/* Free */}
                          <div className="col-span-4 text-[16px] bg-white border-b border-gray-100 border-l-2 px-4 py-5 flex items-center justify-center">
                            {renderCellValue(row.free, "free")}
                          </div>

                          {/* Premium */}
                          <div className="col-span-4 text-[16px] bg-linear-to-b from-[#7A5CFF]/10 to-[#7A5CFF]/12 border-b border-gray-100 border-l px-4 py-5 flex items-center justify-center">
                            {renderCellValue(row.premium, "premium")}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile helper text */}
            <div className="mt-3 text-center text-xs text-gray-400 md:hidden">
              Swipe left/right to view the full comparison.
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
