import React from "react";
import { useLandingPage } from "../../context/LandingBuilderContext";
import Image from "next/image";

export default function Hero() {
  const { heroData, brandingData, typographyData } = useLandingPage();

  if (!heroData.heroTitle) return null;

  return (
    <section>
      <div className="relative h-[520px]">
        {/* Background Image */}
        {heroData.heroImage && (
          <Image
            src={heroData.heroImage}
            alt="Hero"
            fill
            className="object-cover"
            priority
          />
        )}

        {/* Overlay (light + dark) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: heroData.overlayColor || "#000000",
            opacity: 0.6,
          }}
        />

        <div
          className={`
    flex pt-5
    ${
      brandingData.position === "center"
        ? "justify-center"
        : brandingData.position === "right"
        ? "justify-end"
        : "justify-start"
    }
  `}
        >
          {brandingData.logo && (
            <Image
              src={brandingData.logo}
              alt="Logo"
              width={120}
              height={40}
              className="object-contain"
              priority
            />
          )}
        </div>
        {/* Content */}
        <div className="relative z-10 max-w-xl p-16 text-white">
          <h3 className="text-sm uppercase tracking-wide opacity-90">
            {heroData.heroSubtitle}
          </h3>

          {/* <h1 className="text-4xl md:text-5xl font-bold mt-2">
            {heroData.heroTitle}
          </h1> */}

          <h1
            className="font-bold mt-2"
            style={{
              fontSize: `${typographyData.h1Size}px`,
              fontFamily: typographyData.fontFamily,
            }}
          >
            {heroData.heroTitle}
          </h1>

          <p className="mt-4 text-lg text-gray-200">
            {heroData.heroDescription}
          </p>

          <div className="flex gap-4 mt-6">
            {heroData.primaryBtn && (
              <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-md text-white font-medium transition">
                {heroData.primaryBtn}
              </button>
            )}

            {heroData.secondaryBtn && (
              <button className="border border-white/70 hover:bg-white hover:text-black px-6 py-3 rounded-md text-white font-medium transition">
                {heroData.secondaryBtn}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
