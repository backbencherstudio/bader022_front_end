import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Step2({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const methods = [
    { id: "card", label: "Credit Card" },
    { id: "paypal", label: "PayPal" },
    { id: "store", label: "Pay at Store" },
  ];

  const [method, setMethod] = useState("card");

  return (
    <Card className="rounded-2xl border border-border p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Details + Payment method */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Details */}
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="bg-[#F4F6F8] px-5 sm:px-6 py-4 font-semibold text-sm">
              Customer Details
            </div>
            <div className="p-5 sm:p-6 space-y-5">
              <div>
                <Label className="text-sm">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  className="mt-2 h-11 rounded-lg"
                  placeholder="Sarah Jones"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    className="mt-2 h-11 rounded-lg"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <Label className="text-sm">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    className="mt-2 h-11 rounded-lg"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm">Special Note (Optional)</Label>
                <Textarea
                  className="mt-2 rounded-lg min-h-[90px]"
                  placeholder="Write a note..."
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="bg-[#F4F6F8] px-5 sm:px-6 py-4 font-semibold text-sm">
              Payment Method
            </div>

            <div className="p-5 sm:p-6 space-y-3">
              {methods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-lg border px-4 py-4 text-sm font-medium text-left transition",
                    method === m.id
                      ? "border-[#111827] bg-[#F9FAFB]"
                      : "border-border hover:border-[#111827]/40"
                  )}
                >
                  <span
                    className={cn(
                      "h-4 w-4 rounded-full border flex items-center justify-center",
                      method === m.id ? "border-[#111827]" : "border-border"
                    )}
                  >
                    {method === m.id && (
                      <span className="h-2 w-2 rounded-full bg-[#111827]" />
                    )}
                  </span>
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Back/Next (desktop hidden, mobile sticky below) */}
          <div className="hidden sm:flex gap-4">
            <Button
              variant="outline"
              className="cursor-pointer py-2"
              onClick={onBack}
            >
              Back
            </Button>
            <Button className="cursor-pointer py-2" onClick={onNext}>
              Proceed to Payment
            </Button>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="rounded-xl border border-border overflow-hidden h-fit">
          <div className="bg-[#F4F6F8] px-5 sm:px-6 py-4 font-semibold text-sm">
            Booking Summary
          </div>
          <div className="p-5 sm:p-6 space-y-3 text-sm">
            {[
              ["Service:", "Haircut & Styling"],
              ["Date & Time:", "2025-11-30 10:00 AM"],
              ["Duration:", "30 min"],
              ["Price:", "$85"],
              ["Pay:", "Credit Card"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <span className="text-[#637381]">{k}</span>
                <span className="font-medium text-[#0B1220] text-right">
                  {v}
                </span>
              </div>
            ))}

            <Button className="cursor-pointer py-2">Proceed to Payment</Button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile sticky CTA */}
      <div className="sm:hidden mt-6 flex gap-3">
        <Button
          variant="outline"
          className="cursor-pointer py-2"
          onClick={onBack}
        >
          Back
        </Button>
        <Button className="cursor-pointer py-2" onClick={onNext}>
          Proceed
        </Button>
      </div>
    </Card>
  );
}
