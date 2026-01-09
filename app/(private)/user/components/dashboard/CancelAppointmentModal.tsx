import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function CancelAppointmentModal() {
  return (
    <DialogContent className="p-0 overflow-auto rounded-2xl">
      {/* Header */}
      <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-border">
        <DialogTitle className="text-base font-semibold">
          Cancel Appointment?
        </DialogTitle>
      </DialogHeader>

      {/* Body */}
      <div className="px-6 space-y-5">
        <div className="text-sm  leading-6">
          <p>Are you sure you want to cancel this booking?</p>
          <p>This action cannot be undone.</p>
        </div>

        {/* Booking Info Box */}
        <div className="rounded-xl border border-border px-6 py-5 space-y-3 text-sm ">
          <div className="flex items-center gap-2">
            <p>Service:</p>
            <p className="font-medium">Haircut & Styling</p>
          </div>

          <div className="flex items-center gap-2">
            <p>Date:</p>
            <p className="font-medium">Dec 20, 2025</p>
          </div>

          <div className="flex items-center gap-2">
            <p>Time:</p>
            <p className="font-medium">10:00 AM</p>
          </div>
        </div>

        {/* Note Box */}
        <div className="rounded-xl border border-[#FACC15] bg-[#FFFBEB] px-6 py-4 text-sm text-[#92400E]">
          <span className="font-semibold">Note:</span> Cancellation policies may
          apply. Please check with the merchant for refund details.
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center flex-wrap gap-4 p-4">
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer py-5">
              Keep Booking
            </Button>
          </DialogClose>

          <Button className="cursor-pointer py-5">Confirm Cancel</Button>
        </div>
      </div>
    </DialogContent>
  );
}
