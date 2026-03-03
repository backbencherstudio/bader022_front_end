"use client";

import Image from "next/image";
import { useState } from "react";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import StaffModal from "../components/modal/StaffModal";
import { useAllStaffQuery } from "@/redux/features/merchant/staffApi";
import { getImageUrl } from "@/helper/formatImage";

// export const staffList = [
//   {
//     id: 1,
//     name: "John Smith",
//     role: "Admin",
//     status: "Inactive",
//     avatar: "/images/staffs/staff2.png",
//     services: ["Haircut & Styling", "Hair Coloring", "Scalp Treatment"],
//   },
//   {
//     id: 2,
//     name: "John Smith",
//     role: "Admin",
//     status: "Active",
//     avatar: "/images/staffs/staff1.png",
//     services: ["Haircut & Styling", "Hair Coloring", "Hair Extensions"],
//   },
//   {
//     id: 3,
//     name: "John Smith",
//     role: "Staff",
//     status: "Active",
//     avatar: "/images/staffs/staff3.png",
//     services: ["Haircut & Styling", "Hair Coloring"],
//   },
//   {
//     id: 4,
//     name: "John Smith",
//     role: "Staff",
//     status: "Active",
//     avatar: "/images/staffs/staff2.png",
//     services: ["Haircut & Styling", "Hair Coloring"],
//   },
//   {
//     id: 5,
//     name: "John Smith",
//     role: "Staff",
//     status: "Inactive",
//     avatar: "/images/staffs/staff3.png",
//     services: ["Haircut & Styling", "Hair Coloring"],
//   },
//   {
//     id: 6,
//     name: "John Smith",
//     role: "Staff",
//     status: "Inactive",
//     avatar: "/images/staffs/staff1.png",
//     services: ["Haircut & Styling", "Hair Coloring"],
//   },
// ];

export default function StaffPage() {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedStaff, setSelectedStaff] = useState<any>(null);

  const { data: staffData, isLoading, isError } = useAllStaffQuery({});

  console.log('====================================');
  console.log(staffData?.data);
  console.log('====================================');

  const staffList = staffData?.data ?? [];

  const filteredStaff = staffList?.filter((staff:any) =>
    staff.name.toLowerCase().includes(search.toLowerCase())
  );



  console.log('====================================');
  console.log(filteredStaff);
  console.log('====================================');
  const handleSubmitStaff = (data: any) => {
    if (mode === "add") {
      console.log("Add Staff:", data);
    } else {
      console.log("Edit Staff:", data);
    }
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
          All Staff
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
              hover:opacity-90
            "
          >
            Add New Staff
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((staff:any) => (
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
                  src={getImageUrl(staff.image) || "/images/staffs/staff3.png"}
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
                      staff.status === 1
                        ? "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400"
                        : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                    }`}
                  >
                    {staff.status=== 1 ? "Active":"Inactive"}
                  </span>
                </div>
              </div>
            </div>
            {/* Assigned Services */}
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Assigned Service:
                </p>

                {staff.service ? (
                  <div className="flex flex-wrap gap-2">
                    <span
                      className="
                        px-3 py-1 text-xs rounded-md
                        bg-gray-100 dark:bg-gray-700
                        text-gray-700 dark:text-gray-300
                      "
                    >
                      {staff.service.service_name}
                    </span>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400">No service assigned</p>
                )}
              </div>

            {/* Actions */}
            <div className="mt-5 flex items-center gap-3">
              <button
                className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                  staff.status === "Active"
                    ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {staff.status === "Active" ? "Deactivate" : "Activate"}
              </button>

              <button
                className="
                  p-2 rounded-lg
                  border border-gray-200 dark:border-gray-700
                  text-red-500
                  hover:bg-red-50 dark:hover:bg-red-900/20
                "
              >
                <FiTrash2 />
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
                  hover:bg-gray-100 dark:hover:bg-gray-700
                "
              >
                <FiEdit />
              </button>
            </div>
          </div>
        ))}
      </div>

      <StaffModal
        open={openModal}
        mode={mode}
        initialData={selectedStaff}
        onClose={() => setOpenModal(false)}
        onSubmitStaff={handleSubmitStaff}
      />
    </section>
  );
}
