import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Label, Pie, PieChart } from "recharts";

const data = [
  { name: "Group A", value: 83, fill: "orange" },
  { name: "Group B", value: 147, fill: "#fff" },
];
const MyPie1 = () => (
  <Pie
    data={data}
    dataKey="value"
    nameKey="name"
    outerRadius="64%"
    innerRadius="36%"
    isAnimationActive={false}
  />
);

const data2 = [
  { name: "Group A", value: 83, fill: "blue" },
  { name: "Group B", value: 147, fill: "black" },
];
const MyPie2 = () => (
  <Pie
    data={data2}
    dataKey="value"
    nameKey="name"
    outerRadius="64%"
    innerRadius="36%"
    isAnimationActive={false}
  />
);

export default function NewVSReturningCusChart() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // wait until client mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";
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
          {isDark ? (
            <div>
              <MyPie1 />
              <Label position="center" fill="white">
                64%
              </Label>
            </div>
          ) : (
            <div>
              <MyPie2 />
              <Label position="center" fill="green">
                64%
              </Label>
            </div>
          )}
          {/* <MyPie1 />
          <MyPie2 /> */}
          {/* <Label position="center" fill="white">
            64%
          </Label> */}
        </PieChart>
        <div className="px-6">
          <div className="text-blue-800 dark:text-orange-300 pb-3 font-medium text-[16px] gap-2 flex justify-between items-center">
            <div className="flex justify-between gap-2 items-center">
              <div className="text-3xl font-bold w-2 h-2 rounded-full bg-blue-800 dark:bg-orange-300" />
              <p> Returning</p>
            </div>
            <p>83</p>
          </div>
          <div className="text-black dark:text-white pb-3 font-medium text-[16px] gap-2 flex justify-between items-center">
            <div className="flex justify-between gap-2 items-center">
              <div className="text-3xl font-bold w-2 h-2 rounded-full bg-black dark:bg-white" />
              <p>New</p>
            </div>
            <p>147</p>
          </div>
        </div>
      </div>
    </div>
  );
}
