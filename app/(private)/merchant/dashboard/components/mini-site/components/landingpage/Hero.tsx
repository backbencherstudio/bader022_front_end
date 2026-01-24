import React from "react";
import { useLandingPage } from "../../context/LandingBuilderContext";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const { heroData, brandingData, typographyData, colorSystemData } =
    useLandingPage();

  if (!heroData.heroTitle) return null;

  return (
    <section className="relative w-full">
      <div className="relative w-full overflow-hidden rounded-md">
        {/* Background Image */}
        <Image
          src={heroData.heroImage || "/images/mini-site/heroImage.png"}
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: heroData.overlayColor,
            opacity: 0.05,
          }}
        />

        {/* Logo */}
        <div
          className={`
            absolute top-4 md:top-6 z-20 w-full px-4 md:px-10
            flex
            ${
              brandingData.position === "center"
                ? "justify-center"
                : brandingData.position === "right"
                  ? "justify-end"
                  : "justify-start"
            }
          `}
        >
          <Image
            src={brandingData.logo || "/images/image 259.png"}
            alt="Logo"
            width={brandingData.logoSize || 120}
            height={brandingData.logoSize || 40}
            className="object-contain"
            priority
          />
        </div>

        {/* Content */}
        <div
          className="
    relative z-10
    flex items-center h-full
    px-4 md:px-10 lg:px-16 pt-30 pb-10
  "
        >
          <div
            className="
      max-w-xl
      text-white
      text-left
    "
          >
            {heroData.heroSubtitle && (
              <h3
                style={{
                  // color: colorSystemData.headingColor,
                  fontSize: typographyData.h2Size,
                }}
                className="text-xs md:text-sm uppercase tracking-wide opacity-90 text-white"
              >
                {heroData.heroSubtitle}
              </h3>
            )}

            <h1
              className="font-bold mt-3 leading-tight lg:w-8/12 text-white "
              style={{
                fontSize: typographyData.h1Size,
                // color: colorSystemData.headingColor,
              }}
            >
              {heroData.heroTitle}
            </h1>

            {heroData.heroDescription && (
              <p
                style={{
                  // color: colorSystemData.bodyTextColor,
                  fontSize: typographyData.bodySize,
                }}
                className="mt-1 text-sm md:text-lg lg:w-8/12 text-white "
              >
                {heroData.heroDescription}
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              {heroData.primaryBtn && (
                <Link href={"/user/bookings/add-booking"}>
                  <button
                    style={{
                      backgroundColor: colorSystemData.primaryColor,
                    }}
                    className="px-6 py-3 rounded-md text-white font-medium transition
                 hover:opacity-90 cursor-pointer"
                  >
                    {heroData.primaryBtn}
                  </button>
                </Link>
              )}

              {heroData.secondaryBtn && (
                <Link href={"/user/bookings/add-booking"}>
                  <button
                    style={{
                      // color: colorSystemData.secondaryColor,
                      borderColor: colorSystemData.secondaryColor,
                    }}
                    className="px-6 py-3 rounded-md border font-medium transition
                 hover:text-white cursor-pointer"
                  >
                    {heroData.secondaryBtn}
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
