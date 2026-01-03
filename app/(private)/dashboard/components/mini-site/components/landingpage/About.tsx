import Image from "next/image";
import React from "react";
import { useLandingPage } from "../../context/LandingBuilderContext";

export default function About() {
  const { aboutData } = useLandingPage();

  return (
    <section>
      {aboutData?.aboutTitle && (
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Image */}
            {aboutData?.aboutImage && (
              <div className="relative w-full h-[320px] rounded-xl overflow-hidden">
                <Image
                  src="/images/aboutus.png"
                  alt="About Us"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                {aboutData.aboutTitle}
              </h3>
              <p className="text-gray-600 mb-6">{aboutData.aboutDescription}</p>
              <button className="px-6 py-3 bg-linear-to-r from-[#7153FF] to-[#3CB3FF] text-white rounded-md font-medium">
                About Us
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
