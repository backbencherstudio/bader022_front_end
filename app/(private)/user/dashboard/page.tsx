import React from "react";
import UpcomingAppointment from "../components/dashboard/UpcomingAppointment";
import AllBookingHistory from "../../merchant/dashboard/components/bookings/AllBookingHistory";

export default function page() {
  return (
    <div>
      <UpcomingAppointment />
      <div className="mt-6">
        <AllBookingHistory />
      </div>
    </div>
  );
}
