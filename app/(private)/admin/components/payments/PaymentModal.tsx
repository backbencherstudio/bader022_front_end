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
      <DialogContent className="rounded-2xl p-0">
        {/* Header */}
        <DialogHeader className="flex mt-5 flex-row items-center justify-between px-6 py-5 bg-muted/30">
          <DialogTitle className="text-lg font-semibold text-foreground">
            Payment Details
          </DialogTitle>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="h-9 w-9 rounded-xl border border-muted/40 bg-white hover:bg-muted/30 flex items-center justify-center cursor-pointer"
            >
              <Download className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </DialogHeader>

        <div className="px-6 py-6">
          {/* Success Banner */}
          <div className="flex items-start gap-3 rounded-xl border border-emerald-400 bg-emerald-50 px-4 py-4">
            <h1 className=" text-emerald-700 ">
              <CheckCircle2 className="h-6 w-6 mt-0.5" />
            </h1>
            <div>
              <p className="text-sm font-semibold text-emerald-700">
                {details.statusTitle}
              </p>
              <p className="text-sm text-foreground/70">
                {details.statusSubtitle}
              </p>
            </div>
          </div>

          {/* Transaction Information */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">
              Transaction Information
            </p>

            <div className="rounded-xl border border-muted/40 bg-white px-5 py-4">
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div className="text-muted-foreground">Transaction ID:</div>
                <div className="text-right font-medium text-foreground">
                  {details.transactionId}
                </div>

                <div className="text-muted-foreground">Amount:</div>
                <div className="text-right font-medium text-foreground">
                  {details.amount}
                </div>

                <div className="text-muted-foreground">Date & Time:</div>
                <div className="text-right font-medium text-foreground">
                  {details.dateTime}
                </div>

                <div className="text-muted-foreground">Payment Method:</div>
                <div className="text-right font-medium text-foreground">
                  {details.method}
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">
              Customer Information
            </p>

            <div className="rounded-xl border border-muted/40 bg-white px-5 py-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Merchant Name:</span>
                <span className="font-medium text-foreground">
                  {details.merchantName}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Business Name:</span>
                <span className="font-medium text-foreground">
                  {details.businessName}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium text-foreground">
                  {details.email}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-medium text-foreground">
                  {details.phone}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Package:</span>
                <span className="font-medium text-foreground">
                  {details.packageName}
                </span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <Button className="h-12 rounded-xl bg-black hover:bg-black/90 text-white cursor-pointer">
              Download Receipt
            </Button>

            <Button
              variant="outline"
              className="h-12 rounded-xl bg-muted/30 hover:bg-muted cursor-pointer"
            >
              Send Email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
