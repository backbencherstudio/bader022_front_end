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
import { TData } from "../../page";
import { useTheme } from "next-themes";

const CustomBar = (props: any) => {
  const { x, y, width, height, fill } = props;
  const barRadius = 8;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={barRadius}
      ry={barRadius}
      fill={fill}
    />
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
  const { theme } = useTheme();
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
            contentStyle={{
              backgroundColor: isDark ? "#111827" : "#ffffff",
              borderRadius: 8,
              border: "1px solid #e5e7eb",
            }}
            labelStyle={{
              color: isDark ? "#e5e7eb" : "#111827",
              fontWeight: 600,
            }}
            formatter={(value?: number) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <CurrencyIcon size={14} />
                  <span>{value ?? 0}</span>
                </span>
              </div>
            )}
          />

          <Legend />

          <div className="">
            {" "}
            <Bar
              dataKey="revenue"
              shape={<CustomBar />}
              fill={isDark ? "#ffffff" : "#111827"}
            />
          </div>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
