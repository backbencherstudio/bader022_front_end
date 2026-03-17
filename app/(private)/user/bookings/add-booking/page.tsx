"use client";

import { useState } from "react";
import Step1 from "../../components/bookings/Step1";
import Step2 from "../../components/bookings/Step2";
import Step3 from "../../components/bookings/Step3";
import Step0 from "../../components/bookings/Step0";
import { useBookingServiceQuery } from "@/redux/features/userDashboard/booking";
import { useRouter } from "next/navigation";

type Service = {
  id: number;
  name: string;
  duration: number;
  price: number;
  description?: string;
  service_name: string;
};

function Stepper({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: number;
}) {
  return (
    <div className="w-full flex items-center gap-3 sm:gap-4">
      {steps.map((_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div key={index} className="flex items-center w-full">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold border
              ${isCompleted
                  ? "bg-black text-white border-black"
                  : isActive
                    ? "bg-white border-black"
                    : "bg-gray-200"
                }`}
            >
              {isCompleted ? "✓" : stepNumber}
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`h-[2px] w-full mx-2 ${stepNumber < currentStep ? "bg-black" : "bg-gray-300"
                  }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function BookingCheckoutStepper() {
  const router = useRouter();

  const steps = [
    "Select Services",
    "Select Date",
    "Payment Info",
    "Card Info",
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const { data } = useBookingServiceQuery(
    selectedService?.service_name || ""
  );

  const handleBooking = async () => {
    const payload = {
      service_id: selectedService?.id,
      date: selectedDate,
      time: selectedTime,
      customer_name: "John Doe",
      email: "johndoe@example.com",
      phone: "017xxxxxxxx",
      payment_method: "tap",
    };

    try {
      const res = await fetch("your-api-endpoint", {
        method: "POST",
        body: JSON.stringify(payload),
      }).then((response) => response.json());

      console.log("Booking Success:", res);

      if (res?.payment_url) {
        window.location.href = res.payment_url;
      } else {
        router.push(`/booking-success?booking_id=${res.booking_id}`);
      }
    } catch (err) {
      console.error("Booking Error:", err);
    }
  };

  return (
    <div className="w-full mx-auto py-8">
      <Stepper steps={steps} currentStep={currentStep + 1} />

      <h2 className="mt-8 text-xl sm:text-2xl font-semibold">
        {currentStep === 0 && "Select Services"}
        {currentStep === 1 && "Select Date Time & Staff"}
        {currentStep === 2 && "Payment Information"}
        {currentStep === 3 && "Card Information"}
      </h2>

      <div className="mt-6">
        {currentStep === 0 && (
          <Step0
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            data={data}
            onNext={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 1 && selectedService && (
          <Step1
            onNext={() => setCurrentStep(2)}
            onBack={() => setCurrentStep(0)}
            serviceId={selectedService.id}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            duration={selectedService.duration}
            price={selectedService.price}
            serviceName={selectedService.name}
          />
        )}

        {currentStep === 2 && selectedService && (
          <Step2
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
            service={selectedService}
            date={selectedDate}
            time={selectedTime}
          />
        )}



        {currentStep === 4 && selectedService && (
          <Step3
            onNext={handleBooking}
            onBack={() => setCurrentStep(2)}
          />
        )}
      </div>
    </div>
  );
}

// "use client";

// import { cn } from "@/lib/utils";
// import { Check } from "lucide-react";
// import { useState } from "react";
// import Step1 from "../../components/bookings/Step1";
// import Step2 from "../../components/bookings/Step2";
// import Step3 from "../../components/bookings/Step3";
// import Step4 from "../../components/bookings/Step4";
// import Step0 from "../../components/bookings/Step0";
// import { useBookingServiceQuery } from "@/redux/features/userDashboard/booking";
// import BookingSuccessPage from "@/app/booking-success/page";

// type StepperProps = {
//   steps: string[];
//   currentStep: number; // 1-based
// };

// type Service = {
//   id: number;
//   name: string;
//   duration: number;
//   price: number;
//   description?: string;
// };

// function Stepper({ steps, currentStep }: StepperProps) {
//   return (
//     <div className="w-full flex items-center gap-3 sm:gap-4">
//       {steps.map((_, index) => {
//         const stepNumber = index + 1;
//         const isCompleted = stepNumber < currentStep;
//         const isActive = stepNumber === currentStep;

//         return (
//           <div key={index} className="flex items-center w-full">
//             {/* Circle */}
//             <div
//               className={cn(
//                 "h-5 w-5 p-5 rounded-full flex items-center justify-center text-sm font-semibold border",
//                 isCompleted &&
//                 "bg-[#111827] dark:bg-green-800 border-[#111827] dark:border-[#016630] text-white",
//                 isActive &&
//                 "bg-white border-[#111827] dark:border-[#016630] text-[#111827]",
//                 !isCompleted &&
//                 !isActive &&
//                 "bg-[#F4F6F8] border-border text-[#637381]"
//               )}
//             >
//               {isCompleted ? <Check className="h-5 w-5" /> : stepNumber}
//             </div>

//             {/* Line */}
//             {index !== steps.length - 1 && (
//               <div
//                 className={cn(
//                   "h-0.75 w-full mx-2 sm:mx-3 rounded-full",
//                   stepNumber < currentStep
//                     ? "bg-[#111827] dark:bg-green-800"
//                     : "bg-border"
//                 )}
//               />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default function BookingCheckoutStepper() {
//   const steps = [
//     "Select Services",
//     "Select Date",
//     "Payment Info",
//     "Card Info",
//     "Confirmed",
//   ];
//   const [bookingId, setBookingId] = useState<string | number>("");
//   const [currentStep, setCurrentStep] = useState(0);
//   const [selectedService, setSelectedService] = useState<Service | null>(null);
//   const [selectedDate, setSelectedDate] = useState<string>("");
//   const [selectedTime, setSelectedTime] = useState<string>("");
//   const { data, isLoading, error } = useBookingServiceQuery(
//     selectedService?.name || ""
//   );

//   const handleBooking = async () => {
//     const payload = {
//       service_id: selectedService?.id,
//       staff_id: "",
//       date: selectedDate,
//       time: selectedTime,
//       customer_name: "John Doe", // Replace with actual customer name
//       email: "johndoe@example.com", // Replace with actual email
//       phone: "017xxxxxxxx", // Replace with actual phone number
//       special_note: "Please call before appointment", // Replace with actual note
//       payment_method: "tap", // Or "cash" depending on the user's choice
//     };

//     try {
//       const res = await fetch("your-api-endpoint", {
//         method: "POST",
//         body: JSON.stringify(payload),
//       }).then((response) => response.json());

//       console.log("Booking Success:", res);

//       // Assuming booking_id is returned in the response
//       setBookingId(res.booking_id);

//       if (res?.payment_url) {
//         window.location.href = res.payment_url; // Redirect for tap payment
//       } else {
//         setCurrentStep(4); // Move to the "Confirmed" step after successful booking
//       }
//     } catch (err) {
//       console.error("Booking Error:", err);
//     }
//   };

//   return (
//     <div className="w-full mx-auto py-8">
//       {/* Stepper */}
//       <Stepper steps={steps} currentStep={currentStep + 1} />

//       {/* Title */}
//       <h2 className="mt-8 text-xl sm:text-2xl font-semibold">
//         {currentStep === 0 && "Select Services"}
//         {currentStep === 1 && "Select Date Time & Staff"}
//         {currentStep === 2 && "Payment Information"}
//         {currentStep === 4 && "Booking Confirmed!"}
//         {currentStep === 3 && "Card Information"}
//       </h2>

//       {/* Step Content */}
//       <div className="mt-6">
//         {currentStep === 0 && (
//           <Step0
//             selectedService={selectedService}
//             setSelectedService={setSelectedService}
//             data={data}
//             onNext={() => setCurrentStep(1)}
//           />
//         )}

//         {currentStep === 1 && selectedService && (
//           <Step1
//             onNext={() => setCurrentStep(2)}
//             onBack={() => setCurrentStep(0)}
//             serviceId={selectedService.id}
//             selectedDate={selectedDate}
//             setSelectedDate={setSelectedDate}
//             selectedTime={selectedTime}
//             setSelectedTime={setSelectedTime}
//             duration={selectedService.duration}
//             price={selectedService.price}
//             serviceName={selectedService.name}
//           />
//         )}

//         {currentStep === 2 && selectedService && (
//           <Step2
//             onNext={() => setCurrentStep(4)}
//             onBack={() => setCurrentStep(1)}
//             service={selectedService}
//             date={selectedDate}
//             time={selectedTime}
//           />
//         )}

//         {currentStep === 4 && <BookingSuccessPage booking_id={bookingId} />}

//         {currentStep === 3 && selectedService && (
//           <Step3 onNext={() => setCurrentStep(4)} onBack={() => setCurrentStep(2)} />
//         )}
//       </div>
//     </div>
//   );
// }


// components/BookingCheckoutStepper.tsx



// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button"; // Your UI components
// import Step1 from "../../components/bookings/Step1";
// import Step2 from "../../components/bookings/Step2";
// import Step3 from "../../components/bookings/Step3";
// import Step4 from "../../components/bookings/Step4";
// import Step0 from "../../components/bookings/Step0";
// import { useBookingServiceQuery } from "@/redux/features/userDashboard/booking"; // Your API hook
// import BookingSuccessPage from "@/app/booking-success/page";
// import { useRouter } from "next/navigation";
// import { Suspense } from "react";

// type Service = {
//   id: number;
//   name: string;
//   duration: number;
//   price: number;
//   description?: string;
//   service_name: string;
// };

// function Stepper({ steps, currentStep }: { steps: string[]; currentStep: number }) {
//   return (
//     <div className="w-full flex items-center gap-3 sm:gap-4">
//       {steps.map((_, index) => {
//         const stepNumber = index + 1;
//         const isCompleted = stepNumber < currentStep;
//         const isActive = stepNumber === currentStep;

//         return (
//           <div key={index} className="flex items-center w-full">
//             {/* Circle */}
//             <div
//               className={`h-5 w-5 p-5 rounded-full flex items-center justify-center text-sm font-semibold border ${isCompleted
//                   ? "bg-[#111827] dark:bg-green-800 border-[#111827] dark:border-[#016630] text-white"
//                   : isActive
//                     ? "bg-white border-[#111827] dark:border-[#016630] text-[#111827]"
//                     : "bg-[#F4F6F8] border-border text-[#637381]"
//                 }`}
//             >
//               {isCompleted ? "✓" : stepNumber}
//             </div>

//             {/* Line */}
//             {index !== steps.length - 1 && (
//               <div
//                 className={`h-0.75 w-full mx-2 sm:mx-3 rounded-full ${stepNumber < currentStep ? "bg-[#111827] dark:bg-green-800" : "bg-border"
//                   }`}
//               />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default function BookingCheckoutStepper() {
 
//   const router = useRouter(); // Use Next.js router
//   const steps = [
//     "Select Services",
//     "Select Date",
//     "Payment Info",
//     "Card Info",
//     "Confirmed",
//   ];
//   const [bookingId, setBookingId] = useState<string | number>("");
//   const [currentStep, setCurrentStep] = useState(0);
//   const [selectedService, setSelectedService] = useState<Service | null>(null);
//   const [selectedDate, setSelectedDate] = useState<string>("");
//   const [selectedTime, setSelectedTime] = useState<string>("");
//   import { Suspense } from "react";
//   import BookingSuccessPage from './../../../../booking-success/page';
const { data, isLoading, error } = useBookingServiceQuery(
//     selectedService?.service_name || "",
//     // { skip: !selectedService } 
//   );


//   const handleBooking = async () => {
//     const payload = {
//       service_id: selectedService?.id,
//       staff_id: "",
//       date: selectedDate,
//       time: selectedTime,
//       customer_name: "John Doe", // Replace with actual customer name
//       email: "johndoe@example.com", // Replace with actual email
//       phone: "017xxxxxxxx", // Replace with actual phone number
//       special_note: "Please call before appointment", // Replace with actual note
//       payment_method: "tap", // Or "cash" depending on the user's choice
//     };

//     try {
//       const res = await fetch("your-api-endpoint", {
//         method: "POST",
//         body: JSON.stringify(payload),
//       }).then((response) => response.json());

//       console.log("Booking Success:", res);

//       // Assuming booking_id is returned in the response
//       setBookingId(res.booking_id);

//       if (res?.payment_url) {
//         window.location.href = res.payment_url; // Redirect for tap payment
//       } else {
//         // Instead of rendering the page directly, navigate to the success page with booking_id in the URL
//         router.push(`/booking-success?booking_id=${res.booking_id}`); // Navigate to success page
//       }
//     } catch (err) {
//       console.error("Booking Error:", err);
//     }
//   };

//   return (
//     <div className="w-full mx-auto py-8">
//       {/* Stepper */}
//       <Stepper steps={steps} currentStep={currentStep + 1} />

//       {/* Title */}
//       <h2 className="mt-8 text-xl sm:text-2xl font-semibold">
//         {currentStep === 0 && "Select Services"}
//         {currentStep === 1 && "Select Date Time & Staff"}
//         {currentStep === 2 && "Payment Information"}
//         {currentStep === 4 && "Booking Confirmed!"}
//         {currentStep === 3 && "Card Information"}
//       </h2>

//       {/* Step Content */}
//       <div className="mt-6">
//         {currentStep === 0 && (
//           <Step0
//             selectedService={selectedService}
//             setSelectedService={setSelectedService}
//             data={data}
//             onNext={() => setCurrentStep(1)}
//           />
//         )}

//         {currentStep === 1 && selectedService && (
//           <Step1
//             onNext={() => setCurrentStep(2)}
//             onBack={() => setCurrentStep(0)}
//             serviceId={selectedService.id}
//             selectedDate={selectedDate}
//             setSelectedDate={setSelectedDate}
//             selectedTime={selectedTime}
//             setSelectedTime={setSelectedTime}
//             duration={selectedService.duration}
//             price={selectedService.price}
//             serviceName={selectedService.name}
//           />
//         )}

//         {currentStep === 2 && selectedService && (
//           <Step2
//             onNext={() => setCurrentStep(4)}
//             onBack={() => setCurrentStep(1)}
//             service={selectedService}
//             date={selectedDate}
//             time={selectedTime}
//           />
//         )}

//         {currentStep === 4 && (
//           <Suspense fallback={<div>Loading...</div>}>
//             <BookingSuccessPage /> 
//     </Suspense>
//         )}

//         {currentStep === 3 && selectedService && (
//           <Step3 onNext={() => setCurrentStep(4)} onBack={() => setCurrentStep(2)} />
//         )}
//       </div>
//     </div>
//   );
// }