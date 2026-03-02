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
import { ViewSubscriptionModal } from "./ViewPakagePlanModal";

type PackageStatus = "successful" | "failed";

type SubscriptionApiItem = {
  id: number;
  status: "active" | "pending";
  starts_at: string;
  ends_at: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    email: string;
    store_name: string | null;
    business_logo: string | null;
  };
  plan: {
    id: number;
    name: string;
    price: string;
  };
};

type SubscriptionRow = {
  id: string;
  businessName: string;
  businessAvatar?: string;
  packageName: string;
  planType: string;
  price: string;
  startDate: string;
  expiryDate: string;
  remainingDays: string;
  status: PackageStatus;
};

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

export default function Packages() {
  const { data, isLoading, isError } = useGetSubscriptionsQuery({});

  const rows = (data?.data || []).map((item: any) => ({
    id: String(item.id),
    businessName: item.user.store_name || item.user.name,
    businessAvatar: item.user.business_logo || undefined,
    packageName: item.plan.name,
    planType: "Monthly",
    price: item.plan.price,
    startDate: new Date(item.starts_at).toLocaleDateString(),
    expiryDate: new Date(item.ends_at).toLocaleDateString(),
    remainingDays: `${Math.max(Math.ceil((new Date(item.ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)), 0)} days`,
    status: item.status === "active" ? "successful" : "failed",
  }));

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6 text-red-500">Failed to load</div>;

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