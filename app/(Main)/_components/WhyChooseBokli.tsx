import Image from "next/image";
import React from "react";

const chooseBokli = [
  {
    id: 1,
    title: "Lightning Fast Setup",
    description: "Go from sign-up to live booking page in minutes.",
    icon: "/icons/Icon.png",
  },
  {
    id: 2,
    title: "Professional Design",
    description:
      "Modern, clean interface that impresses customers and reflects your brand.",
    icon: "/icons/Icon1.png",
  },
  {
    id: 3,
    title: "Scale-able Architecture",
    description: "Designed to support thousands of merchants smoothly.",
    icon: "/icons/Icon2.png",
  },
  {
    id: 4,
    title: "Secure Payments",
    description: "Fully integrated with trusted payment gateways.",
    icon: "/icons/Icon3.png",
  },
  {
    id: 5,
    title: "All-in-One Control",
    description:
      "Manage services, staff, bookings, and customer data from one platform.",
    icon: "/icons/Icon4.png",
  },
  {
    id: 6,
    title: "Perfect for All Businesses",
    description:
      "Salons, spas, clinics, tutors, garages, fitness trainers, and more.",
    icon: "/icons/Icon5.png",
  },
];

export default function WhyChooseBokli() {
  return (
    <div className="bg-[#F9FAFB]">
      <div className="container mx-auto py-20">
        <div className="flex flex-col items-center gap-5 py-10">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-semibold">
            Why Choose Bokli?
          </h2>
          <p className="w-11/12 md:w-9/12 lg:w-4/12 mx-auto text-center text-[#4A4C56]">
            Bokli simplifies bookings, boosts efficiency, and helps businesses
            deliver a seamless customer experience with zero hassle.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {chooseBokli.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-amber-50 shadow rounded-md p-6 space-y-3"
            >
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-gray-100">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>

              <h3 className="text-xl font-semibold pt-5">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
