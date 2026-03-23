import React from "react";
import UpcomingAppointment from "../components/dashboard/UpcomingAppointment";
import BookingHistory from "../components/dashboard/BookingHistory";

export default function page() {
  return (
    <div>
      <UpcomingAppointment />
      <div className="mt-6">
        <BookingHistory />
      </div>
    </div>
  );
}
