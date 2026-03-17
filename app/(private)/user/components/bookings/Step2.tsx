"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { usePaymentInformationMutation } from "@/redux/features/userDashboard/booking";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Step2 Props Interface
interface Step2Props {
  onNext: () => void;
  onBack: () => void;
  service: {
    id: number;
    name: string;
    duration: number;
    price: number;
    description?: string;
  };
  date?: string;
  time?: string;
}

export default function Step2({
  onNext,
  onBack,
  service,
  date,
  time,
}: Step2Props) {

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


  const [paymentInformation, { isLoading }] = usePaymentInformationMutation();


  const handleBooking = async () => {
    const payload = {
      service_id: service.id,
      staff_id: "",
      date: date,
      time: time,
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
        // Redirect to payment page
        window.location.href = res.payment_url;
      } else {
        // Cash payment: go directly to success page
        if (res?.booking_id) {
          // If you use router inside Step2
          window.location.href = `/booking-success?booking_id=${res.booking_id}`;
        } else {
          onNext(); // fallback
        }
      }
    } catch (err) {
      console.error("Booking Error:", err);
    }
  };

  return (
    <Card className="rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE - Customer Details */}
        <div className="lg:col-span-2 space-y-6">
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

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button onClick={handleBooking} disabled={isLoading}>
              {isLoading ? "Processing..." : "Process Payment"}
            </Button>
          </div>
        </div>

        {/* RIGHT SIDE - Booking Summary */}
        <div className="rounded-xl border border-border overflow-hidden h-fit">
          <div className="bg-[#F4F6F8] dark:bg-gray-900 px-5 sm:px-6 py-4 font-semibold text-sm">
            Booking Summary
          </div>
          <div className="p-5 sm:p-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Service:</span>
              <span className="font-medium">{service.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Date & Time:</span>
              <span className="font-medium">{date} {time}</span>
            </div>
            <div className="flex justify-between">
              <span>Duration:</span>
              <span className="font-medium">{service.duration}</span>
            </div>
            <div className="flex justify-between">
              <span>Price:</span>
              <span className="font-medium">{service.price} SAR</span>
            </div>
            <div className="flex justify-between">
              <span>Pay:</span>
              <span className="font-medium capitalize">{method}</span>
            </div>
            <Button className="cursor-pointer py-2 w-full" >
              Confirm Booking
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}