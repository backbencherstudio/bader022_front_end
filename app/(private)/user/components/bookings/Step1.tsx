import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Step1({ onNext }: { onNext: () => void }) {
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
    <Card className="rounded-2xl border border-border p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        {/* Calendar */}
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="bg-[#F4F6F8] px-5 sm:px-6 py-4 font-semibold text-sm">
            Select Date
          </div>
          <div className="p-5 sm:p-6">
            {/* Static Calendar UI */}
            <div className="flex justify-between items-center mb-4">
              <button className="px-3 py-2 rounded-md hover:bg-black/5 transition">{`<`}</button>
              <p className="font-semibold text-sm">February 2026</p>
              <button className="px-3 py-2 rounded-md hover:bg-black/5 transition">{`>`}</button>
            </div>

            <div className="grid grid-cols-7 text-xs font-medium text-[#637381] mb-3">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <p key={d} className="text-center">
                  {d}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-4 sm:gap-y-5 text-sm">
              {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                <button
                  key={day}
                  className={cn(
                    "h-9 w-9 sm:h-10 sm:w-10 mx-auto rounded-lg flex items-center justify-center transition",
                    day === 19
                      ? "bg-[#111827] text-white font-semibold"
                      : "hover:bg-black/5",
                    day < 8 && "text-[#B0B7C3]"
                  )}
                >
                  {String(day).padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Available Times */}
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="bg-[#F4F6F8] px-5 sm:px-6 py-4 font-semibold text-sm">
            Available Times
          </div>
          <div className="p-5 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={cn(
                    "h-11 rounded-lg border text-sm font-medium transition",
                    selectedTime === time
                      ? "border-[#111827] text-[#0B1220]"
                      : "border-border text-[#637381] hover:border-[#111827]/50"
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Staff Select */}
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="bg-[#F4F6F8] px-5 sm:px-6 py-4 font-semibold text-sm">
            Select Staff
          </div>
          <div className="p-5 sm:p-6">
            <Select defaultValue="no-preference">
              <SelectTrigger className="h-11 rounded-lg">
                <SelectValue placeholder="Select staff" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-preference">No preference</SelectItem>
                <SelectItem value="guy-hawkins">Guy Hawkins</SelectItem>
                <SelectItem value="jacob-jones">Jacob Jones</SelectItem>
                <SelectItem value="darrell-steward">Darrell Steward</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-end">
          <Button
            onClick={onNext}
            className="w-full h-12 rounded-lg bg-[#111827] hover:bg-[#0B1220]"
          >
            Continue to Checkout
          </Button>
        </div>
      </div>
    </Card>
  );
}
