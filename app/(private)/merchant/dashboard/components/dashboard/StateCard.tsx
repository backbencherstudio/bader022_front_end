"use client";
import React from "react";

interface IStatCard {
  title: string;
  value: string | number;
  expired?: string;
  Icon: (props: React.ComponentProps<"svg">) => React.ReactNode;
  Currency?: (props: React.ComponentProps<"svg">) => React.ReactNode;
}

const StatCard: React.FC<IStatCard> = ({
  title,
  Currency,
  value,
  Icon,
  expired,
}) => {
  return (
    <div
      className="rounded-xl bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
               p-5 shadow-sm flex flex-col justify-between"
    >
      {/* Top Section */}
      <div className="flex justify-between items-center gap-2">
        <h3 className="font-medium text-black dark:text-white text-[18px]">
          {title}
        </h3>
        <div className="p-2 rounded-full bg-indigo-50 text-black">
          <Icon />
        </div>
      </div>

      <div className="flex justify-between pt-6 items-center">
        <div className="text-3xl font-semibold text-black dark:text-white flex items-center gap-3">
          {Currency && <Currency />}
          {value}
        </div>
        {expired && <p>{expired}</p>}
      </div>
    </div>
  );
};

export default StatCard;
