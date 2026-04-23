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
import { useI18n } from "@/components/provider/I18nProvider";
import PhoneInputWithCountrySelect from "react-phone-number-input";
// @ts-ignore
import "react-phone-number-input/style.css";

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
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
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
          <DialogTitle>
            {" "}
            {locale == "ar" ? "إضافة حجز جديد" : "Add New Booking"}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {locale == "ar"
              ? "التحقق التلقائي من التوافر وتعارض المواعيد"
              : "Auto-checks availability and conflicts"}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* LEFT FORM */}
            <div className="md:col-span-2 space-y-4">
              {/* Service */}
              <div>
                <label className="text-[16px] font-medium">
                  {locale == "ar" ? "الخدمة" : "Service"}
                </label>
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
                <label className="text-[16px] font-medium">
                  {locale == "ar" ? "التاريخ" : "Date"}
                </label>
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
                  <label className="text-[16px] font-medium">
                    {" "}
                    {locale == "ar" ? "الوقت" : "Time"}
                  </label>
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
                  <label className="text-[16px] font-medium">
                    {locale == "ar" ? "الموظفون" : "Staff"}
                  </label>
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
                <label className="text-[16px] font-medium">
                  {" "}
                  {locale == "ar" ? "العميل" : "Customer"}
                </label>
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
                <label className="text-[16px] font-medium">
                  {" "}
                  {locale == "ar" ? "البريد الإلكتروني" : "Email"}
                </label>
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
                <label className="text-[16px] font-medium">
                  {locale == "ar" ? "الهاتف" : "Phone "}
                </label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "Phone number is required",
                    validate: (value) => {
                      const digits = value?.replace(/\D/g, "") || "";
                      // must include 966 + more than 9 digits total
                      if (!digits.startsWith("966")) {
                        return "Phone number must start with +966";
                      }
                      if (digits.length <= 8) {
                        return "Phone number must be more than 9 digits including 966";
                      }

                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <PhoneInputWithCountrySelect
                      international
                      defaultCountry="SA"
                      countryCallingCodeEditable={false}
                      value={field.value || ""}
                      onChange={field.onChange}
                      className="
        w-full

        [&_input]:h-11
        [&_input]:w-full
        [&_input]:rounded-md
        [&_input]:border
        [&_input]:border-gray-300
        dark:[&_input]:border-gray-300
        [&_input]:bg-white
        dark:[&_input]:bg-white
        [&_input]:px-3

        [&_.PhoneInputCountry]:pointer-events-none
        [&_.PhoneInputCountry]:opacity-70
      "
                    />
                  )}
                />
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="border rounded-xl p-4 flex flex-col items-center justify-center text-center">
              <p className="font-semibold text-xl mb-4">
                {locale == "ar" ? "التوافر" : "Availability"}
              </p>
              <Check className="h-14 w-14 text-white rounded-full bg-green-500 p-2" />
              <p className="font-semibold text-xl mt-4">
                {locale == "ar" ? "متاح" : "Available"}
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                {locale == "ar" ? "الأوقات المقترحة" : "Suggested times"}
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
              {locale == "ar" ? "إلغاء" : "Cancel"}
            </Button>
            <Button className="cursor-pointer" type="submit">
              {locale == "ar" ? "إضافة حجز" : "Add Booking"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
