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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
          <div className="pl-4 pt-2 pb-4 w-full">
            <Tabs defaultValue="account">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-[#444950]">
                  Revenue Statistics
                </p>
                <TabsList className="p-2">
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="weekly">
                <RevenueChart />
              </TabsContent>
              <TabsContent value="monthly">
                <RevenueChart />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <div className="pt-4 md:pt-5 lg:pt-6">{/* <RecentOrder /> */}</div>
    </div>
  );
}
