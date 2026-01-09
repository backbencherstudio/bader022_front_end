"use client";

import { Download, Eye, Search } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PaymentDetails, PaymentModal } from "./PaymentModal";

type PaymentStatus = "successful" | "failed";

export type PaymentHistoryRow = {
  id: string; // TX ID
  merchantName: string;
  businessName: string;
  businessAvatar?: string;
  packageName: string;
  date: string;
  amount: string;
  paymentMethod: string;
  status: PaymentStatus;
};

export const demoPayments: PaymentHistoryRow[] = [
  {
    id: "#TXOO1",
    merchantName: "Ralph Edwards",
    businessName: "Luxe beauty",
    businessAvatar: "https://i.pravatar.cc/100?img=12",
    packageName: "Basic plan",
    date: "Jun 12, 2023",
    amount: "120 SAR",
    paymentMethod: "Paypal",
    status: "successful",
  },
  {
    id: "#TXOO2",
    merchantName: "Devon Lane",
    businessName: "DXL Sports",
    businessAvatar: "https://i.pravatar.cc/100?img=5",
    packageName: "Basic plan",
    date: "Jun 13, 2023",
    amount: "100 SAR",
    paymentMethod: "Paypal",
    status: "successful",
  },
  {
    id: "#TXOO3",
    merchantName: "Dianne Russell",
    businessName: "Home Renovatio",
    businessAvatar: "https://i.pravatar.cc/100?img=32",
    packageName: "Premium Plan",
    date: "Jun 14, 2023",
    amount: "110 SAR",
    paymentMethod: "Paypal",
    status: "successful",
  },
  {
    id: "#TXOO4",
    merchantName: "Theresa Webb",
    businessName: "Expert tech",
    businessAvatar: "https://i.pravatar.cc/100?img=15",
    packageName: "Basic plan",
    date: "Jun 15, 2023",
    amount: "90 SAR",
    paymentMethod: "Google Pay",
    status: "failed",
  },
  {
    id: "#TXOO5",
    merchantName: "Arlene McCoy",
    businessName: "Child Care",
    businessAvatar: "https://i.pravatar.cc/100?img=48",
    packageName: "Premium Plan",
    date: "Jun 16, 2023",
    amount: "80 SAR",
    paymentMethod: "Google Pay",
    status: "failed",
  },
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "U";
}

function StatusPill({ status }: { status: PaymentStatus }) {
  const isSuccess = status === "successful";

  return (
    <span
      className={[
        "inline-flex min-w-32 items-center justify-center rounded-xl px-6 py-2 text-sm font-semibold",
        "border",
        isSuccess
          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
          : "border-red-500 bg-red-50 text-red-600",
      ].join(" ")}
    >
      {isSuccess ? "Successful" : "Failed"}
    </span>
  );
}

export default function PaymentHistory({
  rows = demoPayments,
}: {
  rows?: PaymentHistoryRow[];
}) {
  const [openDetails, setOpenDetails] = useState(false);

  const staticDetails: PaymentDetails = {
    statusTitle: "Payment Successful",
    statusSubtitle: "Monthly subscription payment for Basic plan",

    transactionId: "#TXOO1",
    amount: "120 SAR",
    dateTime: "2025-11-30 10:00 AM",
    method: "Paypal",

    merchantName: "Ralph Edwards",
    businessName: "Luxe beauty",
    email: "edwards@example.com",
    phone: "+966 50 123 4567",
    packageName: "Basic plan",
  };

  return (
    <Card className="rounded-3xl border border-muted/40 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Payment History</CardTitle>
      </CardHeader>

      <CardContent className="pb-8">
        {/* Filter Bar (same as screenshot) */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="mr-2 text-base font-semibold text-muted-foreground">
            Filter by:
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search anything" className="h-12 w-64 pl-10" />
          </div>

          <Select>
            <SelectTrigger className="h-12 py-6 w-44">
              <SelectValue placeholder="Package" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="basic">Basic plan</SelectItem>
              <SelectItem value="premium">Premium Plan</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="h-12 w-44 py-6">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="successful">Successful</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-muted/40">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="h-14 pl-8 text-sm font-semibold text-muted-foreground">
                    TX ID
                  </TableHead>
                  <TableHead className="h-14 text-sm font-semibold text-muted-foreground">
                    Merchant Name
                  </TableHead>
                  <TableHead className="h-14 text-sm font-semibold text-muted-foreground">
                    Business name
                  </TableHead>
                  <TableHead className="h-14 text-sm font-semibold text-muted-foreground">
                    Package Name
                  </TableHead>
                  <TableHead className="h-14 text-sm font-semibold text-muted-foreground">
                    Date
                  </TableHead>
                  <TableHead className="h-14 text-sm font-semibold text-muted-foreground">
                    Amount
                  </TableHead>
                  <TableHead className="h-14 text-sm font-semibold text-muted-foreground">
                    Payment Method
                  </TableHead>
                  <TableHead className="h-14 text-sm font-semibold text-muted-foreground">
                    Status
                  </TableHead>
                  <TableHead className="h-14 pr-8 text-sm font-semibold text-muted-foreground">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id} className="h-19.5">
                    <TableCell className="pl-8 text-base font-medium text-foreground">
                      {r.id}
                    </TableCell>

                    <TableCell className="text-base text-foreground">
                      {r.merchantName}
                    </TableCell>

                    <TableCell className="text-base text-foreground">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={r.businessAvatar}
                            alt={r.businessName}
                          />
                          <AvatarFallback>
                            {initials(r.businessName)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{r.businessName}</span>
                      </div>
                    </TableCell>

                    <TableCell className="text-base text-foreground">
                      {r.packageName}
                    </TableCell>

                    <TableCell className="text-base text-foreground">
                      {r.date}
                    </TableCell>

                    <TableCell className="text-base font-semibold text-foreground">
                      {r.amount}
                    </TableCell>

                    <TableCell className="text-base text-foreground">
                      {r.paymentMethod}
                    </TableCell>

                    <TableCell>
                      <StatusPill status={r.status} />
                    </TableCell>

                    <TableCell className="pr-8">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setOpenDetails(true)}
                          className="h-10 w-10 rounded-xl border hover:bg-white flex items-center justify-center cursor-pointer"
                        >
                          <Eye className="h-5 w-5 text-muted-foreground" />
                        </button>

                        <button
                          type="button"
                          className="h-10 w-10 rounded-xl border hover:bg-white flex items-center justify-center cursor-pointer"
                        >
                          <Download className="h-5 w-5 text-muted-foreground" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {rows.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="py-10 text-center text-muted-foreground"
                    >
                      No payment history found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
      <PaymentModal
        open={openDetails}
        onOpenChange={setOpenDetails}
        details={staticDetails}
      />
    </Card>
  );
}
