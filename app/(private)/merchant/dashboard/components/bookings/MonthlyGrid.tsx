"use client";
import { DAYS_SHORT, TBooking } from "../../bookings/page";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
} from "date-fns";
import DayCell from "./DayCell";

export default function MonthGrid({
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
    <div className="rounded-xl overflow-auto border border-t-0 rounded-t-none">
      <div className="min-w-200 overflow-auto">
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
    </div>
  );
}
