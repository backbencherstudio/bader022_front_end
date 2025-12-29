"use client";

import { UserPlus, Settings, CalendarDays } from "lucide-react";

type Step = {
  step: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const steps: Step[] = [
  {
    step: "Step 1",
    title: "Create Your Business Account",
    desc: "Sign up, add your business details, and instantly get your branded booking mini-website.",
    icon: <UserPlus className="h-5 w-5 text-blue-600" />,
  },
  {
    step: "Step 2",
    title: "Add Services, Staff & Branches",
    desc: "Set up your services, assign staff, and (if premium) manage multiple branches.",
    icon: <Settings className="h-5 w-5 text-blue-600" />,
  },
  {
    step: "Step 3",
    title: "Start Accepting Bookings",
    desc: "Share your booking link anywhere and receive appointments directly — with optional online payments.",
    icon: <CalendarDays className="h-5 w-5 text-blue-600" />,
  },
];

export default function HowBokliWorks() {
  return (
    <section className="w-full bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-[48px] font-semibold text-slate-900">
            How Bokli Works
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-slate-600">
            Manage appointments, staff schedules, services, and customer
            interactions seamlessly through Bokli&apos;s intelligent, automated
            booking system.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.step}
              className="rounded-xl border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]"
            >
              <div className="flex items-start justify-between">
                {/* Icon bubble */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                  {s.icon}
                </div>

                {/* Step tag */}
                <span className="rounded-md bg-blue-50 px-3 py-1 text-[14px] font-medium text-blue-600">
                  {s.step}
                </span>
              </div>

              <h3 className="mt-5 text-xl md:text-[24px] font-semibold text-slate-900">
                {s.title}
              </h3>
              <p className="mt-2 text-[16px] leading-relaxed text-slate-600">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
