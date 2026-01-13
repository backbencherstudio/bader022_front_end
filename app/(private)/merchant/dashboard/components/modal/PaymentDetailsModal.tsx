"use client";

import { X } from "lucide-react";
import { FaApplePay, FaGooglePay } from "react-icons/fa";

type Props = {
  open: boolean;
  onClose: () => void;
  onNext: () => void;
};

export default function PaymentDetailsModal({ open, onClose, onNext }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-start justify-between border-b px-5 py-4 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Payment Details
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your card information to start Premium
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] space-y-4 overflow-y-auto px-5 py-4">
          {/* Card Number */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Card Number
            </label>
            <input
              placeholder="1234 5678 9012 3456"
              className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-black dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-white"
            />
          </div>

          {/* Cardholder */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Cardholder Name
            </label>
            <input
              placeholder="John Doe"
              className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-black dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-white"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Payment Method
            </label>

            <div className="mt-2 space-y-2">
              {/* Apple Pay */}
              <label className="flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" defaultChecked />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Apple Pay
                  </span>
                </div>
                <FaApplePay className="text-2xl text-black dark:text-white" />
              </label>

              {/* Google Pay */}
              <label className="flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Google Pay
                  </span>
                </div>
                <FaGooglePay className="text-2xl text-[#4285F4]" />
              </label>
            </div>
          </div>

          {/* Expiry & CVV */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Expiry Date
              </label>
              <input
                placeholder="MM/YY"
                className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-black dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-white"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                CVV
              </label>
              <input
                placeholder="123"
                className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-black dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-white"
              />
            </div>
          </div>

          {/* Plan */}
          <div className="flex items-center justify-between rounded-lg bg-gray-100 px-4 py-3 dark:bg-gray-800">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Premium Plan
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              $299/month
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t px-5 py-4 sm:flex-row dark:border-gray-700">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onNext();
              onClose();
            }}
            className="flex-1 rounded-lg bg-black py-2 text-sm font-medium text-white hover:bg-black/90 dark:bg-blue-600 dark:text-black"
          >
            Complete Setup
          </button>
        </div>
      </div>
    </div>
  );
}
