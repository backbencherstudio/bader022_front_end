"use client";

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

export default function UpcomingAppointment() {
  const activities = [
    {
      icon: <Check className="text-green-500" size={22} />,
      bg: "bg-green-50",
      title: "Appointment booked",
      time: "2 minutes ago",
    },
    {
      icon: <Calendar className="text-blue-600" size={22} />,
      bg: "bg-blue-50",
      title: "Appointment rescheduled",
      time: "10 minutes ago",
    },
    {
      icon: <BadgeDollarSign className="text-orange-500" size={22} />,
      bg: "bg-orange-50",
      title: "Payment completed - 100 SAR",
      time: "5 minutes ago",
    },
    {
      icon: <X className="text-red-500" size={22} />,
      bg: "bg-red-50",
      title: "Appointment cancelled",
      time: "12 minutes ago",
    },
  ];

  return (
    <div className="my-3">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT CARD (Upcoming Appointment) */}
        <Card className="lg:col-span-2 rounded-[18px] border border-gray-200 shadow-sm px-4 md:px-8 py-7">
          <div className="flex items-start justify-between">
            <h2 className="text-[26px] font-semibold text-[#111827]">
              Upcoming Appointment
            </h2>

            {/* Status Badge */}
            <span className="px-6 py-2 rounded-[10px] border border-green-500 text-green-600 font-semibold text-[16px] bg-green-50">
              Confirmed
            </span>
          </div>

          <h3 className="text-[20px] font-semibold text-[#111827]">
            Hair Styling & Treatment
          </h3>

          {/* Info List */}
          <div className="space-y-4 text-[18px] text-gray-600">
            <div className="flex items-center gap-4">
              <MapPin size={22} className="text-[#111827]" />
              Bella Beauty Salon
            </div>
            <div className="flex items-center gap-4">
              <CalendarDays size={22} className="text-[#111827]" />
              December 15, 2025
            </div>
            <div className="flex items-center gap-4">
              <Clock size={22} className="text-[#111827]" />
              2:00 PM
            </div>
            <div className="flex items-center gap-4">
              <DollarSign size={22} className="text-[#111827]" />
              109 SAR
            </div>
            <div className="flex items-center gap-4">
              <Phone size={22} className="text-[#111827]" />
              +1 (555) 123-4567
            </div>
          </div>

          {/* Button */}
          <Button className="cursor-pointer py-6">View Details</Button>
        </Card>

        {/* ✅ RIGHT CARD (Recent Activity) */}
        <Card className="rounded-[18px] border border-gray-200 shadow-sm px-7 py-7">
          <h2 className="text-[22px] font-semibold text-[#111827]">
            Recent Activity
          </h2>

          <div className="space-y-7">
            {activities.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Icon Box */}
                  <div
                    className={`w-12 h-12 rounded-[14px] flex items-center justify-center ${item.bg}`}
                  >
                    {item.icon}
                  </div>

                  <p className="text-[16px] font-medium text-[#111827]">
                    {item.title}
                  </p>
                </div>

                <p className="text-[14px] text-gray-400">{item.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
