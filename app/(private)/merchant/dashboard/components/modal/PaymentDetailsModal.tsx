"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { FaApplePay, FaGooglePay } from "react-icons/fa";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function PaymentDetailsModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Payment Details
            </h2>
            <p className="text-sm text-gray-500">
              Enter your card information to start Premium
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Card Number */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              placeholder="1234 5678 9012 3456"
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          {/* Cardholder */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Cardholder Name
            </label>
            <input
              placeholder="John Doe"
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Payment Method
            </label>

            <div className="mt-2 space-y-2">
              {/* Apple Pay */}
              <label className="flex items-center justify-between rounded-lg border p-3 cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" defaultChecked />
                  <span className="text-sm font-medium">Apple Pay</span>
                </div>
                <FaApplePay className="text-2xl text-black" />
              </label>

              {/* Google Pay */}
              <label className="flex items-center justify-between rounded-lg border p-3 cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" />
                  <span className="text-sm font-medium">Google Pay</span>
                </div>
                <FaGooglePay className="text-2xl text-[#4285F4]" />
              </label>
            </div>
          </div>

          {/* Expiry & CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                placeholder="MM/YY"
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">CVV</label>
              <input
                placeholder="123"
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>
          </div>

          {/* Plan */}
          <div className="flex items-center justify-between rounded-lg bg-gray-100 px-4 py-3">
            <span className="text-sm font-medium text-gray-700">
              Premium Plan
            </span>
            <span className="text-sm font-semibold text-gray-900">
              $299/month
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border py-2 text-sm font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button className="flex-1 rounded-lg bg-black py-2 text-sm font-medium text-white hover:bg-black/90">
            Complete Setup
          </button>
        </div>
      </div>
    </div>
  );
}
