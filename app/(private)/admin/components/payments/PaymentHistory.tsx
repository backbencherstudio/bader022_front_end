"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useGetPaymentHistoryQuery } from "@/redux/features/admin/adminApi";
import { Download, Eye, SaudiRiyal, Search } from "lucide-react";
import { useState } from "react";
import { PaymentDetails, PaymentModal } from "./PaymentModal";

type PaymentStatus = "successful" | "failed";

export type PaymentHistoryRow = {
  id: string;
  tx_id: string;
  merchantName: string;
  businessName: string;
  businessAvatar?: string;
  packageName: string;
  date: string;
  amount: string;
  paymentMethod: string;
  status: PaymentStatus;
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "U";
}

function StatusPill({ status }: { status: PaymentStatus }) {
  const isSuccess = status === "successful";

  return (
    <span
      className={`inline-flex min-w-30 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold border
        ${
          isSuccess
            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
            : "border-red-500 bg-red-50 text-red-600"
        }`}
    >
      {isSuccess ? "Successful" : "Failed"}
    </span>
  );
}

export default function PaymentHistory() {
  const [search, setSearch] = useState("");
  const [packageFilter, setPackageFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const searchValue = packageFilter || statusFilter || search;
  const { data, isLoading, isError } = useGetPaymentHistoryQuery({
    search: searchValue,
  });
  console.log(data, "index data")

  const [openDetails, setOpenDetails] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentDetails | null>(
    null,
  );

 
  const rows: PaymentHistoryRow[] =
    data?.data?.map((item: any) => ({
      id: item.id,
      tx_id: item.tx_id ?? "N/A",
      merchantName: item.merchant_name ?? "N/A",
      businessName: item.store_name ?? "N/A",
      businessAvatar: item.business_logo ?? undefined,
      packageName: item.package_name ?? "N/A",
      date: item.date ? new Date(item.date).toLocaleDateString() : "N/A",
      amount: String(item.amount ?? "0"),
      paymentMethod: item.payment_method ?? "N/A",
      status: item.status === "Paid" ? "successful" : "failed",
    })) ?? [];
  console.log(rows[0]?.status, "rows data");
  if (isLoading)
    return <div className="p-6 text-center">Loading payments...</div>;

  if (isError)
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load payment history.
      </div>
    );

  return (
    <Card className="rounded-3xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Payment History</CardTitle>
      </CardHeader>

      <CardContent className="pb-8">
        {/* Filter Bar */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="text-base font-semibold text-muted-foreground">
            Filter by:
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search anything"
              className="h-12 w-64 pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Select
            onValueChange={(value) =>
              setPackageFilter(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="py-6 w-64">
              <SelectValue placeholder="package
" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) =>
              setStatusFilter(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="py-6 w-64">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
              <SelectItem value="Due">Due</SelectItem>
              {/* <SelectItem value="Successfull">Successful</SelectItem> */}

            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-muted/40">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="pl-8">TX ID</TableHead>
                  <TableHead>Merchant Name</TableHead>
                  <TableHead>Business Name</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-8">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="pl-8 font-medium">{r.id}</TableCell>

                    <TableCell>{r.merchantName}</TableCell>

                    <TableCell>
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

                    <TableCell>{r.packageName}</TableCell>
                    <TableCell>{r.date}</TableCell>

                    <TableCell className="font-semibold">
                      <div className="flex items-center gap-1">
                        <SaudiRiyal size={14} />
                        {r.amount}
                      </div>
                    </TableCell>

                    <TableCell>{r.paymentMethod}</TableCell>

                    <TableCell>
                      <StatusPill status={r.status} />
                    </TableCell>

                    <TableCell className="pr-8">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPayment({ id: r.id });
                            setOpenDetails(true);
                          }}
                          className="h-10 w-10 rounded-xl border flex items-center justify-center text-muted-foreground hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                         
                          <Eye className="h-5 w-5" />
                        </button>

                        <button
                          type="button"
                          className="h-10 w-10 rounded-xl border flex items-center justify-center text-muted-foreground hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                          <Download className="h-5 w-5" />
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
        selectedPayment={selectedPayment}
      />
    </Card>
  );
}
