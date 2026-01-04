"use client";
import { Search } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BookingViewDetailDialogue from "./ViewDetailsDialogue";
import { useState } from "react";

export type TxStatus = "completed" | "cancel" | "pending" | "confirm";

export type TransactionRow = {
  bookingID: string;
  customerName: string;
  customerAvatar?: string;
  service: string;
  amountLabel: string;
  dateLabel: string;
  status: TxStatus;
};

export const demoTransactions: TransactionRow[] = [
  {
    bookingID: "BKOOD",
    customerName: "Cameron Williamson",
    customerAvatar: "https://i.pravatar.cc/100?img=12",
    service: "Hair Treatment",
    amountLabel: "100 SAR",
    dateLabel: "Jun 12, 2023",
    status: "completed",
  },
  {
    bookingID: "BKOOD",
    customerName: "Jane Cooper",
    customerAvatar: "https://i.pravatar.cc/100?img=5",
    service: "Beard Trim",
    amountLabel: "89 SAR",
    dateLabel: "Jun 13, 2023",
    status: "confirm",
  },
  {
    bookingID: "BKOOD",
    customerName: "Esther Howard",
    customerAvatar: "https://i.pravatar.cc/100?img=32",
    service: "Beard Trim",
    amountLabel: "79 SAR",
    dateLabel: "Jun 14, 2023",
    status: "cancel",
  },
  {
    bookingID: "BKOOD",
    customerName: "Brooklyn Simmons",
    customerAvatar: "https://i.pravatar.cc/100?img=15",
    service: "Hair Treatment",
    amountLabel: "107 SAR",
    dateLabel: "Jun 15, 2023",
    status: "pending",
  },
  {
    bookingID: "BKOOD",
    customerName: "Darlene Robertson",
    customerAvatar: "https://i.pravatar.cc/100?img=48",
    service: "Beard Trim",
    amountLabel: "109 SAR",
    dateLabel: "Jun 16, 2023",
    status: "cancel",
  },
];

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
  };

  const statusLabels: Record<TxStatus, string> = {
    completed: "Completed",
    cancel: "Cancelled",
    pending: "Pending",
    confirm: "Confirmed",
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
  className,
  onViewAll,
}: {
  rows: TransactionRow[];
  className?: string;
  onViewAll?: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<TxStatus>("completed");

  const booking = {
    customerName: "Sarah Jones",
    email: "sarah@example.com",
    phone: "+1 (555) 123-4567",
    service: "Haircut & Styling",
    bookingID: "BK-001",
    date: "2025-11-30 10:00 AM",
    status: currentStatus,
    price: "100 SAR",
    staff: "Emma Wilson",
  };

  const handleChangeStatus = (status: TxStatus) => {
    setCurrentStatus(status); // Update the status
  };
  return (
    <Card
      className={[
        "rounded-3xl border border-muted/40 shadow-sm",
        className ?? "",
      ].join(" ")}
    >
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <CardTitle className="text-xl font-semibold">
            Booking History
          </CardTitle>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search anything"
                className="h-12 rounded-xl pl-10"
              />
            </div>

            <Button
              type="button"
              onClick={onViewAll}
              className="h-12 rounded-xl dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer px-6 text-white"
            >
              View All
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-8">
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="mr-2 text-base font-semibold">Filter by:</div>
          <div className="flex flex-wrap gap-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All Dates" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All Services" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="hair">Hair Treatment</SelectItem>
                <SelectItem value="beard">Beard Trim</SelectItem>
              </SelectContent>
            </Select>

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
        </div>

        <div className="overflow-hidden rounded-2xl border border-muted/40">
          <div className="overflow-x-auto">
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
                      {r.amountLabel}
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

      {/* Pagination UI */}
      <div className="flex justify-between  flex-col gap-2 sm:flex-row items-center px-6 pb-4 border-t border-muted/40">
        <div className="text-sm text-muted-foreground">
          Showing 01-12 of 400 Results
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl px-4 py-2">
            &lt;
          </Button>
          <Button variant="outline" className="rounded-xl px-4 py-2">
            1
          </Button>
          <Button variant="outline" className="rounded-xl px-4 py-2">
            2
          </Button>
          <Button variant="outline" className="rounded-xl px-4 py-2">
            3
          </Button>
          <Button variant="outline" className="rounded-xl px-4 py-2">
            4
          </Button>
          <Button variant="outline" className="rounded-xl px-4 py-2">
            &gt;
          </Button>
        </div>
      </div>
      <div>
        <BookingViewDetailDialogue
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          booking={booking}
          onChangeStatus={handleChangeStatus}
        />
      </div>
    </Card>
  );
}

export default function AllBookingHistory() {
  return <RecentTransactionsCard rows={demoTransactions} />;
}
