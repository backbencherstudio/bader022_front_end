"use client";

import { Eye, Pencil, RefreshCcw, SaudiRiyal, Search } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { EditSubscriptionModal } from "./EditSubscriptionModal";
import PackageTab from "./PackageTab";

// import { PaymentDetails, PaymentModal } from "./PaymentModal";

/* ---------------- Types ---------------- */

type PackageStatus = "successful" | "failed";

export type PackageRow = {
  id: string;
  merchantName: string;
  businessName: string;
  businessAvatar?: string;
  packageName: string;
  date: string;
  amount: string;
  paymentMethod: string;
  status: PackageStatus;
};

/* ---------------- Demo Data ---------------- */

export const demoPayments: PackageRow[] = [
  {
    id: "#TXOO1",
    merchantName: "Ralph Edwards",
    businessName: "Luxe beauty",
    businessAvatar: "https://i.pravatar.cc/100?img=12",
    packageName: "Basic plan",
    date: "Jun 12, 2023",
    amount: "120",
    paymentMethod: "Paypal",
    status: "successful",
  },
  {
    id: "#TXOO4",
    merchantName: "Theresa Webb",
    businessName: "Expert tech",
    businessAvatar: "https://i.pravatar.cc/100?img=15",
    packageName: "Basic plan",
    date: "Jun 15, 2023",
    amount: "90",
    paymentMethod: "Google Pay",
    status: "failed",
  },
];

/* ---------------- Helpers ---------------- */

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

function StatusPill({ status }: { status: PackageStatus }) {
  const isSuccess = status === "successful";

  return (
    <span
      className={[
        "inline-flex min-w-32 items-center justify-center rounded-xl px-6 py-2 text-sm font-semibold border",
        isSuccess
          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
          : "border-red-500 bg-red-50 text-red-600",
      ].join(" ")}
    >
      {isSuccess ? "Successful" : "Failed"}
    </span>
  );
}

/* ---------------- Component ---------------- */

export default function Packages() {
  return (
    <div>
      <div className="w-full rounded-xl p-4 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
        <Tabs defaultValue="active_subscription">
          <div className="flex justify-between">
            <TabsList className="h-14 p-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
              <TabsTrigger
                value="packages"
                className="
      data-[state=active]:bg-black cursor-pointer data-[state=active]:text-white
      dark:data-[state=active]:bg-white dark:data-[state=active]:text-black
    "
              >
                Packages
              </TabsTrigger>

              <TabsTrigger
                value="active_subscription"
                className="
      data-[state=active]:bg-black cursor-pointer data-[state=active]:text-white
      dark:data-[state=active]:bg-white dark:data-[state=active]:text-black
    "
              >
                Active Subscription
              </TabsTrigger>
            </TabsList>
          </div>
          {/* Filter Bar */}
          <div className="mb-6 flex flex-wrap justify-between items-center gap-4 pt-5">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search anything"
                className="h-10 rounded-xl pl-10"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select>
                <SelectTrigger className="h-12 w-44">
                  <SelectValue placeholder="Package" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="h-12 w-44">
                  <SelectValue placeholder="Plan Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-12 w-44">
                  <SelectValue placeholder="Subscription Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="successful">Successful</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="cursor-pointer">
                <RefreshCcw /> Refresh
              </Button>
            </div>
          </div>
          <TabsContent value="packages">
            <div className="mb-4 flex items-end justify-end">
              <button className="px-4 py-2 border text-muted-foreground rounded-lg cursor-pointer">
                Add Plan
              </button>
            </div>
            <PackageTab />
          </TabsContent>
          <TabsContent value="active_subscription">
            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-muted/40">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead className="pl-8">Business Name</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead>Plan Type</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Expiry date</TableHead>
                      <TableHead className="pr-8">Remaining Days</TableHead>
                      <TableHead className="pr-8">
                        Subscription Status
                      </TableHead>
                      <TableHead className="pr-8">Action</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {demoPayments.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={r.businessAvatar} />
                              <AvatarFallback>
                                {initials(r.businessName)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">
                              {r.businessName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{r.merchantName}</TableCell>
                        <TableCell>Monthly</TableCell>

                        <TableCell className="font-semibold">
                          <div className="flex items-center">
                            <SaudiRiyal size={14} />
                            {r.amount}
                          </div>
                        </TableCell>
                        <TableCell>{r.date}</TableCell>
                        <TableCell>{r.date}</TableCell>
                        <TableCell>30days</TableCell>
                        <TableCell>
                          <StatusPill status={r.status} />
                        </TableCell>

                        <TableCell className="pr-8">
                          <div className="flex gap-3">
                            <button className="h-10 w-10 text-muted-foreground hover:text-black rounded-xl border hover:bg-white flex items-center justify-center cursor-pointer">
                              <Eye className="h-5 w-5" />
                            </button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <button
                                  type="button"
                                  //   onClick={() => onEdit?.(r)}
                                  className="h-10 w-10 text-muted-foreground hover:text-black rounded-xl border hover:bg-white flex items-center justify-center cursor-pointer"
                                >
                                  <Pencil className="h-5 w-5" />
                                </button>
                                {/* <Button variant="outline">Edit Profile</Button> */}
                              </DialogTrigger>
                              <EditSubscriptionModal />
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}

                    {demoPayments.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={9} className="py-10 text-center">
                          No payment history found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
