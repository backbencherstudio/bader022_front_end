import React from "react";
import { useLandingPage } from "../../context/LandingBuilderContext";
import Image from "next/image";

export default function Hero() {
  const { heroData, brandingData, typographyData, colorSystemData } =
    useLandingPage();

  if (!heroData.heroTitle) return null;

  return (
    <section className="relative w-full">
      <div className="relative min-h-[420px] md:min-h-[520px] lg:min-h-[600px] w-full overflow-hidden">
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
            backgroundColor: heroData.overlayColor || "#000",
            opacity: 0.6,
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
            width={120}
            height={40}
            className="object-contain max-w-[100px] md:max-w-[120px]"
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
              <h3 className="text-xs md:text-sm uppercase tracking-wide opacity-90">
                {heroData.heroSubtitle}
              </h3>
            )}

            <h1
              className="font-bold mt-3 leading-tight"
              style={{
                fontSize: `${Math.max(
                  (typographyData.h1Size || 48) - 10,
                  28
                )}px`,
                fontFamily: typographyData.fontFamily,
              }}
            >
              {heroData.heroTitle}
            </h1>

            {heroData.heroDescription && (
              <p className="mt-4 text-sm md:text-lg text-gray-200">
                {heroData.heroDescription}
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              {heroData.primaryBtn && (
                <button
                  style={{
                    backgroundColor: colorSystemData.primaryColor,
                  }}
                  className="px-6 py-3 rounded-md text-white font-medium transition
                 hover:opacity-90"
                >
                  {heroData.primaryBtn}
                </button>
              )}

              {heroData.secondaryBtn && (
                <button
                  style={{
                    color: colorSystemData.secondaryColor,
                    borderColor: colorSystemData.secondaryColor,
                  }}
                  className="px-6 py-3 rounded-md border font-medium transition
                 hover:text-white"
                >
                  {heroData.secondaryBtn}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
