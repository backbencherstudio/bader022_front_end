// "use client";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { useGetSingleMerchantByIdQuery } from "@/redux/features/admin/adminApi";
// import { useParams, useRouter } from "next/navigation";
// import { FaBackward } from "react-icons/fa";

// type InfoFieldProps = {
//   label: string;
//   value: string;
// };

// export function InfoField({ label, value }: InfoFieldProps) {
//   return (
//     <div className="space-y-1">
//       <p className="text-xs text-muted-foreground">{label}</p>
//       <Input value={value} readOnly className="bg-muted/40" />
//     </div>
//   );
// }

// export default function Page() {
//   const navigate = useRouter();
//   const params = useParams();
//   const id = params?.id as string;

//   const { data, isLoading, isError } = useGetSingleMerchantByIdQuery(id);

//   if (isLoading) return <div className="p-6">Loading merchant...</div>;

//   if (isError || !data?.data)
//     return <div className="p-6 text-red-500">Failed to load merchant</div>;

//   const merchant = data?.data;
//   const user = merchant?.user;
//   const plan = merchant?.plan;
//   const payment = merchant?.payments?.[0];

//   // Remaining Days Calculation
//   const remainingDays = merchant.ends_at
//     ? Math.max(
//         0,
//         Math.ceil(
//           (new Date(merchant.ends_at).getTime() - new Date().getTime()) /
//             (1000 * 60 * 60 * 24),
//         ),
//       )
//     : 0;

//   return (
//     <div className="max-w-5xl space-y-6 p-6">
//       {/* Header */}
//       <div className="flex justify-between">
//         <div>
//           <h1 className="text-xl font-semibold">Merchant Details</h1>
//           <p className="text-sm text-muted-foreground">
//             View & manage merchant information
//           </p>
//         </div>
//         <Button onClick={() => navigate.back()}>
//           <FaBackward />
//           Back
//         </Button>
//       </div>

//       {/* Business Information */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-sm">Business Information</CardTitle>
//         </CardHeader>

//         <CardContent className="space-y-6">
//           <div className="flex items-center gap-4">
//             <Avatar className="h-10 w-10">
//               <AvatarImage src={user?.image ?? ""} />
//               <AvatarFallback>{user?.name?.charAt(0) ?? "M"}</AvatarFallback>
//             </Avatar>

//             <div>
//               <p className="font-medium">{user?.name}</p>
//               <p className="text-sm text-muted-foreground">
//                 {user?.business_category}
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             <InfoField label="Owner Name" value={user?.name ?? "N/A"} />
//             <InfoField label="Phone" value={user?.phone ?? "N/A"} />
//             <InfoField label="Email" value={user?.email ?? "N/A"} />
//             <InfoField label="Location" value={user?.address ?? "N/A"} />
//             <InfoField
//               label="Website Domain"
//               value={user?.website_domain ?? "N/A"}
//             />
//             <InfoField
//               label="Platform Status"
//               value={user?.platform_status === "1" ? "Live" : "Inactive"}
//             />
//             <InfoField
//               label="Platform Access"
//               value={user?.platform_access === "1" ? "Enabled" : "Disabled"}
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Package Info */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-sm">Package Info</CardTitle>
//         </CardHeader>

//         <CardContent>
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             <InfoField label="Current Package" value={plan?.name ?? "N/A"} />
//             <InfoField
//               label="Package Duration"
//               value={plan?.package ?? "N/A"}
//             />
//             <InfoField
//               label="Package Start date"
//               value={
//                 merchant.starts_at
//                   ? new Date(merchant.starts_at).toLocaleDateString()
//                   : "N/A"
//               }
//             />
//             <InfoField
//               label="Expire date"
//               value={
//                 merchant.ends_at
//                   ? new Date(merchant.ends_at).toLocaleDateString()
//                   : "N/A"
//               }
//             />
//             <InfoField label="Remaining Days" value={`${remainingDays} days`} />
//             <InfoField label="Package Status" value={merchant.status} />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Payment History */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-sm">Payment History</CardTitle>
//         </CardHeader>

