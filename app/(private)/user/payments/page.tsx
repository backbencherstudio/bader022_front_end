"use client";

import { Download, SaudiRiyal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { useUserPaymentHistoryQuery } from "@/redux/features/userDashboard/userDashboard";
import Pagination from "@/components/reusable/Pagination";
import { downloadPdf } from "@/helper/downloadPdf";
import Link from "next/link";
import { userDashboardApi } from "@/redux/features/userDashboard/invoice";

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
  tx_id: string;
  merchant_name: string;
  business_logo: string | null;
  business_name: string;
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
    // confirm: "border-sky-500 bg-sky-50 text-sky-700",
  };

  const statusLabels: Record<TxStatus, string> = {
    paid: "Paid",
    failed: "Failed",
    due: "due",
    refunded: "refunded",
    refund_failed :"refund_failed",
    // confirm: "Confirmed",
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
  rows,
  pagination,
  page,
  setPage,
  search,
  setSearch,
  handleDownload, // ✅ add this
}: {
  rows: TransactionRow[];
  pagination: any;
  page: number;
  setPage: (page: number) => void;
  search: string;
  setSearch: (value: string) => void;
  handleDownload: (bookingID: number) => void; // ✅ type
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card className="rounded-3xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
      <CardContent className="pb-8">
                     <div className="text-lg font-medium pb-4">
                      Payment History
                     </div>
        {/* Filter */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="mr-2 text-base font-semibold">Filter by:</div>

          <Select
            value={search || "all"}
            onValueChange={(value) => {
              const newValue = value === "all" ? "" : value;
              console.log("selected:", newValue);

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
              <SelectItem value="refunded">refunded</SelectItem>
              <SelectItem value="refund_failed">refund_failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-muted/40">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 ">
                <TableHead className="text-muted-foreground">Booking ID</TableHead>
                <TableHead className="text-muted-foreground">Business Name</TableHead>
                <TableHead className="text-muted-foreground">Service</TableHead>
                <TableHead className="text-muted-foreground">Date & Time</TableHead>
                <TableHead className="text-muted-foreground">Amount</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Invoice</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.bookingID}>
                  <TableCell>{r.bookingID}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={r.customerAvatar} />
                        <AvatarFallback>
                          {r.customerName?.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>

                      <span className="font-medium">
                        {r.customerName}
                      </span>
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

                  <TableCell
                    onClick={() => handleDownload(r.bookingID)}
                    className="cursor-pointer underline"
                  >
                    <Download className="text-muted-foreground w-5" />
                  </TableCell>
                </TableRow>
              ))}

              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    No transactions.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Pagination */}
      <div className="flex justify-between flex-col sm:flex-row items-center px-6 pb-4 border-t border-muted/40">
        <div className="flex justify-between w-full   sm:flex-row items-center px-6 pb-4 border-t border-muted/40">

          <div className="text-sm text-muted-foreground  ">
            Showing {rows.length} results
          </div>

        <div>
            <Pagination
              currentPage={page}
              lastPage={pagination?.last_page || 1}
              onPageChange={setPage}
            />

          </div>
        </div>

    
      </div>
    </Card>
  );
}

export default function UserPaymentHistory() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useUserPaymentHistoryQuery({
    status: search,
    page,
  });

  const pagination = data?.pagination;
  const bookings: Booking[] = data?.data ?? [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  const handleDownload = async (bookingID: number) => {
    try {
      const { data } = await userDashboardApi.endpoints.invoiceDownload.initiate(bookingID);

      if (!data) {
        console.error("Invoice download failed: No data received");
        return;
      }

      if (!data.success) {
        console.error("Invoice download failed:", data.message);
        return;
      }

      const invoice = data.data;
      console.log("Invoice fetched:", invoice);

      const pdfRows = [
        { label: "Booking ID", value: invoice.invoice_info.booking_id },
        { label: "Invoice No", value: invoice.invoice_info.invoice_no },
        { label: "Customer Name", value: invoice.customer.name },
        { label: "Email", value: invoice.customer.email },
        { label: "Phone", value: invoice.customer.phone },
        { label: "Service", value: invoice.service.service_name },
        { label: "Amount", value: invoice.summary.total + " " + invoice.summary.currency },
        { label: "Payment Status", value: invoice.payment.status },
        { label: "Date", value: invoice.invoice_info.date },
      ];

      downloadPdf(
        `Invoice_${invoice.invoice_info.invoice_no}`,
        pdfRows,
        `invoice_${invoice.invoice_info.invoice_no}`
      );
    } catch (err) {
      console.error("Error fetching invoice:", err);
    }
  };

  const mappedBookings: TransactionRow[] = bookings.map((b) => {
    const status = b.status.toLowerCase() as TxStatus;

    return {
      bookingID: b.booking_id,
      customerName: b.store_name,
      customerAvatar: b.store_logo ?? undefined,
      service: b.service,
      amountLabel: b.amount,
      dateLabel: b.date_time,
      status:
        status === "paid" ||
          status === "failed" ||
          status === "due" ||
          status === "refunded" ||
          status === "refund_failed"
          ? status
          : "due",
    };
  });

  return (
    <RecentTransactionsCard
      rows={mappedBookings}
      pagination={pagination}
      page={page}
      setPage={setPage}
      search={search}
      setSearch={setSearch}
      handleDownload={handleDownload} // ✅ pass as prop
    />
  );
}