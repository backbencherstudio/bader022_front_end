"use client";
import StatCard from "./components/dashboard/StateCard";
import { Calendar, SaudiRiyal, TrendingUp, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RevenueChart from "./components/dashboard/RevenueChart";
import {
  Appointment,
  TodaysAppointments,
} from "./components/dashboard/TodaysAppoinments";
import RecentTransactions from "./components/dashboard/RecentTransactions";
import QuickActionsComponents from "./components/dashboard/QuickActions";
import {
  useMerchantDashboardOverviewQuery,
  useMonthlyRevenueQuery,
  useTodayAppointmentQuery,
  useWeeklyRevenueQuery,
} from "@/redux/features/merchant/dashboardApi";
import { useMerchantTransactionOverviewQuery } from "@/redux/features/merchant/transactionApi";
import { useI18n } from "@/components/provider/I18nProvider";

export type TData = {
  name: string;
  revenue: number;
};
export default function DashboardPage() {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  const {
    data: dashboardOverview,
    isLoading,
    isError,
  } = useMerchantDashboardOverviewQuery({});
  const {
    data: monthlyRevenueData,
    isLoading: isMonthlyLoading,
    isError: isMonthlyError,
  } = useMonthlyRevenueQuery({});
  const {
    data: weeklyRevenueData,
    isLoading: isWeeklyLoading,
    isError: isWeeklyError,
  } = useWeeklyRevenueQuery({});
  const {
    data: todayAppointmentData,
    isLoading: isTodayAppointmentLoading,
    isError: isTodayAppointmentError,
  } = useTodayAppointmentQuery({});
  const {
    data: transactionOverviewData,
    isLoading: isTransactionOverviewLoading,
    isError: isTransactionOverviewError,
  } = useMerchantTransactionOverviewQuery({});
  // console.log('====================================');
  // console.log({dashboardOverview});
  // console.log('====================================');
  // console.log('====================================');
  // console.log({ todayAppointmentData });
  // console.log('====================================');

  const appointments =
    todayAppointmentData?.data?.map((item: any) => ({
      id: String(item.id),
      datetimeLabel: item.date_time,
      customerName: item.customer_name,
      serviceName: item.service.service_name,
    })) || [];
  // console.log(appointments);

  return (
    <div>
      {/* Charts */}
      <div className="flex lg:flex-row flex-col justify-between gap-4 py-4">
        <div className="w-full">
          {/* Statistics Cards */}
          <div className="pb-6 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <StatCard
              title={t("Merchant.Dashboard.revenue")}
              Currency={SaudiRiyal}
              value={dashboardOverview?.revenue}
              Icon={SaudiRiyal}
            />
            <StatCard
              title={t("Merchant.Dashboard.totalBooking")}
              value={dashboardOverview?.total_bookings}
              Icon={Calendar}
            />
            <StatCard
              title={t("Merchant.Dashboard.appointments")}
              value={dashboardOverview?.appointments}
              Icon={TrendingUp}
            />
            <StatCard
              title={t("Merchant.Dashboard.totalCustomers")}
              value={dashboardOverview?.Total_Customers}
              Icon={Users}
            />
          </div>
          <div
            className="rounded-xl border dark:bg-gray-800
               border-gray-200 dark:border-gray-700
               p-4 pl-0 shadow-sm"
          >
            <div className="pl-4 pt-2 pb-4 w-full">
              <Tabs defaultValue="monthly">
                <div className="flex justify-between dark:text-white">
                  <p className="text-xl font-semibold text-[#444950] dark:text-white">
                    {t("Merchant.Dashboard.revenueStats")}
                  </p>
                  <TabsList
                    className="h-14 p-2 dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              rounded-xl shadow-sm"
                  >
                    <TabsTrigger
                      value="weekly"
                      className="
      data-[state=active]:bg-black cursor-pointer data-[state=active]:text-white
      dark:data-[state=active]:bg-white dark:data-[state=active]:text-black
    "
                    >
                      {/* Weekly */} {t("Merchant.Dashboard.weekly")}
                    </TabsTrigger>

                    <TabsTrigger
                      value="monthly"
                      className="
      data-[state=active]:bg-black cursor-pointer data-[state=active]:text-white
      dark:data-[state=active]:bg-white dark:data-[state=active]:text-black
    "
                    >
                      {/* Monthly */} {t("Merchant.Dashboard.monthly")}
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="weekly">
                  <RevenueChart
                    data={weeklyRevenueData}
                    CurrencyIcon={SaudiRiyal}
                  />
                </TabsContent>
                <TabsContent value="monthly">
                  <RevenueChart
                    data={monthlyRevenueData}
                    CurrencyIcon={SaudiRiyal}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        <TodaysAppointments items={appointments} />
      </div>
      <div className="pt-4 flex xl:flex-row flex-col justify-between md:pt-5 gap-4 lg:pt-6">
        <div className="w-full">
          <RecentTransactions data={transactionOverviewData?.data} />
        </div>
        <div className="w-full xl:w-1/4">
          <QuickActionsComponents />
        </div>
      </div>
    </div>
  );
}
