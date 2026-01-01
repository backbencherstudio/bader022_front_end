"use client";
import StatCard from "./components/dashboard/StateCard";
import { Calendar, CircleDollarSign, TrendingUp, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChartsTabs from "./components/dashboard/RevenueChart";
import {
  Appointment,
  TodaysAppointments,
} from "./components/dashboard/TodaysAppoinments";
import RecentTransactions, {
  RecentTransactionsCard,
} from "./components/dashboard/RecentTransactions";
import QuickActionsComponents from "./components/dashboard/QuickActions";

export type TData = {
  name: string;
  revenue: number;
};

const monthlyData: TData[] = [
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
const weeklyData: TData[] = [
  { name: "Sat", revenue: 150 },
  { name: "Sun", revenue: 300 },
  { name: "Mon", revenue: 150 },
  { name: "Tue", revenue: 250 },
  { name: "Wed", revenue: 150 },
  { name: "Thu", revenue: 300 },
  { name: "Fri", revenue: 500 },
];

const appointments: Appointment[] = Array.from({ length: 8 }).map((_, i) => ({
  id: String(i),
  datetimeLabel: "Feb 1t 2024, 10:30 AM",
  customerName: "Sarah Johnson",
  serviceName: "Haircut & Styling",
}));
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
            <Tabs defaultValue="monthly">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-[#444950]">
                  Revenue Statistics
                </p>
                <TabsList className="h-14 p-2">
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="weekly">
                <ChartsTabs data={weeklyData} />
              </TabsContent>
              <TabsContent value="monthly">
                <ChartsTabs data={monthlyData} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <TodaysAppointments items={appointments} />
      </div>
      <div className="pt-4 flex lg:flex-row flex-col justify-between md:pt-5 gap-4 lg:pt-6">
        <div className="w-full">
          <RecentTransactions />
        </div>
        <div className="w-full lg:w-1/4">
          <QuickActionsComponents />
        </div>
      </div>
    </div>
  );
}
