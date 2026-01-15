"use client";

import { Search, Eye, Pencil } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Dialog } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { EditProfileDialog } from "./ProfileEditModal";

type MerchantStatus = "active" | "expired";

export type MerchantRow = {
  id: string;
  businessName: string;
  businessAvatar?: string;
  businessType: string;
  email: string;
  package: string;
  planType: string;
  expireDate: string;
  status: MerchantStatus;
};

export const demoMerchants: MerchantRow[] = [
  {
    id: "1",
    businessName: "Luxe beauty",
    businessAvatar: "https://i.pravatar.cc/100?img=12",
    businessType: "Beauty Salon",
    email: "Luxebeauty@gmail.com",
    package: "Premium",
    planType: "Monthly",
    expireDate: "12-01-2026",
    status: "active",
  },
  {
    id: "2",
    businessName: "DXL Sports",
    businessAvatar: "https://i.pravatar.cc/100?img=5",
    businessType: "Sports Academy",
    email: "profitclub@gmail.com",
    package: "Premium",
    planType: "Yearly",
    expireDate: "12-01-2026",
    status: "active",
  },
  {
    id: "3",
    businessName: "Home Renovation",
    businessAvatar: "https://i.pravatar.cc/100?img=32",
    businessType: "Home Service",
    email: "flexihub@gmail.com",
    package: "Premium",
    planType: "Yearly",
    expireDate: "12-01-2026",
    status: "active",
  },
  {
    id: "4",
    businessName: "Expert tech",
    businessAvatar: "https://i.pravatar.cc/100?img=15",
    businessType: "Work-Spaces",
    email: "flexihub@gmail.com",
    package: "Premium",
    planType: "Yearly",
    expireDate: "12-01-2026",
    status: "expired",
  },
  {
    id: "5",
    businessName: "Child Care",
    businessAvatar: "https://i.pravatar.cc/100?img=48",
    businessType: "Children's Nursery",
    email: "homehero@gmail.com",
    package: "Basic",
    planType: "Yearly",
    expireDate: "12-01-2026",
    status: "expired",
  },
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "U";
}

function StatusPill({ status }: { status: MerchantStatus }) {
  const isActive = status === "active";

  return (
    <span
      className={[
        "inline-flex min-w-28 items-center justify-center rounded-xl px-6 py-2 text-sm font-semibold",
        "border",
        isActive
          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
          : "border-red-500 bg-red-50 text-red-600",
      ].join(" ")}
    >
      {isActive ? "Active" : "Expired"}
    </span>
  );
}

export function MerchantManagementCard({
  rows,
  className,
  onViewAll,
  onView,
  onEdit,
}: {
  rows: MerchantRow[];
  className?: string;
  onViewAll?: () => void;
  onView?: (row: MerchantRow) => void;
  onEdit?: (row: MerchantRow) => void;
}) {
  const navigate = useRouter();
  return (
    <Card
      className={[
        "rounded-3xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm",
        className ?? "",
      ].join(" ")}
    >
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <CardTitle className="text-xl font-semibold">
            Marchant Management
          </CardTitle>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search anything"
                className="h-12 rounded-xl pl-10"
              />
            </div>

            <Button
              type="button"
              onClick={onViewAll}
              className="h-12 rounded-xl bg-black hover:bg-black/90 cursor-pointer px-6 text-white"
            >
              View All
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="mb-4">
        <div className="overflow-hidden rounded-2xl border border-muted/40">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="h-14 w-70 pl-8 text-sm font-semibold text-muted-foreground">
                    Business Name
                  </TableHead>
                  <TableHead className="h-14 text-sm font-semibold text-muted-foreground">
                    Business Type
                  </TableHead>
                  <TableHead className="h-14 text-sm font-semibold text-muted-foreground">
                    Email Address
                  </TableHead>
                  <TableHead className="h-14 text-sm font-semibold text-muted-foreground">
                    Package
                  </TableHead>
                  <TableHead className="h-14 text-sm font-semibold text-muted-foreground">
                    Plan Type
                  </TableHead>
                  <TableHead className="h-14 text-sm font-semibold text-muted-foreground">
                    Expire date
                  </TableHead>
                  <TableHead className="h-14 text-sm font-semibold text-muted-foreground">
                    Status
                  </TableHead>
                  <TableHead className="h-14 pr-8 text-sm font-semibold text-muted-foreground">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id} className="h-19.5">
                    {/* Business name + avatar */}
                    <TableCell className="pl-8">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={r.businessAvatar}
                            alt={r.businessName}
                          />
                          <AvatarFallback>
                            {initials(r.businessName)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-base font-medium text-foreground">
                          {r.businessName}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-base text-foreground">
                      {r.businessType}
                    </TableCell>

                    <TableCell className="text-base text-foreground">
                      {r.email}
                    </TableCell>

                    <TableCell className="text-base text-foreground">
                      {r.package}
                    </TableCell>

                    <TableCell className="text-base text-foreground">
                      {r.planType}
                    </TableCell>

                    <TableCell className="text-base text-foreground">
                      {r.expireDate}
                    </TableCell>

                    <TableCell>
                      <StatusPill status={r.status} />
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="pr-8">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            navigate.push("/admin/merchants/profile-view")
                          }
                          className="h-10 w-10 text-muted-foreground hover:text-black rounded-xl border hover:bg-white flex items-center justify-center cursor-pointer"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <button
                              type="button"
                              onClick={() => onEdit?.(r)}
                              className="h-10 w-10 rounded-xl text-muted-foreground hover:text-black border hover:bg-white flex items-center justify-center cursor-pointer"
                            >
                              <Pencil className="h-5 w-5" />
                            </button>
                            {/* <Button variant="outline">Edit Profile</Button> */}
                          </DialogTrigger>
                          <EditProfileDialog />
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {rows.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="py-10 text-center text-muted-foreground"
                    >
                      No merchants found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>

      {/* Pagination UI (same as your old one) */}
      <div className="flex flex-col gap-2 sm:flex-row justify-between items-center px-6 pb-4 border-t border-muted/40">
        <div className="text-sm text-muted-foreground">
          Showing 01-12 of 400 Results
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl px-4 py-2">
            &lt;
          </Button>
          <Button variant="outline" className="rounded-xl px-4 py-2">
            1
          </Button>
          <Button variant="outline" className="rounded-xl px-4 py-2">
            2
          </Button>
          <Button variant="outline" className="rounded-xl px-4 py-2">
            3
          </Button>
          <Button variant="outline" className="rounded-xl px-4 py-2">
            4
          </Button>
          <Button variant="outline" className="rounded-xl px-4 py-2">
            &gt;
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function MerchantManagement() {
  return <MerchantManagementCard rows={demoMerchants} />;
}
