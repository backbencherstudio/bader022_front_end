"use client";

import { Eye, RefreshCcw, SaudiRiyal, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { useGetSubscriptionsQuery } from "@/redux/features/admin/adminApi";
import { AddPlan } from "./AddPlan";
import PackageTab from "./PackageTab";
import { EditSubscriptionModal } from "./EditSubscriptionModal";
import { ViewSubscriptionModal } from "./ViewSubscriptionModal";
import { useState } from "react";

type PackageStatus =
  | "active"
  | "pending"
  | "expired"
  | "cancelled";

type SubscriptionApiItem = {
  id: number;
  status: "active" | "pending";
  starts_at: string;
  expiry_date: string;
  start_date: string;
  remaining_days: number;
  user: {
    id: number;
    name: string;
    email: string;
    business_name: string | null;
    business_logo: string | null;
  };
  plan: {
    id: number;
    name: string;
    price: string;
    package:string;
    remaining_days:number;
    plan_type:string;
  };
};

type SubscriptionRow = {
  id: string;
  businessName: string;
  businessAvatar?: string;
  packageName: string;
  plan_type: string;
  price: string;
  start_date: string;
  expiry_date: string;
  remaining_days: number;
  status: PackageStatus;
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

function StatusPill({ status }: { status: PackageStatus }) {
  const statusConfig = {
    active: {
      label: "Active",
      className:
        "border-emerald-500 bg-emerald-50 text-emerald-700",
    },
    pending: {
      label: "Pending",
      className:
        "border-amber-500 bg-amber-50 text-amber-700",
    },
    expired: {
      label: "Expired",
      className:
        "border-red-500 bg-red-50 text-red-600",
    },
    cancelled: {
      label: "Cancelled",
      className:
        "border-gray-500 bg-gray-100 text-gray-600",
    },
  } as const;

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex min-w-32 items-center justify-center rounded-xl px-6 py-2 text-sm font-semibold border ${config.className}`}
    >
      {config.label}
    </span>
  );
}

export default function Packages() {
  const [filters, setFilters] = useState({
    search: "",     
    package: "",
    status: "",
    plan_type: "",
  });
  const { data, isLoading, isError } = useGetSubscriptionsQuery(filters);

  const rows: SubscriptionRow[] = (data?.data || []).map(
    (item: SubscriptionApiItem) => {
      const now = new Date();
      const endDate = new Date(item.expiry_date);

     
      return {
        id: String(item.id),
        businessName: item.user.business_name || item.user.name,
        businessAvatar: item.user.business_logo || undefined,
        packageName: item.plan.package,
        planType: item.plan.plan_type,
        price: item.plan.price,
        startDate: new Date(item.start_date).toLocaleDateString(),
        expiryDate: new Date(item.expiry_date).toLocaleDateString(),
        remainingDays: `${item.remaining_days} days`,
        status: item?.status,
      };
    }
  );

  return (
    <div>
      <div className="w-full rounded-xl p-4 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
        <Tabs defaultValue="active_subscription">
          <div className="flex justify-between">
            <TabsList className="h-14 p-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
              <TabsTrigger
                value="packages"
                className="data-[state=active]:bg-black cursor-pointer data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black"
              >
                Packages
              </TabsTrigger>
              <TabsTrigger
                value="active_subscription"
                className="data-[state=active]:bg-black cursor-pointer data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black"
              >
                Active Subscription
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="mb-6 flex flex-wrap justify-between items-center gap-4 pt-5">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-8"
                placeholder="Search anything"
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    package: e.target.value,
                  }))
                }
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Select
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    package: value === "all" ? "" : value,
                  }))
                }
              >
                <SelectTrigger className="h-12 w-44">
                  <SelectValue placeholder="Package" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Basic">Basic</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    plan_type: value === "all" ? "" : value,
                  }))
                }
              >
                <SelectTrigger className="h-12 w-44">
                  <SelectValue placeholder="Plan Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                {/* <SelectTrigger className="h-12 w-44">
                  <SelectValue placeholder="Subscription Status" />
                </SelectTrigger> */}
                <Select
                  onValueChange={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      status: value === "all" ? "" : value,
                    }))
                  }
                >
                  <SelectTrigger className="h-12 w-44">
                    <SelectValue placeholder="Subscription Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </Select>

              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() =>
                  setFilters({
                  search:"",
                    package: "",
                    status: "",
                    plan_type: "",
                  })
                }
              >
                <RefreshCcw />
              </Button>
            </div>
          </div>

          <TabsContent value="packages">
            <div className="mb-4 flex items-end justify-end">
              <button className="px-4 py-2 cursor-pointer">
                <AddPlan />
              </button>
            </div>
            <PackageTab />
          </TabsContent>

          <TabsContent value="active_subscription">
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
                    {rows.map((r: any) => (
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

                        <TableCell>{r.packageName}</TableCell>
                        <TableCell>{r.planType}</TableCell>

                        <TableCell className="font-semibold">
                          <div className="flex items-center">
                            <SaudiRiyal size={14} />
                            {r.price}
                          </div>
                        </TableCell>

                        <TableCell>{r.startDate}</TableCell>
                        <TableCell>{r.expiryDate}</TableCell>
                        <TableCell>{r.remainingDays}</TableCell>

                        <TableCell>
                          <StatusPill status={r.status} />
                        </TableCell>

                        <TableCell className="pr-8">
                          <div className="flex gap-3">
                            <ViewSubscriptionModal id={r.id} />
                            <EditSubscriptionModal id={r.id} businessName={r.businessName} />
                          </div>
                          
                        </TableCell>
                      </TableRow>
                    ))}

                    {rows.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={9} className="py-10 text-center">
                          No subscription found.
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