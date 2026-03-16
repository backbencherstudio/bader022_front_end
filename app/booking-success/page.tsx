"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useBookingSuccessfullQuery } from "@/redux/features/userDashboard/booking";

export default function BookingSuccessClient({
  bookingId,
}: {
  bookingId?: string;
}) {
  const { data: bookingData, isLoading, error } = useBookingSuccessfullQuery(
    { booking_id: Number(bookingId) },
    {
      skip: !bookingId,
    }
  );

  const previewInvoice = async (bookingId: string) => {
    const response = await fetch(
      `http://192.168.7.97:8000/api/confirm-invoice/${bookingId}`
    );

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  if (!bookingId)
    return <p style={{ padding: "40px", color: "red" }}>No booking ID provided</p>;

  if (isLoading) return <p style={{ padding: "40px" }}>Loading booking details...</p>;

  if (error || !bookingData)
    return (
      <p style={{ padding: "40px", color: "red" }}>
        Failed to fetch booking details
      </p>
    );

  const booking = bookingData.data;

  return (
    <Card className="rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="bg-[#F4F6F8] dark:bg-gray-900 px-6 py-4 font-semibold text-center text-sm">
          Booking Confirmed!
        </div>

        <div className="p-6 sm:p-10 text-center">
          <p className="text-sm">
            Booking ID: <span className="font-semibold">{booking.booking_id}</span>
          </p>

          {/* Success Icon */}
          <div className="my-8 flex items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-[#F4F6F8] dark:bg-gray-900 flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-white dark:bg-black border border-border flex items-center justify-center font-bold">
                ✓
              </div>
            </div>
          </div>

          <p className="text-sm max-w-[520px] mx-auto leading-6">
            Your appointment is successfully booked. A confirmation email with your
            booking details has been sent to your email.
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

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => previewInvoice(String(bookingId))}
              className="cursor-pointer py-2"
            >
              Download Invoice
            </Button>

            <Link href="/user/bookings">
              <Button variant="outline" className="cursor-pointer py-2">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

// "use client";

// import { useSearchParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import Link from "next/link";
// import { useBookingSuccessfullQuery } from "@/redux/features/userDashboard/booking";
// import { bookingsApi } from './../../redux/features/merchant/bookingsApi';
// import { log } from "console";

// // export interface BookingSuccessProps {
// //   booking_id: string;  
// // }
// interface BookingSuccessProps {
//   booking_id: string | number;
// }

// const BookingSuccess: React.FC<BookingSuccessProps> = ({ booking_id }) => {
//   console.log("BookingSuccess component received booking_id:", booking_id);
//   return (
//     <div>
//       <h2>Booking Successful!</h2>
//       <p>Your booking ID is: {booking_id}</p>
//     </div>
//   );
// };
// export default function BookingSuccessPage() {
//   const searchParams = useSearchParams();
//   const bookingId = searchParams.get("booking_id");

//   // RTK Query call
//   const { data: bookingData, isLoading, error } = useBookingSuccessfullQuery(
//     { booking_id: Number(bookingId) },
//     {
//       skip: !bookingId,
//     }
//   );

//   const handleDownload = async (BookingId: string) => {
//     try {
//       const res = await fetch(
//         `http://192.168.7.97:8000/api/confirm-invoice/${bookingId}`,
//         {
//           method: "GET",
//         }
//       );

//       if (!res.ok) throw new Error("Failed to download invoice");

//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = url;
//       // link.target = "_blank"; 
//       // link.rel = "noopener noreferrer";
//       link.download = `invoice_${bookingId}.pdf`;
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (err: any) {
//       console.error(err);
//       alert(err.message || "Download failed");
//     }
//   };


//   const previewInvoice = async (bookingId: any) => {
//     const response = await fetch(`http://192.168.7.97:8000/api/confirm-invoice/${bookingId}`);
//     const blob = await response.blob(); // get PDF blob
//     const url = window.URL.createObjectURL(blob);
//     window.open(url, "_blank"); // open in new tab
//   };
//   if (!bookingId) return <p style={{ padding: "40px", color: "red" }}>No booking ID provided</p>;
//   if (isLoading) return <p style={{ padding: "40px" }}>Loading booking details...</p>;
//   if (error || !bookingData)
//     return <p style={{ padding: "40px", color: "red" }}>Failed to fetch booking details</p>;

//   const booking = bookingData.data;

//   return (
//     <Card className="rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
//       <div className="rounded-xl border border-border overflow-hidden">
//         <div className="bg-[#F4F6F8] dark:bg-gray-900 px-6 py-4 font-semibold text-center text-sm">
//           Booking Confirmed!
//         </div>

//         <div className="p-6 sm:p-10 text-center">
//           <p className="text-sm">
//             Booking ID: <span className="font-semibold">{booking.booking_id}</span>
//           </p>

//           {/* Success Icon */}
//           <div className="my-8 flex items-center justify-center">
//             <div className="h-20 w-20 rounded-full bg-[#F4F6F8] dark:bg-gray-900 flex items-center justify-center">
//               <div className="h-12 w-12 rounded-full bg-white dark:bg-black border border-border flex items-center justify-center font-bold">
//                 ✓
//               </div>
//             </div>
//           </div>

//           <p className="text-sm max-w-[520px] mx-auto leading-6">
//             Your appointment is successfully booked. A confirmation email with your booking details has been sent to your email. Please check your inbox.
//           </p>

//           {/* Details Box */}
//           <div className="mt-8 rounded-xl border border-border p-5 sm:p-6 text-sm text-left space-y-3">
//             {[
//               ["Service:", booking.service],
//               ["Date & Time:", booking.date_time],
//               ["Staff:", booking.staff],
//               ["Duration:", booking.duration],
//               ["Total Amount:", booking.amount],
//               ["Pay:", booking.payment_method],
//             ].map(([k, v]) => (
//               <div key={k} className="flex justify-between gap-4">
//                 <span>{k}</span>
//                 <span className="font-medium text-right">{v}</span>
//               </div>
//             ))}
//           </div>

//           {/* Buttons */}
//           <div className="mt-8 flex flex-col sm:flex-row gap-4">
//             {/* <a
//               href={`http://192.168.7.97:8000/api/confirm-invoice/${bookingId}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="cursor-pointer py-2"
//             >
//               Preview Invoice
//             </a> */}

//             <Button onClick={() => previewInvoice(bookingId)} className="cursor-pointer py-2">
//               Download Invoice
//             </Button>
//             <Link href={"/user/bookings"}>
//               <Button variant="outline" className="cursor-pointer py-2">
//                 Go to Dashboard
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }