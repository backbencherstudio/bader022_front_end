"use client";

import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useOrderDetailsQuery } from "@/redux/features/userDashboard/userDashboard";

export function OrderDetailsDialog({
  booking_id,
  onReschedule,
  onCancel,
}: {
  booking_id: number | null;
  onReschedule: (serviceId: number) => void;
  onCancel: () => void;
}) {
  const { data, isLoading, error } = useOrderDetailsQuery(booking_id!, {
    skip: !booking_id,
  });

  const bookingData = data?.data;

  if (isLoading) {
    return (
      <DialogContent className="p-6">
        <p>Loading...</p>
      </DialogContent>
    );
  }

  if (error || !bookingData) {
    return (
      <DialogContent className="p-6">
        <p className="text-red-500">Failed to load order details.</p>
      </DialogContent>
    );
  }

  const { merchant_info, booking_info } = bookingData;

  // Extracting service_id from booking_info
  const serviceId = booking_info.service_id;
  console.log(serviceId,"fddddddddddddddddddddd")

  return (
    <DialogContent className="p-0 max-h-[600px] w-full overflow-y-auto rounded-2xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
      {/* Header */}
      <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-border">
        <DialogTitle className="text-base font-semibold">Order Details</DialogTitle>
      </DialogHeader>

      {/* Body */}
      <div className="px-6 py-5 space-y-6">
        {/* Merchant Information */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Merchant Information</h3>
          <div className="rounded-xl border border-border px-5 py-4 space-y-3 text-sm">
            <p>
              Merchant name: <span className="font-medium">{merchant_info.merchant_name}</span>
            </p>
            <p>
              Location: <span className="font-medium">{merchant_info.location}</span>
            </p>
            <p>
              Phone: <span className="font-medium">{merchant_info.phone}</span>
            </p>
          </div>
        </div>

        {/* Booking Information */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Booking Information</h3>
          <div className="rounded-xl border border-border px-5 py-4 space-y-4 text-sm">
            <div className="flex items-center justify-between gap-4">
              <p>Booking ID:</p>
              <p className="font-medium text-right">{booking_info.booking_id}</p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p>Service:</p>
              <p className="font-medium text-right">{booking_info.service_name}</p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p>Date & Time:</p>
              <p className="font-medium text-right">{booking_info.date_time}</p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p>Duration:</p>
              <p className="font-medium text-right">{booking_info.duration} min</p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p>Staff:</p>
              <p className="font-medium text-right">{booking_info.staff_name}</p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p>Price:</p>
              <p className="font-medium text-right">{booking_info.price} SAR</p>
            </div>

            {/* Payment Status */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <p>Payment Status:</p>
              <span className="inline-flex items-center justify-center rounded-md border border-[#22C55E] px-4 py-1 text-sm font-medium text-[#15803D]">
                {booking_info.payment_status}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-row flex-wrap gap-4 justify-between pt-2">
          <Button
            className="mt-4"
            onClick={() => onReschedule(serviceId)} 
          >
            Reschedule Appointment {serviceId}
          </Button>

          <Button
            onClick={onCancel}
            variant="outline"
            className="cursor-pointer py-5"
          >
            Cancel Booking
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}