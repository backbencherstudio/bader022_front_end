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

type FormData = {
  businessName: string;
  businessLogo: File | null;
  businessCategory: string;
  businessAddress: string;
  country: string;
  city: string;
  timeZone: string;
  currency: string;
};

export default function BusinessSetting() {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();
  const [logo, setLogo] = useState<File | null>(null);

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="container max-w-3xl mx-auto p-5">
      <h2 className="text-xl font-semibold mb-4">Business / Store Settings</h2>
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
  );
}
