// // "use client";

// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogFooter,
// // } from "@/components/ui/dialog";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import {
// //   Select,
// //   SelectTrigger,
// //   SelectContent,
// //   SelectItem,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { useForm, Controller } from "react-hook-form";
// // import { Check } from "lucide-react";
// // import { useAllStaffQuery } from "@/redux/features/merchant/staffApi";
// // import { useAllServicesQuery } from "@/redux/features/merchant/servicesApi";

// // const defaultValues = {
// //   customer: "",
// //   staff: "Ahmed",
// //   service: "Haircut & Styling",
// //   price: 50,
// //   duration: 60,
// //   date: "",
// //   time: "",
// // };

// // export default function AddBookingModal({
// //   isOpen,
// //   onClose,
// //   onSubmit,
// // }: {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onSubmit: (data: any) => void;
// // }) {
// //   const { control, handleSubmit } = useForm({ defaultValues });

// //   const { data: staffData, isLoading, isError } = useAllStaffQuery({});
// //   const {
// //     data: servicesData,
// //     isLoading: isServicesLoading,
// //     isError: isServicesError,
// //   } = useAllServicesQuery({});

// //   console.log({ staffData });
// //   console.log({ servicesData });

// //   return (
// //     <Dialog open={isOpen} onOpenChange={onClose}>
// //       <DialogContent
// //         className="
// //           max-w-3xl
// //           max-h-[90vh]
// //           overflow-y-auto
// //           p-0
// //         "
// //       >
// //         {/* ================= HEADER ================= */}
// //         <DialogHeader className="px-6 pt-6 pb-4 border-b">
// //           <DialogTitle>Add New Booking</DialogTitle>
// //           <p className="text-sm text-muted-foreground">
// //             Auto-checks availability and conflicts
// //           </p>
// //         </DialogHeader>

// //         {/* ================= BODY ================= */}
// //         <form onSubmit={handleSubmit(onSubmit)}>
// //           <div className="px-6 py-4">
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //               {/* ---------- LEFT FORM ---------- */}
// //               <div className="md:col-span-2 space-y-4">
// //                 {/* Customer */}
// //                 <div>
// //                   <label className="text-[16px] font-medium">Customer</label>
// //                   <Controller
// //                     name="customer"
// //                     control={control}
// //                     render={({ field }) => (
// //                       <Input
// //                         {...field}
// //                         placeholder="Search customer or enter name"
// //                         className="mt-2"
// //                       />
// //                     )}
// //                   />
// //                   <button type="button" className="text-sm text-blue-600 mt-1">
// //                     + New customer
// //                   </button>
// //                 </div>

// //                 {/* Staff */}
// //                 <div>
// //                   <label className="text-[16px] font-medium">Staff</label>
// //                   <Controller
// //                     name="staff"
// //                     control={control}
// //                     render={({ field }) => (
// //                       <Select
// //                         value={field.value}
// //                         onValueChange={field.onChange}
// //                       >
// //                         <SelectTrigger className="mt-2">
// //                           <SelectValue />
// //                         </SelectTrigger>
// //                         <SelectContent>
// //                           <SelectItem value="Ahmed">Ahmed</SelectItem>
// //                           <SelectItem value="Sarah">Sarah</SelectItem>
// //                         </SelectContent>
// //                       </Select>
// //                     )}
// //                   />
// //                 </div>

// //                 {/* Service Card */}
// //                 <h1 className="text-[16px] font-medium">Service</h1>
// //                 <div className="border rounded-lg p-4 bg-muted/30">
// //                   <p className="font-medium">Haircut & Styling</p>
// //                   <p className="text-sm text-muted-foreground">$50 · 60 min</p>
// //                   <button type="button" className="text-sm text-blue-600 mt-1">
// //                     Override price & duration
// //                   </button>
// //                 </div>

