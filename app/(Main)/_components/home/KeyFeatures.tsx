"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Feature = {
  title: string;
  desc: string;
  img: string; // public path
  colSpan?: string; // tailwind col span
};

const features: Feature[] = [
  {
    title: "Merchant Dashboard",
    desc: "Design a modern, data-driven Merchant Dashboard with a clean, minimalistic layout",
    img: "/images/feature1.png",
    colSpan: "md:col-span-4",
  },
  {
    title: "Staff Management",
    desc: "A comprehensive module designed to streamline team oversight with a modern, intuitive interface",
    img: "/images/feature2.png",
    colSpan: "md:col-span-4",
  },
  {
    title: "Smart Booking Scheduler",
    desc: "Built for efficiency and clarity, it helps businesses optimize operations while providing users",
    img: "/images/feature3.png",
    colSpan: "md:col-span-4",
  },
  {
    title: "Mini-Website Builder",
    desc: "A compact yet powerful platform designed to help anyone create stunning, responsive websites in minutes",
    img: "/images/feature4.png",
    colSpan: "md:col-span-6",
  },
  {
    title: "Payment Integration",
    desc: "Design a seamless, secure, and user-friendly payment interface that supports multiple payment methods",
    img: "/images/feature5.png",
    colSpan: "md:col-span-6",
  },
];

export default function KeyFeatures() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background gradient like screenshot */}
      <div className="absolute inset-0 bg-linear-to-br from-sky-50 via-white to-indigo-50" />

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
        {/* Header row */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl md:text-5xl font-semibold text-slate-900">
              Key Features
            </h2>
            <p className="mt-4 max-w-xl text-[18px] leading-relaxed text-slate-600">
              Explore powerful features designed to simplify bookings, manage
              staff, track performance, and grow your business faster.
            </p>
          </div>

          <Button className="w-fit rounded-lg px-5 text-[16px] py-6 text-white font-semibold cursor-pointer bg-linear-to-l from-indigo-500 to-blue-500 hover:opacity-90">
            Try For Free <ArrowUpRight size={18} className="ml-2" />
          </Button>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12">
          {features.map((f) => (
            <div
              key={f.title}
              className={[
                "rounded-xl border border-slate-100 bg-white",
                `${f.colSpan == "md:col-span-6" ? "flex" : ""}`,
                "shadow-[0_10px_30px_rgba(15,23,42,0.06)]",
                "p-6",
                f.colSpan ?? "md:col-span-4",
              ].join(" ")}
            >
              {/* Image area */}
              <div className="relative w-full h-37.5 md:h-40 rounded-lg overflow-hidden bg-white">
                <Image
                  src={f.img}
                  alt={f.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="mt-5 text-[24px] font-semibold text-slate-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-[16px] leading-relaxed text-slate-600">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
