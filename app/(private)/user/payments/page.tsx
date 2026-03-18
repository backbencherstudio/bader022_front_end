"use client";

import { Download, SaudiRiyal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
import { useState } from "react";
import { useLazyInvoiceDownloadQuery, useUserPaymentHistoryQuery } from "@/redux/features/userDashboard/userDashboard";
import Pagination from "@/components/reusable/Pagination";

export type TxStatus = "paid" | "failed" | "due" | "refunded" | "refund_failed";

export type TransactionRow = {
  bookingID: number;
  customerName: string;
  customerAvatar?: string;
  service: string;
  amountLabel: string;
  dateLabel: string;
  status: TxStatus;
};

type Booking = {
  booking_id: number;
  store_name: string;
  store_logo: string | null;
  service: string;
  amount: string;
  date_time: string;
  status: string;
};

function StatusPill({ status }: { status: TxStatus }) {
  const statusStyles: Record<TxStatus, string> = {
    paid: "border-emerald-500 bg-emerald-50 text-emerald-700",
    failed: "border-red-500 bg-red-50 text-red-600",
    due: "border-amber-500 bg-amber-50 text-amber-700",
    refunded: "border-blue-500 bg-blue-50 text-blue-700",
    refund_failed: "border-purple-500 bg-purple-50 text-purple-700",
  };

  const statusLabels: Record<TxStatus, string> = {
    paid: "Paid",
    failed: "Failed",
    due: "Due",
    refunded: "Refunded",
    refund_failed: "Refund Failed",
  };

  return (
    <span
      className={[
        "inline-flex min-w-33 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold border",
        statusStyles[status],
      ].join(" ")}
    >
      {statusLabels[status]}
    </span>
  );
}

export function RecentTransactionsCard({
  rows = [],
  pagination,
  page,
  setPage,
  search,
  setSearch,
  handleDownload,
}: {
  rows: TransactionRow[];
  pagination: any;
  page: number;
  setPage: (page: number) => void;
  search: string;
  setSearch: (value: string) => void;
  handleDownload: (bookingID: number) => void;
}) {
  return (
    <Card className="rounded-3xl border border-gray-200 shadow-sm">
      <CardContent className="pb-8">
        <div className="text-lg font-medium pb-4">Payment History</div>

        {/* Filter */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="mr-2 text-base font-semibold">Filter by:</div>

          <Select
            value={search || "all"}
            onValueChange={(value) => {
              const newValue = value === "all" ? "" : value;
              setSearch(newValue);
              setPage(1);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="due">Due</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
              <SelectItem value="refund_failed">Refund Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-muted/40">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="text-muted-foreground">Booking ID</TableHead>
                <TableHead className="text-muted-foreground">Customer</TableHead>
                <TableHead className="text-muted-foreground">Service</TableHead>
                <TableHead className="text-muted-foreground">Date & Time</TableHead>
                <TableHead className="text-muted-foreground">Amount</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Invoice</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    No transactions.
                  </TableCell>
                </TableRow>
              )}

              {rows.map((r) => (
                <TableRow key={r.bookingID}>
                  <TableCell
                    className="cursor-pointer"
                    // onClick={() => handleDownload(r.bookingID)}
                  >
                    {r.bookingID}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={r.customerAvatar} />
                        <AvatarFallback>{r.customerName?.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="">{r.customerName}</span>
                    </div>
                  </TableCell>

                  <TableCell>{r.service}</TableCell>
                  <TableCell>{r.dateLabel}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1">
                      <SaudiRiyal size={14} />
                      {r.amountLabel}
                    </div>
                  </TableCell>

                  <TableCell>
                    <StatusPill status={r.status} />
                  </TableCell>


                  {/* <TableCell className="cursor-pointer underline">
                    <a
                      href={`http://192.168.7.98:8000/api/admin/booking/invoice/${r.bookingID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={`invoice_${r.bookingID}.pdf`} // browser download filename
                    >
                      <Download className="text-muted-foreground w-5" />
                    </a>
                  </TableCell> */}

                  <TableCell
                    onClick={() => handleDownload(r.bookingID)}
                    className="cursor-pointer underline"
                  >
                    <Download className="text-muted-foreground w-5" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Pagination */}
      <div className="flex justify-between flex-col sm:flex-row items-center px-6 pb-4 border-t border-muted/40">
        <div className="text-sm text-muted-foreground">Showing {rows.length} results</div>
        <Pagination currentPage={page} lastPage={pagination?.last_page || 1} onPageChange={setPage} />
      </div>
    </Card>
  );
}

export default function UserPaymentHistory() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useUserPaymentHistoryQuery({ status: search, page });

  const pagination = data?.pagination;
  const bookings: Booking[] = data?.data ?? [];

  const mappedBookings: TransactionRow[] = bookings.map((b) => {
    const status = b.status.toLowerCase() as TxStatus;
    return {
      bookingID: b.booking_id,
      customerName: b.store_name,
      customerAvatar: b.store_logo ?? undefined,
      service: b.service,
      amountLabel: b.amount,
      dateLabel: b.date_time,
      status: ["paid", "failed", "due", "refunded", "refund_failed"].includes(status)
        ? status
        : "due",
    };
  });

 
  const [triggerInvoiceDownload, { isLoading: downloading }] = useLazyInvoiceDownloadQuery();

  const handleDownload = async (bookingID: number) => {
    try {
      const blob = await triggerInvoiceDownload(bookingID).unwrap();
      const url = window.URL.createObjectURL(blob);

      // Open the PDF in a new tab
      window.open(url, "_blank");

      // Optional: revoke URL after a delay to allow tab to load
      setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    } catch (err) {
      console.error("Error previewing invoice:", err);
    }
  };
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <RecentTransactionsCard
      rows={mappedBookings}
      pagination={pagination}
      page={page}
      setPage={setPage}
      search={search}
      setSearch={setSearch}
      handleDownload={handleDownload} 
    />
  );
}