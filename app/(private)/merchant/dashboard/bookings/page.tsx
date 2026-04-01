"use client";

import { format, startOfMonth, endOfMonth } from "date-fns";
import { Calendar as CalendarIcon, Search, Table2 } from "lucide-react";
import { useState, useCallback } from "react";

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
import { Switch } from "@/components/ui/switch";

import MonthGrid from "../components/bookings/MonthlyGrid";
import WeeklyGrid from "../components/bookings/WeeklyGrid";
import MonthPicker from "../components/bookings/MonthPicker";
import AllBookingHistory from "../components/bookings/AllBookingHistory";
import AddBookingModal from "../components/bookings/AddBookingModal";
import { BookingPopup } from "../components/bookings/BookingPopup";
import { useAllBookingsQuery } from "@/redux/features/merchant/bookingsApi";

export type TBooking = {
  id: string;
  customer_name: string;
  avatarUrl?: string;
  service: {
    service_name: string;
    duration: string;
  };
  timeRange: string;
  staff: string;
  startAt: string;
  endAt: string;
  color?: "purple" | "blue";
};

export const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Page() {
  const { data: allBookings, isLoading } = useAllBookingsQuery({});
  // console.log({ allBookings });
  const [tab, setTab] = useState<"calendar" | "table">("calendar");
  const [view, setView] = useState<"monthly" | "weekly">("monthly");
  // const [month, setMonth] = useState(() => new Date(2026, 0, 1));
  const [month, setMonth] = useState(() => new Date());

  const [filterBy, setFilterBy] = useState<"staff" | "service" | "customer">(
    "staff",
  );
  const [scope, setScope] = useState<"all" | "past" | "upcoming">("all");
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopup, setIsPopup] = useState(true);
  const [moreOpen, setMoreOpen] = useState(false);
  const [moreTitle, setMoreTitle] = useState("");
  const [moreBookings, setMoreBookings] = useState<TBooking[]>([]);

  const isMonthly = view === "monthly";
  const isWeekly = view === "weekly";

  const monthLabel = `${format(month, "MMMM yyyy")} • ${format(
    startOfMonth(month),
    "MMM d, yyyy",
  )} - ${format(endOfMonth(month), "MMM d, yyyy")}`;

  const onOpenMore = useCallback((day: Date, dayBookings: TBooking[]) => {
    setMoreTitle(`Bookings • ${format(day, "EEEE, MMM d")}`);
    setMoreBookings(dayBookings);
    setMoreOpen(true);
  }, []);

  // Filter bookings locally if needed
  const filteredBookings = allBookings?.data?.filter((b: any) => {
    const matchesSearch = search
      ? b.customer_name.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesScope =
      scope === "all"
        ? true
        : scope === "past"
          ? new Date(b.created_at) >= new Date()
          : new Date(b.created_at) < new Date();
    return matchesSearch && matchesScope;
  });

  // console.log({ filteredBookings });

  return (
    <div className="w-full py-4">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-semibold">All Bookings History</h1>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <div className="relative w-full sm:w-65">
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
            <TabsList className="w-full sm:w-auto border border-gray-200 dark:border-gray-700 p-5 shadow-sm dark:bg-gray-800">
              <TabsTrigger
                value="calendar"
                onClick={() => setIsPopup(false)}
                className="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black cursor-pointer"
              >
                <CalendarIcon className="h-4 w-4" /> Calendar
              </TabsTrigger>

              <TabsTrigger
                value="table"
                onClick={() => setIsPopup(true)}
                className="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black cursor-pointer"
              >
                <Table2 className="h-4 w-4" /> Table
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto cursor-pointer dark:bg-gray-700 dark:text-white"
          >
            Add Booking
          </Button>
        </div>
      </div>

      {/* Tabs Content */}
      <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
        {/* Calendar Tab */}
        <TabsContent value="calendar" className="mt-0">
          {/* Filters */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="text-sm text-muted-foreground">Filter by:</div>
            <Select
              value={filterBy}
              onValueChange={(v) => setFilterBy(v as any)}
            >
              <SelectTrigger className="h-9 w-35">
                <SelectValue placeholder="By staff" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="staff">By staff</SelectItem>
                <SelectItem value="service">By service</SelectItem>
                <SelectItem value="customer">By customer</SelectItem>
              </SelectContent>
            </Select>

            <Select value={scope} onValueChange={(v) => setScope(v as any)}>
              <SelectTrigger className="h-9 w-35">
                <SelectValue placeholder="all" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">all</SelectItem>
                <SelectItem value="upcoming">upcoming</SelectItem>
                <SelectItem value="past">past</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Calendar Header + View Toggle */}
          <div className="mt-4">
            {/* Calendar Grid */}
            {view === "monthly" ? (
              <>
                <div className="flex border rounded-t-xl p-3 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
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

                    <div className="flex bg-[#F5F5F5] dark:bg-gray-800 items-center rounded-lg border gap-1 p-1">
                      <Button
                        // variant={view === "monthly" ? "default" : "ghost"}
                        size="sm"
                        // className="h-8 bg-white text-black hover:bg-white dark:bg-gray-800 hover:dark:bg-gray-900 dark:text-white cursor-pointer"
                        className={`
    h-8 cursor-pointer transition-colors
    ${
      isMonthly
        ? "bg-black dark:bg-white dark:text-black!"
        : "text-black dark:text-white bg-white  dark:bg-black!"
    }
  `}
                        onClick={() => setView("monthly")}
                      >
                        Monthly
                      </Button>
                      <Button
                        // variant={view === "monthly" ? "ghost" : "default"}
                        size="sm"
                        className={`
    h-8 cursor-pointer transition-colors
    ${
      isWeekly
        ? "bg-black dark:bg-white dark:text-black!"
        : "text-black dark:text-white hover:text-white bg-gray-100 dark:bg-gray-800"
    }
  `}
                        onClick={() => setView("weekly")}
                      >
                        Weekly
                      </Button>
                    </div>
                  </div>
                </div>
                <MonthGrid
                  month={month}
                  bookings={filteredBookings}
                  onOpenMore={onOpenMore}
                />
              </>
            ) : (
              <>
                <div className="flex border rounded-t-xl p-3 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
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

                    <div className="flex items-center bg-[#F5F5F5] dark:bg-gray-800  rounded-lg gap-1 border p-1">
                      <Button
                        // variant={view === "monthly" ? "default" : "ghost"}
                        size="sm"
                        // className="h-8 bg-white text-black hover:bg-white dark:bg-gray-800 hover:dark:bg-gray-900 dark:text-white cursor-pointer"
                        className={`h-8 cursor-pointer transition-colors${
                          isMonthly
                            ? "bg-black dark:bg-white dark:text-black!"
                            : "text-black dark:text-white hover:text-white dark:bg-gray-800 bg-gray-100"
                        }
  `}
                        onClick={() => setView("monthly")}
                      >
                        Monthly
                      </Button>
                      <Button
                        // variant={view === "monthly" ? "ghost" : "default"}
                        size="sm"
                        className={`h-8 cursor-pointer transition-colors${
                          isWeekly
                            ? "bg-black dark:bg-white dark:text-black!"
                            : "text-black dark:text-white  dark:bg-black!"
                        }
`}
                        onClick={() => setView("weekly")}
                      >
                        Weekly
                      </Button>
                    </div>
                  </div>
                </div>
                <WeeklyGrid
                  month={month}
                  bookings={filteredBookings}
                  onOpenMore={onOpenMore}
                  monthLabel={monthLabel}
                />
              </>
            )}
          </div>
        </TabsContent>

        {/* Table Tab */}
        <TabsContent value="table" className="mt-6">
          <AllBookingHistory data={filteredBookings || []} />
          {/* <BookingPopup isPopup={isPopup} setIsPopup={setIsPopup} /> */}
        </TabsContent>
      </Tabs>

      {/* Add Booking Modal */}
      <AddBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // onSubmit={handleAddBooking}
      />
    </div>
  );
}
