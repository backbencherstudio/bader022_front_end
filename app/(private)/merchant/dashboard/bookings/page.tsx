"use client";

import { format, startOfMonth, endOfMonth } from "date-fns";
import { Calendar as CalendarIcon, Search, Table2 } from "lucide-react";

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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useBookings from "../hooks/useBookings";
import WeeklyGrid from "../components/bookings/WeeklyGrid";
import MonthGrid from "../components/bookings/MonthlyGrid";
import MonthPicker from "../components/bookings/MonthPicker";
import { useCallback, useState } from "react";
import AllBookingHistory from "../components/bookings/AllBookingHistory";
import AddBookingModal from "../components/bookings/AddBookingModal";
import { Switch } from "@/components/ui/switch";

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

export default function Page() {
  const [tab, setTab] = useState<"calendar" | "table">("calendar");
  const [view, setView] = useState<"monthly" | "weekly">("monthly");
  const [month, setMonth] = useState(() => new Date(2026, 0, 1));

  const [filterBy, setFilterBy] =
    useState<TBookingFilters["filterBy"]>("staff");
  const [scope, setScope] = useState<TBookingFilters["scope"]>("upcoming");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBooking = (data: any) => {
    console.log("New booking data: ", data);
    // Handle form submission (e.g., send data to backend)
  };
  const { bookings, loading } = useBookings({
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
    <div className="w-full py-4">
      {/* Top bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold">All Bookings History</h1>
        </div>

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
            <TabsList
              className="w-full sm:w-auto  dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
               p-5 shadow-sm"
            >
              <TabsTrigger value="calendar" className="gap-2 cursor-pointer">
                <CalendarIcon className="h-4 w-4" />
                Calendar
              </TabsTrigger>
              <TabsTrigger value="table" className="gap-2 cursor-pointer">
                <Table2 className="h-4 w-4" />
                Table
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

      {/* Content Card */}
      <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
        <TabsContent value="calendar" className="mt-0">
          {/* Calendar header row */}
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
                <SelectValue placeholder="upcoming" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upcoming">upcoming</SelectItem>
                <SelectItem value="past">past</SelectItem>
                <SelectItem value="all">all</SelectItem>
              </SelectContent>
            </Select>

            {/* <div className="ml-auto hidden md:flex items-center gap-2">
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
          </div> */}
          </div>

          <div className="mt-4 ">
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

                    <div className="flex bg-[#F5F5F5] dark:bg-gray-700 items-center rounded-lg border gap-1 p-1">
                      <Button
                        // variant={view === "monthly" ? "default" : "ghost"}
                        size="sm"
                        className="h-8 bg-white text-black hover:bg-white dark:bg-gray-800 hover:dark:bg-gray-900 dark:text-white cursor-pointer"
                        onClick={() => setView("monthly")}
                      >
                        Monthly
                      </Button>
                      <Button
                        // variant={view === "monthly" ? "ghost" : "default"}
                        size="sm"
                        className="h-8 bg-[#f5f5f5] text-black hover:bg-white dark:bg-gray-800 hover:dark:bg-gray-900 dark:text-white cursor-pointer"
                        onClick={() => setView("weekly")}
                      >
                        Weekly
                      </Button>
                    </div>
                  </div>
                </div>
                <MonthGrid
                  month={month}
                  bookings={bookings}
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

                    <div className="flex items-center bg-[#F5F5F5] dark:bg-gray-700  rounded-lg gap-1 border p-1">
                      <Button
                        // variant={view === "weekly" ? "ghost" : "default"}
                        size="sm"
                        // className="h-8"
                        className="h-8 bg-[#f5f5f5] text-black hover:bg-white dark:bg-gray-800 hover:dark:bg-gray-900 dark:text-white  cursor-pointer"
                        onClick={() => setView("monthly")}
                      >
                        Monthly
                      </Button>
                      <Button
                        // variant={view === "weekly" ? "default" : "ghost"}
                        size="sm"
                        // className="h-8"
                        // className="h-8 bg-white text-black hover:bg-white cursor-pointer"
                        className="h-8 bg-white text-black hover:bg-white dark:bg-gray-800 hover:dark:bg-gray-900 dark:text-white cursor-pointer"
                        onClick={() => setView("weekly")}
                      >
                        Weekly
                      </Button>
                    </div>
                  </div>
                </div>
                <WeeklyGrid monthLabel={monthLabel} />
              </>
            )}
          </div>
        </TabsContent>

        {/* Keep table tab empty exactly like you requested */}
        <TabsContent value="table" className="mt-6 ">
          <Card
            className="mb-6  dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
               p-5 shadow-sm"
          >
            {/* First Section: Title, Description, and Toggle */}
            <CardHeader className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl pb-2 font-semibold">
                  Automated Reminders
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Set up automatic reminder notifications
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Switch defaultChecked={true} id="notification_toggle" />
              </div>
            </CardHeader>

            {/* Second Section: Border and Paragraph */}
            <CardContent>
              <div className="border-t-2 border-muted mb-4 pt-2" />
              <p className="text-sm text-muted-foreground">
                Reminders will be sent automatically 24 hours before each
                appointment via email.
              </p>
            </CardContent>
          </Card>
          <AllBookingHistory />
        </TabsContent>
      </Tabs>
      <AddBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddBooking}
      />
    </div>
  );
}
