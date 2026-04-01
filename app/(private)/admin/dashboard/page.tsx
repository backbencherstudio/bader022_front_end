"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useDashboardOverviewQuery,
  useMonthlypaymentCountQuery,
  useWeeklyPaymentCountQuery,
} from "@/redux/features/admin/adminApi";
import { Crown, SaudiRiyal, ShoppingCart, Users } from "lucide-react";
import StatCard from "../../merchant/dashboard/components/dashboard/StateCard";
import RevenueOverviewLineChart from "../components/dashboard/RevenueOverviewLineChart";
import MerchantManagement from "../components/merchants/MerchantManagement";

export type TData = {
  day: string;
  revenue: number;
};

type MonthlyRevenueItem = {
  month: string;
  revenue: number;
};

type WeeklyRevenueItem = {
  day: string;
  revenue: number;
};
export default function DashboardPage() {
  const { data: weeklyApiData } = useWeeklyPaymentCountQuery({});
  const { data: monthlyApiData } = useMonthlypaymentCountQuery({});
  const { data: dashboardOverview } = useDashboardOverviewQuery({});

  const monthlyRevenueData =
    (monthlyApiData as MonthlyRevenueItem[] | undefined)?.map(
      (item: MonthlyRevenueItem) => ({
        name: item.month,
        revenue: item.revenue,
      }),
    ) || [];

  // console.log(monthlyRevenueData);

  const weeklyRevenueData =
    (weeklyApiData as WeeklyRevenueItem[] | undefined)?.map(
      (item: WeeklyRevenueItem) => ({
        name: item.day,
        revenue: item.revenue,
      }),
    ) || [];

  // console.log(weeklyRevenueData);

  return (
    <div>
      {/* Charts */}
      <div>
        {/* Statistics Cards */}
        <div className="pb-6 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <StatCard
            Currency={SaudiRiyal}
            title="Revenue"
            value={dashboardOverview?.data?.revenue}
            Icon={SaudiRiyal}
          />
          <StatCard
            title="Total Merchants"
            value={dashboardOverview?.data?.merchants_count}
            Icon={ShoppingCart}
          />
          <StatCard
            title="Premium Users"
            value={dashboardOverview?.data?.plan_sales?.Premium}
            Icon={Crown}
          />
          <StatCard
            title="Basic Users"
            value={dashboardOverview?.data?.plan_sales?.Basic}
            Icon={Users}
          />
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
