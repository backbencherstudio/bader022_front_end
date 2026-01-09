import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Step3({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <Card className="rounded-2xl border border-border p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card Info */}
        <div className="lg:col-span-2 rounded-xl border border-border overflow-hidden">
          <div className="bg-[#F4F6F8] dark:bg-black px-5 sm:px-6 py-4 font-semibold text-sm">
            Payment
          </div>
          <div className="p-5 sm:p-6 space-y-5">
            <div>
              <Label className="text-sm">
                Card Number <span className="text-red-500">*</span>
              </Label>
              <Input
                className="mt-2 h-11 rounded-lg"
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">
                  Expiry Date <span className="text-red-500">*</span>
                </Label>
                <Input className="mt-2 h-11 rounded-lg" placeholder="MM/YY" />
              </div>

              <div>
                <Label className="text-sm">
                  CVV <span className="text-red-500">*</span>
                </Label>
                <Input className="mt-2 h-11 rounded-lg" placeholder="123" />
              </div>
            </div>

            <div>
              <Label className="text-sm">Cardholder Name</Label>
              <Input className="mt-2 h-11 rounded-lg" placeholder="John Doe" />
            </div>

            <div className="hidden sm:flex gap-4 pt-2">
              <Button
                variant="outline"
                className="cursor-pointer py-2"
                onClick={onBack}
              >
                Back
              </Button>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="rounded-xl border border-border overflow-hidden h-fit">
          <div className="bg-[#F4F6F8] dark:bg-black px-5 sm:px-6 py-4 font-semibold text-sm">
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
                <span>{k}</span>
                <span className="font-medium text-right">{v}</span>
              </div>
            ))}

            <Button className="cursor-pointer py-2" onClick={onNext}>
              Confirm Booking
            </Button>
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
          Confirm
        </Button>
      </div>
    </Card>
  );
}
