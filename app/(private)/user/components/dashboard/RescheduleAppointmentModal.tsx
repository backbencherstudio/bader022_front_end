"use client";

import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useUseRescheduleAppointmentMutation,
  useSheduleQuery,
  useSheduleStaffQuery,
} from "@/redux/features/userDashboard/userDashboard";
import { toast } from "sonner";

interface RescheduleProps {
  serviceId: number;
  bookingId: number;
  currentDate?: string;
  bookingTime?:string
  staffName?:string
  onConfirm: (newDate: string, newTime: string, selectedStaff: string) => void;
}

export default function RescheduleAppointmentModal({
  serviceId,
  bookingId,
  currentDate,
  bookingTime,
  staffName,
  onConfirm,
}: RescheduleProps) {

  const [selectedDate, setSelectedDate] = useState(currentDate || "");
  const [dateObj, setDateObj] = useState<Date>(
    // currentDate ? new Date(currentDate) : 
    new Date()
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");

  // console.log(dateObj);
  
  const formattedDate = selectedDate
    ? new Date(selectedDate).toISOString().split("T")[0]
    : "";

  // const formattedDate = dateObj.toLocaleDateString("en-CA");
  // schedule api
  const { data, isLoading } = useSheduleQuery(
    { service_id: serviceId, date: formattedDate },
    // { skip: !formattedDate }
  );
 console.log(formattedDate);
 
  const timeSlots = data?.available_times || [];

  console.log(data);

  // staff api
  const { data: staffData } = useSheduleStaffQuery(
    { service_id: serviceId, date: formattedDate, time: selectedTime },
    { skip: !selectedTime }
  );

  
  

  const staffs = staffData?.available_staff || [];

  // mutation
  const [reschedule, { isLoading: isRescheduleLoading }] =
    useUseRescheduleAppointmentMutation();

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;

    setDateObj(date);
    // setSelectedDate(date.toISOString().split("T")[0]);
    const localDate = date.toLocaleDateString("en-CA");
    setSelectedDate(localDate);
    setSelectedTime("");
  };

  const handleRescheduleConfirm = async () => {
    if (!selectedDate || !selectedTime || !selectedStaff) {
      alert("Please select a valid date, time, and staff");
      return;
    }

    try {
      await reschedule({
        booking_id: bookingId,
        date: selectedDate,
        time: selectedTime,
        staff_id: selectedStaff
      }).unwrap();

      onConfirm(selectedDate, selectedTime, selectedStaff);
      toast.success("Appointment rescheduled successfully");
    } catch (err) {
      console.log("Reschedule Error:", err);
      // alert("Error: " + (err.message || "Failed to reschedule"));
    }
  };

  return (
    <div className="rounded-2x p-1 space-y-6 ]">

      <div className="flex flex-col lg:flex-row gap-6 w-full">

        {/* Calendar */}
        <div className="flex-1 outline outline-[#E5E7EB] p-4 rounded-2xl w-full">

          <h3 className="font-semibold mb-2">Select New Date</h3>

          <Calendar
            className=" w-full"
            mode="single"
            selected={dateObj}
            onSelect={handleDateChange}
          />

          <div className="mt-4 outline outline-[#E5E7EB] p-2 rounded-lg">

            <h3 className="font-semibold mb-2 bg-gray-100 p-2 rounded-t-lg mb-4">Select Staff</h3>

            <Select onValueChange={setSelectedStaff}>

              <SelectTrigger>
                <SelectValue placeholder="Select Staff" />
              </SelectTrigger>

              <SelectContent>

                {staffs.map((staff:any) => (
                  <SelectItem key={staff.id} value={String(staff.id)}>
                    {staff.name}
                  </SelectItem>
                ))}

              </SelectContent>
            </Select>

          </div>
        </div>

        {/* Time Slots */}
        <div className="flex flex-col gap-5 outline outline-[#E5E7EB] p-4 rounded-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Selected Date</h3>
                  <button className="w-full border rounded-md p-2 text-left">
                    {currentDate}
                  </button>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Selected Time</h3>
                  <button className="w-full border rounded-md p-2 text-left">
                    {bookingTime}
                  </button>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Selected Staff</h3>
                  <button className="w-full border rounded-md p-2 text-left">
                    {staffName}
                  </button>
                </div>
              </div>
          <div>
            <h3 className="font-semibold mb-2">Available Times</h3>

            {timeSlots.length === 0 ? <div><p className="text-red-500">{data?.message || "Selected date is in the past"}</p></div>: <div>{isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="grid grid-cols-2 gap-2">

                {timeSlots.map((time:any) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "h-10 rounded-lg border",
                      selectedTime === time && "bg-gray-200"
                    )}
                  >
                    {time}
                  </button>
                ))}

              </div>
            )}</div>}


          </div>

          <Button
            className="mt-4"
            disabled={!selectedTime || !selectedStaff || isRescheduleLoading}
            onClick={handleRescheduleConfirm}
          >
            {isRescheduleLoading ? "Rescheduling..." : "Confirm Reschedule"}
          </Button>

        </div>
      </div>
    </div>
  );
}