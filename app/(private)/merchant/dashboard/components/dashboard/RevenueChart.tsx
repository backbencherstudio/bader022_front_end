"use client";

import { LucideIcon } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";
import { TData } from "../../page";

const CustomBar = (props: any) => {
  const { x, y, width, height, fill } = props;
  return (
    <rect x={x} y={y} width={width} height={height} rx={8} ry={8} fill={fill} />
  );
};

type RevenueChartProps = {
  data: TData[];
  CurrencyIcon: LucideIcon;
};

export default function RevenueChart({
  data,
  CurrencyIcon,
}: RevenueChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div
      suppressHydrationWarning
      style={{
        width: "100%",
        height: 520,
        maxWidth: "100%",
        borderRadius: 8,
        padding: 12,
        backgroundColor: isDark ? "#1f2937" : "#ffffff",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "#374151" : "#e5e7eb"}
          />

          <XAxis dataKey="name" stroke={isDark ? "#d1d5db" : "#374151"} />
          <YAxis stroke={isDark ? "#d1d5db" : "#374151"} />

          <Tooltip
            formatter={(value?: number) => (
              <span className="flex items-center gap-1">
                <CurrencyIcon size={14} />
                {value ?? 0}
              </span>
            )}
            contentStyle={{
              backgroundColor: isDark ? "#111827" : "#ffffff",
              borderRadius: 8,
            }}
          />

          <Legend />

          <Bar
            dataKey="revenue"
            shape={<CustomBar />}
            fill={isDark ? "#ffffff" : "#111827"}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
