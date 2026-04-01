"use client";

import { Button } from "@/components/ui/button";
import { FaFileExport } from "react-icons/fa";
import StatCard from "../../merchant/dashboard/components/dashboard/StateCard";
import { Crown, SaudiRiyal, ShoppingCart, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RevenueOverviewLineChart from "../components/dashboard/RevenueOverviewLineChart";
import BusinessTypeAnalyticsChart from "../components/analytics/BusinessAnalyticsChart";
import RevenueChart from "../../merchant/dashboard/components/dashboard/RevenueChart";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useDashboardOverviewQuery,
  useMonthlypaymentCountQuery,
  useWeeklyPaymentCountQuery,
} from "@/redux/features/admin/adminApi";

type WeeklyPaymentItem = {
  day: string;
  revenue: number;
};

type MonthlyPaymentItem = {
  month: string;
  revenue: number;
};

export default function Page() {
  const { data: weeklyApiData } = useWeeklyPaymentCountQuery({});
  const { data: monthlyApiData } = useMonthlypaymentCountQuery({});
  const { data: dashboardOverview } = useDashboardOverviewQuery({});

  // console.log('====================================');
  // console.log(weeklyApiData);
  // console.log('====================================');

  const monthlyRevenueData =
    monthlyApiData?.map((item: MonthlyPaymentItem) => ({
      name: item.month,
      revenue: item.revenue,
    })) || [];

  const weeklyRevenueData =
    weeklyApiData?.map((item: WeeklyPaymentItem) => ({
      name: item.day,
      revenue: item.revenue,
    })) || [];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mt-2">
        <div>
          <h2 className="text-xl font-medium mb-1">Perform Analytics</h2>
          <p>Comprehensive insights into platform performance</p>
        </div>
        <Button size="lg">
          <FaFileExport />
          Export
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="pb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
        <StatCard
          title="Revenue"
          value={dashboardOverview?.data?.revenue || 0}
          Icon={SaudiRiyal}
        />
        <StatCard
          title="Total Merchants"
          value={dashboardOverview?.data?.merchants_count || 0}
          Icon={ShoppingCart}
        />
        <StatCard
          title="Premium Users"
          value={dashboardOverview?.data?.plan_sales?.Premium || 0}
          Icon={Crown}
        />
        <StatCard
          title="Basic Users"
          value={dashboardOverview?.data?.plan_sales?.Basic || 0}
          Icon={Users}
        />
      </div>

      {/* Revenue Tabs */}
      <div className="pl-4 pt-2 pb-4 rounded-xl w-full p-4 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
        <Tabs defaultValue="monthly">
          <div className="flex justify-between mt-5">
            <p className="text-xl font-semibold dark:text-white">
              Revenue Overview
            </p>

            <TabsList className="h-14 p-2 border dark:border-gray-700 dark:bg-gray-800 shadow-sm">
              <TabsTrigger
                value="weekly"
                className="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black"
              >
                Weekly
              </TabsTrigger>

              <TabsTrigger
                value="monthly"
                className="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black"
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

      {/* Charts Section */}
      <div className="flex flex-col gap-4 lg:flex-row mt-5">
        <div className="w-full">
          <Card className="border dark:border-gray-700 dark:bg-gray-800 shadow-sm">
            <CardHeader className="flex items-center justify-between mt-5">
              <h1 className="text-xl font-medium">Subscription Analytics</h1>

              <Select defaultValue="2026">
                {/* <SelectTrigger>
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger> */}
                <SelectContent>
                  {Array.from({ length: 11 }, (_, i) => 2026 - i).map(
                    (year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </CardHeader>

            <RevenueChart CurrencyIcon={SaudiRiyal} data={monthlyRevenueData} />
          </Card>
        </div>

        <div className="rounded-xl lg:w-2/3 w-full p-4 border dark:border-gray-700 dark:bg-gray-800 shadow-sm">
          <BusinessTypeAnalyticsChart />
        </div>
      </div>
    </div>
  );
}
