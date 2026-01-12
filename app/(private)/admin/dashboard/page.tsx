"use client";
import { CircleDollarSign, Crown, ShoppingCart, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatCard from "../../merchant/dashboard/components/dashboard/StateCard";
import RevenueOverviewLineChart from "../components/dashboard/RevenueOverviewLineChart";
import MerchantManagement from "../components/merchants/MerchantManagement";

export type TData = {
  name: string;
  revenue: number;
};

const monthlyRevenueData: TData[] = [
  { name: "Jan", revenue: 4500 },
  { name: "Feb", revenue: 500 },
  { name: "Mar", revenue: 1500 },
  { name: "Apr", revenue: 3000 },
  { name: "May", revenue: 1500 },
  { name: "Jun", revenue: 3000 },
  { name: "Jul", revenue: 5000 },
  { name: "Aug", revenue: 3000 },
  { name: "Sep", revenue: 1500 },
  { name: "Oct", revenue: 3000 },
  { name: "Nov", revenue: 1500 },
  { name: "Dec", revenue: 5000 },
];
const weeklyRevenueData: TData[] = [
  { name: "Sat", revenue: 1500 },
  { name: "Sun", revenue: 3000 },
  { name: "Mon", revenue: 1500 },
  { name: "Tue", revenue: 2500 },
  { name: "Wed", revenue: 500 },
  { name: "Thu", revenue: 3000 },
  { name: "Fri", revenue: 5000 },
];

export default function DashboardPage() {
  return (
    <div>
      {/* Charts */}
      <div>
        {/* Statistics Cards */}
        <div className="pb-6 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <StatCard title="Revenue" value={"$84320"} Icon={CircleDollarSign} />
          <StatCard title="Total Merchants" value={156} Icon={ShoppingCart} />
          <StatCard title="Premium Users" value={114} Icon={Crown} />
          <StatCard title="Basic Users" value={40} Icon={Users} />
        </div>
        {/* Revenue overview charts */}
        <div className="rounded-xl p-4 pl-0 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
          <div className="pl-4 pt-2 pb-4 w-full">
            <Tabs defaultValue="monthly">
              <div className="flex justify-between">
                <p className="text-xl font-semibold text-[#444950] dark:text-white">
                  Revenue Statistics
                </p>
                <TabsList className="h-14 p-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="weekly">
                <RevenueOverviewLineChart data={weeklyRevenueData} />
              </TabsContent>
              <TabsContent value="monthly">
                <RevenueOverviewLineChart data={monthlyRevenueData} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <div className="mt-6 ">
        <MerchantManagement />
      </div>
    </div>
  );
}
