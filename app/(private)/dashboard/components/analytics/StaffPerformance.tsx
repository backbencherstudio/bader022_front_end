"use client";
import { Search, Star } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TxStatus = "completed" | "cancel";

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "U";
}

function StatusPill({ status }: { status: TxStatus }) {
  const isCompleted = status === "completed";
  return (
    <span
      className={[
        "inline-flex min-w-33 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold",
        "border",
        isCompleted
          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
          : "border-red-500 bg-red-50 text-red-600",
      ].join(" ")}
    >
      {isCompleted ? "Completed" : "Cancel"}
    </span>
  );
}
export function StaffPerformanceCard({
  rows,
  className,
  onViewAll,
}: {
  rows: TransactionRow[];
  className?: string;
  onViewAll?: () => void;
}) {
  return (
    <Card
      className={[
        "rounded-3xl border border-muted/40 shadow-sm",
        className ?? "",
      ].join(" ")}
    >
      <CardHeader className="pb-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <CardTitle className="text-xl font-semibold">
            Staff Performance
          </CardTitle>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search anything"
                className="h-12 rounded-xl pl-10"
              />
            </div>
            <Select defaultValue="jan">
              <SelectTrigger className="py-5.5 rounded-[11px] font-medium">
                <SelectValue placeholder="January" />
              </SelectTrigger>
              <SelectContent className="font-medium">
                <SelectItem value="jan">January</SelectItem>
                <SelectItem value="feb">February</SelectItem>
                <SelectItem value="mar">March</SelectItem>
                <SelectItem value="apr">April</SelectItem>
                <SelectItem value="may">May</SelectItem>
                <SelectItem value="jun">June</SelectItem>
                <SelectItem value="jul">July</SelectItem>
                <SelectItem value="aug">August</SelectItem>
                <SelectItem value="sep">September</SelectItem>
                <SelectItem value="oct">October</SelectItem>
                <SelectItem value="nov">November</SelectItem>
                <SelectItem value="dec">December</SelectItem>
              </SelectContent>
            </Select>
            <Button
              type="button"
              onClick={onViewAll}
              className="h-12 rounded-xl dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer px-6 text-white"
            >
              Export Data
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-8">
        <div className="overflow-hidden rounded-2xl border border-muted/40">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="h-14 w-70 pl-8 text-sm font-semibold text-muted-foreground">
                    Staff Name
                  </TableHead>
                  <TableHead className="h-14 text-sm font-semibold text-muted-foreground">
                    Service
                  </TableHead>
                  <TableHead className="h-14 text-sm font-semibold text-muted-foreground">
                    Average Rating
                  </TableHead>
                  <TableHead className="h-14 text-sm font-semibold text-muted-foreground">
                    Revenue Generated
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id} className="h-19.5">
                    <TableCell className="text-base text-foreground">
                      {r.staffName}
                    </TableCell>
                    <TableCell className="text-base text-foreground">
                      {r.service}
                    </TableCell>
                    <TableCell className="text-base flex gap-1 items-center mt-5 text-foreground">
                      <Star size={18} />
                      {r.avgRating}
                    </TableCell>

                    <TableCell className="pr-8">{r.revenueGenerated}</TableCell>
                  </TableRow>
                ))}

                {rows.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-10 text-center text-muted-foreground"
                    >
                      No transactions.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export type TransactionRow = {
  id: string;
  staffName: string;
  service: string;
  avgRating: number;
  revenueGenerated: string;
};
export const demoTransactions: TransactionRow[] = [
  {
    id: "1",
    staffName: "Cameron Williamson",
    service: "Hair Treatment",
    avgRating: 4.9,
    revenueGenerated: "$3,200",
  },
  {
    id: "2",
    staffName: "Oliver Bennett",
    service: "Beard Trim",
    avgRating: 4.6,
    revenueGenerated: "$2,200",
  },
  {
    id: "3",
    staffName: "Jasper Hayes",
    service: "Beard Trim",
    avgRating: 4.9,
    revenueGenerated: "$1,900",
  },
  {
    id: "4",
    staffName: "Luna Monroe",
    service: "Hair Treatment",
    avgRating: 4.7,
    revenueGenerated: "$1,200",
  },
  {
    id: "5",
    staffName: "Silas Everhart",
    service: "Beard Trim",
    avgRating: 4.2,
    revenueGenerated: "$1,000",
  },
];

export default function StaffPerformance() {
  return <StaffPerformanceCard rows={demoTransactions} />;
}
