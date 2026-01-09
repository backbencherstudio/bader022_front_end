"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Pencil } from "lucide-react";

type ProfileFormData = {
  fullName: string;
  phone: string;
  address: string;
};

export default function ProfileSection() {
  const form = useForm<ProfileFormData>({
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log("Submitted:", data);
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black p-10">
      <div className="max-w-3xl mx-auto">
        {/* ✅ Title */}
        <h2 className="text-[16px] font-medium mb-8">Profile</h2>

        {/* ✅ Profile Header */}
        <div className="flex items-start gap-2 mb-10">
          {/* Avatar + Pencil */}
          <div className="relative rounded-full">
            <Image
              src="/images/user1.png"
              alt="Profile"
              width={100}
              height={100}
            />

            <button
              type="button"
              className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-[#0B1220]! flex items-center justify-center border-[3px] border-white cursor-pointer"
            >
              <Pencil
                size={22}
                className="text-white bg-black z-20 absolute p-1 rounded-xl"
              />
            </button>
          </div>

          {/* Name & Email */}
          <div className="pt-4">
            <h3 className="text-[22px] font-semibold">Abdurrahman</h3>
            <p className="text-[14px] text-gray-500 mt-1">Abdurrahman@.com</p>

            <div className="mt-5 w-[200px] h-[1px] bg-gray-200" />
          </div>
        </div>

        {/* ✅ Information Card */}
        <Card className="rounded-xl mt-5 border border-gray-200 p-8 shadow-none">
          <h3 className="text-[18px] font-semibold mb-6">Information</h3>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[14px] font-medium">Full Name</label>
              <Input
                placeholder="Enter product name"
                className="w-full py-5 mt-2"
                {...form.register("fullName", { required: true })}
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-[14px] font-medium">Phone Number</label>
              <Input
                placeholder="Enter phone number"
                className="w-full py-5 mt-2"
                {...form.register("phone", { required: true })}
              />
            </div>

            {/* Street Address */}
            <div className="space-y-2">
              <label className="text-[14px] font-medium">Street Address</label>
              <Input
                placeholder="Street Address*"
                className="w-full py-5 mt-2"
                {...form.register("address", { required: true })}
              />
            </div>

            {/* ✅ Save Button */}
            <div className="flex justify-end pt-6">
              <Button type="submit" className="cursor-pointer">
                Save Change
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
