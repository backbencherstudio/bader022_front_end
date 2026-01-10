import Image from "next/image";
import React from "react";
import { useLandingPage } from "../../context/LandingBuilderContext";
import Link from "next/link";

export default function CTABanner() {
  const { ctaBannerData, colorSystemData } = useLandingPage();

  if (!ctaBannerData.ctaBannerTitle) return null;

  return (
    <section>
      <div className="relative min-h-[360px] sm:min-h-[320px]">
        {/* Background Image */}
        <Image
          src={
            ctaBannerData.ctaBannerImage ||
            "/images/mini-site/ctaBannerImage.png"
          }
          alt="CTA"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay (light + dark) */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />

        {/* Content */}
        <div
          className="
            relative z-10
            flex flex-col items-center justify-center
            text-center
            px-4 sm:px-8 md:px-16
            py-12 sm:py-16
            text-white
          "
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            {ctaBannerData.ctaBannerTitle}
          </h2>

          {ctaBannerData.ctaBannerSubTitle && (
            <p className="mt-4 mb-6 max-w-2xl text-sm sm:text-base text-gray-200">
              {ctaBannerData.ctaBannerSubTitle}
            </p>
          )}

          <Link href={"/user/bookings/add-booking"}>
            <button
              style={{
                backgroundColor: colorSystemData.primaryColor,
              }}
              className="
              px-6 py-3 rounded-md
              text-white font-medium
              transition hover:opacity-90 cursor-pointer
            "
            >
              Book A Consultation
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
