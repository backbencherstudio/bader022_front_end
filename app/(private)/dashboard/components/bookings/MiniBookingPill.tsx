import { cn } from "@/lib/utils";
import { TBooking } from "../../bookings/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function bookingPillClass(color: NonNullable<TBooking["color"]>) {
  return color === "purple"
    ? "bg-violet-100 text-violet-900 border-violet-200"
    : "bg-sky-100 text-sky-900 border-sky-200";
}
export default function MiniBookingPill({ booking }: { booking: TBooking }) {
  const color = booking.color ?? "purple";

  return (
    <div
      className={cn(
        "w-full rounded-md border px-2 py-1.5 text-[11px] leading-tight",
        bookingPillClass(color)
      )}
    >
      <div className="flex items-center gap-2">
        <Avatar className="h-5 w-5">
          <AvatarImage src={booking.avatarUrl} alt={booking.customerName} />
          <AvatarFallback className="text-[10px]">
            {booking.customerName
              .split(" ")
              .slice(0, 2)
              .map((s) => s[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="truncate font-medium">{booking.customerName}</div>
          <div className="truncate opacity-80">{booking.service}</div>
        </div>
      </div>

      <div className="mt-1 flex items-center justify-between gap-2">
        <div className="truncate opacity-80">{booking.timeRange}</div>
      </div>
    </div>
  );
}
