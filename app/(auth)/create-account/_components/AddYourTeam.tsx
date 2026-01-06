"use client";

import Image from "next/image";
import React from "react";

type Step3Data = {
  serviceName: string;
};

interface Step3Props {
  data: Step3Data;
  onNext: (values: Step3Data) => void;
  onPrevious: () => void;
}

export default function AddYourTeam({ data, onNext, onPrevious }: Step3Props) {
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
          <button className="rounded-md bg-black px-5 py-2 text-sm text-white">
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
        <button className="rounded-md bg-black px-4 py-2 text-sm text-white">
          + Add Staff
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
    </div>
  );
}
