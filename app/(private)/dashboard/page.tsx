"use client";
import React from "react";
import StatCard from "./components/dashboard/StateCard";
import {
  Calendar,
  ChevronDown,
  CircleDollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
import RevenueChart from "./components/dashboard/RevenueChart";
export default function DashboardPage() {
  return (
    <div>
      {/* Statistics Cards */}
      <div className="pb-6 pt-0 md:pt-1 lg:pt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatCard title="Revenue" value={"109 SAR"} Icon={CircleDollarSign} />
        <StatCard title="Total Bookings" value={248} Icon={Calendar} />
        <StatCard title="Appointments" value={34} Icon={TrendingUp} />
        <StatCard title="Total Customers" value={186} Icon={Users} />
      </div>
      {/* Charts */}
      <div className="flex lg:flex-row flex-col justify-between gap-4">
        {/* Revenue Chart */}
        <div className="w-full rounded-xl border border-gray-200 bg-white p-4 pl-0 shadow-sm">
          <div className="pl-4 pt-2 pb-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-[#444950]">
                Revenue Statistics
              </p>
              <div className="flex gap-2 items-center my-3">
                <h1 className="text-xl text-[#151C24] lg:text-2xl pt-1.5 font-bold">
                  $500k
                </h1>
                <span className="flex items-center gap-2 w-20 border border-[#4CAF50] mt-1 px-2 py-0.5 rounded-full bg-[#f6fcf7]">
                  <span className="text-sm text-[#4CAF50]">10 %</span>
                  <TrendingUp className="text-[#4CAF50] w-5" />
                </span>
              </div>
            </div>
            <button className="rounded-lg px-5 py-2.5 text-[#727a80] flex gap-1 border-2 border-gray-200">
              Year <ChevronDown />
            </button>
          </div>
          <RevenueChart />
        </div>
        {/* Subscriber statics chart */}
        <div className="w-full rounded-xl border border-gray-200 bg-white p-4 pl-0 shadow-sm">
          <div className="pl-4 pt-2 pb-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-[#444950]">
                Total Subscriber
              </p>
              <div className="flex gap-2 items-center my-3">
                <h1 className="text-xl text-[#151C24] lg:text-2xl pt-1.5 font-bold">
                  100
                </h1>
                <span className="flex items-center gap-2 w-20 border border-[#4CAF50] mt-1 px-2 py-0.5 rounded-full bg-[#f6fcf7]">
                  <span className="text-sm text-[#4CAF50]">10 %</span>
                  <TrendingUp className="text-[#4CAF50] w-5" />
                </span>
              </div>
            </div>
            <button className="rounded-lg px-5 py-2.5 text-[#727a80] flex gap-1 border-2 border-gray-200">
              Year <ChevronDown />
            </button>
          </div>
          {/* <SubscriberStaticsChart /> */}
        </div>
      </div>
      <div className="pt-4 md:pt-5 lg:pt-6">{/* <RecentOrder /> */}</div>
    </div>
  );
}
