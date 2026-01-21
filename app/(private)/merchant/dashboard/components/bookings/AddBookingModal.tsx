"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { Check } from "lucide-react";

const defaultValues = {
  customer: "",
  staff: "Ahmed",
  service: "Haircut & Styling",
  price: 50,
  duration: 60,
  date: "",
  time: "",
};

export default function AddBookingModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}) {
  const { control, handleSubmit } = useForm({ defaultValues });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          max-w-3xl
          max-h-[90vh]
          overflow-y-auto
          p-0
        "
      >
        {/* ================= HEADER ================= */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle>Add New Booking</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Auto-checks availability and conflicts
          </p>
        </DialogHeader>

        {/* ================= BODY ================= */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* ---------- LEFT FORM ---------- */}
              <div className="md:col-span-2 space-y-4">
                {/* Customer */}
                <div>
                  <label className="text-[16px] font-medium">Customer</label>
                  <Controller
                    name="customer"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Search customer or enter name"
                        className="mt-2"
                      />
                    )}
                  />
                  <button type="button" className="text-sm text-blue-600 mt-1">
                    + New customer
                  </button>
                </div>

                {/* Staff */}
                <div>
                  <label className="text-[16px] font-medium">Staff</label>
                  <Controller
                    name="staff"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ahmed">Ahmed</SelectItem>
                          <SelectItem value="Sarah">Sarah</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Service Card */}
                <h1 className="text-[16px] font-medium">Service</h1>
                <div className="border rounded-lg p-4 bg-muted/30">
                  <p className="font-medium">Haircut & Styling</p>
                  <p className="text-sm text-muted-foreground">$50 · 60 min</p>
                  <button type="button" className="text-sm text-blue-600 mt-1">
                    Override price & duration
                  </button>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[16px] font-medium">Date</label>
                    <Controller
                      name="date"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} type="date" className="mt-2" />
                      )}
                    />
                  </div>

                  <div>
                    <label className="text-[16px] font-medium">Time</label>
                    <Controller
                      name="time"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} type="time" className="mt-2" />
                      )}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Ends at 12:30 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* ---------- RIGHT AVAILABILITY ---------- */}
              <div className="border rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <p className="font-semibold text-xl mb-4">Availability</p>
                <Check className="h-14 w-14 text-white rounded-full bg-green-500 p-2" />
                <p className="font-semibold text-xl mt-4">Available</p>

                <p className="text-sm text-muted-foreground mt-4">
                  Suggested times
                </p>

                <div className="flex gap-2 mt-2 flex-wrap justify-center">
                  <Button type="button" variant="secondary" size="sm">
                    10:00 AM
                  </Button>
                  <Button type="button" variant="secondary" size="sm">
                    12:00 PM
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* ================= FOOTER ================= */}
          <DialogFooter className="px-6 py-4 border-t flex gap-3 justify-end">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Booking</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
