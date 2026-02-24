"use client";

import { CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetSinglePaymentHistoryQuery } from "@/redux/features/admin/adminApi";

export function PaymentModal({
  open,
  onOpenChange,
  selectedPayment,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPayment: any;
}) {

  // ✅ Skip query if no id
  const { data, isLoading } = useGetSinglePaymentHistoryQuery(
    selectedPayment?.id,
    {
      skip: !selectedPayment?.id,
    }
  );

  const payment = data?.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl p-0 dark:bg-gray-900">

        {/* Header */}
        <DialogHeader
          className="flex mt-5 flex-row items-center justify-between px-6 py-5
          bg-muted/30
          dark:bg-linear-to-r dark:from-[#1A1630] dark:via-[#2A2148] dark:to-[#1A1630]
          dark:border-b dark:border-white/10"
        >
          <DialogTitle className="text-lg font-semibold text-foreground dark:text-white">
            Payment Details
          </DialogTitle>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="h-9 w-9 rounded-xl border border-muted/40
              bg-white hover:bg-muted/30
              dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10
              flex items-center justify-center cursor-pointer"
            >
              <Download className="h-5 w-5 text-muted-foreground dark:text-white/70" />
            </button>
          </div>
        </DialogHeader>

        <div className="px-6 py-6 space-y-6">

          {isLoading && (
            <div className="text-center py-10">Loading...</div>
          )}

          {!isLoading && payment && (
            <>
              {/* Status Banner */}
              <div
                className="flex items-start gap-3 rounded-xl border border-emerald-400 bg-emerald-50 px-4 py-4
                dark:bg-emerald-500/10 dark:border-emerald-400/30"
              >
                <CheckCircle2 className="h-6 w-6 mt-0.5 text-emerald-600" />
                <div>
                  <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                    {payment.status === "Paid"
                      ? "Payment Successful"
                      : payment.status === "Due"
                        ? "Payment Pending"
                        : "Payment Failed"}
                  </p>

                  <p className="text-sm text-foreground/70 dark:text-white/60">
                    Subscription payment for {payment.package_name} plan
                  </p>
                </div>
              </div>

              {/* Transaction Information */}
              <div className="space-y-3">
                <p className="text-sm font-semibold dark:text-white">
                  Transaction Information
                </p>

                <div className="rounded-xl border border-muted/40 bg-white px-5 py-4
                dark:bg-white/5 dark:border-white/10">
                  <div className="grid grid-cols-2 gap-y-4 text-sm">
                    <div className="text-muted-foreground dark:text-white/50">
                      Transaction ID:
                    </div>
                    <div className="text-right font-medium dark:text-white">
                      {payment.tx_id}
                    </div>

                    <div className="text-muted-foreground dark:text-white/50">
                      Amount:
                    </div>
                    <div className="text-right font-medium dark:text-white">
                      {payment.amount}
                    </div>

                    <div className="text-muted-foreground dark:text-white/50">
                      Date:
                    </div>
                    <div className="text-right font-medium dark:text-white">
                      {payment.date}
                    </div>

                    <div className="text-muted-foreground dark:text-white/50">
                      Payment Method:
                    </div>
                    <div className="text-right font-medium dark:text-white">
                      {payment.payment_method}
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-3">
                <p className="text-sm font-semibold dark:text-white">
                  Customer Information
                </p>

                <div className="rounded-xl border border-muted/40 bg-white px-5 py-4 space-y-3 text-sm
                dark:bg-white/5 dark:border-white/10">

                  <div className="flex justify-between">
                    <span className="text-muted-foreground dark:text-white/50">
                      Merchant Name:
                    </span>
                    <span className="font-medium dark:text-white">
                      {payment.merchant_name}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground dark:text-white/50">
                      Email:
                    </span>
                    <span className="font-medium dark:text-white">
                      {payment.merchant_email}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground dark:text-white/50">
                      Phone:
                    </span>
                    <span className="font-medium dark:text-white">
                      {payment.merchant_phone}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground dark:text-white/50">
                      Package:
                    </span>
                    <span className="font-medium dark:text-white">
                      {payment.package_name}
                    </span>
                  </div>

                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <Button className="h-12 rounded-xl bg-black text-white dark:bg-white dark:text-black">
                  Download Receipt
                </Button>

                <Button
                  variant="outline"
                  className="h-12 rounded-xl dark:bg-white/5 dark:border-white/10"
                >
                  Send Email
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}