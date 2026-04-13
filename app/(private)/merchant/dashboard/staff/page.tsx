"use client";

import Image from "next/image";
import { useState } from "react";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import StaffModal from "../components/modal/StaffModal";
import {
  useAllStaffQuery,
  useCreateStaffMutation,
  useDeleteStaffByIdMutation,
  useUpdateStaffByIdMutation,
} from "@/redux/features/merchant/staffApi";
import { getImageUrl } from "@/helper/formatImage";
import { toast } from "sonner";
import { useI18n } from "@/components/provider/I18nProvider";
export default function StaffPage() {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedStaff, setSelectedStaff] = useState<any>(null);

  const { data: staffData, isLoading, isError } = useAllStaffQuery({});
  const [createStaff, { isLoading: isCreateStaffLoading }] =
    useCreateStaffMutation();
  const [updateStaffById, { isLoading: isUpdateStaffLoading }] =
    useUpdateStaffByIdMutation();
  const [deleteStaffById, { isLoading: isDeleteStaffLoading }] =
    useDeleteStaffByIdMutation();

  const staffList = staffData?.data ?? [];
  const filteredStaff = staffList?.filter((staff: any) =>
    staff.name.toLowerCase().includes(search.toLowerCase()),
  );

  console.log(filteredStaff);

  const handleSubmitStaff = async (data: any) => {
    if (mode === "add") {
      console.log("Add Staff:", data?.service_ids);
      try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("role", data.role);
        // formData.append("service_id", data.service_id);
        // formData.append("service_id", data.serviceIdsAsNumbers);
        if (Array.isArray(data.service_ids)) {
          data.service_ids.forEach((id: string) => {
            formData.append("service_id[]", id); // Note the [] suffix
          });
        }
        formData.append("status", "1");

        if (data.image && data.image.length > 0) {
          formData.append("image", data.image[0]);
        }

        await createStaff(formData).unwrap();
        toast.success("Staff created successfully");
        setOpenModal(false);
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to create staff");
      }
    } else {
      // console.log("Edit Staff:", data);
      const id = data.id;
      try {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("role", data.role);
        // formData.append("service_id", data.service_id);
        if (Array.isArray(data.service_ids)) {
          data.service_ids.forEach((id: string) => {
            formData.append("service_id[]", id); // Note the [] suffix
          });
        }
        formData.append("status", "1");
        formData.append("_method", "put");
        if (data.image && data.image.length > 0) {
          formData.append("image", data.image[0]);
        }
        await updateStaffById({ id, formData }).unwrap();
        toast.success("Staff updated successfully");
        setOpenModal(false);
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to updated staff");
      }
    }
  };

  const handleDelete = (id: string) => {
    toast("Delete Staff Member?", {
      description: "Are you sure? This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await toast.promise(deleteStaffById(id).unwrap(), {
              loading: "Deleting staff...",
              success: "Staff deleted successfully",
              error: (err) => err?.data?.message || "Delete failed",
            });
          } catch (error) {
            console.error("Delete error:", error);
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    });
  };

  if (isLoading) {
    return <div className="p-6">Loading staff...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load staff</div>;
  }
  return (
    <section className="md:p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {locale === "ar" ? "جميع الموظفين" : "All Staff"}
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search anything"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                pl-10 pr-4 py-2 rounded-lg
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                text-gray-900 dark:text-gray-100
                placeholder-gray-400
                focus:outline-none focus:ring-2
                focus:ring-gray-300 dark:focus:ring-gray-700
              "
            />
          </div>

          <button
            onClick={() => {
              setMode("add");
              setSelectedStaff(null);
              setOpenModal(true);
            }}
            className="
              bg-gray-900 dark:bg-white
              text-white dark:text-gray-900
              px-4 py-2 rounded-lg
              text-sm font-medium
              hover:opacity-90 cursor-pointer
            "
          >
            {locale === "ar" ? "إضافة موظف جديد" : "Add New Staff"}
          </button>
        </div>
      </div>

      {filteredStaff.length != 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((staff: any) => (
            <div
              key={staff.id}
              className="
              bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              rounded-2xl shadow-sm
              p-5 flex flex-col justify-between
            "
            >
              {/* Top */}
              <div className="flex gap-4">
                <Image
                  src={getImageUrl(staff.image) || "/images/user.png"}
                  alt={staff.name}
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                  unoptimized={true}
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {staff.name}
                  </h3>

                  <div className="flex gap-2 mt-1 text-xs">
                    <span
                      className={`px-2 py-1 rounded-md ${
                        staff.role === "Admin"
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {staff.role}
                    </span>

                    <span
                      className={`px-2 py-1 rounded-md ${
                        staff.status === true
                          ? "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400"
                          : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                      }`}
                    >
                      {staff.status === true ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>
              {/* Assigned Services */}
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {locale === "ar" ? "الخدمة المخصصة" : "Assigned Service:"}
                </p>
                {staff?.service_names?.map((service: any, index: any) => (
                  <div key={index}>
                    {service ? (
                      <button
                        className="m-1
                        px-3 py-1 text-xs rounded-md
                        bg-gray-100 dark:bg-gray-700
                        text-gray-700 dark:text-gray-300
                      "
                      >
                        {service}
                      </button>
                    ) : (
                      <p className="text-xs text-gray-400">
                        No service assigned
                      </p>
                    )}
                  </div>
                ))}
              </div>
              {/* Actions */}
              <div className="mt-5 flex items-center gap-3">
                <button
                  className={`flex-1 py-2 rounded-lg text-sm font-medium cursor-pointer ${
                    staff.status === true
                      ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {staff.status === "Active" ? "Deactivate" : "Activate"}
                </button>

                <button
                  onClick={() => handleDelete(staff.id)}
                  disabled={isDeleteStaffLoading}
                  className="
                  p-2 rounded-lg
                  border border-gray-200 dark:border-gray-700
                  text-red-500
                  hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer
                "
                >
                  {isDeleteStaffLoading ? (
                    "Deleting..."
                  ) : (
                    <>
                      <FiTrash2 />
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setMode("edit");
                    setSelectedStaff(staff);
                    setOpenModal(true);
                  }}
                  className="
                  p-2 rounded-lg
                  border border-gray-200 dark:border-gray-700
                  text-gray-700 dark:text-gray-300
                  hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer
                "
                >
                  <FiEdit />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          {" "}
          {locale === "ar" ? "الموظفون غير متوفرين" : "Staff not Available"}
        </div>
      )}

      <StaffModal
        open={openModal}
        mode={mode}
        initialData={selectedStaff}
        onClose={() => setOpenModal(false)}
        onSubmitStaff={handleSubmitStaff}
        isLoading={isCreateStaffLoading || isUpdateStaffLoading}
      />
    </section>
  );
}
