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
import { useI18n } from "@/components/provider/I18nProvider";

type WeeklyPaymentItem = {
  day: string;
  revenue: number;
};

type MonthlyPaymentItem = {
  month: string;
  revenue: number;
};

export default function Page() {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
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
    <div dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="flex items-center justify-between my-2">
        {locale === "ar" ? (
          <div>
            <h2 className="text-xl font-medium mb-1">تحليل الأداء</h2>
            <p>رؤى شاملة حول أداء المنصة</p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-medium mb-1">Perform Analytics</h2>
            <p>Comprehensive insights into platform performance</p>
          </div>
        )}

        {/* {locale === "ar" ? (
          <Button size="lg">
            <FaFileExport />
            تصدير
          </Button>
        ) : (
          <Button size="lg">
            <FaFileExport />
            Export
          </Button>
        )} */}
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-6">
        <StatCard
          Currency={SaudiRiyal}
          title={t("Admin.Dashboard.revenue")}
          value={dashboardOverview?.data?.revenue}
          Icon={SaudiRiyal}
        />
        <StatCard
          title={t("Admin.Dashboard.totalMerchants")}
          value={dashboardOverview?.data?.merchants_count}
          Icon={ShoppingCart}
        />
        <StatCard
          title={t("Admin.Dashboard.premiumUsers")}
          value={dashboardOverview?.data?.plan_sales?.Premium}
          Icon={Crown}
        />
        <StatCard
          title={t("Admin.Dashboard.basicUsers")}
          value={dashboardOverview?.data?.plan_sales?.Basic}
          Icon={Users}
        />
      </div>

      {/* CHART SECTION */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm p-3 sm:p-4 lg:p-5">
        <Tabs defaultValue="monthly">
          {/* HEADER */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Title */}
            <p className="text-base sm:text-lg lg:text-xl font-semibold text-[#444950] dark:text-white">
              {t("Admin.Dashboard.revenueStats")}
            </p>

            {/* Tabs */}
            <TabsList
              className="
        flex w-full sm:w-auto
        h-10 sm:h-12 lg:h-14
        p-1 sm:p-2
        border border-gray-200 dark:border-gray-700
        dark:bg-gray-800 shadow-sm
        "
            >
              <TabsTrigger
                value="weekly"
                className="
          flex-1 sm:flex-none
          text-xs sm:text-sm lg:text-base
          px-2 sm:px-3
          data-[state=active]:bg-black data-[state=active]:text-white
          dark:data-[state=active]:bg-white dark:data-[state=active]:text-black
          "
              >
                {t("Admin.Dashboard.weekly")}
              </TabsTrigger>

              <TabsTrigger
                value="monthly"
                className="
          flex-1 sm:flex-none
          text-xs sm:text-sm lg:text-base
          px-2 sm:px-3
          data-[state=active]:bg-black data-[state=active]:text-white
          dark:data-[state=active]:bg-white dark:data-[state=active]:text-black
          "
              >
                {t("Admin.Dashboard.monthly")}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* CHART CONTENT */}
          <div className="mt-4">
            <TabsContent value="weekly">
              <RevenueOverviewLineChart data={weeklyRevenueData} />
            </TabsContent>

            <TabsContent value="monthly">
              <RevenueOverviewLineChart data={monthlyRevenueData} />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Charts Section */}
      <div className="flex flex-col gap-4 lg:flex-row mt-5">
        <div className="w-full">
          <Card className="border dark:border-gray-700 dark:bg-gray-800 shadow-sm">
            <CardHeader className="flex items-center justify-between mt-5">
              {locale === "ar" ? (
                <h1 className="text-xl font-medium">تحليلات الاشتراكات</h1>
              ) : (
                <h1 className="text-xl font-medium">Subscription Analytics</h1>
              )}

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
