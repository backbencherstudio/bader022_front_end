"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SaudiRiyal, Search } from "lucide-react";

import { useBookingHistoryQuery } from "@/redux/features/userDashboard/booking";
import Pagination from "@/components/reusable/Pagination";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BookingDetailsModal } from "@/app/(private)/merchant/dashboard/components/bookings/BookingViewModal";
import { UserBookingDetailsModal } from "./UserBookingViewModal";
import { useI18n } from "@/components/provider/I18nProvider";

export type TxStatus =
  | "completed"
  | "cancel"
  | "pending"
  | "confirm"
  | "rescheduled";

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
    cancel: "border-red-500 bg-red-50 text-red-600",
    pending: "border-amber-500 bg-amber-50 text-amber-700",
    confirm: "border-sky-500 bg-sky-50 text-sky-700",
    rescheduled: "border-sky-500 bg-sky-50 text-sky-700",
  };

  const statusLabels: Record<TxStatus, string> = {
    completed: "Completed",
    cancel: "Cancelled",
    pending: "Pending",
    confirm: "Confirmed",
    rescheduled: "rescheduled",
  };

  return (
    <span
      className={`inline-flex min-w-33 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold border ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}

export default function AllBookingHistory() {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  const [page, setPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<TransactionRow | null>(
    null,
  );
  // const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

  const [service, setService] = useState("");
  // RTK Query
  const { data, isLoading, error } = useBookingHistoryQuery({
    page,
    date_filter: dateFilter,
    status: statusFilter,
    service_name: serviceFilter,
  }) as {
    data?: DashboardBookingResponse;
    isLoading: boolean;
    error?: unknown;
  };

  const bookings = data?.data ?? [];
  const pagination = data?.pagination;
  // console.log(bookings, "=================booking history data====================");

  // Reset page when filter changes
  useEffect(() => {
    setPage(1);
  }, [dateFilter, statusFilter, serviceFilter]);

  const filteredBookings = bookings.filter(
    (b) =>
      b.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.service_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const mappedBookings: TransactionRow[] = filteredBookings.map((b) => ({
    bookingID: String(b.booking_id),
    customerName: b.customer,
    customerAvatar: b.customer_image ?? undefined,
    service: b.service_name,
    amountLabel: b.amount,
    dateLabel: b.booking_date,
    status: b.status.toLowerCase() as TxStatus,
  }));

  // console.log(filteredBookings);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <Card className="rounded-3xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
      {/* Header */}
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <CardTitle className="text-xl font-semibold">
          {locale === "ar" ? "كل سجلات الحجوزات" : "All Booking History"}
        </CardTitle>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search anything"
              className="h-12 rounded-xl pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Link href="/user/bookings/add-booking">
            <Button className="cursor-pointer">
              {locale === "ar" ? "احجز الآن" : "Book Now"}
            </Button>
          </Link>
        </div>
      </CardHeader>

      {/* Filters */}
      <CardContent className="pb-4">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <div className="text-base font-semibold mr-2">
            {locale === "ar" ? "تصفية حسب" : "Filter by:"}
          </div>

          <Select onValueChange={(v) => setDateFilter(v === "all" ? "" : v)}>
            <SelectTrigger>
              <SelectValue placeholder="All Dates" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="7_days">Last 7 days</SelectItem>
              <SelectItem value="30_days">Last 30 days</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(v) => setServiceFilter(v === "all" ? "" : v)}>
            <SelectTrigger>
              <SelectValue placeholder="All Services" />
            </SelectTrigger>
            {bookings.length > 0 && (
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                {Array.from(new Set(bookings.map((b) => b.service_name))).map(
                  (service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            )}
          </Select>

          <Select onValueChange={(v) => setStatusFilter(v === "all" ? "" : v)}>
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirm">Confirmed</SelectItem>
              <SelectItem value="cancel">Canceled</SelectItem>
              <SelectItem value="rescheduled">Rescheduled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-muted/40">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead
                  className={`text-muted-foreground ${isRTL ? "text-right pr-8" : "text-left pl-8"}`}
                >
                  {locale === "ar" ? "رقم الحجز" : "Booking ID"}
                </TableHead>
                <TableHead
                  className={`text-muted-foreground ${isRTL ? "text-right pr-8" : "text-left pl-8"}`}
                >
                  {locale === "ar" ? "العميل" : "Customer"}
                </TableHead>
                <TableHead
                  className={`text-muted-foreground ${isRTL ? "text-right pr-8" : "text-left pl-8"}`}
                >
                  {" "}
                  {locale === "ar" ? "الخدمة" : "Service"}
                </TableHead>
                <TableHead
                  className={`text-muted-foreground ${isRTL ? "text-right pr-8" : "text-left pl-8"}`}
                >
                  {" "}
                  {locale === "ar" ? "المبلغ" : "Amount"}
                </TableHead>
                <TableHead
                  className={`text-muted-foreground ${isRTL ? "text-right pr-8" : "text-left pl-8"}`}
                >
                  {locale === "ar" ? "التاريخ" : "Date & Time"}
                </TableHead>
                <TableHead
                  className={`text-muted-foreground ${isRTL ? "text-right pr-8" : "text-left pl-8"}`}
                >
                  {locale === "ar" ? "الحالة" : "Status"}
                </TableHead>
                <TableHead
                  className={`text-muted-foreground ${isRTL ? "text-right pr-8" : "text-left pl-8"}`}
                >
                  {" "}
                  {locale === "ar" ? "الإجراء" : "Action"}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mappedBookings.map((r) => (
                <TableRow key={r.bookingID}>
                  <TableCell>{r.bookingID}</TableCell>

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
                      <span className="">{r.customerName}</span>
                    </div>
                  </TableCell>

                  <TableCell>{r.service}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <SaudiRiyal size={14} />
                      {r.amountLabel}
                    </div>
                  </TableCell>
                  <TableCell>{r.dateLabel}</TableCell>
                  <TableCell>
                    <StatusPill status={r.status} />
                  </TableCell>
                  <TableCell>
                    {/* `/user/bookings/${r.bookingID}` */}
                    <Button
                      className="cursor-pointer"
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedBooking(r)}
                      // onClick={() => setSelectedBooking(r.bookingID)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {mappedBookings.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-10 text-center text-muted-foreground"
                  >
                    {locale === "ar"
                      ? "لم يتم العثور على أي حجوزات"
                      : "No transactions."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-4">
          <Pagination
            currentPage={page}
            lastPage={pagination?.last_page || 1}
            onPageChange={setPage}
          />
        </div>
      </CardContent>

      {selectedBooking && (
        <UserBookingDetailsModal
          booking={selectedBooking}
          open={!!selectedBooking}
          onOpenChange={(open) => {
            if (!open) setSelectedBooking(null);
          }}
        />
        // <UserBookingDetailsModal
        //   booking={selectedBooking}
        //   open={!!selectedBooking}
        //   onOpenChange={(open) => { if (!open) setSelectedBooking(null); }}
        // />
        // <BookingDetailsModal
        //   bookingId={selectedBooking}
        //   open={!!selectedBooking}
        //   onOpenChange={(open) => { if (!open) setSelectedBooking(null); }}
        // />
      )}
    </Card>
  );
}
