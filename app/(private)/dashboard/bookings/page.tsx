"use client";

import { format, startOfMonth, endOfMonth } from "date-fns";
import {
  Calendar as CalendarIcon,
  Search,
  Table2,
  Users,
  Scissors,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import useBookings from "../hooks/useBookings";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import WeeklyGrid from "../components/bookings/WeeklyGrid";
import MonthGrid from "../components/bookings/MonthlyGrid";
import MonthPicker from "../components/bookings/MonthPicker";
import { useCallback, useState } from "react";

export type TBooking = {
  id: string;
  customerName: string;
  avatarUrl?: string;
  service: string;
  timeRange: string;
  staff: string;
  startAt: string;
  endAt: string;
  color?: "purple" | "blue";
};

export type TBookingFilters = {
  filterBy: "staff" | "service" | "customer";
  scope: "upcoming" | "past" | "all";
  search: string;
  month: Date;
};

export const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toDate(iso: string) {
  // You MUST ensure ISO includes timezone and is valid.
  return new Date(iso);
}

// function MoreBookingsDialog({
//   open,
//   onOpenChange,
//   title,
//   bookings,
// }: {
//   open: boolean;
//   onOpenChange: (v: boolean) => void;
//   title: string;
//   bookings: TBooking[];
// }) {
//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-[520px]">
//         <DialogHeader>
//           <DialogTitle>{title}</DialogTitle>
//           <DialogDescription>
//             {bookings.length} booking{bookings.length === 1 ? "" : "s"}
//           </DialogDescription>
//         </DialogHeader>

//         <div className="max-h-[420px] overflow-auto pr-2">
//           <div className="space-y-3">
//             {bookings.map((b) => (
//               <div key={b.id} className="rounded-xl border p-3">
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex items-center gap-2">
//                     <Avatar className="h-9 w-9">
//                       <AvatarImage src={b.avatarUrl} alt={b.customerName} />
//                       <AvatarFallback>
//                         {b.customerName
//                           .split(" ")
//                           .slice(0, 2)
//                           .map((s) => s[0])
//                           .join("")}
//                       </AvatarFallback>
//                     </Avatar>

//                     <div className="min-w-0">
//                       <div className="truncate text-sm font-semibold">
//                         {b.customerName}
//                       </div>
//                       <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
//                         <span className="inline-flex items-center gap-1">
//                           <Scissors className="h-3.5 w-3.5" /> {b.service}
//                         </span>
//                         <span className="inline-flex items-center gap-1">
//                           <Users className="h-3.5 w-3.5" /> {b.staff}
//                         </span>
//                         <span className="inline-flex items-center gap-1">
//                           <Clock className="h-3.5 w-3.5" /> {b.timeRange}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <Badge variant="outline" className="shrink-0">
//                     {format(toDate(b.startAt), "MMM d")}
//                   </Badge>
//                 </div>

//                 <div className="mt-3 flex flex-wrap items-center gap-2">
//                   <Button size="sm" variant="outline" className="h-8">
//                     View
//                   </Button>
//                   <Button size="sm" variant="outline" className="h-8">
//                     Reschedule
//                   </Button>
//                   <Button size="sm" variant="destructive" className="h-8">
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <DialogFooter className="gap-2 sm:gap-0">
//           <Button variant="outline" onClick={() => onOpenChange(false)}>
//             Close
//           </Button>
//           <Button>New Booking</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

export default function page() {
  const [tab, setTab] = useState<"calendar" | "table">("calendar");
  const [view, setView] = useState<"monthly" | "weekly">("monthly");
  const [month, setMonth] = useState(() => new Date(2025, 0, 1));

  const [filterBy, setFilterBy] =
    useState<TBookingFilters["filterBy"]>("staff");
  const [scope, setScope] = useState<TBookingFilters["scope"]>("upcoming");
  const [search, setSearch] = useState("");

  const { bookings, loading, error } = useBookings({
    filterBy,
    scope,
    search,
    month,
  });

  // +more modal state
  const [moreOpen, setMoreOpen] = useState(false);
  const [moreTitle, setMoreTitle] = useState("");
  const [moreBookings, setMoreBookings] = useState<TBooking[]>([]);

  const onOpenMore = useCallback((day: Date, dayBookings: TBooking[]) => {
    setMoreTitle(`Bookings • ${format(day, "EEEE, MMM d")}`);
    setMoreBookings(dayBookings);
    setMoreOpen(true);
  }, []);

  const monthLabel = `${format(month, "MMMM yyyy")} • ${format(
    startOfMonth(month),
    "MMM d, yyyy"
  )} - ${format(endOfMonth(month), "MMM d, yyyy")}`;

  return (
    <div className="w-full">
      <div>
        {/* Top bar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-semibold">All Bookings History</h1>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <div className="relative w-full sm:w-[260px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
                placeholder="Search anything"
              />
            </div>

            <Tabs
              value={tab}
              onValueChange={(v) => setTab(v as any)}
              className="w-full sm:w-auto"
            >
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="calendar" className="gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Calendar
                </TabsTrigger>
                <TabsTrigger value="table" className="gap-2">
                  <Table2 className="h-4 w-4" />
                  Table
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button className="w-full sm:w-auto">Add Booking</Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div className="text-sm text-muted-foreground">Filter by:</div>

          <Select value={filterBy} onValueChange={(v) => setFilterBy(v as any)}>
            <SelectTrigger className="h-9 w-[140px]">
              <SelectValue placeholder="By staff" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="staff">By staff</SelectItem>
              <SelectItem value="service">By service</SelectItem>
              <SelectItem value="customer">By customer</SelectItem>
            </SelectContent>
          </Select>

          <Select value={scope} onValueChange={(v) => setScope(v as any)}>
            <SelectTrigger className="h-9 w-[140px]">
              <SelectValue placeholder="upcoming" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">upcoming</SelectItem>
              <SelectItem value="past">past</SelectItem>
              <SelectItem value="all">all</SelectItem>
            </SelectContent>
          </Select>

          <div className="ml-auto hidden md:flex items-center gap-2">
            {loading ? (
              <Badge variant="outline" className="font-normal">
                Loading...
              </Badge>
            ) : error ? (
              <Badge variant="destructive" className="font-normal">
                {error}
              </Badge>
            ) : (
              <Badge variant="outline" className="font-normal">
                {bookings.length} bookings
              </Badge>
            )}
          </div>
        </div>

        {/* Content Card */}
        <Card className="mt-4 p-4">
          <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
            <TabsContent value="calendar" className="mt-0">
              {/* Calendar header row */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-sm font-semibold">
                    {format(month, "MMMM yyyy")}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {format(startOfMonth(month), "MMM d, yyyy")} -{" "}
                    {format(endOfMonth(month), "MMM d, yyyy")}
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <MonthPicker value={month} onChange={setMonth} />

                  <div className="flex items-center rounded-lg border bg-muted/20 p-1">
                    <Button
                      variant={view === "monthly" ? "default" : "ghost"}
                      size="sm"
                      className="h-8"
                      onClick={() => setView("monthly")}
                    >
                      Monthly
                    </Button>
                    <Button
                      variant={view === "weekly" ? "default" : "ghost"}
                      size="sm"
                      className="h-8"
                      onClick={() => setView("weekly")}
                    >
                      Weekly
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                {view === "monthly" ? (
                  <MonthGrid
                    month={month}
                    bookings={bookings}
                    onOpenMore={onOpenMore}
                  />
                ) : (
                  <WeeklyGrid monthLabel={monthLabel} />
                )}
              </div>
            </TabsContent>

            {/* Keep table tab empty exactly like you requested */}
            <TabsContent value="table" className="mt-0">
              <>
                <RecentTransactions />
              </>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      {/* +N More Dialog */}
      {/* <MoreBookingsDialog
        open={moreOpen}
        onOpenChange={setMoreOpen}
        title={moreTitle}
        bookings={moreBookings}
      /> */}
    </div>
  );
}
