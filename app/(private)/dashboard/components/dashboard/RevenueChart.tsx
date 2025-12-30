"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

type ActiveDotProps = {
  cx?: number;
  cy?: number;
  r?: number;
  chartBottom: number;
  stripWidth?: number;
};

// ---- Custom Active Dot with gradient strip ----
function ActiveDot({
  cx,
  cy,
  r = 6,
  chartBottom,
  stripWidth = 22,
}: ActiveDotProps) {
  if (cx == null || cy == null) return null;
  const x = cx - stripWidth / 2;
  const height = Math.max(0, chartBottom - cy - 30);

  return (
    <g pointerEvents="none">
      <defs>
        <linearGradient id="hoverGradient" x1="10" y1="1" x2="10" y2="0">
          <stop offset="0%" stopColor="#EFF3FF" />
          <stop offset="100%" stopColor="#BACDFA" />
        </linearGradient>
      </defs>

      <rect
        x={x}
        y={cy}
        width={stripWidth}
        height={height}
        rx={6}
        fill="url(#hoverGradient)"
      />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="#fff"
        stroke="#3861FB"
        strokeWidth={2}
      />
    </g>
  );
}

// ---- Custom Tooltip content ----
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const year = payload[0]?.payload?.year ?? "2025"; // fallback to 2025 if missing
    return (
      <div className="rounded-md bg-white shadow-md px-3 py-2 text-gray-700 text-sm border border-gray-200">
        <p className="font-semibold text-gray-800">
          {label} {year}
        </p>
        <p>
          <span className="text-blue-600 font-medium">${payload[0].value}</span>{" "}
          <span className="text-gray-500">This Month</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function RevenueChart() {
  const data = [
    { name: "Jan", uv: 180, year: 2025 },
    { name: "Feb", uv: 150, year: 2025 },
    { name: "Mar", uv: 170, year: 2025 },
    { name: "Apr", uv: 110, year: 2025 },
    { name: "May", uv: 180, year: 2025 },
    { name: "Jun", uv: 120, year: 2025 },
    { name: "Jul", uv: 40, year: 2025 },
    { name: "Aug", uv: 50, year: 2025 },
    { name: "Sep", uv: 200, year: 2025 },
    { name: "Oct", uv: 150, year: 2025 },
    { name: "Nov", uv: 160, year: 2025 },
    { name: "Dec", uv: 130, year: 2025 },
  ];

  const CHART_HEIGHT = 260;
  const MARGIN = { top: 16, right: 24, left: 8, bottom: 8 };
  const CHART_BOTTOM = CHART_HEIGHT - MARGIN.bottom;

  return (
    <div className="w-full ">
      <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
        <LineChart data={data} margin={MARGIN}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis className="font-normal text-[10px]" dataKey="name" />
          <YAxis
            className="font-normal text-[10px]"
            tickFormatter={(v: number) => `$${v}`}
          />
          <Tooltip cursor={false} content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="uv"
            stroke="#3861FB"
            strokeWidth={2}
            dot={{ r: 2 }}
            activeDot={<ActiveDot chartBottom={CHART_BOTTOM} stripWidth={26} />}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
