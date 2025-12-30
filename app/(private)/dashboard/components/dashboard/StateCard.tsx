"use client";
import React from "react";

interface IStatCard {
  title: string;
  value: string | number;
  Icon: (props: React.ComponentProps<"svg">) => React.ReactNode;
}

const StatCard: React.FC<IStatCard> = ({ title, value, Icon }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex flex-col justify-between">
      {/* Top Section */}
      <div className="flex justify-between items-center gap-2">
        <h3 className="font-medium text-[#111927] text-[18px]">{title}</h3>
        <div className="p-2 rounded-full bg-indigo-50 text-black">
          <Icon />
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <div className="text-3xl font-semibold text-black">{value}</div>
      </div>
    </div>
  );
};

export default StatCard;
