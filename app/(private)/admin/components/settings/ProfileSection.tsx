"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CloudDownload, Pencil } from "lucide-react";

import { useGetPersonaltHistoryQuery, useUpdateInformationMutation } from "@/redux/features/admin/adminApi";
import AccountSuccess from "@/app/(auth)/_components/AccountSuccess";

type ProfileFormData = {
  name: string;
  image: string;
  phone: string;
  address: string;
};

export default function ProfileSection() {
  const [updateInformation, { isLoading: isUpdating }] =
    useUpdateInformationMutation();
  
  const { data, isLoading, refetch } = useGetPersonaltHistoryQuery({});
console.log(data?.data?.image)
  const formattedImage = data?.data?.image
    ? data.data.image.startsWith("/")
      ? data.data.image
      : `/${data.data.image}`
    : null;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState(null);
  console.log(previewImage)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(file); 
    }
  };
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: "",
      image: "",

      phone: "",
      address: "",
    },
  });

  const onSubmit = async (formData: ProfileFormData) => {
    try {
      const body = new FormData();

      body.append("name", formData.name);
      body.append("phone", formData.phone || "");
      body.append("address", formData.address || "");

    
      if (selectedFile) {
        body.append("image", selectedFile);
      }

      // await updateInformation(body).unwrap();
      refetch();

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data?.data) {
      reset({
        name: data.data.name ?? "",
        image:data.data.image ?? "",
        phone: data.data.phone ?? "",
        address: data.data.address ?? "",
      });
    }
  }, [data, reset]);

  return (
    <div className="w-full min-h-screen bg-white p-10 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">

        <h2 className="text-[16px] font-medium mb-8">Profile</h2>

        {/* Profile Header */}
        <div className="flex items-start gap-2 mb-10">
          <div className="relative w-[100px] h-[100px]">

            {/* <Image
              src={data?.data?.image}
              alt="Profile"
              width={100}
              height={100}
            /> */}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-[#0B1220] flex items-center justify-center border-[3px] border-white"
            >
              <Pencil size={16} className="text-white" />
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />

          </div>

          <div className="pt-4">
            <h3 className="text-[22px] font-semibold">
              {data?.data?.name}
            </h3>
            <p className="text-[14px] text-gray-500 mt-1">
              {data?.data?.email}
            </p>
          </div>
        </div>

        {/* Form Card */}
        <Card className="rounded-xl mt-5 p-8 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
          <h3 className="text-[18px] font-semibold mb-6">Information</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <div className="space-y-2">
              <label className="text-[14px] font-medium">Full Name</label>
              <Input
                {...register("name", { required: true })}
                className="w-full py-5"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[14px] font-medium">Phone Number</label>
              <Input
                {...register("phone")}
                className="w-full py-5"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[14px] font-medium">Street Address</label>
              <Input
                {...register("address")}
                className="w-full py-5"
              />
            </div>

            <div className="flex justify-end pt-6">
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Save Change"}
              </Button>
            </div>

          </form>
        </Card>
      </div>
    </div>
  );
}