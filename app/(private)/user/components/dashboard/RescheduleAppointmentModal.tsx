import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export function RescheduleAppointmentModal() {
  const [selectedTime, setSelectedTime] = useState("12:00 AM");

  const timeSlots = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 AM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
    "12:00 PM",
  ];

  return (
    <DialogContent className="sm:max-w-225 p-0 overflow-hidden rounded-2xl">
      {/* Header */}
      <DialogHeader className="flex flex-row items-start justify-between px-5 sm:px-7 py-4 sm:py-5 border-b border-border">
        <div>
          <DialogTitle className="text-base sm:text-lg font-semibold ">
            Reschedule Appointment
          </DialogTitle>
          <p className="text-xs sm:text-sm text-[#637381] mt-1">
            Haircut & Styling
          </p>
        </div>
      </DialogHeader>

      {/* Body */}
      <div className="px-5 sm:px-7 py-5 sm:py-6 w-full overflow-y-auto max-h-[calc(90vh-80px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {/* LEFT - Calendar */}
          <div className="rounded-xl border">
            <div className="rounded-t-xl px-5 sm:px-6 py-4 text-sm font-semibold">
              Select Date
            </div>

            <div className="px-5 sm:px-6 py-5">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-5">
                <button className="p-2 rounded-md hover:bg-black/5 transition">
                  <ChevronLeft className="h-5 w-5 " />
                </button>

                <p className="text-sm font-semibold ">February 2026</p>

                <button className="p-2 rounded-md hover:bg-black/5 transition">
                  <ChevronRight className="h-5 w-5 " />
                </button>
              </div>

              {/* Week Days */}
              <div className="grid grid-cols-7 text-[11px] sm:text-xs font-medium text-[#637381] mb-3">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <p key={d} className="text-center">
                    {d}
                  </p>
                ))}
              </div>

              {/* Days */}
              <div className="grid grid-cols-7 gap-y-4 sm:gap-y-5 text-sm ">
                {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                  <button
                    key={day}
                    className={`h-9 w-9 sm:h-10 sm:w-10 mx-auto rounded-lg flex items-center justify-center transition
                      ${
                        day === 19
                          ? "bg-[#111827] text-white font-semibold"
                          : " hover:bg-black/5"
                      }
                      ${day < 8 ? "text-[#B0B7C3]" : ""}
                    `}
                  >
                    {String(day).padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT - Available Times */}
          <div className="rounded-xl border border-border overflow-hidden">
            <div className=" px-5 sm:px-6 py-4 text-sm font-semibold ">
              Available Times
            </div>

            <div className="px-5 sm:px-6 py-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`h-11 rounded-lg border text-sm font-medium transition
                      ${
                        selectedTime === time
                          ? "border-[#111827] "
                          : "border-border text-[#637381] hover:border-[#111827]/50"
                      }
                    `}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Left - Staff Select */}
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="bg-[#F4F6F8] dark:bg-black px-5 sm:px-6 py-4 text-sm font-semibold ">
              Select Staff
            </div>

            <div className="px-5 sm:px-6 py-5">
              <Select defaultValue="no-preference">
                <SelectTrigger className="h-11 rounded-lg border-border text-sm">
                  <SelectValue placeholder="Select staff" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="no-preference">No preference</SelectItem>
                  <SelectItem value="guy-hawkins">Guy Hawkins</SelectItem>
                  <SelectItem value="jacob-jones">Jacob Jones</SelectItem>
                  <SelectItem value="darrell-steward">
                    Darrell Steward
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bottom Right - Confirm Button */}
          <div className="flex items-end">
            <Button className="w-full h-12 rounded-lg bg-[#111827] hover:bg-[#0B1220] text-white font-semibold">
              Confirm Reschedule
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
