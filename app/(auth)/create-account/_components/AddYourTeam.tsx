"use client";

import StaffModal from "@/app/(private)/merchant/dashboard/components/modal/StaffModal";
import Image from "next/image";
import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

type Step3Data = {
  serviceName: string;
};

interface Step3Props {
  data: Step3Data;
  onNext: (values: Step3Data) => void;
  onPrevious: () => void;
}

export default function AddYourTeam({ data, onNext, onPrevious }: Step3Props) {
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedStaff, setSelectedStaff] = useState<any>(null);

  const handleSubmitStaff = (data: any) => {
    if (mode === "add") {
      console.log("Add Staff:", data);
    } else {
      console.log("Edit Staff:", data);
    }
  };
  return (
    <div className="space-y-8">
      {/* Empty State */}
      <div className="border border-dashed rounded-xl p-10 text-center space-y-4">
        <div className="mx-auto flex size-10 items-center justify-center rounded-full border">
          +
        </div>

        <div>
          <h3 className="font-medium text-base">No team members yet</h3>
          <p className="text-sm text-gray-500">
            Add your first staff member to get started
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              setMode("add");
              setSelectedStaff(null);
              setOpenModal(true);
            }}
            className="rounded-md bg-black px-5 py-2 text-sm text-white"
          >
            Add Staff Member
          </button>
          <button
            onClick={() => onNext(data)}
            className="rounded-md border px-5 py-2 text-sm"
          >
            Skip for Now
          </button>
        </div>
      </div>

      {/* Services Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg">Your Staff Member</h3>
        <button
          onClick={() => {
            setMode("add");
            setSelectedStaff(null);
            setOpenModal(true);
          }}
          className="rounded-md bg-black px-4 py-2 text-sm text-white"
        >
          + Add Staff
        </button>
      </div>

      {/* Service Cards */}
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div
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
              src="/images/staffs/staff2.png"
              alt="John Smith"
              width={56}
              height={56}
              className="rounded-full object-cover"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                John Smith
              </h3>

              <div className="flex gap-2 mt-1 text-xs">
                <span
                  className={`px-2 py-1 rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400
                        
                    }`}
                >
                  Admin
                </span>
                <span
                  className={`px-2 py-1 rounded-md bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400
                       
                    }`}
                >
                  Inactive
                </span>
              </div>
            </div>
          </div>

          {/* Assigned Services */}
          <div className="mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Assigned Services:
            </p>

            <div className="flex flex-wrap gap-2">
              <span
                className="
                            px-3 py-1 text-xs rounded-md
                            bg-gray-100 dark:bg-gray-700
                            text-gray-700 dark:text-gray-300
                          "
              >
                Haircut & Styling
              </span>
              <span
                className="
                            px-3 py-1 text-xs rounded-md
                            bg-gray-100 dark:bg-gray-700
                            text-gray-700 dark:text-gray-300
                          "
              >
                Hair Coloring
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-5 flex items-center gap-3">
            <button
              className={`flex-1 py-2 rounded-lg text-sm font-medium 
                          bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400
                      }`}
            >
              Deactivate
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
                // setSelectedStaff(staff);
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
        <div
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
              src="/images/staffs/staff2.png"
              alt="John Smith"
              width={56}
              height={56}
              className="rounded-full object-cover"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                John Smith
              </h3>

              <div className="flex gap-2 mt-1 text-xs">
                <span
                  className={`px-2 py-1 rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400
                        
                    }`}
                >
                  Admin
                </span>
                <span
                  className={`px-2 py-1 rounded-md bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400
                       
                    }`}
                >
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Assigned Services */}
          <div className="mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Assigned Services:
            </p>

            <div className="flex flex-wrap gap-2">
              <span
                className="
                            px-3 py-1 text-xs rounded-md
                            bg-gray-100 dark:bg-gray-700
                            text-gray-700 dark:text-gray-300
                          "
              >
                Haircut & Styling
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-5 flex items-center gap-3">
            <button
              className={`flex-1 py-2 rounded-lg text-sm font-medium 
                          bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400
                      }`}
            >
              Deactivate
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
                // setSelectedStaff(staff);
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
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between pt-6">
        <button
          onClick={onPrevious}
          className="rounded-md border px-6 py-2 text-sm cursor-pointer"
        >
          Back
        </button>

        <button
          onClick={() => onNext(data)}
          className="rounded-md bg-black px-6 py-2 text-sm text-white cursor-pointer"
        >
          Continue to Plan Selection
        </button>
      </div>

      <StaffModal
        open={openModal}
        mode={mode}
        initialData={selectedStaff}
        onClose={() => setOpenModal(false)}
        onSubmitStaff={handleSubmitStaff}
      />
    </div>
  );
}
