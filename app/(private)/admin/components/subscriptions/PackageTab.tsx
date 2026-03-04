import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetSubscriptionsIdQuery, useGetSubscriptionsPlanQuery } from "@/redux/features/admin/adminApi";
import { Edit, Eye, SaudiRiyal } from "lucide-react";
import { EditSubscriptionModal } from "./EditSubscriptionModal";
import { ViewSubscriptionModal } from "./ViewSubscriptionModal";
import { ViewPackage } from "./ViewPackage";
import { PackagePlanUpdateModal } from "./PackagePlanUpdateModal";

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
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

function StatusPill({ status }: { status: PackageStatus }) {
  const isSuccess = status ;

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
  const { data, isLoading, isError } = useGetSubscriptionsPlanQuery({});


  // console.log(data, "data show")

  return (
    <div>
      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-muted/40">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="pl-8">Package Name</TableHead>
                <TableHead>Business Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Package Status</TableHead>
                <TableHead>Created On</TableHead>
                <TableHead className="pr-8">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.data?.map((plan: SubscriptionPlan) => (
                <TableRow key={plan.id}>
                  {/* Package Name */}
                  <TableCell className="pl-8 font-medium">
                    {plan.name}
                  </TableCell>

                  {/* Business Type (Package Type) */}
                  <TableCell>
                    {plan.package}
                  </TableCell>

                  {/* Duration */}
                  <TableCell>
                    {plan.day} Days
                  </TableCell>

                  {/* Price */}
                  <TableCell className="font-semibold">
                    <div className="flex items-center gap-1">
                      <SaudiRiyal size={14} />
                      {plan.price}
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <StatusPill
                      status={plan.status }
                    />
                  </TableCell>

                  {/* Created On */}
                  <TableCell>
                    {new Date(plan.created_at).toLocaleDateString()}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="pr-8">
                    <div className="flex gap-3">
                      <button className="h-10 w-10 text-muted-foreground hover:text-black rounded-xl border hover:bg-white flex items-center justify-center cursor-pointer">
                        <ViewPackage id={plan.id} />
                      </button>
                
                      <PackagePlanUpdateModal id={plan.id} businessName={plan.name} />
                  
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
