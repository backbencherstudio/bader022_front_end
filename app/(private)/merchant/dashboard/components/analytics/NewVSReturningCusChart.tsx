import { DivideCircle, Dot } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

const data = [
  { name: "Group A", value: 400, fill: "#10239F" },
  { name: "Group B", value: 300, fill: "#000000" },
];
const MyPie = () => (
  <Pie
    data={data}
    dataKey="value"
    nameKey="name"
    outerRadius="64%"
    innerRadius="36%"
    isAnimationActive={false}
  />
);

export default function NewVSReturningCusChart() {
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          width: "100%",
          padding: "4px",
        }}
      >
        <h1 className="px-4 font-semibold text-xl text-[#444950] dark:text-white">
          New VS Returning
        </h1>
        <PieChart
          responsive
          style={{
            maxWidth: "80%",
            marginLeft: "auto",
            marginRight: "auto",
            aspectRatio: 1,
          }}
        >
          <MyPie />
          <Label position="center" fill="#666">
            64%
          </Label>
        </PieChart>
        <div className="px-6">
          <div className="text-blue-800 pb-3 font-medium text-[16px] gap-2 flex justify-between items-center">
            <div className="flex justify-between gap-2 items-center">
              <div className="text-3xl font-bold w-2 h-2 rounded-full bg-blue-800" />
              <p> Returning</p>
            </div>
            <p>83</p>
          </div>
          <div className="text-black dark:text-gray-500 pb-3 font-medium text-[16px] gap-2 flex justify-between items-center">
            <div className="flex justify-between gap-2 items-center">
              <div className="text-3xl font-bold w-2 h-2 rounded-full bg-black dark:bg-gray-500" />
              <p>New</p>
            </div>
            <p>147</p>
          </div>
        </div>
      </div>
    </div>
  );
}
