"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  Check,
  ImageIcon,
  Palette,
  LayoutGrid,
  Globe,
} from "lucide-react";

const topOptions = [
  {
    title: "Logo & colors",
    icon: <Palette className="h-4 w-4 text-blue-600" />,
  },
  {
    title: "Hero banner",
    icon: <ImageIcon className="h-4 w-4 text-blue-600" />,
  },
  {
    title: "About section",
    icon: <LayoutGrid className="h-4 w-4 text-blue-600" />,
  },
  {
    title: "Service layout",
    icon: <Globe className="h-4 w-4 text-blue-600" />,
  },
];

const extraFeaturesLeft = ["Staff section", "Layout Customization"];
const extraFeaturesRight = ["Service Booking", "Social links"];

export default function MiniWebsiteBuilder() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* background like screenshot */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-indigo-50" />

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          {/* LEFT */}
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
              Mini-Website Builder
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-600">
              Make your online presence truly yours with powerful customization
              options that give you complete control over your brand.
            </p>

            {/* 2x2 option tiles */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {topOptions.map((o) => (
                <div
                  key={o.title}
                  className="flex items-center gap-3 rounded-lg border border-slate-100 bg-white px-4 py-4
                             shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    {o.icon}
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {o.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Additional features box */}
            <div className="mt-6 rounded-xl border border-slate-100 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
              <p className="text-sm font-bold text-slate-900">
                Additional Features:
              </p>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <ul className="space-y-3">
                  {extraFeaturesLeft.map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <span className="flex h-4 w-4 items-center justify-center rounded bg-blue-600">
                        <Check className="h-3 w-3 text-white" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>

                <ul className="space-y-3">
                  {extraFeaturesRight.map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <span className="flex h-4 w-4 items-center justify-center rounded bg-blue-600">
                        <Check className="h-3 w-3 text-white" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10">
              <Button className="h-12 rounded-lg px-6 text-white font-semibold cursor-pointer bg-gradient-to-r from-indigo-500 to-blue-500 hover:opacity-90">
                Explore Customization{" "}
                <ArrowUpRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>

          {/* RIGHT Preview */}
          <div className="lg:pl-6">
            <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
              {/* Top big preview */}
              <div className="relative w-full overflow-hidden rounded-lg border border-slate-100 bg-slate-50 h-[220px] md:h-[260px]">
                <Image
                  src="/images/miniwebsitebuilder1.png"
                  alt="Mini website preview hero"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Bottom split preview */}
              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center">
                <div className="relative h-[160px] w-full overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
                  <Image
                    src="/images/miniwebsitebuilder2.png"
                    alt="Mini website preview section"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="px-1">
                  <h3 className="text-[16px] font-semibold text-slate-900">
                    Elevate Your Look With
                    <br />
                    Bespoke Hair Care & Expert
                  </h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-slate-600">
                    Experience a new level of confidence with hair care designed
                    uniquely to you. Premium treatments, expert guidance, and
                    results you’ll notice.
                  </p>

                  <button className="mt-3 inline-flex items-center rounded-md bg-orange-500 px-4 py-2 text-xs font-semibold text-white hover:opacity-90 cursor-pointer">
                    About Us
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* END RIGHT */}
        </div>
      </div>
    </section>
  );
}
