"use client";
import { SaudiRiyal, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import Pagination from "@/components/reusable/Pagination";
import { useDashboardbookingHistoryQuery } from "@/redux/features/userDashboard/userDashboard";

export type TxStatus = "completed" | "cancel" | "pending" | "confirm" | "rescheduled";

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
  booking_id: string;
  customer: string;
  customer_image: string | null;
  service_name: string;
  amount: string;
  booking_date: string;
  status: string;
};

type PaginationType = {
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
};

type DashboardBookingResponse = {
  data: Booking[];
  pagination: PaginationType;
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "U";
}

function StatusPill({ status }: { status: TxStatus }) {
  const statusStyles: Record<TxStatus, string> = {
    completed: "border-emerald-500 bg-emerald-50 text-emerald-700",
    cancel: "border-red-500 bg-red-50 text-[#DC2626]",
    pending: "border-[#F9C80E] bg-[#FFFAE7] text-[#F9C80E]",
    confirm: "border-[#2F9765] bg-[#EBFEF2] text-[#2F9765]",
    rescheduled: "border-[#2F9788] bg-[#EBFEE4] text-[#2F9769]",
  };

  const statusLabels: Record<TxStatus, string> = {
    completed: "Completed",
    cancel: "Cancelled",
    pending: "Pending",
    confirm: "Confirmed",
    rescheduled:"Rescheduled"
  };

  return (
    <span className={`inline-flex min-w-33 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold border ${statusStyles[status]}`}>
      {statusLabels[status]}
    </span>
  );
}

export default function AllBookingHistory() {
  const [page, setPage] = useState(1);
  const [serviceName, setServiceName] = useState("");

  const { data, isLoading, error } = useDashboardbookingHistoryQuery({
    page,
    service_name: serviceName, 
  }) as { data?: DashboardBookingResponse; isLoading: boolean; error?: unknown };

  const bookings = data?.data ?? [];
  const pagination = data?.pagination;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  console.log(bookings)
  const mappedBookings: TransactionRow[] = bookings.map((b) => ({
    bookingID: String(b.booking_id),
    customerName: b.customer,
    customerAvatar: b.customer_image ?? undefined,
    service: b?.service_name,
    amountLabel: b?.amount,
    dateLabel: b?.booking_date,
    status: b.status.toLowerCase() as TxStatus,
  }));

  return (
    <Card className="rounded-3xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-xl font-semibold">All Booking History</CardTitle>

        <div className="relative w-full max-w-xs gap-3 flex">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Filter by service name"
            value={serviceName}
            onChange={(e) => { setServiceName(e.target.value); setPage(1); }}
            className="h-10  rounded-xl border border-gray-300 pl-10 pr-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        <button className="text-white bg-black px-2 rounded-lg">View all</button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-hidden rounded-2xl border border-muted/40">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="">Status</TableHead>
                <TableHead>Actions</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {mappedBookings.map((r) => (
                <TableRow key={r.bookingID}>
                  <TableCell>{r.bookingID}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={r.customerAvatar} alt={r.customerName} />
                        <AvatarFallback>{initials(r.customerName)}</AvatarFallback>
                      </Avatar>
                      <span>{r.customerName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{r.service}</TableCell>
                  <TableCell className="flex items-center gap-1"><SaudiRiyal size={14} />{r.amountLabel}</TableCell>
                  <TableCell>{r.dateLabel}</TableCell>
                  <TableCell><StatusPill status={r.status} /></TableCell>
                  <TableCell>View Details</TableCell>

           

                </TableRow>
              ))}
              {mappedBookings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">No bookings found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {pagination && (
          <div className="mt-4 flex justify-end">
            <Pagination
              currentPage={page}
              lastPage={pagination.last_page}
              onPageChange={setPage}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
