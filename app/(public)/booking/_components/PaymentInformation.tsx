import React from "react";

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
  onNext: () => void;
}
export default function PaymentInformation({
  details,
  onNext,
}: BookingConfirmedProps) {
  return (
    <section className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-semibold">Payment Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="px-6 py-5 space-y-4">
          {/* Card Number */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              placeholder="Name"
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          {/* Expiry & CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                placeholder="gmail@example.com"
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                placeholder="01723"
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>
          </div>
          {/* Cardholder */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Special Note (Optional)
            </label>
            <input
              placeholder="John Doe"
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
        </div>
        <div>
          <p className="w-full pl-10 items-center justify-center gap-2  bg-[#ebedf3] py-3 text-sm">
            Booking Summary
          </p>
          {/* Booking Details */}
          <div className="border divide-y">
            <DetailRow label="Service" value={details.service} />
            <DetailRow label="Date & Time" value={details.dateTime} />
            <DetailRow label="Staff" value={details.staff} />
            <DetailRow label="Duration" value={details.duration} />
            <DetailRow label="Total Amount" value={details.totalAmount} />
            <DetailRow label="Pay" value={details.paymentMethod} />
          </div>
          <button
            onClick={onNext}
            className="w-full items-center justify-center gap-2 rounded-lg bg-[#0f172a] py-3 text-sm text-white cursor-pointer"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </section>
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