//         <CardContent>
//           {payment ? (
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <InfoField label="Invoice ID" value={`INV-${payment.id}`} />
//               <InfoField
//                 label="Payment Date"
//                 value={new Date(payment.created_at).toLocaleDateString()}
//               />
//               <InfoField
//                 label="Amount Paid"
//                 value={`${payment.amount} ${payment.currency}`}
//               />
//               <InfoField label="Payment Status" value={payment.status} />
//             </div>
//           ) : (
//             <p className="text-muted-foreground">No payments found.</p>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetSingleMerchantByIdQuery } from "@/redux/features/admin/adminApi";
import { useParams, useRouter } from "next/navigation";
import { FaBackward } from "react-icons/fa";
import { useI18n } from "@/components/provider/I18nProvider";

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
  const params = useParams();
  const id = params?.id as string;

  const { t, locale } = useI18n();
  const isRTL = locale === "ar";

  const { data, isLoading, isError } = useGetSingleMerchantByIdQuery(id);

  if (isLoading)
    return <div className="p-6">{t("Admin.MerchantDetails.loading")}</div>;

  if (isError || !data?.data)
    return (
      <div className="p-6 text-red-500">{t("Admin.MerchantDetails.error")}</div>
    );

  const merchant = data?.data;
  const user = merchant?.user;
  const plan = merchant?.plan;
  const payment = merchant?.payments?.[0];

  const remainingDays = merchant.ends_at
    ? Math.max(
        0,
        Math.ceil(
          (new Date(merchant.ends_at).getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24),
        ),
      )
    : 0;

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="max-w-5xl space-y-6 p-6 ">
      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-semibold">
            {t("Admin.MerchantDetails.title")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("Admin.MerchantDetails.subtitle")}
          </p>
        </div>

        <Button onClick={() => navigate.back()}>
          <FaBackward />
          {t("Admin.MerchantDetails.back")}
        </Button>
      </div>

      {/* BUSINESS INFO */}
      <Card className="border-gray-200 dark:border-gray-700 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-sm">
            {t("Admin.MerchantDetails.businessInfo")}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.image ?? ""} />
              <AvatarFallback>{user?.name?.charAt(0) ?? "M"}</AvatarFallback>
            </Avatar>

            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-muted-foreground">
                {user?.business_category}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoField
              label={t("Admin.MerchantDetails.ownerName")}
              value={user?.name ?? "N/A"}
            />
            <InfoField
              label={t("Admin.MerchantDetails.phone")}
              value={user?.phone ?? "N/A"}
            />
            <InfoField
              label={t("Admin.MerchantDetails.email")}
              value={user?.email ?? "N/A"}
            />
            <InfoField
              label={t("Admin.MerchantDetails.location")}
              value={user?.address ?? "N/A"}
            />
            <InfoField
              label={t("Admin.MerchantDetails.websiteDomain")}
              value={user?.website_domain ?? "N/A"}
            />
          </div>
        </CardContent>
      </Card>

      {/* PACKAGE */}
      <Card className="border-gray-200 dark:border-gray-700 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-sm">
            {t("Admin.MerchantDetails.packageInfo")}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoField
              label={t("Admin.MerchantDetails.currentPackage")}
              value={plan?.name ?? "N/A"}
            />
            <InfoField
              label={t("Admin.MerchantDetails.packageDuration")}
              value={plan?.package ?? "N/A"}
            />
            <InfoField
              label={t("Admin.MerchantDetails.packageStartDate")}
              value={
                merchant.starts_at
                  ? new Date(merchant.starts_at).toLocaleDateString()
                  : "N/A"
              }
            />
            <InfoField
              label={t("Admin.MerchantDetails.expireDate")}
              value={
                merchant.ends_at
                  ? new Date(merchant.ends_at).toLocaleDateString()
                  : "N/A"
              }
            />
            <InfoField
              label={t("Admin.MerchantDetails.remainingDays")}
              value={`${remainingDays} days`}
            />
            <InfoField
              label={t("Admin.MerchantDetails.packageStatus")}
              value={merchant.status}
            />
          </div>
        </CardContent>
      </Card>

      {/* PAYMENT */}
      <Card className="border-gray-200 dark:border-gray-700 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-sm">
            {t("Admin.MerchantDetails.paymentHistory")}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {payment ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoField
                label={t("Admin.MerchantDetails.invoiceId")}
                value={`INV-${payment.id}`}
              />
              <InfoField
                label={t("Admin.MerchantDetails.paymentDate")}
                value={new Date(payment.created_at).toLocaleDateString()}
              />
              <InfoField
                label={t("Admin.MerchantDetails.amountPaid")}
                value={`${payment.amount} ${payment.currency}`}
              />
              <InfoField
                label={t("Admin.MerchantDetails.paymentStatus")}
                value={payment.status}
              />
            </div>
          ) : (
            <p className="text-muted-foreground">
              {t("Admin.MerchantDetails.noPayments")}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
