"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DAYS_SHORT } from "../../bookings/page";
import { TBooking } from "../../bookings/page";

function formatTimeLabel(t: string) {
  const [hh] = t.split(":");
  const n = Number(hh);
  const suffix = n >= 12 ? "pm" : "am";
  const display = n % 12 === 0 ? 12 : n % 12;
  return `${display}${suffix}`;
}

// Helper to filter bookings by day index (0=Sun,...6=Sat) and hour
function getBookingsForSlot(
  bookings: TBooking[],
  dayIndex: number,
  time: string,
) {
  return bookings.filter((b: any) => {
    const date = new Date(b.created_at);
    const bookingDay = date.getDay();
    const bookingHour = `${date.getHours()}`.padStart(2, "0");
    return bookingDay === dayIndex && bookingHour === time.split(":")[0];
  });
}

export default function WeeklyGrid({
  monthLabel,
  bookings = [],
}: {
  monthLabel: string;
  bookings?: TBooking[];
}) {
  // Simple time slots from 7:00 to 12:00
  const times = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00"];

  return (
    <div className="overflow-hidden rounded-xl border">
      {/* Header Row */}
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

      {/* Time Slots */}
      {times.map((t) => (
        <div key={t} className="grid grid-cols-8 border-b last:border-b-0">
          {/* Time column */}
          <div className="px-3 py-4 text-xs font-medium text-muted-foreground">
            {formatTimeLabel(t)}
          </div>

          {/* Days columns */}
          {Array.from({ length: 7 }).map((_, i) => {
            const slotBookings = getBookingsForSlot(bookings, i, t);

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
                          <button className="text-[11px] font-medium text-foreground/80 hover:text-foreground">
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
        <span>Weekly grid mapped from booking data</span>
      </div>
    </div>
  );
}
