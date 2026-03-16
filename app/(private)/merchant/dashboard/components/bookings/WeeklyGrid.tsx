"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DAYS_SHORT } from "../../bookings/page";
import { TBooking } from "../../bookings/page";
import {
  startOfWeek,
  addDays,
  parseISO,
  isSameDay,
  getHours,
  isSameMonth,
} from "date-fns";

// Convert "HH:mm" to 12h format like "7am", "12pm"
function formatTimeLabel(t: string) {
  const [hh] = t?.split(":");
  const n = Number(hh);
  const suffix = n >= 12 ? "pm" : "am";
  const display = n % 12 === 0 ? 12 : n % 12;
  return `${display}${suffix}`;
}

// Filter bookings for a specific day & time slot
function getBookingsForSlot(
  bookings: TBooking[],
  day: Date,
  time: string,
  month: Date,
) {
  return bookings.filter((b: any) => {
    if (!b.date_time) return false;

    let date: Date;
    try {
      date = parseISO(b.date_time);
    } catch {
      return false;
    }

    // Only bookings in the current month
    if (!isSameMonth(date, month)) return false;

    const bookingHour = String(getHours(date)).padStart(2, "0");
    return isSameDay(date, day) && bookingHour === time.split(":")[0];
  });
}

export default function WeeklyGrid({
  month,
  monthLabel,
  bookings = [],
  onOpenMore,
}: {
  month: Date;
  monthLabel: string;
  bookings?: TBooking[];
  onOpenMore: (day: Date, dayBookings: TBooking[]) => void;
}) {
  const times = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00"];

  // Current week (start from Sunday)
  const weekStart = startOfWeek(new Date());
  const days: Date[] = Array.from({ length: 7 }).map((_, i) =>
    addDays(weekStart, i),
  );

  return (
    <div className="overflow-hidden rounded-xl border">
      {/* Header Row */}
      <div className="grid grid-cols-8 border-b bg-muted/20">
        <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
          Time
        </div>
        {days.map((d, i) => (
          <div
            key={i}
            className="px-3 py-2 text-xs font-medium text-muted-foreground"
          >
            {DAYS_SHORT[d.getDay()]} {d.getDate()}
          </div>
        ))}
      </div>

      {/* Time Slots */}
      {times.map((t) => (
        <div key={t} className="grid grid-cols-8 border-b last:border-b-0">
          {/* Time Column */}
          <div className="px-3 py-4 text-xs font-medium text-muted-foreground">
            {formatTimeLabel(t)}
          </div>

          {/* Days Columns */}
          {days.map((dayDate, i) => {
            const slotBookings = getBookingsForSlot(
              bookings,
              dayDate,
              t,
              month,
            );

            return (
              <div key={i} className="min-h-19.5 border-l p-2">
                {slotBookings.length > 0 ? (
                  <div className="space-y-2">
                    {slotBookings.map((b, idx) => (
                      <div
                        key={b.id}
                        className="w-full rounded-md border bg-violet-100 px-2 py-1.5 text-[11px] text-violet-900"
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-[10px]">
                              {b.customer_name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="truncate font-medium">
                              {b.customer_name}
                            </div>
                            <div className="truncate opacity-80">
                              {b.service.service_name}
                            </div>
                          </div>
                        </div>
                        <div className="mt-1 truncate opacity-80">
                          {b.service.duration}
                        </div>
                        {idx === 0 && slotBookings.length > 1 && (
                          <button
                            className="text-[11px] font-medium text-foreground/80 hover:text-foreground"
                            onClick={() => onOpenMore(dayDate, slotBookings)}
                          >
                            {slotBookings.length - 1} more...
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div />
                )}
              </div>
            );
          })}
        </div>
      ))}

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 text-xs text-muted-foreground">
        <span>{monthLabel}</span>
        <span>Current week bookings view</span>
      </div>
    </div>
  );
}
