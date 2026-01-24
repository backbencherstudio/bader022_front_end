import Image from "next/image";
import React from "react";
import { useLandingPage } from "../../context/LandingBuilderContext";

export default function About() {
  const { aboutData, colorSystemData, layoutSettingsData, typographyData } =
    useLandingPage();

  if (!aboutData?.aboutTitle) return null;

  return (
    <section
      style={{
        backgroundColor: aboutData.backgroundColor || "transparent",
        marginTop: layoutSettingsData.sectionSpacing,
        paddingTop: aboutData.padding,
        paddingBottom: aboutData.padding,
      }}
      className="transition-colors dark:bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="relative w-full h-[320px] rounded-xl overflow-hidden shadow-md dark:shadow-black/40">
            <Image
              src={aboutData.aboutImage || "/images/mini-site/aboutus.png"}
              alt="About Us"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div>
            <h3
              style={{
                color: colorSystemData.headingColor,
                fontSize: typographyData.h1Size,
              }}
              className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white"
            >
              {aboutData.aboutTitle}
            </h3>

            <p
              style={{
                color: colorSystemData.bodyTextColor,
                fontSize: typographyData.bodySize,
              }}
              className="text-gray-600 dark:text-gray-300 mb-6"
            >
              {aboutData.aboutDescription}
            </p>

            <button
              style={{
                backgroundColor: colorSystemData.primaryColor,
              }}
              className="
                px-6 py-3 rounded-md
                text-white font-medium
                transition hover:opacity-90
              "
            >
              About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
