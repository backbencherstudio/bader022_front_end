"use client";
import StatCard from "../../merchant/dashboard/components/dashboard/StateCard";
import { Clock, Clock3, Crown, Package } from "lucide-react";
import Packages from "../components/subscriptions/ActiveSubscription";
import { useGetsubcriptionSumaryQuery } from "@/redux/features/admin/adminApi";
import { useI18n } from "@/components/provider/I18nProvider";

export default function page() {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  const { data, isLoading, isError } = useGetsubcriptionSumaryQuery({});
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  const summary = data?.summary;
  // console.log(data,"llklklklklkl")
  return (
    <div>
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className="pb-6 pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <StatCard
          title={t("Admin.SubscriptionAnalytics.totalPackages")}
          value={summary?.total_packages ?? 0}
          Icon={Package}
        />

        <StatCard
          title={t("Admin.SubscriptionAnalytics.activeSubscriptions")}
          value={summary?.active_subscriptions ?? 0}
          Icon={Crown}
        />

        <StatCard
          title={t("Admin.SubscriptionAnalytics.expiredSubscriptions")}
          value={summary?.expired_subscriptions ?? 0}
          Icon={Clock}
        />

        <StatCard
          title={t("Admin.SubscriptionAnalytics.expiringSoon")}
          value={summary?.expiring_soon ?? 0}
          expired={t("Admin.SubscriptionAnalytics.expiringSoonDesc")}
          Icon={Clock3}
        />
      </div>
      <div dir={isRTL ? "rtl" : "ltr"}>
        <Packages />
      </div>
    </div>
  );
}
