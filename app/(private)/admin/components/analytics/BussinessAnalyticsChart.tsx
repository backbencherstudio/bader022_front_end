"use client";

import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

const chartData = [
  { name: "Salon Beauty", value: 45, color: "#7D4CB5" },
  { name: "Home Services", value: 38, color: "#F6C000" },
  { name: "Health", value: 28, color: "#2E3DBB" },
  { name: "Fitness Pro Gym", value: 20, color: "#0A1423" },
  { name: "Others", value: 15, color: "#E6E6E6" },
];

const totalMerchants = 156;

//  Custom slice label (rounded pill)
const renderSliceLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <foreignObject x={x - 18} y={y - 14} width={40} height={30}>
      <div
        style={{
          background: "#fff",
          borderRadius: 999,
          padding: "1px 6px",
          fontSize: 14,
          fontWeight: 600,
          textAlign: "center",
          width: "fit-content",
          boxShadow: "0px 1px 4px rgba(0,0,0,0.08)",
        }}
      >
        {value}
      </div>
    </foreignObject>
  );
};

export default function BusinessTypeAnalyticsChart() {
  return (
    <div className="w-full max-w-md bg-white p-4">
      {/* ✅ Title */}
      <h2 className="text-xl font-medium mb-6">Business Type Analytics</h2>

      {/* ✅ Chart Container */}
      <div className="w-full h-[320px] flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius="65%"
              outerRadius="95%"
              paddingAngle={8}
              cornerRadius={25}
              label={renderSliceLabel}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>

            {/* ✅ Center Text */}
            <text
              x="50%"
              y="47%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="36"
              fontWeight="700"
              fill="#111827"
            >
              {totalMerchants}
            </text>

            <text
              x="50%"
              y="58%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="18"
              fontWeight="500"
              fill="#6B7280"
            >
              Total Merchants
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ Legend (Manual, same as screenshot) */}
      <div className="mt-10 space-y-4">
        {chartData.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 text-[26px] text-[#6B7280] font-medium"
          >
            <span
              className="w-8 h-8 rounded-lg"
              style={{ backgroundColor: item.color }}
            />

            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
