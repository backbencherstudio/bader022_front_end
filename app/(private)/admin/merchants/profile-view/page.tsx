"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaBackward } from "react-icons/fa";
import { useRouter } from "next/navigation";

type InfoFieldProps = {
  label: string;
  value: string;
};

export function InfoField({ label, value }: InfoFieldProps) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <Input value={value} readOnly className="bg-muted/40" />
    </div>
  );
}

export default function Page() {
  const navigate = useRouter();
  return (
    <div className="max-w-5xl space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-semibold">Merchant Details</h1>
          <p className="text-sm text-muted-foreground">
            View & manage merchant information
          </p>
        </div>
        <Button className="cursor-pointer" onClick={() => navigate.back()}>
          <FaBackward />
          Back
        </Button>
      </div>

      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Business Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Business header */}
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/images/user1.png" />
              <AvatarFallback>LB</AvatarFallback>
            </Avatar>

            <div>
              <p className="font-medium">Luxe beauty</p>
              <p className="text-sm text-muted-foreground">Beauty Salon</p>
            </div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoField label="Owner Name" value="Jane Smith" />
            <InfoField label="Phone" value="+1 (555) 123-4567" />
            <InfoField label="Email" value="luxebeauty@gmail.com" />
            <InfoField
              label="Location"
              value="123 Main St, New York, NY 10001"
            />
            <InfoField label="Website Domain" value="https://bokli.io/dfg" />
            <InfoField label="Hosting Status" value="Active" />
            <InfoField label="Platform Status" value="Live" />
            <InfoField label="Platform Access" value="Enabled" />
          </div>
        </CardContent>
      </Card>

      {/* Package Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Package Info</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoField label="Current Package" value="Basic" />
            <InfoField label="Package Duration" value="Monthly" />
            <InfoField label="Package Start date" value="12-12-2025" />
            <InfoField label="Expire date" value="12-01-2026" />
            <InfoField label="Remaining Days" value="30 days" />
            <InfoField label="Package Status" value="Active" />
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Payment History</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoField label="Invoice ID" value="INV-2025-0012" />
            <InfoField label="Payment Date" value="12-12-2025" />
            <InfoField label="Amount Paid" value="$139" />
            <div className="space-y-1">
              <InfoField label="Payment Status" value="Paid" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
