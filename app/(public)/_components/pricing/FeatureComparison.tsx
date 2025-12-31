"use client";

import { useI18n } from "@/components/provider/I18nProvider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo } from "react";

type Row = { feature: string; free: string; premium: string };

export function FeatureComparison() {
  const { t, locale } = useI18n();

  const rows = useMemo(() => {
    const value = t("FeatureComparison.rows");
    return Array.isArray(value) ? (value as Row[]) : [];
  }, [t]);

  const isRTL = locale === "ar";

  return (
    <section className="container mx-auto py-16 px-4">
      <h2 className="text-4xl md:text-5xl font-semibold text-center mb-4 text-gray-900">
        {t("FeatureComparison.title")}
      </h2>

      <p className="text-center mb-12 text-[16px] text-black">
        {t("FeatureComparison.subtitleLine1")}
        <br />
        {t("FeatureComparison.subtitleLine2")}
      </p>

      <div className={isRTL ? "text-right" : ""}>
        <Table>
          <TableHeader className="bg-linear-to-r text-white text-[16px] font-semibold from-[#3CB3FF] to-[#7153FF]">
            <TableRow>
              <TableHead className="text-center text-white">
                {t("FeatureComparison.columns.feature")}
              </TableHead>
              <TableHead className="text-center text-white">
                {t("FeatureComparison.columns.free")}
              </TableHead>
              <TableHead className="text-center text-white">
                {t("FeatureComparison.columns.premium")}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="text-center text-[16px]">
            {rows.map((row, idx) => (
              <TableRow key={`${row.feature}-${idx}`}>
                <TableCell className={isRTL ? "text-right" : ""}>
                  {row.feature}
                </TableCell>
                <TableCell>{row.free}</TableCell>
                <TableCell>{row.premium}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
