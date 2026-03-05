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

export type TxStatus = "paid" | "failed" ;

export type TransactionRow = {
  bookingID: string;
  customerName: string;
  customerAvatar?: string;
  service: string;
  amountLabel: string;
  dateLabel: string;
  status: TxStatus;
};

type Booking = {
  tx_id: string;
  merchant_name: string;
  business_logo: string | null;
  business_name: string;
  amount: string;
  date: string;
  status: string;
};


function StatusPill({ status }: { status: TxStatus }) {
  const statusStyles: Record<TxStatus, string> = {
    paid: "border-emerald-500 bg-emerald-50 text-emerald-700",
    failed: "border-red-500 bg-red-50 text-red-600",
    // pending: "border-amber-500 bg-amber-50 text-amber-700",
    // confirm: "border-sky-500 bg-sky-50 text-sky-700",
  };

  const statusLabels: Record<TxStatus, string> = {
    paid: "Paid",
    failed: "Failed",
    // pending: "Pending",
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
}: {
  rows: TransactionRow[];
  pagination: any;
  page: number;
  setPage: (page: number) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card className="rounded-3xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
      <CardContent className="pb-8">

        {/* Filter */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="mr-2 text-base font-semibold">Filter by:</div>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancel">Cancel</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirm">Confirmed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-muted/40">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 ">
                <TableHead className="text-muted-foreground">Booking Id</TableHead>
                <TableHead className="text-muted-foreground">Merchant</TableHead>
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
                    onClick={() => setIsModalOpen(true)}
                    className="cursor-pointer underline"
                  >
                    <Download className="text- text-muted-foreground w-5"/>
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

        {/* <div className="flex gap-2">
          <Button variant="outline">&lt;</Button>
          <Button variant="outline">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">&gt;</Button>
        </div> */}
      </div>
    </Card>
  );
}

export default function UserPaymentHistory() {

  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useUserPaymentHistoryQuery({
    page,
  });

  const pagination = data?.pagination;
  const bookings: Booking[] = data?.data ?? [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  const mappedBookings: TransactionRow[] = bookings.map((b) => ({
    bookingID: Number(b.tx_id.replace(/\D/g, "")).toString(),
    customerName: b.merchant_name,
    customerAvatar: b.business_logo ?? undefined,
    service: b.business_name,
    amountLabel: b.amount,
    dateLabel: b.date,
    status:
      b.status.toLowerCase() === "paid"
        ? "paid"
        : (b.status.toLowerCase() as TxStatus),
  }));

  return (
    <RecentTransactionsCard
      rows={mappedBookings}
      pagination={pagination}
      page={page}
      setPage={setPage}
    />
  );
}