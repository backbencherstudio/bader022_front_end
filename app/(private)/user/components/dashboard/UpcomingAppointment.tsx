// "use client";

// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// import {
//   MapPin,
//   CalendarDays,
//   Clock,
//   DollarSign,
//   Phone,
//   Check,
//   Calendar,
//   BadgeDollarSign,
//   X,
// } from "lucide-react";
// import { Dialog, DialogTrigger } from "@/components/ui/dialog";
// import { OrderDetailsDialog } from "./OrderDetailsModal";

// export default function UpcomingAppointment() {
//   const activities = [
//     {
//       icon: <Check size={22} />,
//       title: "Appointment booked",
//       time: "2 minutes ago",
//     },
//     {
//       icon: <Calendar size={22} />,
//       title: "Appointment rescheduled",
//       time: "10 minutes ago",
//     },
//     {
//       icon: <BadgeDollarSign size={22} />,
//       title: "Payment completed - 100 SAR",
//       time: "5 minutes ago",
//     },
//     {
//       icon: <X size={22} />,
//       title: "Appointment cancelled",
//       time: "12 minutes ago",
//     },
//   ];

//   return (
//     <div className="my-3">
//       <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* LEFT CARD (Upcoming Appointment) */}

//         <Card className="lg:col-span-2 rounded-[18px] border border-gray-200 shadow-sm px-4 md:px-8 py-7">
//           <div className="flex items-start justify-between">
//             <h2 className="text-[26px] font-semibold text-black dark:text-white">
//               Upcoming Appointment
//             </h2>

//             {/* Status Badge */}
//             <span className="px-6 py-2 rounded-[10px] border border-green-500 text-green-600 font-semibold text-[16px] bg-green-50">
//               Confirmed
//             </span>
//           </div>

//           <h3 className="text-[20px] font-semibold text-black dark:text-white">
//             Hair Styling & Treatment
//           </h3>

//           {/* Info List */}
//           <div className="space-y-4 text-[18px] text-gray-600">
//             <div className="flex items-center gap-4 text-black dark:text-white">
//               <MapPin size={22} className="text-black dark:text-white" />
//               Bella Beauty Salon
//             </div>
//             <div className="flex items-center gap-4 text-black dark:text-white">
//               <CalendarDays size={22} className="text-black dark:text-white" />
//               December 15, 2025
//             </div>
//             <div className="flex items-center gap-4 text-black dark:text-white">
//               <Clock size={22} className="text-black dark:text-white" />
//               2:00 PM
//             </div>
//             <div className="flex items-center gap-4 text-black dark:text-white">
//               <DollarSign size={22} className="text-black dark:text-white" />
//               109 SAR
//             </div>
//             <div className="flex items-center gap-4 text-black dark:text-white">
//               <Phone size={22} className="text-black dark:text-white" />
//               +1 (555) 123-4567
//             </div>
//           </div>
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button className="cursor-pointer py-5">
//                 View Order Details
//               </Button>
//             </DialogTrigger>
//             <OrderDetailsDialog />
//           </Dialog>
//           {/* Button */}
//         </Card>

//         {/* ✅ RIGHT CARD (Recent Activity) */}
//         <Card className="rounded-[18px] border border-gray-200 shadow-sm px-7 py-7">
//           <h2 className="text-[22px] font-semibold text-black dark:text-white">
//             Recent Activity
//           </h2>

//           <div className="space-y-7">
//             {activities.map((item, index) => (
//               <div key={index} className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   {/* Icon Box */}
//                   <div
//                     className={`w-12 h-12 rounded-[14px] flex items-center justify-center`}
//                   >
//                     {item.icon}
//                   </div>

//                   <p className="text-[16px] font-medium text-black dark:text-white">
//                     {item.title}
//                   </p>
//                 </div>

//                 <p className="text-[14px] text-gray-400">{item.time}</p>
//               </div>
//             ))}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }

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

import { Dialog } from "@/components/ui/dialog";
import { OrderDetailsDialog } from "./OrderDetailsModal";
import { CancelAppointmentModal } from "./CancelAppointmentModal";
import { RescheduleAppointmentModal } from "./RescheduleAppointmentModal";

export default function UpcomingAppointment() {
  const [orderOpen, setOrderOpen] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  const activities = [
    {
      icon: <Check size={22} />,
      title: "Appointment booked",
      time: "2 minutes ago",
    },
    {
      icon: <Calendar size={22} />,
      title: "Appointment rescheduled",
      time: "10 minutes ago",
    },
    {
      icon: <BadgeDollarSign size={22} />,
      title: "Payment completed - 100 SAR",
      time: "5 minutes ago",
    },
    {
      icon: <X size={22} />,
      title: "Appointment cancelled",
      time: "12 minutes ago",
    },
  ];

  return (
    <div className="my-3">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT CARD */}
        <Card className="lg:col-span-2 rounded-[18px] border border-gray-200 shadow-sm px-4 md:px-8 py-7">
          <div className="flex items-start justify-between">
            <h2 className="text-[26px] font-semibold text-black dark:text-white">
              Upcoming Appointment
            </h2>

            <span className="px-6 py-2 rounded-[10px] border border-green-500 text-green-600 font-semibold text-[16px] bg-green-50">
              Confirmed
            </span>
          </div>

          <h3 className="text-[20px] font-semibold text-black dark:text-white">
            Hair Styling & Treatment
          </h3>

          <div className="space-y-4 text-[18px] text-gray-600 mt-4">
            <div className="flex items-center gap-4 text-black dark:text-white">
              <MapPin size={22} /> Bella Beauty Salon
            </div>
            <div className="flex items-center gap-4 text-black dark:text-white">
              <CalendarDays size={22} /> December 15, 2025
            </div>
            <div className="flex items-center gap-4 text-black dark:text-white">
              <Clock size={22} /> 2:00 PM
            </div>
            <div className="flex items-center gap-4 text-black dark:text-white">
              <DollarSign size={22} /> 109 SAR
            </div>
            <div className="flex items-center gap-4 text-black dark:text-white">
              <Phone size={22} /> +1 (555) 123-4567
            </div>
          </div>

          {/* ✅ View Order Button */}
          <Button
            className="cursor-pointer py-5 mt-6"
            onClick={() => setOrderOpen(true)}
          >
            View Order Details
          </Button>
        </Card>

        {/* RIGHT CARD */}
        <Card className="rounded-[18px] border border-gray-200 shadow-sm px-7 py-7">
          <h2 className="text-[22px] font-semibold text-black dark:text-white">
            Recent Activity
          </h2>

          <div className="space-y-7 mt-6">
            {activities.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[14px] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <p className="text-[16px] font-medium text-black dark:text-white">
                    {item.title}
                  </p>
                </div>
                <p className="text-[14px] text-gray-400">{item.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ✅ Order Details Dialog */}
      <Dialog open={orderOpen} onOpenChange={setOrderOpen}>
        <OrderDetailsDialog
          onReschedule={() => {
            setOrderOpen(false);
            setTimeout(() => setRescheduleOpen(true), 150);
          }}
          onCancel={() => {
            setOrderOpen(false);
            setTimeout(() => setCancelOpen(true), 150);
          }}
        />
      </Dialog>

      {/* ✅ Reschedule Dialog */}
      <Dialog open={rescheduleOpen} onOpenChange={setRescheduleOpen}>
        <RescheduleAppointmentModal />
      </Dialog>

      {/* ✅ Cancel Dialog */}
      <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <CancelAppointmentModal />
      </Dialog>
    </div>
  );
}
