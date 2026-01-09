import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { TxStatus } from "./AllBookingHistory";
import { Card } from "@/components/ui/card";

// Status colors mapping
const statusStyles: Record<TxStatus, string> = {
  completed: "border-emerald-500 bg-emerald-50 text-emerald-700",
  cancel: "border-red-500 bg-red-50 text-red-600",
  pending: "border-amber-500 bg-amber-50 text-amber-700",
  confirm: "border-sky-500 bg-sky-50 text-sky-700",
};

const statusLabels: Record<TxStatus, string> = {
  completed: "Completed",
  cancel: "Cancelled",
  pending: "Pending",
  confirm: "Confirmed",
};

export default function BookingViewDetailDialogue({
  isOpen,
  onClose,
  booking,
  onChangeStatus,
}: {
  isOpen: boolean;
  onClose: () => void;
  booking: {
    customerName: string;
    email: string;
    phone: string;
    service: string;
    bookingID: string;
    date: string;
    status: TxStatus;
    price: string;
    staff: string;
  };
  onChangeStatus: (status: TxStatus) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle>View Details</DialogTitle>
          <DialogDescription>
            <div className="space-y-4">
              <Card className="p-4 border mt-2">
                <div>
                  <h3 className="font-semibold">Customer Information</h3>
                  <p className="py-1">Name: {booking.customerName}</p>
                  <p>Email: {booking.email}</p>
                  <p className="pt-1">Phone: {booking.phone}</p>
                </div>
              </Card>
              <div>
                <Card className="p-4 border mt-2">
                  <div className="font-semibold">Booking Information</div>
                  <p>Booking ID: {booking.bookingID}</p>
                  <p>Service: {booking.service}</p>
                  <p>Date & Time: {booking.date}</p>
                  <p>Duration: 30 min</p>
                  <p>Staff: {booking.staff}</p>
                  <p>Price: {booking.price}</p>
                  <div>
                    <span
                      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold border ${
                        statusStyles[booking.status]
                      }`}
                    >
                      {statusLabels[booking.status]}
                    </span>
                  </div>
                </Card>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div className="flex flex-col w-full gap-4">
            <div className="font-semibold">Change Status</div>
            <Select
              value={booking.status}
              onValueChange={(value) => onChangeStatus(value as TxStatus)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={statusLabels[booking.status]} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancel">Cancelled</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirm">Confirmed</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="w-full mt-4 cursor-pointer"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
