import { useForm, Controller } from "react-hook-form";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type WorkingHour = {
  day: string;
  enabled: boolean;
  from: string;
  to: string;
};

type FormData = {
  businessName: string;
  businessLogo: File | null;
  businessCategory: string;
  businessAddress: string;
  country: string;
  city: string;
  timeZone: string;
  currency: string;
  workingHours: WorkingHour[];
};

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export default function BusinessSetting() {
  const {
    control,
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      workingHours: DAYS.map((day) => ({
        day,
        enabled: day !== "Saturday" && day !== "Sunday",
        from: "08:00 AM",
        to: "08:00 PM",
      })),
    },
  });
  const [logo, setLogo] = useState<File | null>(null);

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="container max-w-3xl mx-auto p-4">
      <div className="border rounded-xl p-4 sm:p-6">
        <h2 className="text-xl font-semibold mb-4">
          Business / Store Settings
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Business Name */}
          <div>
            <label
              htmlFor="businessName"
              className="block mb-2 text-sm font-medium text-muted-foreground"
            >
              Business / Store Name
            </label>
            <Input
              {...register("businessName", {
                required: "Business name is required",
              })}
              placeholder="My Store"
              className="w-full"
            />
            {errors.businessName && (
              <p className="text-red-500 text-xs">
                {errors.businessName.message}
              </p>
            )}
          </div>

          {/* Business Logo */}
          <div>
            <label
              htmlFor="businessLogo"
              className="block mb-2 text-sm font-medium text-muted-foreground"
            >
              Business Logo
            </label>
            <div className="flex flex-col items-center border-2 p-4 rounded-md">
              <input
                type="file"
                id="businessLogo"
                onChange={(e) => setLogo(e.target.files?.[0] || null)}
                className="hidden"
              />
              <label htmlFor="businessLogo" className="cursor-pointer">
                Click to upload or drag and drop
              </label>
              {logo && <p>{logo.name}</p>}
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>

          {/* Working Hours */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Working Hours
            </h3>

            {watch("workingHours")?.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto_1fr] items-center"
              >
                {/* Day */}
                <Controller
                  control={control}
                  name={`workingHours.${index}.enabled`}
                  render={({ field }) => (
                    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                      {DAYS[index]}
                    </label>
                  )}
                />

                {/* From */}
                <input
                  {...register(`workingHours.${index}.from`)}
                  disabled={!item.enabled}
                  className="rounded-md border px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white disabled:opacity-50"
                />

                <span className="hidden sm:block text-xs text-gray-500">
                  to
                </span>

                {/* To */}
                <input
                  {...register(`workingHours.${index}.to`)}
                  disabled={!item.enabled}
                  className="rounded-md border px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white disabled:opacity-50"
                />
              </div>
            ))}
          </div>

          {/* Business Category */}
          <div>
            <label
              htmlFor="businessCategory"
              className="block mb-2 text-sm font-medium text-muted-foreground"
            >
              Business Category
            </label>
            <Controller
              control={control}
              name="businessCategory"
              defaultValue="Car Services"
              render={({ field }) => (
                <Select {...field}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Business Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Car Services">Car Services</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Business Address */}
          <div>
            <label
              htmlFor="businessAddress"
              className="block mb-2 text-sm font-medium text-muted-foreground"
            >
              Business Address
            </label>
            <Input
              {...register("businessAddress", {
                required: "Business address is required",
              })}
              placeholder="123 Main Street, Building A"
              className="w-full"
            />
            {errors.businessAddress && (
              <p className="text-red-500 text-xs">
                {errors.businessAddress.message}
              </p>
            )}
          </div>

          {/* Country */}
          <div>
            <label
              htmlFor="country"
              className="block mb-2 text-sm font-medium text-muted-foreground"
            >
              Country
            </label>
            <Controller
              control={control}
              name="country"
              defaultValue="Saudi Arabia"
              render={({ field }) => (
                <Select {...field}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="India">India</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-muted-foreground"
            >
              City
            </label>
            <Controller
              control={control}
              name="city"
              defaultValue="Riyadh"
              render={({ field }) => (
                <Select {...field}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Riyadh">Riyadh</SelectItem>
                    <SelectItem value="Jeddah">Jeddah</SelectItem>
                    <SelectItem value="Dammam">Dammam</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Time Zone */}
          <div>
            <label
              htmlFor="timeZone"
              className="block mb-2 text-sm font-medium text-muted-foreground"
            >
              Time Zone
            </label>
            <Controller
              control={control}
              name="timeZone"
              defaultValue="(GMT+3) Arabia Standard Time"
              render={({ field }) => (
                <Select {...field}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Time Zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="(GMT+3) Arabia Standard Time">
                      (GMT+3) Arabia Standard Time
                    </SelectItem>
                    <SelectItem value="(GMT+5) Indian Standard Time">
                      (GMT+5) Indian Standard Time
                    </SelectItem>
                    <SelectItem value="(GMT+2) Central European Time">
                      (GMT+2) Central European Time
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Currency */}
          <div>
            <label
              htmlFor="currency"
              className="block mb-2 text-sm font-medium text-muted-foreground"
            >
              Currency
            </label>
            <Controller
              control={control}
              name="currency"
              defaultValue="SAR - Saudi Riyal"
              render={({ field }) => (
                <Select {...field}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAR - Saudi Riyal">
                      SAR - Saudi Riyal
                    </SelectItem>
                    <SelectItem value="USD - US Dollar">
                      USD - US Dollar
                    </SelectItem>
                    <SelectItem value="INR - Indian Rupee">
                      INR - Indian Rupee
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Save Button */}
          <div>
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
