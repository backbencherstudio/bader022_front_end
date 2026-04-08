"use client";

import { useState, useMemo } from "react";
import { SaudiRiyal, Search } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useI18n } from "@/components/provider/I18nProvider";

type TxStatus = "completed" | "cancel" | "pending";

export type TransactionRow = {
  id: string;
  customerName: string;
  customerAvatar?: string;
  service: string;
  amount: string;
  date: string;
  status: TxStatus;
};

const PAGE_SIZE = 10;

function initials(name?: string) {
  if (!name) return "U";

  const parts = name.trim().split(/\s+/);

  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "U";
}

function StatusPill({ status }: { status: TxStatus }) {
  // const isCompleted = status === "completed";

  return (
    <span
      className={[
        "inline-flex min-w-33 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold border",
        status
          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
          : "border-red-500 bg-red-50 text-red-600",
      ].join(" ")}
    >
      {/* {isCompleted ? "Completed" : "Cancel"} */}
      {status === "completed"
        ? "completed"
        : status === "cancel"
          ? "cancel"
          : "pending"}
    </span>
  );
}

export function RecentTransactionsCard({ rows }: { rows: TransactionRow[] }) {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => {
    const keyword = search.toLowerCase();

    return rows.filter((r) => {
      const name = r.customerName?.toLowerCase() ?? "";
      const service = r.service?.toLowerCase() ?? "";

      return name.includes(keyword) || service.includes(keyword);
    });
  }, [rows, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  // console.log(paginated);

  return (
    <Card className="rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm dark:bg-gray-800">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <CardTitle className="text-xl font-semibold">
            {locale === "ar" ? "المعاملات الأخيرة" : "Recent Transactions"}
          </CardTitle>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search anything"
                className="h-12 rounded-xl pl-10"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            <Button className="h-12 rounded-xl dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-6 text-white">
              {locale === "ar" ? "عرض الكل" : "View All"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-8">
        <div className="overflow-hidden rounded-2xl border border-muted/40">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
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
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginated.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="pl-8">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={r.customerAvatar} />
                          <AvatarFallback>
                            {initials(r.customerName)}
                          </AvatarFallback>
                        </Avatar>

                        {r.customerName}
                      </div>
                    </TableCell>

                    <TableCell>{r.service}</TableCell>

                    <TableCell>
                      <div className="flex items-center">
                        <SaudiRiyal size={14} />
                        {r.amount}
                      </div>
                    </TableCell>

                    <TableCell>{r.date}</TableCell>

                    <TableCell>
                      <StatusPill status={r.status} />
                    </TableCell>

                    {/* <TableCell className="underline">View details</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {paginated.length === 0 && (
              <div className="py-10 text-center text-muted-foreground">
                {locale === "ar" ? "لا توجد معاملات" : "No transactions"}
              </div>
            )}
          </div>
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
    </Card>
  );
}

export default function RecentTransactions({ data }: any) {
  // console.log(data);

  const rows: TransactionRow[] =
    data?.map((item: any) => ({
      id: item.id,
      customerName: item.booking?.customer_name ?? "Unknown",
      customerAvatar: item.user?.image ?? "",
      service: item.booking?.service?.service_name,
      amount: item.amount,
      date: new Date(item.created_at).toLocaleDateString(),
      status:
        item.payment_status === "paid"
          ? "completed"
          : item.booking?.status === "cancel"
            ? "cancel"
            : "pending",
    })) ?? [];

  // console.log(rows);

  return <RecentTransactionsCard rows={rows} />;
}
