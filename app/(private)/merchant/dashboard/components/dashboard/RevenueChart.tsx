"use client";

import { useEffect, useState } from "react";
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

const CustomBar = ({ x, y, width, height, fill }: any) => (
  <rect x={x} y={y} width={width} height={height} rx={8} ry={8} fill={fill} />
);

type RevenueChartProps = {
  data: TData[];
  CurrencyIcon: LucideIcon;
};

export default function RevenueChart({
  data,
  CurrencyIcon,
}: RevenueChartProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div
      style={{
        width: "100%",
        height: 520,
        borderRadius: 8,
        padding: 12,
        backgroundColor: isDark ? "#1f2937" : "#ffffff",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, bottom: 5 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "#374151" : "#e5e7eb"}
          />

          <XAxis dataKey="name" stroke={isDark ? "#d1d5db" : "#374151"} />
          <YAxis stroke={isDark ? "#d1d5db" : "#374151"} />

          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#111827" : "#ffffff",
              borderRadius: 8,
              border: "1px solid #e5e7eb",
            }}
            formatter={(value?: number) => (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <CurrencyIcon size={14} />
                  <span>{value ?? 0}</span>
                </span>
              </div>
            )}
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