// //                 {/* Date & Time */}
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="text-[16px] font-medium">Date</label>
// //                     <Controller
// //                       name="date"
// //                       control={control}
// //                       render={({ field }) => (
// //                         <Input {...field} type="date" className="mt-2" />
// //                       )}
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="text-[16px] font-medium">Time</label>
// //                     <Controller
// //                       name="time"
// //                       control={control}
// //                       render={({ field }) => (
// //                         <Input {...field} type="time" className="mt-2" />
// //                       )}
// //                     />
// //                     <p className="text-xs text-muted-foreground mt-1">
// //                       Ends at 12:30 PM
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* ---------- RIGHT AVAILABILITY ---------- */}
// //               <div className="border rounded-xl p-4 flex flex-col items-center justify-center text-center">
// //                 <p className="font-semibold text-xl mb-4">Availability</p>
// //                 <Check className="h-14 w-14 text-white rounded-full bg-green-500 p-2" />
// //                 <p className="font-semibold text-xl mt-4">Available</p>

// //                 <p className="text-sm text-muted-foreground mt-4">
// //                   Suggested times
// //                 </p>

// //                 <div className="flex gap-2 mt-2 flex-wrap justify-center">
// //                   <Button type="button" variant="secondary" size="sm">
// //                     10:00 AM
// //                   </Button>
// //                   <Button type="button" variant="secondary" size="sm">
// //                     12:00 PM
// //                   </Button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* ================= FOOTER ================= */}
// //           <DialogFooter className="px-6 py-4 border-t flex gap-3 justify-end">
// //             <Button variant="outline" type="button" onClick={onClose}>
// //               Cancel
// //             </Button>
// //             <Button type="submit">Add Booking</Button>
// //           </DialogFooter>
// //         </form>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // }

// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";
// import { useForm, Controller } from "react-hook-form";
// import { Check } from "lucide-react";
// import { useAllStaffQuery } from "@/redux/features/merchant/staffApi";
// import { useAllServicesQuery } from "@/redux/features/merchant/servicesApi";
// import { toast } from "sonner";
// import {
//   useCreateBookingMutation,
//   useGetBookingScheduleQuery,
//   useGetBookingStaffScheduleQuery,
// } from "@/redux/features/merchant/bookingsApi";

// const defaultValues = {
//   customer: "",
//   staff: "",
//   service: "",
//   date: "",
//   time: "",
// };

// export default function AddBookingModal({
//   isOpen,
//   onClose,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
// }) {
//   const { control, handleSubmit } = useForm({ defaultValues });

//   // const { data: staffData } = useAllStaffQuery({});
//   const { data: servicesData } = useAllServicesQuery({});
//   const [createBooking, { isLoading }] = useCreateBookingMutation();
//   const { data: bookingServiceSchedule } = useGetBookingScheduleQuery({
//     service_id: 4,
//     date: "2026-03-11",
//   });

//   console.log(bookingServiceSchedule);

//   const { data: bookingStaffSchedule } = useGetBookingStaffScheduleQuery({
//     service_id: 4,
//     date: "2026-03-11",
//     time: "04:30 PM",
//   });

//   console.log(bookingStaffSchedule);

//   const staffList = bookingStaffSchedule?.available_staff || [];
//   const servicesList = servicesData?.data || [];
//   // console.log(servicesList);
//   // console.log(staffList);

//   const onSubmit = async (data: any) => {
//     console.log("Submitted Booking Data:", data);
//     try {
//       await createBooking({
//         service_id: data.service,
//         staff_id: data.staff,
//         date: data.date,
//         time: data.time,
//         customer_name: data.customer,
//         // email: data.date,
//         // phone: data.password,
//         payment_method: "tap",
//       }).unwrap();
//       toast.success("Booking created successfully");
//     } catch (error: any) {
//       toast.error(error?.data?.message || "Failed to create Booking");
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
//         {/* HEADER */}
//         <DialogHeader className="px-6 pt-6 pb-4 border-b">
//           <DialogTitle>Add New Booking</DialogTitle>
//           <p className="text-sm text-muted-foreground">
//             Auto-checks availability and conflicts
//           </p>
//         </DialogHeader>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="px-6 py-4">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* LEFT FORM */}
//               <div className="md:col-span-2 space-y-4">
//                 {/* Customer */}
//                 <div>
//                   <label className="text-[16px] font-medium">Customer</label>
//                   <Controller
//                     name="customer"
//                     control={control}
//                     render={({ field }) => (
//                       <Input
//                         {...field}
//                         placeholder="Search customer or enter name"
//                         className="mt-2"
//                       />
//                     )}
//                   />
//                 </div>
//                 {/* Service */}
//                 <div>
//                   <label className="text-[16px] font-medium">Service</label>

