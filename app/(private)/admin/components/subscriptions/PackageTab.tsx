import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Eye, SaudiRiyal } from "lucide-react";

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

export default function PackageTab() {
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
              {demoPayments.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="pl-8 font-medium">{r.id}</TableCell>
                  <TableCell>{r.merchantName}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={r.businessAvatar} />
                        <AvatarFallback>
                          {initials(r.businessName)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{r.businessName}</span>
                    </div>
                  </TableCell>

                  <TableCell className="font-semibold">
                    <div className="flex items-center">
                      <SaudiRiyal size={14} />
                      {r.amount}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusPill status={r.status} />
                  </TableCell>
                  <TableCell>{r.date}</TableCell>

                  <TableCell className="pr-8">
                    <div className="flex gap-3">
                      <button className="h-10 w-10 text-muted-foreground hover:text-black rounded-xl border hover:bg-white flex items-center justify-center cursor-pointer">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="h-10 w-10 text-muted-foreground hover:text-black rounded-xl border hover:bg-white flex items-center justify-center cursor-pointer">
                        <Edit className="h-5 w-5" />
                      </button>
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
    </div>
  );
}
