"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export type RevenueData = {
  name: string;
  revenue: number;
};

type Props = {
  data: RevenueData[];
  height?: number;
  maxValue?: number;
};

export default function RevenueOverviewLineChart({
  data,
  height = 280,
  maxValue = 5000,
}: Props) {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />
          <YAxis domain={[0, maxValue]} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#111"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
