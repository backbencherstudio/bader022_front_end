"use client";
import { useMerchantTransactionOverviewQuery } from "@/redux/features/merchant/transactionApi";
import RecentTransactions from "../components/dashboard/RecentTransactions";

export default function page() {
  const {
    data: transactionOverview,
    isLoading,
    isError,
  } = useMerchantTransactionOverviewQuery({});

  // console.log(transactionOverview?.data);

  return (
    <div className="mt-4">
      <RecentTransactions data={transactionOverview?.data} />
    </div>
  );
}
