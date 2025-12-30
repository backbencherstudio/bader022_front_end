import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Jan", revenue: 450 },
  { name: "Feb", revenue: 300 },
  { name: "Mar", revenue: 150 },
  { name: "Apr", revenue: 300 },
  { name: "May", revenue: 150 },
  { name: "Jun", revenue: 300 },
  { name: "Jul", revenue: 500 },
  { name: "Aug", revenue: 300 },
  { name: "Sep", revenue: 150 },
  { name: "Oct", revenue: 300 },
  { name: "Nov", revenue: 150 },
  { name: "Dec", revenue: 500 },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomBar = (props: any) => {
  const { x, y, width, height } = props;
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
        fill="#eee"
      />
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={barRadius}
        ry={barRadius}
        fill="black"
      />
    </g>
  );
};

export default function RevenueChart() {
  return (
    <BarChart
      style={{
        width: "100%",
        maxWidth: "700px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
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
      <Bar dataKey="revenue" shape={<CustomBar />} />
    </BarChart>
  );
}
