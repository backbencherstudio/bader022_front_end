import React from "react";
import { useLandingPage } from "../../context/LandingBuilderContext";
import Image from "next/image";

export default function Hero() {
  const { heroData } = useLandingPage();
  return (
    <section>
      {heroData.heroTitle && (
        <div className="relative h-[520px]">
          {" "}
          {heroData.heroImage && (
            <Image
              src="/images/heroImage.png"
              alt="Hero"
              fill
              className="object-cover"
            />
          )}
          {/* Overlay auto adapts to dark mode */}
          <div className="relative z-10 max-w-3xl p-16 text-white">
            <h3>{heroData.heroSubtitle}</h3>
            <h1 className="text-4xl font-bold">{heroData.heroTitle}</h1>
            <p className="mt-4 text-lg">{heroData.heroDescription}</p>

            <div className="flex gap-4 mt-6">
              {heroData.primaryBtn && (
                <button className="bg-orange-500 px-6 py-3 rounded text-white">
                  {heroData.primaryBtn}
                </button>
              )}
              {heroData.secondaryBtn && (
                <button className="border px-6 py-3 rounded">
                  {heroData.secondaryBtn}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
