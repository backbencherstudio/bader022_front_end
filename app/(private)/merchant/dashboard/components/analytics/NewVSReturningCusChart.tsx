"use client";

import { useI18n } from "@/components/provider/I18nProvider";
import { useNewReturnQuery } from "@/redux/features/merchant/analyticsApi";
import { useTheme } from "next-themes";
import { useEffect, useState, useMemo } from "react";
import { Pie, PieChart, Label } from "recharts";

export default function NewVSReturningCusChart() {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { data: newReturnData, isLoading, isError } = useNewReturnQuery({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const newCustomers = newReturnData?.new_customers ?? 0;
  const returningCustomers = newReturnData?.returning_customers ?? 0;

  const total = newCustomers + returningCustomers;

  const percentage =
    total === 0 ? 0 : Math.round((returningCustomers / total) * 100);

  const isDark = theme === "dark";

  //  Hook always runs (no conditional skip)
  const chartData = useMemo(
    () => [
      {
        name: "Returning",
        value: returningCustomers,
        fill: isDark ? "orange" : "blue",
      },
      {
        name: "New",
        value: newCustomers,
        fill: isDark ? "#fff" : "black",
      },
    ],
    [returningCustomers, newCustomers, isDark],
  );

  //  Now safe to return conditionally AFTER hooks
  if (!mounted) return null;
  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6 text-red-500">Failed to load</div>;

  return (
    <div style={{ width: "100%" }}>
      <h1 className="px-4 font-semibold text-xl text-[#444950] dark:text-white">
        {locale == "ar" ? "الجدد مقابل العائدين" : "New VS Returning"}
      </h1>

      <PieChart width={300} height={300} style={{ margin: "0 auto" }}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          outerRadius="64%"
          innerRadius="36%"
          isAnimationActive={false}
        >
          <Label
            value={`${percentage}%`}
            position="center"
            fill={isDark ? "white" : "green"}
            style={{ fontSize: 18, fontWeight: "bold" }}
          />
        </Pie>
      </PieChart>

      <div className="px-6 mt-4">
        <div className="flex justify-between pb-2">
          <span> {locale == "ar" ? "العائدون" : "Returning"}</span>
          <span>{returningCustomers}</span>
        </div>
        <div className="flex justify-between">
          <span> {locale == "ar" ? "الجدد" : "New"}</span>
          <span>{newCustomers}</span>
        </div>
      </div>
    </div>
  );
}
