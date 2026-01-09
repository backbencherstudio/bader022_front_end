import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function OrderDetailsDialog({
  onReschedule,
  onCancel,
}: {
  onReschedule: () => void;
  onCancel: () => void;
}) {
  return (
    <DialogContent className="p-0 overflow-auto rounded-2xl">
      {/* Header */}
      <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-border">
        <DialogTitle className="text-base font-semibold">
          Order Details
        </DialogTitle>
      </DialogHeader>

      {/* Body */}
      <div className="px-6 py-5 space-y-6 ">
        {/* Merchant Information */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Merchant Information</h3>

          <div className="rounded-xl border border-border px-5 py-4 space-y-3 text-sm">
            <p>
              Merchant name:{" "}
              <span className="font-medium">Luxe Hair Salon</span>
            </p>
            <p>
              Location:{" "}
              <span className="font-medium">
                123 Main St, New York, NY 10001
              </span>
            </p>
            <p>
              Phone: <span className="font-medium">+1 (555) 123-4567</span>
            </p>
          </div>
        </div>

        {/* Booking Information */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Booking Information</h3>

          <div className="rounded-xl border border-border px-5 py-4 space-y-4 text-sm">
            {[
              ["Booking ID:", "BK-001"],
              ["Service:", "Haircut & Styling"],
              ["Date & Time:", "2025-11-30 10:00 AM"],
              ["Duration:", "30 min"],
              ["Staff:", "Emma Wilson"],
              ["Price:", "109 SAR"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4"
              >
                <p>{label}</p>
                <p className="font-medium text-right">{value}</p>
              </div>
            ))}

            {/* Payment Status */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <p>Payment Status:</p>

              <span className="inline-flex items-center justify-center rounded-md border border-[#22C55E] px-4 py-1 text-sm font-medium text-[#15803D]">
                Confirmed
              </span>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <DialogFooter className="flex flex-row flex-wrap gap-4 justify-between pt-2">
          <Button onClick={onReschedule} className="cursor-pointer py-5">
            Reschedule Appointment
          </Button>

          <Button
            onClick={onCancel}
            variant="outline"
            className="cursor-pointer py-5"
          >
            Cancel Booking
          </Button>
        </DialogFooter>
      </div>
    </DialogContent>
  );
}
