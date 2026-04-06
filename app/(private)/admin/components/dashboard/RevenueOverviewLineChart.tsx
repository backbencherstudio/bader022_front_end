"use client";

import { useTheme } from "next-themes";
import { useI18n } from "@/components/provider/I18nProvider";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type RevenueData = {
  name: string;
  revenue: number;
};

type Props = {
  data: RevenueData[];
};

export default function RevenueOverviewLineChart({ data }: Props) {
  const { theme } = useTheme();
  const { locale } = useI18n();

  const isRTL = locale === "ar";

  const lineColor = theme === "dark" ? "#ffffff" : "#1f2937";

  return (
    <div className="w-full h-55 sm:h-65 md:h-75 lg:h-85">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: isRTL ? 5 : 15,
            left: isRTL ? 15 : 5,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          {/* X Axis */}
          <XAxis
            dataKey="name"
            reversed={isRTL}
            tick={{ fontSize: 10 }}
            interval="preserveStartEnd"
          />

          {/* Y Axis */}
          <YAxis
            domain={[0, "auto"]}
            tick={{ fontSize: 10 }}
            orientation={isRTL ? "right" : "left"}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              color: "#000",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              fontSize: "12px",
            }}
          />

          {/* Line */}
          <Line
            type="monotone"
            dataKey="revenue"
            stroke={lineColor}
            strokeWidth={2}
            dot={{ r: 2 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
