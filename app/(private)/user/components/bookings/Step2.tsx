"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { usePaymentInformationMutation } from "@/redux/features/userDashboard/booking";
import { useState } from "react";

export default function Step2({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const methods = [
    { id: "tap", label: "Tap Payment" },
    { id: "cash", label: "Cash" },
  ];

  const [method, setMethod] = useState("tap");

  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    phone: "",
    special_note: "",
  });

  const [paymentInformation, { isLoading }] =
    usePaymentInformationMutation();

  const handleBooking = async () => {
    const payload = {
      service_id: 4,
      staff_id: "",
      date: "2026-03-07",
      time: "03:00 PM",
      customer_name: formData.customer_name,
      email: formData.email,
      phone: formData.phone,
      special_note: formData.special_note,
      payment_method: method,
    };

    try {
      const res = await paymentInformation(payload).unwrap();

      console.log("Booking Success:", res);

   
      if (method === "tap" && res?.payment_url) {
        window.location.href = res.payment_url;
      } else {
       
        onNext();
      }
    } catch (err) {
      console.error("Booking Error:", err);
    }
  };

  return (
    <Card className="rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* Customer Details */}
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="bg-[#F4F6F8] dark:bg-gray-900 px-6 py-4 font-semibold text-sm">
              Customer Details
            </div>

            <div className="p-6 space-y-5">

              <div>
                <Label>Full Name *</Label>
                <Input
                  className="mt-2"
                  placeholder="Your Name"
                  value={formData.customer_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customer_name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Email *</Label>
                  <Input
                    className="mt-2"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label>Phone *</Label>
                  <Input
                    className="mt-2"
                    placeholder="017xxxxxxxx"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <Label>Special Note</Label>
                <Textarea
                  className="mt-2"
                  placeholder="Write a note..."
                  value={formData.special_note}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      special_note: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="bg-[#F4F6F8] dark:bg-gray-900 px-6 py-4 font-semibold text-sm">
              Payment Method
            </div>

            <div className="p-6 space-y-3">
              {methods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-lg border px-4 py-4 text-sm font-medium transition",
                    method === m.id
                      ? "border-black bg-gray-50 dark:bg-gray-900"
                      : "border-border hover:border-black/40"
                  )}
                >
                  <span
                    className={cn(
                      "h-4 w-4 rounded-full border flex items-center justify-center",
                      method === m.id ? "border-black" : "border-border"
                    )}
                  >
                    {method === m.id && (
                      <span className="h-2 w-2 rounded-full bg-black" />
                    )}
                  </span>

                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>

            <Button
              onClick={handleBooking}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Process Payment"}
            </Button>
          </div>
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div className="rounded-xl border border-border overflow-hidden h-fit">
          <div className="bg-[#F4F6F8] dark:bg-gray-900 px-6 py-4 font-semibold text-sm">
            Booking Summary
          </div>

          <div className="p-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Service:</span>
              <span className="font-medium">Haircut & Styling</span>
            </div>

            <div className="flex justify-between">
              <span>Date & Time:</span>
              <span className="font-medium">2026-03-07 03:00 PM</span>
            </div>

            <div className="flex justify-between">
              <span>Duration:</span>
              <span className="font-medium">30 min</span>
            </div>

            <div className="flex justify-between">
              <span>Price:</span>
              <span className="font-medium">$85</span>
            </div>

            <div className="flex justify-between">
              <span>Payment:</span>
              <span className="font-medium capitalize">{method}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}