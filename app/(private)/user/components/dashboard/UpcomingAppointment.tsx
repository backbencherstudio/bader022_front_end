"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  CalendarDays,
  Clock,
  DollarSign,
  Phone,
  Check,
  Calendar,
  BadgeDollarSign,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { OrderDetailsDialog } from "./OrderDetailsModal";
import { CancelAppointmentModal } from "./CancelAppointmentModal";
import RescheduleAppointmentModal from "./RescheduleAppointmentModal";
import { useDashboardActivityQuery, useUpcommingQuery } from "@/redux/features/userDashboard/userDashboard";

// --------------------
// Types
// --------------------

type Activity = {
  title: string;
  time: string;
};

type DashboardActivityResponse = {
  success: boolean;
  data: Activity[];
};

type UpcomingBooking = {
  booking_date: string;
  booking_id: number;
  booking_time: string;
  service_id: number;
  merchant_category: string;
  merchant_phone: string;
  service_name: string;
  service_price: string;
  status: string;
  address?: string;
  bookingID?: number;
};

type UpcomingResponse = {
  success: boolean;
  data: UpcomingBooking;
  
};



export default function UpcomingAppointment() {
  const {
    data: upcomingData,
    isLoading: upcomingLoading,
  } = useUpcommingQuery({}) as {
    data?: UpcomingResponse;
    isLoading: boolean;
  };

  const booking = upcomingData?.data;

  const { data, isLoading, error } =
    useDashboardActivityQuery(undefined) as {
      data?: DashboardActivityResponse;
      isLoading: boolean;
      error?: unknown;
    
    };

  const [orderOpen, setOrderOpen] = useState<boolean>(false);
  const [rescheduleOpen, setRescheduleOpen] = useState<boolean>(false);
  const [cancelOpen, setCancelOpen] = useState<boolean>(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);

  // Safe fallback empty array
  const activities: Activity[] = data?.data ?? [];

  const getIcon = (title: string) => {
    if (title.toLowerCase().includes("cancel")) return <X size={22} />;
    if (title.toLowerCase().includes("reschedule")) return <Calendar size={22} />;
    if (title.toLowerCase().includes("payment")) return <BadgeDollarSign size={22} />;
    return <Check size={22} />;
  };

  return (
    <div className="my-3">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT CARD */}
        <Card className="lg:col-span-2 rounded-[18px] px-4 md:px-8 py-7 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
          <div className="flex items-start justify-between">
            <h2 className="text-[26px] font-semibold text-black dark:text-white">
              Upcoming Appointment
            </h2>
            <span className="px-6 py-2 rounded-[10px] border border-green-500 text-green-600 font-semibold text-[16px] bg-green-50">
              {booking?.status}
            </span>
          </div>

          <h3 className="text-[20px] font-semibold">{booking?.service_name}</h3>

          <div className="space-y-4 text-[18px] text-gray-600 mt-4">
            <div className="flex items-center gap-4 text-black dark:text-white">
              <MapPin size={22} /> {booking?.address}
            </div>
            <div className="flex items-center gap-4 text-black dark:text-white">
              <CalendarDays size={22} />
              {booking?.booking_date}
            </div>
            <div className="flex items-center gap-4 text-black dark:text-white">
              <Clock size={22} />
              {booking?.booking_time}
            </div>
            <div className="flex items-center gap-4 text-black dark:text-white">
              <DollarSign size={22} />
              {booking?.service_price} SAR
            </div>
            <div className="flex items-center gap-4 text-black dark:text-white">
              <Phone size={22} />
              {booking?.merchant_phone}
            </div>
          </div>

          <Button className="cursor-pointer"
            onClick={() => {
              if (booking?.booking_id) {
                setSelectedBookingId(booking.booking_id);
                setOrderOpen(true);
              }
            }}
          >
            View Order Details
          </Button>
        </Card>

        {/* RIGHT CARD */}
        <Card className="rounded-[18px] px-7 py-7 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
          <h2 className="text-[22px] font-semibold text-black dark:text-white">
            Recent Activity
          </h2>

          <div className="space-y-7 mt-6">
            {isLoading && <p className="text-gray-400 text-sm">Loading activity...</p>}
            {!isLoading && activities.length === 0 && <p className="text-gray-400 text-sm">No recent activity found</p>}
            {activities.map((item: Activity, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[14px] flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                    {getIcon(item.title)}
                  </div>
                  <p className="text-[16px] font-medium text-black dark:text-white">{item.title}</p>
                </div>
                <p className="text-[14px] text-gray-400">{item.time}</p>
              </div>
            ))}
          </div>
        </Card>

       
      </div>

      {/* Dialogs */}
      <Dialog open={orderOpen} onOpenChange={setOrderOpen}>
        <OrderDetailsDialog
          booking_id={selectedBookingId}
          onReschedule={() => {
            setOrderOpen(false);
            setTimeout(() => {
              setRescheduleOpen(true);
            }, 150);
          }}
          onCancel={() => {
            setOrderOpen(false);
            setTimeout(() => {
              setCancelOpen(true);
            }, 150);
          }}
        />
      </Dialog>

      {/* Reschedule Modal */}
      <Dialog open={rescheduleOpen} onOpenChange={setRescheduleOpen}>
        <DialogContent style={{ maxWidth: '70rem' }}> 
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <h3 className="text-[20px] font-semibold">{booking?.service_name}</h3>
          </DialogHeader>

          <RescheduleAppointmentModal
            bookingId={selectedBookingId!}
            serviceId={booking?.service_id!}
            currentDate={booking?.booking_date}
            onConfirm={(newDate, newTime, selectedStaff) => {
              console.log("Reschedule Confirmed:", newDate, newTime, selectedStaff);
              setRescheduleOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Cancel Appointment Modal */}
      <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <CancelAppointmentModal
          bookingID={selectedBookingId!}
          onClose={() => setCancelOpen(false)}
          onCancelSuccess={() => {
            // refetchBookings();
          }}
        />
      </Dialog>
    </div>
  );
}