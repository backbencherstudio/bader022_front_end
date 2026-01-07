"use client";
import StatCard from "../../merchant/dashboard/components/dashboard/StateCard";
import { Clock, Clock3, Crown, Package } from "lucide-react";
import Packages from "../components/subscriptions/Packages";

export default function page() {
  return (
    <div>
      <div className="pb-6 pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatCard title="Total Packages" value={2} Icon={Package} />
        <StatCard title="Active Subscriptions" value={256} Icon={Crown} />
        <StatCard title="Expired Subscription" value={32} Icon={Clock} />
        <StatCard
          title="Expiring Soon"
          value={12}
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