//                   <Controller
//                     name="service"
//                     control={control}
//                     render={({ field }) => (
//                       <Select
//                         value={field.value}
//                         onValueChange={field.onChange}
//                       >
//                         <SelectTrigger className="mt-2">
//                           <SelectValue placeholder="Select Service" />
//                         </SelectTrigger>

//                         <SelectContent>
//                           {servicesList.map((service: any) => (
//                             <SelectItem
//                               key={service.id}
//                               value={String(service.id)}
//                             >
//                               {service.service_name}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     )}
//                   />
//                 </div>
//                 {/* Date & Time */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-[16px] font-medium">Date</label>

//                     <Controller
//                       name="date"
//                       control={control}
//                       render={({ field }) => (
//                         <Input {...field} type="date" className="mt-2" />
//                       )}
//                     />
//                   </div>

//                   <div>
//                     <label className="text-[16px] font-medium">Time</label>

//                     <Controller
//                       name="time"
//                       control={control}
//                       render={({ field }) => (
//                         <Input {...field} type="time" className="mt-2" />
//                       )}
//                     />
//                   </div>
//                 </div>
//                 {/* Staff */}
//                 <div>
//                   <label className="text-[16px] font-medium">Staff</label>

//                   <Controller
//                     name="staff"
//                     control={control}
//                     render={({ field }) => (
//                       <Select
//                         value={field.value}
//                         onValueChange={field.onChange}
//                       >
//                         <SelectTrigger className="mt-2">
//                           <SelectValue placeholder="Select Staff" />
//                         </SelectTrigger>

//                         <SelectContent>
//                           {staffList.map((staff: any) => (
//                             <SelectItem key={staff.id} value={String(staff.id)}>
//                               {staff.name}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     )}
//                   />
//                 </div>
//               </div>

//               {/* RIGHT SIDE */}
//               <div className="border rounded-xl p-4 flex flex-col items-center justify-center text-center">
//                 <p className="font-semibold text-xl mb-4">Availability</p>

//                 <Check className="h-14 w-14 text-white rounded-full bg-green-500 p-2" />

//                 <p className="font-semibold text-xl mt-4">Available</p>

//                 <p className="text-sm text-muted-foreground mt-4">
//                   Suggested times
//                 </p>

//                 <div className="flex gap-2 mt-2 flex-wrap justify-center">
//                   <Button type="button" variant="secondary" size="sm">
//                     10:00 AM
//                   </Button>
//                   <Button type="button" variant="secondary" size="sm">
//                     12:00 PM
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* FOOTER */}
//           <DialogFooter className="px-6 py-4 border-t flex gap-3 justify-end">
//             <Button variant="outline" type="button" onClick={onClose}>
//               Cancel
//             </Button>

//             <Button type="submit">Add Booking</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

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
import { useForm, Controller, useWatch } from "react-hook-form";
import { Check } from "lucide-react";
import { useAllServicesQuery } from "@/redux/features/merchant/servicesApi";
import { toast } from "sonner";
import {
  useCreateBookingMutation,
  useGetBookingScheduleQuery,
  useGetBookingStaffScheduleQuery,
} from "@/redux/features/merchant/bookingsApi";
import { skipToken } from "@reduxjs/toolkit/query/react";

const defaultValues = {
  customer: "",
  email: "",
  phone: "",
  service: "",
  date: "",
  time: "",
  staff: "",
};

