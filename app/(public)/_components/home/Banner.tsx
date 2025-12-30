"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Navbar from "./Navbar";

export default function Banner() {
  return (
    <section className="relative container">
      <Navbar />
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
        <div className="mx-auto text-center">
          <h1 className="text-[28px] leading-tight md:text-[44px] xl:text-[60px] md:leading-[1.2] font-bold text-slate-900">
            Smart Booking Management For <br className="hidden md:block" />
            Modern Service Businesses
          </h1>

          <p className="mt-4 text-[16px] md:text-[18px] leading-relaxed">
            All-in-one platform for managing services, staff, branches,
            bookings, payments, and
            <br />
            <span> customer data — with your own branded mini-website.</span>
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button className="h-12 rounded-md px-4 text-[16px] font-semibold text-white cursor-pointer bg-linear-to-l from-indigo-500 to-blue-500 hover:opacity-90">
              Get started for free{" "}
              <ArrowUpRight size={18} className="font-semibold" />
            </Button>

            <Button
              variant="outline"
              className="h-12 rounded-md  text-[16px] px-4 font-semibold text-slate-700 border-indigo-400 bg-white/60 backdrop-blur hover:bg-white cursor-pointer"
            >
              Try Bokli for Free
              <ArrowUpRight size={18} className="font-semibold" />
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Image
          src="/images/dashboard.png"
          alt="Logo"
          width={1600}
          height={1000}
          className="object-contain"
        />
      </div>
    </section>
  );
}
