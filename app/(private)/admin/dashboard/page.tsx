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
import { useI18n } from "@/components/provider/I18nProvider";

export default function DashboardPage() {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";

  const { data: weeklyApiData } = useWeeklyPaymentCountQuery({});
  const { data: monthlyApiData } = useMonthlypaymentCountQuery({});
  const { data: dashboardOverview } = useDashboardOverviewQuery({});

  const monthlyRevenueData =
    (monthlyApiData as any)?.map((item: any) => ({
      name: item.month,
      revenue: item.revenue,
    })) || [];

  const weeklyRevenueData =
    (weeklyApiData as any)?.map((item: any) => ({
      name: item.day,
      revenue: item.revenue,
    })) || [];

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
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
      {/* MERCHANT TABLE */}
      <div className="mt-6">
        <MerchantManagement />
      </div>
    </div>
  );
}
