import Image from "next/image";
import React from "react";
import { useLandingPage } from "../../context/LandingBuilderContext";

export default function ServicesPreview() {
  const { servicesPreviewData, colorSystemData } = useLandingPage();

  if (!servicesPreviewData.servicesPreviewTitle) return null;

  return (
    <section
      style={{
        backgroundColor: servicesPreviewData.backgroundColor,
      }}
      className="py-16 transition-colors"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-12">
          {/* Title */}
          <h3 className="text-4xl lg:w-6/12 font-semibold text-gray-900 dark:text-white mb-3">
            {servicesPreviewData.servicesPreviewTitle}
          </h3>

          <div className="flex flex-col md:flex-row gap-4 md:justify-between">
            {/* Subtitle */}
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              {servicesPreviewData.servicesPreviewSubtitle}
            </p>
            <button
              style={{
                backgroundColor: colorSystemData.primaryColor,
              }}
              className="px-6 py-3 rounded-md text-white font-medium transition
                 hover:opacity-90 cursor-pointer"
            >
              View More
            </button>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesPreviewData.servicesCards.map((item, index) => (
            <div key={index}>
              <div
                className="
                    rounded-2xl overflow-hidden
                    bg-white dark:bg-gray-800
                    border border-gray-200 dark:border-gray-700
                    shadow-sm hover:shadow-md
                    transition
                  "
              >
                {/* Image */}
                <div className="relative h-48 w-full">
                  <Image
                    src={item.image || "/images/mini-site/service1.png"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <span>⏱</span>
                      <span>{item.title}</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      25
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                    {item.description}
                  </p>

                  {/* Button */}
                  <button
                    style={{
                      backgroundColor: colorSystemData.primaryColor,
                    }}
                    className="
                px-5 py-2 rounded-md
                text-white font-medium
                transition hover:opacity-90
              "
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
