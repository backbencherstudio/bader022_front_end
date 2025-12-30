"use client";

import Image from "next/image";
import { useState } from "react";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import StaffModal from "../components/modal/StaffModal";

export const staffList = [
  {
    id: 1,
    name: "John Smith",
    role: "Admin",
    status: "Inactive",
    avatar: "/images/staffs/staff2.png",
    services: ["Haircut & Styling", "Hair Coloring", "Scalp Treatment"],
  },
  {
    id: 2,
    name: "John Smith",
    role: "Admin",
    status: "Active",
    avatar: "/images/staffs/staff1.png",
    services: ["Haircut & Styling", "Hair Coloring", "Hair Extensions"],
  },
  {
    id: 3,
    name: "John Smith",
    role: "Staff",
    status: "Active",
    avatar: "/images/staffs/staff3.png",
    services: ["Haircut & Styling", "Hair Coloring"],
  },
  {
    id: 4,
    name: "John Smith",
    role: "Staff",
    status: "Active",
    avatar: "/images/staffs/staff2.png",
    services: ["Haircut & Styling", "Hair Coloring"],
  },
  {
    id: 5,
    name: "John Smith",
    role: "Staff",
    status: "Inactive",
    avatar: "/images/staffs/staff3.png",
    services: ["Haircut & Styling", "Hair Coloring"],
  },
  {
    id: 6,
    name: "John Smith",
    role: "Staff",
    status: "Inactive",
    avatar: "/images/staffs/staff1.png",
    services: ["Haircut & Styling", "Hair Coloring"],
  },
];

export default function StaffPage() {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedStaff, setSelectedStaff] = useState<any>(null);

  const filteredStaff = staffList.filter((staff) =>
    staff.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmitStaff = (data: any) => {
    if (mode === "add") {
      console.log("Add Staff:", data);
    } else {
      console.log("Edit Staff:", data); // contains id
    }
  };

  return (
    <section className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-semibold">All Staff</h2>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search anything"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <button
            onClick={() => {
              setMode("add");
              setSelectedStaff(null);
              setOpenModal(true);
            }}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
          >
            Add New Staff
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((staff) => (
          <div
            key={staff.id}
            className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col justify-between"
          >
            {/* Top */}
            <div className="flex gap-4">
              <Image
                src={staff.avatar}
                alt={staff.name}
                width={56}
                height={56}
                className="rounded-full object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{staff.name}</h3>

                <div className="flex gap-2 mt-1 text-xs">
                  <span
                    className={`px-2 py-1 rounded-md ${
                      staff.role === "Admin"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {staff.role}
                  </span>

                  <span
                    className={`px-2 py-1 rounded-md ${
                      staff.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {staff.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Assigned Services */}
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Assigned Services:</p>

              <div className="flex flex-wrap gap-2">
                {staff.services.slice(0, 2).map((service) => (
                  <span
                    key={service}
                    className="px-3 py-1 text-xs rounded-md bg-gray-100"
                  >
                    {service}
                  </span>
                ))}
                {staff.services.length > 2 && (
                  <span className="px-3 py-1 text-xs rounded-md bg-gray-100">
                    +{staff.services.length - 2} more
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 flex items-center gap-3">
              <button
                className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                  staff.status === "Active"
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {staff.status === "Active" ? "Deactivate" : "Activate"}
              </button>

              <button className="p-2 border rounded-lg text-red-500 cursor-pointer">
                <FiTrash2 />
              </button>

              <button
                onClick={() => {
                  setMode("edit");
                  setSelectedStaff(staff);
                  setOpenModal(true);
                }}
                className="p-2 border rounded-lg cursor-pointer"
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
