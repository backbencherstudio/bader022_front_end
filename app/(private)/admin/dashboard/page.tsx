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
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DashboardPage() {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  
  const [selectedYear, setSelectedYear] = useState<string>(String(currentYear));
  const [selectedMonth, setSelectedMonth] = useState<string>(String(currentMonth));

  // console.log(selectedYear);
  // console.log(selectedMonth);
  

  const { data: weeklyApiData } = useWeeklyPaymentCountQuery({ 
    year: Number(selectedYear), 
    // month: Number(selectedMonth) 
  });
  const { data: monthlyApiData } = useMonthlypaymentCountQuery({ 
    year: Number(selectedYear), 
    // month: Number(selectedMonth) 
  });
  const { data: dashboardOverview } = useDashboardOverviewQuery({});

  const years = Array.from({ length: 10 }, (_, i) => String(currentYear - i));
  const months = [
    { value: "1", label: "Jan" },
    { value: "2", label: "Feb" },
    { value: "3", label: "Mar" },
    { value: "4", label: "Apr" },
    { value: "5", label: "May" },
    { value: "6", label: "Jun" },
    { value: "7", label: "Jul" },
    { value: "8", label: "Aug" },
    { value: "9", label: "Sep" },
    { value: "10", label: "Oct" },
    { value: "11", label: "Nov" },
    { value: "12", label: "Dec" },
  ];
  

  const monthlyRevenueData =
    (monthlyApiData?.data as any)?.map((item: any) => ({
      name: item.month,
      revenue: item.revenue,
    })) || [];

  const weeklyRevenueData =
    (weeklyApiData?.data as any)?.map((item: any) => ({
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

            {/* Selectors and Tabs */}
            <div className="flex items-center gap-2">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-25 h-10 sm:h-12 lg:h-14">
                  <SelectValue placeholder={t("Admin.Dashboard.year")} />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-30 h-10 sm:h-12 lg:h-14">
                  <SelectValue placeholder={t("Admin.Dashboard.month")} />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select> */}

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
