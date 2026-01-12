import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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

const defaultValues = {
  customerName: "",
  service: "",
  price: "",
  duration: "",
  dateTime: "",
  staffMember: "",
  status: "completed",
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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  // Handle form submit
  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    onClose(); // Close modal after form submit
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-full max-w-md dark:bg-gray-800
              border border-gray-200 dark:border-gray-700"
      >
        <DialogHeader>
          <DialogTitle>Add New Booking</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogDescription>
            <div className="space-y-4">
              {/* Customer Name */}
              <div>
                <label
                  htmlFor="customerName"
                  className="block text-sm font-semibold"
                >
                  Customer Name *
                </label>
                <Controller
                  name="customerName"
                  control={control}
                  rules={{ required: "Customer name is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="customerName"
                      placeholder="Enter customer name"
                      className="mt-2"
                    />
                  )}
                />
                {errors.customerName && (
                  <span className="text-red-500 text-xs">
                    {errors.customerName.message}
                  </span>
                )}
              </div>

              {/* Service */}
              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-semibold"
                >
                  Service *
                </label>
                <Controller
                  name="service"
                  control={control}
                  rules={{ required: "Service is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="service"
                      placeholder="Enter service"
                      className="mt-2"
                    />
                  )}
                />
                {errors.service && (
                  <span className="text-red-500 text-xs">
                    {errors.service.message}
                  </span>
                )}
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-semibold">
                  Price ($) *
                </label>
                <Controller
                  name="price"
                  control={control}
                  rules={{ required: "Price is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="price"
                      placeholder="Enter price"
                      type="number"
                      className="mt-2"
                    />
                  )}
                />
                {errors.price && (
                  <span className="text-red-500 text-xs">
                    {errors.price.message}
                  </span>
                )}
              </div>

              {/* Duration */}
              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-semibold"
                >
                  Duration *
                </label>
                <Controller
                  name="duration"
                  control={control}
                  rules={{ required: "Duration is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="duration"
                      placeholder="Enter duration"
                      className="mt-2"
                    />
                  )}
                />
                {errors.duration && (
                  <span className="text-red-500 text-xs">
                    {errors.duration.message}
                  </span>
                )}
              </div>

              {/* Date & Time */}
              <div>
                <label
                  htmlFor="dateTime"
                  className="block text-sm font-semibold"
                >
                  Date & Time *
                </label>
                <Controller
                  name="dateTime"
                  control={control}
                  rules={{ required: "Date & Time is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="dateTime"
                      placeholder="Select date & time"
                      type="datetime-local"
                      className="mt-2"
                    />
                  )}
                />
                {errors.dateTime && (
                  <span className="text-red-500 text-xs">
                    {errors.dateTime.message}
                  </span>
                )}
              </div>

              {/* Staff Member */}
              <div>
                <label
                  htmlFor="staffMember"
                  className="block text-sm font-semibold"
                >
                  Staff Member *
                </label>
                <Controller
                  name="staffMember"
                  control={control}
                  rules={{ required: "Staff member is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="staffMember"
                      placeholder="Enter staff name"
                      className="mt-2"
                    />
                  )}
                />
                {errors.staffMember && (
                  <span className="text-red-500 text-xs">
                    {errors.staffMember.message}
                  </span>
                )}
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-semibold">
                  Status *
                </label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirm">Confirm</SelectItem>
                        <SelectItem value="cancel">Cancel</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </DialogDescription>

          <DialogFooter>
            <div className="flex gap-4 mt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Add Booking</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