export default function AddBookingModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { control, handleSubmit, setValue, reset } = useForm({ defaultValues });

  const [createBooking] = useCreateBookingMutation();

  // Services list
  const { data: servicesData } = useAllServicesQuery({});
  const servicesList = servicesData?.data || [];

  // console.log(servicesList);

  // Watch selected service and date
  const selectedService = useWatch({ control, name: "service" });
  const selectedDate = useWatch({ control, name: "date" });
  const selectedTime = useWatch({ control, name: "time" });

  // console.log(selectedService, selectedDate, selectedTime);

  // Fetch available times for selected service & date
  const { data: bookingServiceSchedule } = useGetBookingScheduleQuery(
    selectedService && selectedDate
      ? { service_id: Number(selectedService), date: selectedDate }
      : skipToken,
  );

  console.log(bookingServiceSchedule);

  const availableTimes = bookingServiceSchedule?.available_times || [];

  // console.log(availableTimes);

  // Fetch available staff for selected service, date & time
  const { data: bookingStaffSchedule } = useGetBookingStaffScheduleQuery(
    selectedService && selectedDate && selectedTime
      ? {
          service_id: Number(selectedService),
          date: selectedDate,
          time: selectedTime,
        }
      : skipToken,
  );

  // console.log(bookingStaffSchedule);

  const availableStaff = bookingStaffSchedule?.available_staff || [];

  // console.log(availableStaff);

  // Submit booking
  const onSubmit = async (data: any) => {
    if (!data.service || !data.staff || !data.date || !data.time) {
      toast.error("Please select service, date, time, and staff");
      return;
    }

    try {
      await createBooking({
        service_id: Number(data.service),
        staff_id: Number(data.staff),
        date: data.date,
        time: data.time,
        customer_name: data.customer,
        email: data.email,
        phone: data.phone,
        payment_method: "cash",
      }).unwrap();
      toast.success("Booking created successfully");
      reset();
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create booking");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle>Add New Booking</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Auto-checks availability and conflicts
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* LEFT FORM */}
            <div className="md:col-span-2 space-y-4">
              {/* Service */}
              <div>
                <label className="text-[16px] font-medium">Service</label>
                <Controller
                  name="service"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                      <SelectContent>
                        {servicesList.map((s: any) => (
                          <SelectItem key={s.id} value={String(s.id)}>
                            {s.service_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Date */}
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

              {/* Time */}
              {availableTimes.length > 0 && (
                <div>
                  <label className="text-[16px] font-medium">Time</label>
                  <Controller
                    name="time"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select Time" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTimes.map((time: string) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              )}

              {/* Staff */}
              {availableStaff.length > 0 && (
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
                          <SelectValue placeholder="Select Staff" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableStaff.map((staff: any) => (
                            <SelectItem key={staff.id} value={String(staff.id)}>
                              {staff.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              )}

              {/* Customer */}
              <div>
                <label className="text-[16px] font-medium">Customer</label>
                <Controller
                  name="customer"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Customer name"
                      className="mt-2"
                    />
                  )}
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-[16px] font-medium">Email</label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Customer Email"
                      className="mt-2"
                    />
                  )}
                />
              </div>

              {/* phone */}
              <div>
                <label className="text-[16px] font-medium">Phone</label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Customer Phone"
                      className="mt-2"
                    />
                  )}
                />
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="border rounded-xl p-4 flex flex-col items-center justify-center text-center">
              <p className="font-semibold text-xl mb-4">Availability</p>
              <Check className="h-14 w-14 text-white rounded-full bg-green-500 p-2" />
              <p className="font-semibold text-xl mt-4">Available</p>
              <p className="text-sm text-muted-foreground mt-4">
                Suggested times
              </p>

              <div className="flex gap-2 mt-2 flex-wrap justify-center">
                {availableTimes.slice(0, 5).map((time: string) => (
                  <Button
                    key={time}
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setValue("time", time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t flex gap-3 justify-end">
            <Button
              className="cursor-pointer"
              variant="outline"
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button className="cursor-pointer" type="submit">
              Add Booking
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
