"use client";

import * as React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";
import {
  Calendar as CalendarIcon,
  Search,
  Table2,
  Users,
  Scissors,
  User,
  Clock,
} from "lucide-react";

import { cn } from "@/lib/utils";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import useBookings from "../hooks/useBookings";
import MiniBookingPill from "../components/bookings/MiniBookingPill";
import RecentTransactions from "../components/dashboard/RecentTransactions";

// =====================
// types
// =====================

export type TBooking = {
  id: string;
  customerName: string;
  avatarUrl?: string;
  service: string;
  timeRange: string;
  staff: string;
  startAt: string; // ISO string from API
  endAt: string; // ISO string from API
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

function MoreBookingsDialog({
  open,
  onOpenChange,
  title,
  bookings,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  bookings: TBooking[];
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[520px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {bookings.length} booking{bookings.length === 1 ? "" : "s"}
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[420px] overflow-auto pr-2">
          <div className="space-y-3">
            {bookings.map((b) => (
              <div key={b.id} className="rounded-xl border p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={b.avatarUrl} alt={b.customerName} />
                      <AvatarFallback>
                        {b.customerName
                          .split(" ")
                          .slice(0, 2)
                          .map((s) => s[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">
                        {b.customerName}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Scissors className="h-3.5 w-3.5" /> {b.service}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" /> {b.staff}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {b.timeRange}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Badge variant="outline" className="shrink-0">
                    {format(toDate(b.startAt), "MMM d")}
                  </Badge>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Button size="sm" variant="outline" className="h-8">
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="h-8">
                    Reschedule
                  </Button>
                  <Button size="sm" variant="destructive" className="h-8">
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>New Booking</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// =====================
// components: month picker
// =====================

function MonthPicker({
  value,
  onChange,
}: {
  value: Date;
  onChange: (d: Date) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <span>Pick from Calendar</span>
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChange(subMonths(value, 1))}
          >
            <span className="sr-only">Previous</span>◀
          </Button>
          <div className="text-sm font-medium">
            {format(value, "MMMM yyyy")}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChange(addMonths(value, 1))}
          >
            <span className="sr-only">Next</span>▶
          </Button>
        </div>
        <Separator className="my-3" />
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 12 }).map((_, i) => {
            const d = new Date(value.getFullYear(), i, 1);
            const active = d.getMonth() === value.getMonth();
            return (
              <Button
                key={i}
                variant={active ? "default" : "outline"}
                className="justify-center"
                onClick={() => onChange(d)}
              >
                {format(d, "MMM")}
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// =====================
// components: month grid
// =====================

function DayCell({
  day,
  currentMonth,
  bookings,
  onOpenMore,
}: {
  day: Date;
  currentMonth: Date;
  bookings: TBooking[];
  onOpenMore: (day: Date, dayBookings: TBooking[]) => void;
}) {
  const dayBookings = bookings.filter((b) => isSameDay(toDate(b.startAt), day));
  const maxVisible = 1;
  const overflow = Math.max(0, dayBookings.length - maxVisible);

  return (
    <div
      className={cn(
        "relative min-h-[118px] border-l border-t p-2",
        !isSameMonth(day, currentMonth) && "bg-muted/20",
        isToday(day) && "bg-muted/30"
      )}
    >
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "text-xs font-medium",
            !isSameMonth(day, currentMonth) && "text-muted-foreground"
          )}
        >
          {format(day, "dd")}
        </div>
      </div>

      <div className="mt-2 space-y-2">
        {dayBookings.slice(0, maxVisible).map((b) => (
          <MiniBookingPill key={b.id} booking={b} />
        ))}

        {overflow > 0 && (
          <button
            onClick={() => onOpenMore(day, dayBookings)}
            className="text-[11px] font-medium text-foreground/80 hover:text-foreground"
          >
            {overflow} more...
          </button>
        )}
      </div>
    </div>
  );
}

function MonthGrid({
  month,
  bookings,
  onOpenMore,
}: {
  month: Date;
  bookings: TBooking[];
  onOpenMore: (day: Date, dayBookings: TBooking[]) => void;
}) {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const gridStart = startOfWeek(monthStart);
  const gridEnd = endOfWeek(monthEnd);

  const days: Date[] = [];
  let day = gridStart;
  while (day <= gridEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      <div className="grid grid-cols-7 border-b bg-muted/20">
        {DAYS_SHORT.map((d) => (
          <div
            key={d}
            className="px-3 py-2 text-xs font-medium text-muted-foreground"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days.map((d) => (
          <DayCell
            key={d.toISOString()}
            day={d}
            currentMonth={month}
            bookings={bookings}
            onOpenMore={onOpenMore}
          />
        ))}
      </div>
    </div>
  );
}

// =====================
// components: weekly grid (UI shell)
// =====================

function formatTimeLabel(t: string) {
  const [hh] = t.split(":");
  const n = Number(hh);
  const suffix = n >= 12 ? "pm" : "am";
  const display = n % 12 === 0 ? 12 : n % 12;
  return `${display}${suffix}`;
}

function WeeklyGrid({
  monthLabel,
}: // In real implementation you will transform bookings into time-slot cells.
{
  monthLabel: string;
}) {
  const times = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00"];

  return (
    <div className="overflow-hidden rounded-xl border">
      <div className="grid grid-cols-8 border-b bg-muted/20">
        <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
          Time
        </div>
        {DAYS_SHORT.map((d) => (
          <div
            key={d}
            className="px-3 py-2 text-xs font-medium text-muted-foreground"
          >
            {d}
          </div>
        ))}
      </div>

      {times.map((t) => (
        <div key={t} className="grid grid-cols-8 border-b last:border-b-0">
          <div className="px-3 py-4 text-xs font-medium text-muted-foreground">
            {formatTimeLabel(t)}
          </div>

          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="min-h-[78px] border-l p-2">
              {/* UI placeholder. You will render bookings mapped to time/day. */}
              {t === "07:00" && i === 0 ? (
                <div className="space-y-2">
                  <div className="w-full rounded-md border bg-violet-100 px-2 py-1.5 text-[11px] text-violet-900">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-[10px]">
                          BC
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium">
                          Bessie Cooper
                        </div>
                        <div className="truncate opacity-80">Beard Trim</div>
                      </div>
                    </div>
                    <div className="mt-1 truncate opacity-80">
                      7:00:15 - 7:30 pm
                    </div>
                  </div>

                  <button className="text-[11px] font-medium text-foreground/80 hover:text-foreground">
                    2 more...
                  </button>
                </div>
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>
      ))}

      <div className="flex items-center justify-between px-4 py-3 text-xs text-muted-foreground">
        <span>{monthLabel}</span>
        <span>Weekly grid shell • map real data to time slots</span>
      </div>
    </div>
  );
}

// =====================
// main page
// =====================

export default function AllBookingsHistoryPage() {
  const [tab, setTab] = React.useState<"calendar" | "table">("calendar");
  const [view, setView] = React.useState<"monthly" | "weekly">("monthly");
  const [month, setMonth] = React.useState(() => new Date(2025, 0, 1));

  const [filterBy, setFilterBy] =
    React.useState<TBookingFilters["filterBy"]>("staff");
  const [scope, setScope] =
    React.useState<TBookingFilters["scope"]>("upcoming");
  const [search, setSearch] = React.useState("");

  const { bookings, loading, error } = useBookings({
    filterBy,
    scope,
    search,
    month,
  });

  // +more modal state
  const [moreOpen, setMoreOpen] = React.useState(false);
  const [moreTitle, setMoreTitle] = React.useState("");
  const [moreBookings, setMoreBookings] = React.useState<TBooking[]>([]);

  const onOpenMore = React.useCallback((day: Date, dayBookings: TBooking[]) => {
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
      <MoreBookingsDialog
        open={moreOpen}
        onOpenChange={setMoreOpen}
        title={moreTitle}
        bookings={moreBookings}
      />
    </div>
  );
}
