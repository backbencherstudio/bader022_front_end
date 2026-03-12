import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Step4() {
  return (
    <Card className="rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="bg-[#F4F6F8] dark:bg-gray-900 px-6 py-4 font-semibold text-center text-sm">
          Booking Confirmed!
        </div>

        <div className="p-6 sm:p-10 text-center">
          <p className="text-sm">
            Booking ID: <span className="font-semibold">BOK91385</span>
          </p>

          {/* Fake success icon */}
          <div className="my-8 flex items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-[#F4F6F8] dark:bg-gray-900 flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-white dark:bg-black border border-border flex items-center justify-center font-bold">
                ✓
              </div>
            </div>
          </div>

          <p className="text-sm max-w-[520px] mx-auto leading-6">
            Your appointment is successfully booked. A confirmation email with a
            temporary password has been sent. Use it to log in and manage your
            booking.
          </p>

          {/* Details Box */}
          <div className="mt-8 rounded-xl border border-border p-5 sm:p-6 text-sm text-left space-y-3">
            {[
              ["Service:", "Haircut & Styling"],
              ["Date & Time:", "2025-11-30 10:00 AM"],
              ["Staff:", "Sara Jonson"],
              ["Duration:", "30 min"],
              ["Total Amount:", "109 SAR"],
              ["Pay:", "Credit Card"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <span>{k}</span>
                <span className="font-medium text-right">{v}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button className="cursor-pointer py-2">Download Invoice</Button>
            <Link href={"/user/bookings"}>
              <Button variant="outline" className="cursor-pointer py-2">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
