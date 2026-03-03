"use client";
import StatCard from "../../merchant/dashboard/components/dashboard/StateCard";
import { Clock, Clock3, Crown, Package } from "lucide-react";
import Packages from "../components/subscriptions/ActiveSubscription";
import { useGetsubcriptionSumaryQuery } from "@/redux/features/admin/adminApi";

export default function page() {
  const { data, isLoading, isError } = useGetsubcriptionSumaryQuery({})
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  const summary = data?.summary;
  console.log(data,"llklklklklkl")
  return (
    <div>
      <div className="pb-6 pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        <StatCard
          title="Total Packages"
          value={summary?.total_packages ?? 0}
          Icon={Package}
        />

        <StatCard
          title="Active Subscriptions"
          value={summary?.active_subscriptions ?? 0}
          Icon={Crown}
        />

        <StatCard
          title="Expired Subscription"
          value={summary?.expired_subscriptions ?? 0}
          Icon={Clock}
        />

        <StatCard
          title="Expiring Soon"
          value={summary?.expiring_soon ?? 0}
          expired="(Within next 7days)"
          Icon={Clock3}
        />
      </div>
      <div>
        <Packages />
      </div>
    </div>
  );
}
