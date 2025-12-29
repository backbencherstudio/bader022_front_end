"use client";

import React, { useState } from "react";
import Image from "next/image";

type ProjectItem = {
  id: string;
  label: string;
  img: string; // public path
};

const items: ProjectItem[] = [
  { id: "salon", label: "Salon", img: "/images/service1.png" },
  {
    id: "sports",
    label: "Sports Academy",
    img: "/images/service2.png",
  },
  { id: "home", label: "Home Service", img: "/images/service3.png" },
  {
    id: "consulting",
    label: "Consulting Office",
    img: "/images/service4.png",
  },
  {
    id: "workspaces",
    label: "Work-spaces",
    img: "/images/service5.png",
  },
  {
    id: "spa",
    label: "Personal Care & Spa",
    img: "/images/service6.png",
  },
  {
    id: "nursery",
    label: "Children's nursery",
    img: "/images/service7.png",
  },
  {
    id: "photo",
    label: "Photography",
    img: "/images/service8.png",
  },
];

export default function ProjectSelectorImages() {
  const [selected, setSelected] = useState<string>("");

  return (
    <section className="w-full bg-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Heading */}
        <div className="mx-auto text-center pb-4 md:pb-6">
          <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 pb-4">
            What is Your Project?
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-slate-600">
            Describe your project so Bokli can personalize your booking <br />
            system, services, staff, and workflow instantly.
          </p>
        </div>

        {/* Grid */}
        <div className="mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => {
            const active = selected === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(item.id)}
                className={[
                  "group cursor-pointer rounded-xl border bg-white px-6 py-10 transition",
                  "shadow-[0_10px_30px_rgba(15,23,42,0.04)]",
                  active
                    ? "border-blue-200 ring-2 ring-blue-100"
                    : "border-slate-100 hover:border-blue-100 hover:shadow-[0_16px_40px_rgba(15,23,42,0.06)]",
                ].join(" ")}
              >
                {/* Circle image */}
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-slate-100 bg-white overflow-hidden">
                  <div className="relative h-10 w-10 transition group-hover:scale-105">
                    <Image
                      src={item.img}
                      alt={item.label}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <p className="mt-6 text-[18px] font-medium text-slate-900">
                  {item.label}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
