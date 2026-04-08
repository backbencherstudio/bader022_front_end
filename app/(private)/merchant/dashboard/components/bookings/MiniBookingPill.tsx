"use client";

import { cn } from "@/lib/utils";
import { TBooking } from "../../bookings/page";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import { Clock, Scissors } from "lucide-react";

function bookingPillClass(color: NonNullable<TBooking["color"]>) {
  return color === "purple"
    ? "bg-violet-100 text-violet-900 border-violet-200"
    : "bg-sky-100 text-sky-900 border-sky-200";
}
export default function MiniBookingPill({ booking }: { booking: TBooking }) {
  const color = booking.color ?? "purple";
  // console.log(booking);

  return (
    <div
      className={cn(
        "w-full rounded-md border px-2 py-1.5 text-[12px] leading-tight p-4",
        bookingPillClass(color),
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        {/* <Avatar className="h-5 w-5">
          <Image
            src={"/images/staffs/staff1.png"}
            height={16}
            width={16}
            alt="customer"
            unoptimized={true}
          />
        </Avatar> */}

        <div className="truncate font-medium">{booking.customer_name}</div>
      </div>
      <div className="mt-1 flex items-center gap-1">
        {/* <Scissors size={14} /> */}
        <div className="truncate opacity-80">
          {booking.service.service_name}
        </div>
      </div>

      <div className="mt-1 flex items-center gap-1">
        <Clock size={14} />
        <div className="truncate opacity-80">{booking.service.duration}</div>
      </div>
    </div>
  );
}
