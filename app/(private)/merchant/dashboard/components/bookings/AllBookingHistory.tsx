"use client";
import { SaudiRiyal, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import Pagination from "@/components/reusable/Pagination";
import { useDashboardbookingHistoryQuery } from "@/redux/features/userDashboard/userDashboard";
import { Button } from "@/components/ui/button";
import { BookingDetailsModal } from "./BookingViewModal";

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

<<<<<<< HEAD
export default function AllBookingHistory() {
=======
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
    <Card
      className={[
        "rounded-3xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm",
        ,
      ].join(" ")}
    >
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <CardTitle className="text-xl font-semibold">
            All Booking History
          </CardTitle>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search anything"
                className="h-12 rounded-xl pl-10"
              />
            </div>
            <Link href={"#"}>
              <Button type="button" className="cursor-pointer py-6">
                View All
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-8">
        <div className="overflow-hidden rounded-2xl border border-muted/40">
          <div>
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="h-14 text-sm font-semibold text-muted-foreground">
                    ID
                  </TableHead>
                  <TableHead className="h-14 text-sm font-semibold text-muted-foreground">
                    Customer
                  </TableHead>
                  <TableHead className="h-14 text-sm font-semibold text-muted-foreground">
                    Service
                  </TableHead>
                  <TableHead className="h-14 text-sm font-semibold text-muted-foreground">
                    Amount
                  </TableHead>
                  <TableHead className="h-14 text-sm font-semibold text-muted-foreground">
                    Date
                  </TableHead>
                  <TableHead className="h-14 pr-8 text-sm font-semibold text-muted-foreground">
                    Status
                  </TableHead>
                  <TableHead className="h-14 pr-8 text-sm font-semibold text-muted-foreground">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.bookingID} className="h-19.5">
                    <TableCell className="text-base text-foreground">
                      {r.bookingID}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={r.customerAvatar}
                            alt={r.customerName}
                          />
                          <AvatarFallback>
                            {initials(r.customerName)}
                          </AvatarFallback>
                        </Avatar>

                        <span className="text-base font-medium text-foreground">
                          {r.customerName}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-base text-foreground">
                      {r.service}
                    </TableCell>

                    <TableCell className="text-base text-foreground">
                      <div className="flex items-center gap-1">
                        <SaudiRiyal size={14} />
                        {r.amountLabel}
                      </div>
                    </TableCell>

                    <TableCell className="text-base text-foreground">
                      {r.dateLabel}
                    </TableCell>

                    <TableCell>
                      <StatusPill status={r.status} />
                    </TableCell>

                    <TableCell
                      onClick={() => setIsModalOpen(true)}
                      className="pr-8 cursor-pointer underline"
                    >
                      View Details
                    </TableCell>
                  </TableRow>
                ))}

                {rows.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-10 text-center text-muted-foreground"
                    >
                      No Booking Found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>

      {/* Pagination UI */}
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
      <div></div>
    </Card>
  );
}

export default function AllBookingHistory({ data }: any) {
>>>>>>> 2a5d0b605647fb2b26c7f39e8e0dec65bda817d6
  const [page, setPage] = useState(1);
  const [serviceName, setServiceName] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

<<<<<<< HEAD
  const { data, isLoading, error } = useDashboardbookingHistoryQuery({
=======
  // console.log(data?.data);

  const {
    data: paginationData,
    isLoading,
    error,
  } = useDashboardbookingHistoryQuery({
>>>>>>> 2a5d0b605647fb2b26c7f39e8e0dec65bda817d6
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
                  <TableCell>{r.customerName}</TableCell>
                  <TableCell>{r.service}</TableCell>
                  <TableCell>{r.amountLabel}</TableCell>
                  <TableCell>{r.dateLabel}</TableCell>
                  <TableCell><StatusPill status={r.status} /></TableCell>

                  <TableCell>
                    <Button className="cursor-pointer"
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedBooking(r.bookingID)} 
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
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
      {selectedBooking && (
        <BookingDetailsModal
          bookingId={selectedBooking}
          open={!!selectedBooking}
          onOpenChange={(open) => { if (!open) setSelectedBooking(null); }}
        />
      )}
    </Card>
  );
}
