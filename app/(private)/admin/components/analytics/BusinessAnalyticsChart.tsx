"use client";

import { useI18n } from "@/components/provider/I18nProvider";
import { useGetBuesnessAnalyticsQuery } from "@/redux/features/admin/adminApi";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

type BusinessCategory = {
  business_category: string;
  total: number;
};

type BusinessAnalyticsResponse = {
  total_merchants: number;
  categories: BusinessCategory[];
};

const COLORS = ["#7D4CB5", "#F6C000", "#2E3DBB", "#0A1423", "#E6E6E6"];

// snake_case → Title Case
const formatCategory = (text: string) => {
  return text
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

//  Custom slice label
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
          color: "black",
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
  const { t, locale } = useI18n();
  const { data, isLoading } = useGetBuesnessAnalyticsQuery({}) as {
    data?: BusinessAnalyticsResponse;
    isLoading: boolean;
  };

  const analyticsData: BusinessCategory[] = data?.categories || [];

  const chartData = analyticsData.map(
    (item: BusinessCategory, index: number) => ({
      name: formatCategory(item.business_category),
      value: item.total,
      color: COLORS[index % COLORS.length],
    }),
  );

  const totalMerchants = data?.total_merchants || 0;

  return (
    <div className="w-full bg-white p-4 dark:bg-gray-800">
      {/* Title */}

      {locale === "ar" ? (
        <h2 className="text-xl font-medium mb-6">تحليلات الاشتراكات</h2>
      ) : (
        <h2 className="text-xl font-medium mb-6">Business Type Analytics</h2>
      )}

      {/* Chart */}
      <div className="w-full h-80 flex justify-center items-center">
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

            {/* Center Text */}
            <text
              x="50%"
              y="47%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="36"
              fontWeight="700"
              fill="#6B7280"
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

      {/* Legend */}
      <div className="mt-10 flex items-center flex-wrap gap-4">
        {chartData.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 text-2xl text-[#6B7280] font-medium"
          >
            <span
              className="w-6 h-6 rounded-lg"
              style={{ backgroundColor: item.color }}
            />

            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
