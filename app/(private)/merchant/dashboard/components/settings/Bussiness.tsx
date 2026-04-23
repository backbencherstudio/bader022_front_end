"use client";

import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  useGetMerchantDataShowQuery,
  useUpdateBusinessSettingMutation,
} from "@/redux/features/merchant/settingApi";
import { toast } from "sonner";
import { useI18n } from "@/components/provider/I18nProvider";

type WorkingHour = {
  day: string;
  enabled: boolean;
  from: string;
  to: string;
};

type FormData = {
  store_name: string;
  business_category: string;
  business_address: string;
  country: string;
  city: string;
  time_zone: string;
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
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  const {
    control,
    handleSubmit,
    watch,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      workingHours: DAYS.map((day) => ({
        day,
        enabled: day !== "Saturday" && day !== "Sunday",
        from: "09:00",
        to: "18:00",
      })),
    },
  });

  const { data: merchantData, isLoading } = useGetMerchantDataShowQuery({});

  // console.log("merchantData========", merchantData);

  const [updateBusinessSetting] = useUpdateBusinessSettingMutation();

  const TIME_OPTIONS = Array.from({ length: 49 }, (_, i) => {
    const hour = Math.floor(i / 2)
      .toString()
      .padStart(2, "0");
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour}:${minute}`;
  });

  // AUTO FILL FROM API (IMPORTANT PART)
  useEffect(() => {
    if (merchantData?.data) {
      const data = merchantData.data;

      const formattedWorkingHours = DAYS.map((day) => {
        const found = data.business_hours?.find(
          (item: any) => item.day.toLowerCase() === day.toLowerCase(),
        );

        return {
          day,
          enabled: found ? !found.is_closed : false,
          from: found?.open_time || "09:00",
          to: found?.close_time || "24:00",
        };
      });

      reset({
        store_name: data.store_name,
        business_category: data.business_category || "",
        business_address: data.business_address || "",
        country: data.country || "Saudi Arabia",
        city: data.city || "Riyadh",
        time_zone: data.time_zone || "Asia/Riyadh",
        currency: data.currency || "SAR",
        workingHours: formattedWorkingHours,
      });
    }
  }, [merchantData, reset]);

  const onSubmit = async (data: FormData) => {
    const business_hours: Record<string, { open: string; close: string }> = {};

    data.workingHours.forEach((item) => {
      if (item.enabled) {
        const day = item.day.toLowerCase();
        business_hours[day] = {
          open: item.from,
          close: item.to,
        };
      }
    });

    const payload = {
      ...data,
      business_hours,
    };
    // console.log("payload", payload);
    try {
      const response = await updateBusinessSetting(payload);

      console.log(response);

      if (response?.data?.success === false) {
        toast.error(response.data.message);
        return;
      }

      toast.success("Business Updated successfully");
      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to Business Updated");
    }
  };

  return (
    <div className="container max-w-3xl mx-auto p-4">
      <div className="border rounded-xl p-4 sm:p-6">
        <h2 className="text-xl font-semibold mb-4">
          {locale === "ar"
            ? "إعدادات النشاط التجاري / المتجر"
            : "Business / Store Settings"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Store Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-muted-foreground">
              {locale === "ar"
                ? "اسم النشاط التجاري / المتجر"
                : "Business / Store Name "}
            </label>

            <Input
              {...register("store_name", {
                required: "Business name is required",
              })}
              disabled
              placeholder=""
            />

            {errors.store_name && (
              <p className="text-red-500 text-xs">
                {errors.store_name.message}
              </p>
            )}
          </div>

          {/* Working Hours */}
          <div className="space-y-3 overflow-x-auto">
            <h3 className="text-sm font-medium">
              {locale === "ar" ? "ساعات العمل" : "Working Hours"}
            </h3>

            {watch("workingHours")?.map((item, index) => (
              <div
                key={index}
                className="grid gap-3 grid-cols-[140px_1fr_1fr_1fr] items-center"
              >
                <Controller
                  control={control}
                  name={`workingHours.${index}.enabled`}
                  render={({ field }) => (
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        // disabled
                      />
                      {DAYS[index]}
                    </label>
                  )}
                />

                <Controller
                  control={control}
                  name={`workingHours.${index}.from`}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={!item.enabled}
                      // disabled
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_OPTIONS.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                <span className="hidden sm:block text-xs text-gray-500">-</span>

                <Controller
                  control={control}
                  name={`workingHours.${index}.to`}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={!item.enabled}
                      // disabled
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_OPTIONS.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            ))}
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 text-sm">
              {" "}
              {locale === "ar" ? "فئة المتجر" : "Business Category"}
            </label>
            <Input
              {...register("business_category", {
                required: "Business Category is required",
              })}
              disabled
              className="opacity-100"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">
              {" "}
              {locale === "ar" ? "عنوان المتجر" : "Business Address"}
            </label>

            <Input
              {...register("business_address", {
                required: "Business Address is required",
              })}
              placeholder="Enter Your Business Address"
            />

            {errors.business_address && (
              <p className="text-red-500 text-xs">
                {errors.business_address.message}
              </p>
            )}
          </div>

          {/* Country */}
          {/* <div>
            <label className="block mb-2 text-sm">Country</label>
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div> */}

          {/* City */}
          {/* <div>
            <label className="block mb-2 text-sm">City</label>
            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Riyadh">Riyadh</SelectItem>
                    <SelectItem value="Jeddah">Jeddah</SelectItem>
                    <SelectItem value="Dammam">Dammam</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div> */}

          {/* Timezone */}
          {/* <div>
            <label className="block mb-2 text-sm">Timezone</label>
            <Controller
              control={control}
              name="time_zone"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Dhaka">Asia/Dhaka</SelectItem>
                    <SelectItem value="Asia/Riyadh">Asia/Riyadh</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div> */}

          {/* Currency */}
          {/* <div>
            <label className="block mb-2 text-sm">Currency </label>
            <Controller
              control={control}
              name="currency"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAR">SAR</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div> */}

          {/* Submit */}
          <Button type="submit" className="w-full cursor-pointer">
            {locale === "ar" ? "حفظ التغييرات" : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}
