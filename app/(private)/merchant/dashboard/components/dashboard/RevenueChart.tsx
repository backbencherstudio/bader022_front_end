import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { TData } from "../../page";
import { useTheme } from "next-themes";

const CustomBar = (props: any) => {
  const { x, y, width, height, fill } = props;
  const barRadius = 8;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={barRadius}
        ry={barRadius}
        fill={fill}
      />
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={barRadius}
        ry={barRadius}
        fill={fill}
      />
    </g>
  );
};

export default function RevenueChart({ data }: { data: TData[] }) {
  const { theme } = useTheme();
  return (
    <BarChart
      style={{
        width: "100%",
        maxWidth: "700px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
        backgroundColor: theme === "dark" ? "dark:bg-gray-800" : "",
        borderRadius: "4px",
        margin: "4px",
        padding: "6px",
      }}
      responsive
      data={data}
      margin={{
        top: 25,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="revenue"
        shape={<CustomBar />}
        fill={theme === "dark" ? "#fff" : "#black"}
      />
    </BarChart>
  );
}
