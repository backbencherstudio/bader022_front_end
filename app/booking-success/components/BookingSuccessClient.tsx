"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useBookingSuccessfullQuery } from "@/redux/features/userDashboard/booking";

export default function BookingSuccessClient() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id");

  const id = bookingId ? Number(bookingId) : null;

  const {
    data: bookingData,
    isLoading,
    error,
  } = useBookingSuccessfullQuery({ booking_id: id as number }, { skip: !id });

  const previewInvoice = async () => {
    if (!id) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/confirm-invoice/${id}`,
    );
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  // const downloadInvoice = async () => {
  //   if (!id) return;
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/confirm-invoice/${id}`,
  //   );
  //   const blob = await res.blob();
  //   const url = window.URL.createObjectURL(blob);

  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = `invoice_${id}.pdf`;
  //   document.body.appendChild(link);
  //   link.click();
  //   link.remove();
  //   window.URL.revokeObjectURL(url);
  // };

  if (!bookingId)
    return <p style={{ padding: 40, color: "red" }}>No booking ID provided</p>;

  if (isLoading)
    return <p style={{ padding: 40 }}>Loading booking details...</p>;

  if (error || !bookingData)
    return (
      <p style={{ padding: 40, color: "red" }}>
        Failed to fetch booking details
      </p>
    );

  const booking = bookingData.data;

  return (
    <Card className="rounded-2xl p-6 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
      <h3 className="text-center text-5xl font-bold text-green-500 my-3">Booking Confirmed!</h3>
      <div className="text-center">
        <p className="text-sm">
          Booking ID:{" "}
          <span className="font-semibold">{booking.booking_id}</span>
        </p>

        <div className="my-8 flex items-center justify-center">
          <div className="h-20 w-20 rounded-full bg-[#F4F6F8] dark:bg-gray-900 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-white dark:bg-black border border-border flex items-center justify-center font-bold">
              ✓
            </div>
          </div>
        </div>
         

        <p className="text-sm max-w-130 mx-auto leading-6">
          Your appointment is successfully booked. A confirmation email has been
          sent to your inbox.
        </p>

        <div className="mt-8 rounded-xl border border-border p-5 sm:p-6 text-sm text-left space-y-3">
          {[
            ["Service:", booking.service],
            ["Date & Time:", booking.date_time],
            ["Staff:", booking.staff],
            ["Duration:", booking.duration],
            ["Total Amount:", booking.amount],
            ["Pay:", booking.payment_method],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4">
              <span>{k}</span>
              <span className="font-medium text-right">{v}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 ">
          <Button onClick={previewInvoice} className="py-2 cursor-pointer">
            Download Invoice
          </Button>
          {/* <Button onClick={downloadInvoice} variant="outline" className="py-2">
            Download Invoice
          </Button> */}
          <Link href="/user/bookings">
            <Button variant="outline" className="py-2 cursor-pointer">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
