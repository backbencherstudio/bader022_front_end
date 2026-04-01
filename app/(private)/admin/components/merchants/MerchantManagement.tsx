"use client";

import { Eye, Pencil, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { EditProfileDialog } from "./ProfileEditModal";
import { DataPagination } from "@/app/(private)/components/reusable/Pagination";
import { useGetAllMerchantsQuery } from "@/redux/features/admin/adminApi";

type MerchantStatus = "active" | "pending" | "expired" | "cancelled";

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

function initials(name: string) {
  const parts = name?.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "U";
}

function StatusPill({ status }: { status: MerchantStatus }) {
  const statusConfig = {
    active: {
      label: "Active",
      className: "border-emerald-500 bg-emerald-50 text-emerald-700",
    },
    pending: {
      label: "Pending",
      className: "border-amber-500 bg-amber-50 text-amber-700",
    },
    expired: {
      label: "Expired",
      className: "border-red-500 bg-red-50 text-red-600",
    },
    cancelled: {
      label: "Cancelled",
      className: "border-gray-500 bg-gray-100 text-gray-600",
    },
  } as const;

  const config = statusConfig[status] ?? statusConfig.pending;

  return (
    <span
      className={`inline-flex min-w-28 items-center justify-center rounded-xl px-6 py-2 text-sm font-semibold border ${config.className}`}
    >
      {config.label}
    </span>
  );
}

export function MerchantManagementCard({
  rows,
  className,
  search,
  setSearch,
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
}: {
  rows: MerchantRow[];
  className?: string;
  search: string;
  setSearch: (value: string) => void;
  totalItems: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}) {
  const navigate = useRouter();
  const [openId, setOpenId] = useState<string | null>(null);

  // Calculate paginated data
  const paginatedRows = rows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

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
            Merchant Management
          </CardTitle>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search anything"
                className="h-12 rounded-xl pl-10 w-64"
              />
            </div>

            <Button
              type="button"
              onClick={() => {
                setSearch("");
              }}
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
                {paginatedRows?.map((r) => (
                  <TableRow key={r.id} className="h-15.5">
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
                        <span className="  ">{r.businessName}</span>
                      </div>
                    </TableCell>

                    <TableCell className="">{r.businessType}</TableCell>

                    <TableCell className="">{r.email}</TableCell>

                    <TableCell className="">{r.package}</TableCell>

                    <TableCell className="">{r.planType}</TableCell>

                    <TableCell className="">{r.expireDate}</TableCell>

                    <TableCell>
                      <StatusPill status={r.status} />
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="pr-8">
                      <div className="flex items-center gap-1">
                        {/* View Button */}
                        <button
                          type="button"
                          onClick={() =>
                            navigate.push(`/admin/merchants/${r.id}`)
                          }
                          className="h-10 w-10 text-muted-foreground hover:text-black rounded-xl border hover:bg-white flex items-center justify-center cursor-pointer"
                        >
                          <Eye className="h-5 w-5" />
                        </button>

                        {/* Edit Dialog */}
                        <Dialog
                          open={openId === r.id}
                          onOpenChange={(open) => setOpenId(open ? r.id : null)}
                        >
                          <DialogTrigger asChild>
                            <button
                              type="button"
                              onClick={() => setOpenId(r.id)}
                              className="h-10 w-10 rounded-xl text-muted-foreground hover:text-black border hover:bg-white flex items-center justify-center cursor-pointer"
                            >
                              <Pencil className="h-5 w-5" />
                            </button>
                          </DialogTrigger>

                          <EditProfileDialog
                            id={r.id}
                            onClose={() => setOpenId(null)}
                          />
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {paginatedRows?.length === 0 && (
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

      {/* Pagination */}
      <div className="px-6 pb-6">
        <DataPagination
          totalItems={totalItems}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>
    </Card>
  );
}

export default function MerchantManagement() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10; // You can adjust this value

  const { data, isLoading, isError } = useGetAllMerchantsQuery({
    search,
  });

  // console.log(data, "proper");

  // Transform backend response → MerchantRow[]
  const merchants: MerchantRow[] =
    data?.data?.map((item: any) => {
      return {
        id: String(item.id),
        businessName: item.user?.name ?? "N/A",
        businessAvatar: item.user?.image ?? undefined,
        businessType: item.user?.business_category ?? "N/A",
        email: item.user?.email ?? "N/A",
        package: item.plan?.name ?? "N/A",
        planType: item.plan?.package ?? "N/A",
        expireDate: item.ends_at
          ? new Date(item.ends_at).toLocaleDateString()
          : "N/A",
        status: item?.status ?? "inactive",
      };
    }) ?? [];

  // Get total items from the full merchants array
  const totalItems = merchants.length;

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  if (isLoading) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Loading merchants...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load merchants.
      </div>
    );
  }

  return (
    <MerchantManagementCard
      rows={merchants}
      search={search}
      setSearch={setSearch}
      totalItems={totalItems}
      currentPage={page}
      pageSize={pageSize}
      onPageChange={setPage}
    />
  );
}
