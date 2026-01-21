// import * as React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
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

// const defaultValues = {
//   customerName: "",
//   service: "",
//   price: "",
//   duration: "",
//   date: "",
//   time: "",
//   staffMember: "",
//   status: "completed",
// };

// export default function AddBookingModal({
//   isOpen,
//   onClose,
//   onSubmit,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: any) => void;
// }) {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ defaultValues });

//   // Handle form submit
//   const handleFormSubmit = (data: any) => {
//     onSubmit(data);
//     onClose(); // Close modal after form submit
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent
//         className="w-full max-w-md dark:bg-gray-800
//               border border-gray-200 dark:border-gray-700"
//       >
//         <DialogHeader>
//           <DialogTitle>Add New Booking</DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit(handleFormSubmit)}>
//           <DialogDescription>
//             <div className="space-y-4">
//               {/* Customer Name */}
//               <div>
//                 <label
//                   htmlFor="customerName"
//                   className="block text-sm font-semibold"
//                 >
//                   Customer Name *
//                 </label>
//                 <Controller
//                   name="customerName"
//                   control={control}
//                   rules={{ required: "Customer name is required" }}
//                   render={({ field }) => (
//                     <Input
//                       {...field}
//                       id="customerName"
//                       placeholder="Enter customer name"
//                       className="mt-2"
//                     />
//                   )}
//                 />
//                 {errors.customerName && (
//                   <span className="text-red-500 text-xs">
//                     {errors.customerName.message}
//                   </span>
//                 )}
//               </div>

//               {/* Service */}
//               <div>
//                 <label
//                   htmlFor="service"
//                   className="block text-sm font-semibold"
//                 >
//                   Service *
//                 </label>
//                 <Controller
//                   name="service"
//                   control={control}
//                   rules={{ required: "Service is required" }}
//                   render={({ field }) => (
//                     <Input
//                       {...field}
//                       id="service"
//                       placeholder="Enter service"
//                       className="mt-2"
//                     />
//                   )}
//                 />
//                 {errors.service && (
//                   <span className="text-red-500 text-xs">
//                     {errors.service.message}
//                   </span>
//                 )}
//               </div>

//               {/* Price */}
//               <div>
//                 <label htmlFor="price" className="block text-sm font-semibold">
//                   Price ($) *
//                 </label>
//                 <Controller
//                   name="price"
//                   control={control}
//                   rules={{ required: "Price is required" }}
//                   render={({ field }) => (
//                     <Input
//                       {...field}
//                       id="price"
//                       placeholder="Enter price"
//                       type="number"
//                       className="mt-2"
//                     />
//                   )}
//                 />
//                 {errors.price && (
//                   <span className="text-red-500 text-xs">
//                     {errors.price.message}
//                   </span>
//                 )}
//               </div>

//               {/* Duration */}
//               <div>
//                 <label
//                   htmlFor="duration"
//                   className="block text-sm font-semibold"
//                 >
//                   Duration *
//                 </label>
//                 <Controller
//                   name="duration"
//                   control={control}
//                   rules={{ required: "Duration is required" }}
//                   render={({ field }) => (
//                     <Input
//                       {...field}
//                       id="duration"
//                       placeholder="Enter duration"
//                       className="mt-2"
//                     />
//                   )}
//                 />
//                 {errors.duration && (
//                   <span className="text-red-500 text-xs">
//                     {errors.duration.message}
//                   </span>
//                 )}
//               </div>

//               {/* Date & Time */}
//               {/* Date */}
//               <div>
//                 <label htmlFor="date" className="block text-sm font-semibold">
//                   Date *
//                 </label>
//                 <Controller
//                   name="date"
//                   control={control}
//                   rules={{ required: "Date is required" }}
//                   render={({ field }) => (
//                     <Input {...field} id="date" type="date" className="mt-2" />
//                   )}
//                 />
//                 {errors.date && (
//                   <span className="text-red-500 text-xs">
//                     {errors.date.message}
//                   </span>
//                 )}
//               </div>

//               {/* Time */}
//               <div>
//                 <label htmlFor="time" className="block text-sm font-semibold">
//                   Time *
//                 </label>
//                 <Controller
//                   name="time"
//                   control={control}
//                   rules={{ required: "Time is required" }}
//                   render={({ field }) => (
//                     <Input {...field} id="time" type="time" className="mt-2" />
//                   )}
//                 />
//                 {errors.time && (
//                   <span className="text-red-500 text-xs">
//                     {errors.time.message}
//                   </span>
//                 )}
//               </div>

