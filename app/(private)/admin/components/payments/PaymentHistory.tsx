"use client";

import { useEffect, useState } from "react";
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
import { Download, SaudiRiyal, Search } from "lucide-react";
import { DataPagination } from "@/app/(private)/components/reusable/Pagination";
import { PaymentModal } from "./PaymentModal";
import {
  useGetPaymentHistoryQuery,
  useLazyAdmininvoiceDownloadQuery,
} from "@/redux/features/admin/adminApi";
import { useI18n } from "@/components/provider/I18nProvider";

type PaymentStatus = "successful" | "failed" | "pending";

export default function PaymentHistory() {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  const [triggerInvoiceDownload, { isLoading: downloading }] =
    useLazyAdmininvoiceDownloadQuery();

  const handleDownload = async (bookingID: number) => {
    try {
      const blob = await triggerInvoiceDownload(bookingID).unwrap();
      const url = window.URL.createObjectURL(blob);

      // Open the PDF in a new tab
      window.open(url, "_blank");

      // Optional: revoke URL after a delay to allow tab to load
      setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    } catch (err) {
      // console.error("Error previewing invoice:", err);
    }
  };

  const [search, setSearch] = useState("");

  const [query, setQuery] = useState("");
  const [packageFilter, setPackageFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pageSize = 10;

  // Combine all filters for API query
  const filters = {
    search: query,
    page,
    limit: pageSize,
  };

  const { data, isLoading, isError } = useGetPaymentHistoryQuery(filters);

  const totalItems =
    data?.meta?.total ??
    data?.meta?.totalItems ??
    data?.total ??
    data?.data?.length ??
    0;

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
    // setPackageFilter(())
    // console.log("Filters updated:", { search, packageFilter, statusFilter });
  }, [search, packageFilter, statusFilter]);

  // Map API data to table rows
  const rows =
    data?.data?.map((item: any) => ({
      id: item.id,
      merchantName: item.merchant_name ?? "N/A",
      businessName: item.store_name ?? "N/A",
      businessAvatar: item.business_logo ?? undefined,
      packageName: item.package_name ?? "N/A",
      date: item.date ? new Date(item.date).toLocaleDateString() : "N/A",
      amount: String(item.amount ?? "0"),
      paymentMethod: item.payment_method ?? "N/A",
      status:
        item.status === "Paid"
          ? "successful"
          : item.status === "Failed"
            ? "failed"
            : "pending",
      bookingID: item.bookingID ?? item.id, // Use fallback if bookingID is missing
    })) ?? [];

  const paginatedData = rows.slice((page - 1) * pageSize, page * pageSize);

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
        <CardTitle className="text-xl font-semibold">
          {t("Admin.PaymentHistory.title")}
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-8">
        {/* Filter Bar */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="text-base font-semibold text-muted-foreground">
            {t("Admin.PaymentHistory.filterBy")}
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("Admin.PaymentHistory.searchPlaceholder")}
              className="h-12 w-64 pl-10"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setQuery(e.target.value);
              }}
            />
          </div>

          <Select
            value={packageFilter || "all"}
            onValueChange={(value) => {
              const val = value === "all" ? "" : value;

              setPackageFilter(val);
              setQuery(val);
            }}
          >
            <SelectTrigger className="py-6 w-64">
              <SelectValue placeholder="Package" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={statusFilter || "all"}
            onValueChange={(value) => {
              setStatusFilter(value);
              setQuery(value === "all" ? "" : value);
            }}
          >
            <SelectTrigger className="py-6 w-64">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="due">Due</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-muted/40 ">
          <div className="overflow-x-auto ">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 text-[#777980] ">
                  <TableHead
                    className={`text-[#777980] ${isRTL ? "text-right pr-8" : "text-left pl-8"}`}
                  >
                    {t("Admin.PaymentHistory.txId")}
                  </TableHead>
                  <TableHead
                    className={`text-[#777980] ${isRTL ? "text-right pr-8" : "text-left pl-8"}`}
                  >
                    {t("Admin.PaymentHistory.merchantName")}
                  </TableHead>
                  <TableHead
                    className={`text-[#777980] ${isRTL ? "text-right pr-8" : "text-left pl-8"}`}
                  >
                    {t("Admin.PaymentHistory.businessName")}
                  </TableHead>
                  <TableHead
                    className={`text-[#777980] ${isRTL ? "text-right pr-8" : "text-left pl-8"}`}
                  >
                    {t("Admin.PaymentHistory.package")}
                  </TableHead>
                  <TableHead
                    className={`text-[#777980] ${isRTL ? "text-right pr-8" : "text-left pl-8"}`}
                  >
                    {t("Admin.PaymentHistory.date")}
                  </TableHead>
                  <TableHead
                    className={`text-[#777980] ${isRTL ? "text-right pr-8" : "text-left pl-8"}`}
                  >
                    {t("Admin.PaymentHistory.amount")}
                  </TableHead>
                  <TableHead
                    className={`text-[#777980] ${isRTL ? "text-right pr-8" : "text-left pl-8"}`}
                  >
                    {t("Admin.PaymentHistory.paymentMethod")}
                  </TableHead>
                  <TableHead
                    className={`text-[#777980] ${isRTL ? "text-right pr-8" : "text-left pl-8"}`}
                  >
                    {t("Admin.PaymentHistory.status")}
                  </TableHead>
                  <TableHead
                    className={`text-[#777980] ${isRTL ? "text-right pr-8" : "text-left pl-8"}`}
                  >
                    {t("Admin.PaymentHistory.action")}
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedData.map((r: any) => (
                  <TableRow key={r.id} className=" h-15.5">
                    <TableCell className="pl-8 font-medium">{r.id}</TableCell>
                    <TableCell>{r.merchantName}</TableCell>
                    <TableCell>{r.businessName}</TableCell>
                    <TableCell>{r.packageName}</TableCell>
                    <TableCell>{r.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <SaudiRiyal size={14} /> {r.amount}
                      </div>
                    </TableCell>
                    <TableCell>{r.paymentMethod}</TableCell>
                    <TableCell>
                      <span
                        className={`px-4 py-2 rounded-xl text-sm font-semibold border ${
                          r.status === "successful"
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : r.status === "failed"
                              ? "border-red-500 bg-red-50 text-red-600"
                              : "border-yellow-500 bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {r.status === "successful"
                          ? "Successful"
                          : r.status === "failed"
                            ? "Failed"
                            : "Pending"}
                      </span>
                    </TableCell>
                    <TableCell
                      onClick={() => handleDownload(r.bookingID ?? r.id)} // Fallback to r.id if bookingID is missing
                      className="cursor-pointer underline"
                    >
                      <Download className="text-muted-foreground w-5" />
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

        {/* Pagination */}
        <div className="mt-6">
          <DataPagination
            totalItems={totalItems}
            currentPage={page}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </div>
      </CardContent>

      {/* Payment Modal */}
      <PaymentModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        selectedPayment={selectedPayment}
      />
    </Card>
  );
}
