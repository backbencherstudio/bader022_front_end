"use client";

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
  toDate,
} from "date-fns";
import { TBooking } from "../../bookings/page";
import { cn } from "@/lib/utils";
import MiniBookingPill from "./MiniBookingPill";

export default function DayCell({
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
  const dayBookings = bookings?.filter((b: any) =>
    isSameDay(toDate(b.created_at), day),
  );
  const maxVisible = 1;
  const overflow = Math.max(0, dayBookings?.length - maxVisible);

  // console.log({ bookings, day, dayBookings, overflow });

  return (
    <div
      className={cn(
        "relative min-h-29.5 border-l border-t p-2",
        !isSameMonth(day, currentMonth) && "bg-muted/20",
        isToday(day) && "bg-muted/30",
      )}
    >
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "text-xs font-medium",
            !isSameMonth(day, currentMonth) && "text-muted-foreground",
          )}
        >
          {format(day, "dd")}
        </div>
      </div>

      <div className="mt-2 space-y-2">
        {dayBookings?.slice(0, maxVisible).map((b) => (
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
