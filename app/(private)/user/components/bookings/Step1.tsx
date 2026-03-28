"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

import {
  useBookingTimeDateQuery,
  useSelectStaffQuery,
} from "@/redux/features/userDashboard/booking";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Step1Props {
  onNext: () => void;
  onBack: () => void;

  duration: string | number;
  price: number;
  serviceId: number;
  serviceName: string;

  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;

  selectedTime: string;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
}

export default function Step1({
  onNext,
  onBack,
  serviceId,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}: Step1Props) {
  const [staffId, setStaffId] = useState<string>("");

  // Ensure date is always a Date object
  const formattedDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString("en-CA")
    : new Date().toLocaleDateString("en-CA");

  // Get available times
  const { data, isLoading } = useBookingTimeDateQuery(
    { service_id: serviceId, date: formattedDate },
    { skip: !(serviceId && formattedDate) },
  );

  const timeSlots = data?.available_times || [];

  const noAvailableSlot = data?.message || "";

  // console.log(data);

  // Get staff based on selected time
  const { data: staffData } = useSelectStaffQuery(
    {
      service_id: serviceId,
      date: formattedDate,
      time: selectedTime,
    },
    {
      skip: !selectedTime,
    },
  );

  const [noSlot, setNoSlot] = useState(false);
  useEffect(() => {
    if (!isLoading) {
      if (timeSlots.length === 0) {
        setNoSlot(true);
      } else {
        setNoSlot(false);
      }
    }
  }, [timeSlots, isLoading]);

  const staffs = staffData?.available_staff || [];

  return (
    <Card className="rounded-2xl p-4 sm:p-6 border shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="border rounded-xl overflow-hidden">
          <div className="bg-gray-100 px-5 py-4 font-semibold">Select Date</div>

          <div className="p-5">
            <Calendar
              mode="single"
              selected={selectedDate ? new Date(selectedDate) : new Date()}
              // onSelect={(newDate) => setSelectedDate(newDate.toLocaleDateString('en-CA'))}
              onSelect={(newDate) =>
                newDate && setSelectedDate(newDate.toLocaleDateString("en-CA"))
              }
              className="w-full"
            />
          </div>
        </div>

        {/* Time Slots */}
        <div className="border rounded-xl overflow-hidden">
          <div className="bg-gray-100 px-5 py-4 font-semibold">
            Available Times
          </div>

          <div className="p-5 sm:p-6">
            {isLoading ? (
              <p>Loading...</p>
            ) : noSlot ? (
              <p className="text-red-500 font-medium">
                {/* No slots available for this date */}
                {noAvailableSlot}
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {timeSlots.map((time: string) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "h-11 rounded-lg border text-sm font-medium transition",
                      selectedTime === time
                        ? "border-[#111827] text-[#0B1220]"
                        : "border-border text-[#637381]",
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Staff */}
        <div className="border rounded-xl overflow-hidden">
          <div className="bg-gray-100 px-5 py-4 font-semibold">
            Select Staff
          </div>

          <div className="p-5">
            <Select onValueChange={(value) => setStaffId(value)}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select staff" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="no-preference">No preference</SelectItem>

                {staffs.length === 0 ? (
                  <SelectItem value="no-staff">No staff available</SelectItem>
                ) : (
                  staffs.map((staff: any) => (
                    <SelectItem key={staff.id} value={String(staff.id)}>
                      {staff.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-end gap-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>

          <Button
            className="cursor-pointer"
            onClick={onNext}
            disabled={!selectedDate || !selectedTime}
          >
            Continue to Checkout
          </Button>
        </div>
      </div>
    </Card>
  );
}
