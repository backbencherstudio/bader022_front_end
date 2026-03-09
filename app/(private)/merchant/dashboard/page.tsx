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

export type TData = {
  name: string;
  revenue: number;
};

// const monthlyData: TData[] = [
//   { name: "Jan", revenue: 450 },
//   { name: "Feb", revenue: 300 },
//   { name: "Mar", revenue: 150 },
//   { name: "Apr", revenue: 300 },
//   { name: "May", revenue: 150 },
//   { name: "Jun", revenue: 300 },
//   { name: "Jul", revenue: 500 },
//   { name: "Aug", revenue: 300 },
//   { name: "Sep", revenue: 150 },
//   { name: "Oct", revenue: 300 },
//   { name: "Nov", revenue: 150 },
//   { name: "Dec", revenue: 500 },
// ];
// const weeklyData: TData[] = [
//   { name: "Sat", revenue: 150 },
//   { name: "Sun", revenue: 300 },
//   { name: "Mon", revenue: 150 },
//   { name: "Tue", revenue: 250 },
//   { name: "Wed", revenue: 150 },
//   { name: "Thu", revenue: 300 },
//   { name: "Fri", revenue: 500 },
// ];

const appointments: Appointment[] = Array.from({ length: 8 }).map((_, i) => ({
  id: String(i),
  datetimeLabel: "Feb 1t 2024, 10:30 AM",
  customerName: "Sarah Johnson",
  serviceName: "Haircut & Styling",
}));
export default function DashboardPage() {
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
    data: transactionOverview,
    isLoading: isTransactionOverviewLoading,
    isError: isTransactionOverviewError,
  } = useMerchantTransactionOverviewQuery({});
  // console.log('====================================');
  // console.log({ dashboardOverview });
  // console.log('====================================');
  // console.log('====================================');
  // console.log({todayAppointmentData});
  // console.log('====================================');
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
              value={dashboardOverview?.revenue}
              Icon={SaudiRiyal}
            />
            <StatCard
              title="Total Bookings"
              value={dashboardOverview?.total_bookings}
              Icon={Calendar}
            />
            <StatCard
              title="Appointments"
              value={dashboardOverview?.appointments}
              Icon={TrendingUp}
            />
            <StatCard
              title="Total Customers"
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
                    Revenue Statistics
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
          <RecentTransactions data={transactionOverview?.data} />
        </div>
        <div className="w-full xl:w-1/4">
          <QuickActionsComponents />
        </div>
      </div>
    </div>
  );
}
