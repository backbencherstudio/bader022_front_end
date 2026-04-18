"use client";
import { SaudiRiyal, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMemo, useState } from "react";
import Pagination from "@/components/reusable/Pagination";
import { Button } from "@/components/ui/button";
import { BookingDetailsModal } from "./BookingViewModal";
import { useLazyGetDownloadInvoiceByIdQuery } from "@/redux/features/merchant/bookingsApi";
import { useI18n } from "@/components/provider/I18nProvider";

export type TxStatus =
  | "complete"
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
  customer_name: string;
  customer_image: string | null;
  service_name: string;
  service: {
    price: string;
  };
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

const PAGE_SIZE = 10;

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "U";
}

function StatusPill({ status }: { status: TxStatus }) {
  const statusStyles: Record<TxStatus, string> = {
    complete: "border-emerald-500 bg-emerald-50 text-emerald-700",
    cancel: "border-red-500 bg-red-50 text-[#DC2626]",
    pending: "border-[#F9C80E] bg-[#FFFAE7] text-[#F9C80E]",
    confirm: "border-[#2F9765] bg-[#EBFEF2] text-[#2F9765]",
    rescheduled: "border-[#2F9788] bg-[#EBFEE4] text-[#2F9769]",
  };

  const statusLabels: Record<TxStatus, string> = {
    complete: "Completed",
    cancel: "Cancelled",
    pending: "Pending",
    confirm: "Confirmed",
    rescheduled: "Rescheduled",
  };

  return (
    <span
      className={`inline-flex min-w-33 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold border ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export default function AllBookingHistory({ data }: { data: any[] }) {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [serviceName, setServiceName] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  // console.log(selectedBooking);
  const mappedBookings: TransactionRow[] = data?.map((b: any) => ({
    bookingID: String(b.id),
    customerName: b.customer_name,
    customerAvatar: b.user?.image ?? undefined,
    email: b.email ?? undefined,
    phone: b.phone ?? undefined,
    staff: b.staff?.name ?? undefined,
    service: b.service?.service_name,
    amountLabel: b.service?.price,
    dateLabel: b.date_time,
    status: b.status?.toLowerCase() as TxStatus,
    duration: b?.service?.duration,
  }));

  // console.log(mappedBookings);

  const filtered = useMemo(() => {
    const keyword = search.toLowerCase();

    return mappedBookings.filter((r: any) => {
      const service = r.service?.toLowerCase() ?? "";
      return service.includes(keyword);
    });
  }, [mappedBookings, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const [getDownloadInvoiceById] = useLazyGetDownloadInvoiceByIdQuery();
  const handleDownload = async (bookingId: string) => {
    try {
      const blob = await getDownloadInvoiceById(bookingId).unwrap();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice_${bookingId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      // console.error(err);
    }
  };

  return (
    <Card
      dir={isRTL ? "rtl" : "ltr"}
      className="rounded-3xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm"
    >
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-xl font-semibold">
          {locale === "ar" ? "كل سجلات الحجوزات" : "All Booking History"}
        </CardTitle>

        <div className="relative w-full max-w-xs gap-3 flex">
          {/* <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          /> */}
          <input
            type="text"
            placeholder={
              locale === "ar"
                ? "تصفية حسب اسم الخدمة"
                : "Filter by service name"
            }
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="h-10  rounded-xl border border-gray-300 pl-10 pr-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={() => setSearch("")}
            className="text-white bg-black px-2 rounded-lg cursor-pointer"
          >
            {locale === "ar" ? "عرض الكل" : "View all"}
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-2xl border border-muted/40">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className={`text-muted-foreground ${isRTL ? "text-right pr-8" : "text-left pl-8"}`}
                >
                  {locale === "ar" ? "رقم الحجز" : "ID"}
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
            {paginated?.length !== 0 ? (
              <TableBody>
                {paginated.map((r: any) => (
                  <TableRow key={r.bookingID}>
                    <TableCell>{r.bookingID}</TableCell>
                    <TableCell>{r.customerName}</TableCell>
                    <TableCell>{r.service}</TableCell>
                    <TableCell>{r.amountLabel}</TableCell>
                    {/* <TableCell>{r.dateLabel}</TableCell> */}
                    <TableCell>{formatDate(r.dateLabel)}</TableCell>
                    <TableCell>
                      <StatusPill status={r.status} />
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        {" "}
                        <Button
                          className="cursor-pointer"
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedBooking(r)}
                        >
                          View Details
                        </Button>
                        <Button
                          className="cursor-pointer"
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload(r.bookingID)}
                        >
                          Download
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    {locale === "ar"
                      ? "لم يتم العثور على أي حجوزات"
                      : "No bookings found. "}
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </div>
      </CardContent>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-6 pb-4 border-t pt-4">
        <div className="text-sm text-muted-foreground">
          Showing {(page - 1) * PAGE_SIZE + 1}-
          {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="rounded-xl px-4 py-2"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            &lt;
          </Button>

          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? "default" : "outline"}
              className="rounded-xl px-4 py-2"
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            className="rounded-xl px-4 py-2"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            &gt;
          </Button>
        </div>
      </div>

      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          open={!!selectedBooking}
          onOpenChange={(open) => {
            if (!open) setSelectedBooking(null);
          }}
        />
      )}
    </Card>
  );
}
