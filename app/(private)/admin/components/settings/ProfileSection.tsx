
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import {
  useGetPersonaltHistoryQuery,
  useUpdateInformationMutation,
} from "@/redux/features/admin/adminApi";
import { toast } from "sonner";
import { getImageUrl } from "@/helper/formatImage";

type ProfileFormData = {
  name: string;
  phone: string;
  address: string;
};

export default function ProfileSection() {
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_API_URL;

  const { data, isLoading, refetch } = useGetPersonaltHistoryQuery({});
  console.log
  const [updateInformation, { isLoading: isUpdating }] =
    useUpdateInformationMutation();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // 🔹 React Hook Form
  const { register, handleSubmit, reset } = useForm<ProfileFormData>({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });


  const profileImageUrl = data?.data?.image
    ? getImageUrl(data.data.image) 
    : "/default-avatar.png";
// console.log(profileImageUrl,"dfdfdfdefdfd");
  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Submit update
  const onSubmit = async (formData: ProfileFormData) => {
    try {
      const body = new FormData();

      body.append("name", formData.name);
      body.append("phone", formData.phone || "");
      body.append("address", formData.address || "");

      if (selectedFile) {
        body.append("image", selectedFile);
      }

      await updateInformation(body).unwrap();
      refetch();

      toast("Profile Updated Successfully ");
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Set default values from API
  useEffect(() => {
    if (data?.data) {
      reset({
        name: data.data.name ?? "",
        phone: data.data.phone ?? "",
        address: data.data.address ?? "",
      });
    }
  }, [data, reset]);

  if (isLoading) return <div className="p-10">Loading...</div>;

  return (
    <div className="w-full min-h-screen bg-white p-10 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-[16px] font-medium mb-8">Profile</h2>

        {/* Profile Header */}
        <div className="flex items-start gap-6 mb-10">
          <div className="relative w-[100px] h-[100px]">
            <Image
              key={previewImage || profileImageUrl}
              src={previewImage || profileImageUrl}
              alt="Profile"
              fill
              unoptimized={true}
              className="rounded-full object-cover border"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-black flex items-center justify-center border-2 border-white"
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
            <h3 className="text-[22px] font-semibold">{data?.data?.name}</h3>
            <p className="text-[14px] text-gray-500 mt-1">
              {data?.data?.email}
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="rounded-xl p-8 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
          <h3 className="text-[18px] font-semibold mb-6">Information</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Input {...register("name")} className="mt-2 py-5" />
            </div>

            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <Input {...register("phone")} className="mt-2 py-5" />
            </div>

            <div>
              <label className="text-sm font-medium">Street Address</label>
              <Input {...register("address")} className="mt-2 py-5" />
            </div>

            <div className="flex justify-end pt-6">
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}