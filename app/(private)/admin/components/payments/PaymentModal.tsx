"use client";

import { CheckCircle2, Download, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type PaymentDetails = {
  statusTitle: string;
  statusSubtitle: string;

  transactionId: string;
  amount: string;
  dateTime: string;
  method: string;

  merchantName: string;
  businessName: string;
  email: string;
  phone: string;
  packageName: string;
};

export function PaymentModal({
  open,
  onOpenChange,
  details,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  details: PaymentDetails;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl p-0 dark:bg-gray-900">
        {/* Header */}
        <DialogHeader
          className="
        flex mt-5 flex-row items-center justify-between px-6 py-5
        bg-muted/30
        dark:bg-linear-to-r dark:from-[#1A1630] dark:via-[#2A2148] dark:to-[#1A1630]
        dark:border-b dark:border-white/10
      "
        >
          <DialogTitle className="text-lg font-semibold text-foreground dark:text-white">
            Payment Details
          </DialogTitle>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="
            h-9 w-9 rounded-xl
            border border-muted/40
            bg-white hover:bg-muted/30
            dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10
            flex items-center justify-center cursor-pointer
          "
            >
              <Download className="h-5 w-5 text-muted-foreground dark:text-white/70" />
            </button>
          </div>
        </DialogHeader>

        <div className="px-6 py-6">
          {/* Success Banner */}
          <div
            className="
          flex items-start gap-3 rounded-xl border border-emerald-400 bg-emerald-50 px-4 py-4
          dark:bg-emerald-500/10 dark:border-emerald-400/30
        "
          >
            <h1 className="text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="h-6 w-6 mt-0.5" />
            </h1>
            <div>
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                {details.statusTitle}
              </p>
              <p className="text-sm text-foreground/70 dark:text-white/60">
                {details.statusSubtitle}
              </p>
            </div>
          </div>

          {/* Transaction Information */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground dark:text-white">
              Transaction Information
            </p>

            <div
              className="
            rounded-xl border border-muted/40 bg-white px-5 py-4
            dark:bg-white/5 dark:border-white/10
          "
            >
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div className="text-muted-foreground dark:text-white/50">
                  Transaction ID:
                </div>
                <div className="text-right font-medium text-foreground dark:text-white">
                  {details.transactionId}
                </div>

                <div className="text-muted-foreground dark:text-white/50">
                  Amount:
                </div>
                <div className="text-right font-medium text-foreground dark:text-white">
                  {details.amount}
                </div>

                <div className="text-muted-foreground dark:text-white/50">
                  Date & Time:
                </div>
                <div className="text-right font-medium text-foreground dark:text-white">
                  {details.dateTime}
                </div>

                <div className="text-muted-foreground dark:text-white/50">
                  Payment Method:
                </div>
                <div className="text-right font-medium text-foreground dark:text-white">
                  {details.method}
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground dark:text-white">
              Customer Information
            </p>

            <div
              className="
            rounded-xl border border-muted/40 bg-white px-5 py-4 space-y-3 text-sm
            dark:bg-white/5 dark:border-white/10
          "
            >
              {[
                ["Merchant Name:", details.merchantName],
                ["Business Name:", details.businessName],
                ["Email:", details.email],
                ["Phone:", details.phone],
                ["Package:", details.packageName],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-muted-foreground dark:text-white/50">
                    {label}
                  </span>
                  <span className="font-medium text-foreground dark:text-white">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <Button
              className="
            h-12 rounded-xl bg-black hover:bg-black/90 text-white
            dark:bg-white dark:text-black dark:hover:bg-white/90
          "
            >
              Download Receipt
            </Button>

            <Button
              variant="outline"
              className="
            h-12 rounded-xl bg-muted/30 hover:bg-muted
            dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10
          "
            >
              Send Email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
