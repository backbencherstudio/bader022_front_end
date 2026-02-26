"use client";
import StatCard from "../components/dashboard/StateCard";
import {
  Calendar,
  CircleDollarSign,
  Star,
  User,
  UserCheck,
  SaudiRiyal,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RevenueChart from "../components/dashboard/RevenueChart";
import NewVSReturningCusChart from "../components/analytics/NewVSReturningCusChart";
import StaffPerformance from "../components/analytics/StaffPerformance";
import { useAnalyticsOverviewQuery } from "@/redux/features/merchant/analyticsApi";


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

export default function page() {


  const { data: analyticsData, isLoading, isError } = useAnalyticsOverviewQuery({});
  console.log('====================================');
  console.log('analyticsData:', analyticsData);
  console.log('isLoading:', isLoading);
  console.log('isError:', isError);
  console.log('====================================');
  return (
    <div>
      {/* Charts */}
      <div className="flex lg:flex-row flex-col justify-between gap-4 py-4">
        <div className="w-full">
          {/* Statistics Cards */}
          <div className="pb-6 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <StatCard
              title="Revenue"
              Currency={SaudiRiyal}
              value={"12,450"}
              Icon={SaudiRiyal}
            />
            <StatCard title="Total Bookings" value={248} Icon={Calendar} />
            <StatCard title="New Customers" value={34} Icon={User} />
            <StatCard title="Returning Customers" value={86} Icon={UserCheck} />
            <StatCard title="Top Service" value={"Haircut"} Icon={Star} />
          </div>
          <div className="flex flex-col gap-4 lg:flex-row ">
            <div className="pl-4 pt-2 pb-4 rounded-xl w-full p-4  border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
              <Tabs defaultValue="monthly">
                <div className="flex justify-between">
                  <p className="text-xl font-semibold text-[#444950] dark:text-white">
                    Revenue Statistics
                  </p>
                  <TabsList className="h-14 p-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm ">
                    <TabsTrigger
                      value="weekly"
                      className="
      data-[state=active]:bg-black cursor-pointer data-[state=active]:text-white
      dark:data-[state=active]:bg-white dark:data-[state=active]:text-black
    "
                    >
                      Weekly
                    </TabsTrigger>

                    <TabsTrigger
                      value="monthly"
                      className="
      data-[state=active]:bg-black cursor-pointer data-[state=active]:text-white
      dark:data-[state=active]:bg-white dark:data-[state=active]:text-black
    "
                    >
                      Monthly
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="weekly">
                  <RevenueChart data={weeklyData} CurrencyIcon={SaudiRiyal} />
                </TabsContent>
                <TabsContent value="monthly">
                  <RevenueChart data={monthlyData} CurrencyIcon={SaudiRiyal} />
                </TabsContent>
              </Tabs>
            </div>
            <div className="rounded-xl lg:w-2/4 w-full  p-4 pl-0 dark:text-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
              <NewVSReturningCusChart />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-4 md:pt-5 gap-4 lg:pt-6">
        <StaffPerformance />
      </div>
    </div>
  );
}
