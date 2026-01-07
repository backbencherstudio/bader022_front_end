"use client";

import ServiceModal from "@/app/(private)/merchant/dashboard/components/modal/ServiceModal";
import Image from "next/image";
import React, { useState } from "react";

type Step2Data = {
  serviceName: string;
};

interface Step2Props {
  data: Step2Data;
  onNext: (values: Step2Data) => void;
  onPrevious: () => void;
}

export default function AddYourServices({
  data,
  onNext,
  onPrevious,
}: Step2Props) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedService, setSelectedService] = useState<any>(null);

  const handleSubmitService = (data: any) => {
    if (mode === "add") {
      console.log("Add Service:", data);
    } else {
      console.log("Edit Service:", data);
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
          <h3 className="font-medium text-base">No services yet</h3>
          <p className="text-sm text-gray-500">
            Add your first service to get started
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              setMode("add");
              setSelectedService(null);
              setOpenModal(true);
            }}
            className="rounded-md bg-black px-5 py-2 text-sm text-white"
          >
            Add Service
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
        <h3 className="font-medium text-lg">Your Services</h3>
        <button
          onClick={() => {
            setMode("add");
            setSelectedService(null);
            setOpenModal(true);
          }}
          className="rounded-md bg-black px-4 py-2 text-sm text-white"
        >
          + Add Service
        </button>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card */}
        <div className="rounded-xl border overflow-hidden">
          <Image
            src="/images/mini-site/service1.png"
            alt="Hair Treatment"
            width={600}
            height={160}
            className="w-full h-40 object-cover rounded-t-xl"
          />

          <div className="p-4 space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>⏱ 30 min</span>
              <span>109 SAR</span>
            </div>

            <h4 className="font-medium">Hair Treatment</h4>

            <p className="text-sm text-gray-500">
              Improvement How Small Consistency Leads to Monumental Results.
            </p>

            <div className="flex gap-4 pt-2">
              <button className="rounded-md bg-black px-6 py-2 text-sm text-white font-medium">
                {" "}
                Edit
              </button>
              <button className="rounded-md bg-gray-200 px-6 py-2 text-red-500 font-medium">
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-xl border overflow-hidden">
          <Image
            src="/images/mini-site/service1.png"
            alt="Body Massage"
            width={600}
            height={160}
            className="w-full h-40 object-cover rounded-t-xl"
          />

          <div className="p-4 space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>⏱ 1 hour</span>
              <span>120 SAR</span>
            </div>

            <h4 className="font-medium">Body Massage</h4>

            <p className="text-sm text-gray-500">
              Improvement How Small Consistency Leads to Monumental Results.
            </p>

            <div className="flex gap-4 pt-2">
              <button
                onClick={() => {
                  setMode("edit");
                  // setSelectedService(service);
                  setOpenModal(true);
                }}
                className="rounded-md bg-black px-6 py-2 text-sm text-white font-medium"
              >
                {" "}
                Edit
              </button>
              <button className="rounded-md bg-gray-200 px-6 py-2 text-red-500 font-medium">
                Delete
              </button>
            </div>
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
          Continue to Staff
        </button>
      </div>

      <ServiceModal
        open={openModal}
        mode={mode}
        initialData={selectedService}
        onClose={() => setOpenModal(false)}
        onSubmitService={handleSubmitService}
      />
    </div>
  );
}
