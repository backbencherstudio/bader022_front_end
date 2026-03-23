"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function UserBookingDetailsModal({
  booking,
  open,
  onOpenChange,
}: {
  booking: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  console.log(booking);

  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl p-0 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader className="px-6 py-4">
          <DialogTitle className="text-lg text-start font-semibold text-blue-600">
            Booking Details
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-6 space-y-6">
          {/* Status Banner */}
          <div className="flex items-start gap-3 rounded-xl border border-emerald-400 bg-emerald-50 px-4 py-4">
            <CheckCircle2 className="h-6 w-6 mt-0.5 text-emerald-600" />
            <div>
              <p className="text-sm font-semibold text-emerald-700 capitalize">
                {booking.status}
              </p>
              <p className="text-sm text-gray-700">
                Booking details for {booking.customer_name}
              </p>
            </div>
          </div>

          {/* Booking Info */}
          <div className="rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 space-y-3 shadow-sm">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Booking ID:</span>
              <span className="text-gray-900">{booking.bookingID}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Customer Name:</span>
              <span className="text-gray-900">{booking.customerName}</span>
            </div>

            {/* <div className="flex justify-between">
              <span className="font-medium text-gray-700">Email:</span>
              <span className="text-gray-900">{booking.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Phone:</span>
              <span className="text-gray-900">{booking.phone}</span>
            </div> */}

            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Service:</span>
              <span className="text-gray-900">{booking.service}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Date & Time:</span>
              <span className="text-gray-900">{booking.dateLabel}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Duration:</span>
              <span className="text-gray-900">
                {booking.service?.duration} min
              </span>
            </div>

         

            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Price:</span>
              <span className="text-gray-900">{booking.amountLabel} SAR</span>
            </div>
          </div>

          {/* Close Button */}
          <DialogClose asChild>
            <div className="flex justify-center">
              <Button variant="outline" className="h-9 w-24">
                Close
              </Button>
            </div>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
