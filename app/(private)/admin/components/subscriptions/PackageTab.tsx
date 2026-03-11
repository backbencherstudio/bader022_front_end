"use client";

import { useState } from "react";
import { SaudiRiyal, Search, RefreshCcw } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

import { useGetSubscriptionsPlanQuery } from "@/redux/features/admin/adminApi";

import { ViewPackage } from "./ViewPackage";
import { PackagePlanUpdateModal } from "./PackagePlanUpdateModal";
import { AddPlan } from "./AddPlan";

type PackageStatus = boolean;

type SubscriptionPlan = {
  id: number;
  name: string;
  package: string;
  price: string;
  title: string;
  created_at: string;
  currency: string;
  day: string;
  status: boolean;
};

function StatusPill({ status }: { status: PackageStatus }) {
  const isSuccess = status;

  return (
    <span
      className={[
        "inline-flex min-w-32 items-center justify-center rounded-xl px-6 py-2 text-sm font-semibold border",
        isSuccess
          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
          : "border-red-500 bg-red-50 text-red-600",
      ].join(" ")}
    >
      {isSuccess ? "Active" : "Inactive"}
    </span>
  );
}

export default function PackageTab() {

  const [filters, setFilters] = useState({
    search: "",
    package: "",
    plan_type: "",
    status: "",
  });

  const { data, isLoading } = useGetSubscriptionsPlanQuery(filters);

  return (
    <div>

      {/* Filters */}

      <div className="mb-6 flex flex-wrap justify-between items-center gap-4 pt-5">

       <div className="flex justify-between w-full items-center ">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

            <Input
              className="pl-8"
              placeholder="Search anything"
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  search: e.target.value,
                }))
              }
            />
          </div>
          <div className="mb-4 flex items-end justify-end">
            <button className="px-4 py-2 cursor-pointer">
              <AddPlan />
            </button>
          </div>
       </div>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl border border-muted/40">

        

        <div className="overflow-x-auto">

          <Table>

            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="pl-8 text-[#777980]">Package Name</TableHead>
                <TableHead className="text-[#777980]">Business Type</TableHead>
                <TableHead className="text-[#777980]">Duration</TableHead>
                <TableHead className="text-[#777980]">Price</TableHead>
                <TableHead className="text-[#777980]">Package Status</TableHead>
                <TableHead className="text-[#777980]">Created On</TableHead>
                <TableHead className="pr-8 text-[#777980]">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>

              {data?.data?.map((plan: SubscriptionPlan) => (
                <TableRow key={plan.id}>

                  <TableCell className="pl-8 font-medium">
                    {plan.name}
                  </TableCell>

                  <TableCell>
                    {plan.package}
                  </TableCell>

                  <TableCell>
                    {plan.day} Days
                  </TableCell>

                  <TableCell className="font-semibold">
                    <div className="flex items-center gap-1">
                      <SaudiRiyal size={14} />
                      {plan.price}
                    </div>
                  </TableCell>

                  <TableCell>
                    <StatusPill status={plan.status} />
                  </TableCell>

                  <TableCell>
                    {new Date(plan.created_at).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="pr-8">
                    <div className="flex gap-3">

                      <button className="h-10 w-10 text-muted-foreground hover:text-black rounded-xl border hover:bg-white flex items-center justify-center cursor-pointer">
                        <ViewPackage id={plan.id} />
                      </button>

                      <PackagePlanUpdateModal
                        id={plan.id}
                        businessName={plan.name}
                      />

                    </div>
                  </TableCell>

                </TableRow>
              ))}

              {data?.data?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center">
                    No subscription plans found.
                  </TableCell>
                </TableRow>
              )}

            </TableBody>

          </Table>

        </div>
      </div>
    </div>
  );
}