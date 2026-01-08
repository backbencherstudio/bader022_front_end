"use client";

import React from "react";
import { FiCheck, FiDownload, FiArrowUpRight } from "react-icons/fi";

type BookingDetails = {
  bookingId: string;
  service: string;
  dateTime: string;
  staff: string;
  duration: string;
  totalAmount: string;
  paymentMethod: string;
};

interface BookingConfirmedProps {
  details: BookingDetails;
  onDownloadInvoice?: () => void;
  onGoToDashboard?: () => void;
}

export default function BookingConfirmed({
  details,
  onDownloadInvoice,
  onGoToDashboard,
}: BookingConfirmedProps) {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-3xl rounded-xl border bg-white p-6 space-y-6">
        {/* Header */}
        <div className="rounded-lg bg-gray-50 py-3 text-center">
          <h2 className="font-medium text-sm">Booking Confirmed!</h2>
          <p className="text-xs text-gray-500 mt-1">
            Booking ID: <span className="font-medium">{details.bookingId}</span>
          </p>
        </div>

        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="relative flex size-20 items-center justify-center rounded-full bg-[#eef2ff]">
            <div className="flex size-12 items-center justify-center rounded-full bg-[#6366f1]">
              <FiCheck className="text-white text-2xl" />
            </div>
          </div>
        </div>

        {/* Message */}
        <p className="text-center text-sm text-gray-600 max-w-xl mx-auto">
          Your appointment is successfully booked. A confirmation email with a
          temporary password has been sent. Use it to log in and manage your
          booking.
        </p>

        {/* Booking Details */}
        <div className="rounded-lg border divide-y">
          <DetailRow label="Service" value={details.service} />
          <DetailRow label="Date & Time" value={details.dateTime} />
          <DetailRow label="Staff" value={details.staff} />
          <DetailRow label="Duration" value={details.duration} />
          <DetailRow label="Total Amount" value={details.totalAmount} />
          <DetailRow label="Pay" value={details.paymentMethod} />
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={onDownloadInvoice}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#0f172a] py-3 text-sm text-white"
          >
            <FiDownload />
            Download Invoice
          </button>

          <button
            onClick={onGoToDashboard}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg border py-3 text-sm"
          >
            Go to Dashboard
            <FiArrowUpRight />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Helper ---------- */

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 text-sm">
      <span className="text-gray-500">{label}:</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}
