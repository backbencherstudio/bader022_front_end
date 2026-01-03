import Image from "next/image";
import React from "react";
import { useLandingPage } from "../../context/LandingBuilderContext";

export default function WhyChooseUs() {
  const { whyChooseUsData } = useLandingPage();
  return (
    <section>
      {whyChooseUsData.whyChooseUsTitle && (
        <div className="py-16 bg-[#F3F4F6]">
          {" "}
          <div className="container mx-auto px-4">
            {/* Title */}
            <h3 className="text-center text-4xl font-semibold mb-3">
              {whyChooseUsData.whyChooseUsTitle}
            </h3>

            {/* Subtitle */}
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              {whyChooseUsData.whyChooseUsSubtitle}
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseUsData.featureCards.map((item, index) => (
                <div key={index}>
                  {item.image && (
                    <div
                      style={{
                        backgroundColor: whyChooseUsData.backgroundColor,
                      }}
                      className="flex flex-col items-center text-center gap-4 rounded-xl shadow bg-white border-amber-100 py-6 overflow-hidden"
                    >
                      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100">
                        <Image
                          src="/icons/WhyChooseUs.png"
                          alt={item.title || "Feature icon"}
                          width={28}
                          height={28}
                        />
                      </div>
                      {/* Content */}
                      <div>
                        <h3 className="text-lg font-semibold mb-2 line-clamp-1">
                          {item.title}
                        </h3>

                        <p className="text-gray-600 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