//               {/* Staff Member */}
//               <div>
//                 <label
//                   htmlFor="staffMember"
//                   className="block text-sm font-semibold"
//                 >
//                   Staff Member *
//                 </label>
//                 <Controller
//                   name="staffMember"
//                   control={control}
//                   rules={{ required: "Staff member is required" }}
//                   render={({ field }) => (
//                     <Input
//                       {...field}
//                       id="staffMember"
//                       placeholder="Enter staff name"
//                       className="mt-2"
//                     />
//                   )}
//                 />
//                 {errors.staffMember && (
//                   <span className="text-red-500 text-xs">
//                     {errors.staffMember.message}
//                   </span>
//                 )}
//               </div>

//               {/* Status */}
//               <div>
//                 <label htmlFor="status" className="block text-sm font-semibold">
//                   Status *
//                 </label>
//                 <Controller
//                   name="status"
//                   control={control}
//                   render={({ field }) => (
//                     <Select value={field.value} onValueChange={field.onChange}>
//                       <SelectTrigger className="mt-2">
//                         <SelectValue placeholder="Select Status" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="completed">Completed</SelectItem>
//                         <SelectItem value="pending">Pending</SelectItem>
//                         <SelectItem value="confirm">Confirm</SelectItem>
//                         <SelectItem value="cancel">Cancel</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   )}
//                 />
//               </div>
//             </div>
//           </DialogDescription>

//           <DialogFooter>
//             <div className="flex gap-4 mt-4">
//               <Button type="button" variant="outline" onClick={onClose}>
//                 Cancel
//               </Button>
//               <Button type="submit">Add Booking</Button>
//             </div>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import * as React from "react";
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
import { useForm, Controller } from "react-hook-form";
import { Check, CheckCircle } from "lucide-react";

const defaultValues = {
  customer: "",
  staff: "Ahmed",
  service: "Haircut & Styling",
  price: 50,
  duration: 60,
  date: "",
  time: "",
};

export default function AddBookingModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}) {
  const { control, handleSubmit } = useForm({ defaultValues });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          max-w-3xl
          max-h-[90vh]
          overflow-y-auto
          p-0
        "
      >
        {/* ================= HEADER ================= */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle>Add New Booking</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Auto-checks availability and conflicts
          </p>
        </DialogHeader>

        {/* ================= BODY ================= */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* ---------- LEFT FORM ---------- */}
              <div className="md:col-span-2 space-y-4">
                {/* Customer */}
                <div>
                  <label className="text-[16px] font-medium">Customer</label>
                  <Controller
                    name="customer"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Search customer or enter name"
                        className="mt-2"
                      />
                    )}
                  />
                  <button type="button" className="text-sm text-blue-600 mt-1">
                    + New customer
                  </button>
                </div>

                {/* Staff */}
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
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ahmed">Ahmed</SelectItem>
                          <SelectItem value="Sarah">Sarah</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Service Card */}
                <h1 className="text-[16px] font-medium">Service</h1>
                <div className="border rounded-lg p-4 bg-muted/30">
                  <p className="font-medium">Haircut & Styling</p>
                  <p className="text-sm text-muted-foreground">$50 · 60 min</p>
                  <button type="button" className="text-sm text-blue-600 mt-1">
                    Override price & duration
                  </button>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                  <div>
                    <label className="text-[16px] font-medium">Time</label>
                    <Controller
                      name="time"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} type="time" className="mt-2" />
                      )}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Ends at 12:30 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* ---------- RIGHT AVAILABILITY ---------- */}
              <div className="border rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <p className="font-semibold text-xl mb-4">Availability</p>
                <Check className="h-14 w-14 text-white rounded-full bg-green-500 p-2" />
                <p className="font-semibold text-xl mt-4">Available</p>

                <p className="text-sm text-muted-foreground mt-4">
                  Suggested times
                </p>

                <div className="flex gap-2 mt-2 flex-wrap justify-center">
                  <Button type="button" variant="secondary" size="sm">
                    10:00 AM
                  </Button>
                  <Button type="button" variant="secondary" size="sm">
                    12:00 PM
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* ================= FOOTER ================= */}
          <DialogFooter className="px-6 py-4 border-t flex gap-3 justify-end">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Booking</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
