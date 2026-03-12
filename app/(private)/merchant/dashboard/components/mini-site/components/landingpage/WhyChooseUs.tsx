import Image from "next/image";
import React from "react";
import { useLandingPage } from "../../context/LandingBuilderContext";
import { getImageUrl } from "@/helper/formatImage";

export default function WhyChooseUs() {
  const {
    whyChooseUsData,
    colorSystemData,
    layoutSettingsData,
    typographyData,
  } = useLandingPage();

  if (!whyChooseUsData.whyChooseUsTitle) return null;

  return (
    <section
      style={{
        backgroundColor: whyChooseUsData.backgroundColor,
        marginTop: layoutSettingsData.sectionSpacing,
      }}
      className="py-16 transition-colors"
    >
      <div className="container mx-auto px-4">
        {/* Title */}
        <h3
          style={{
            color: colorSystemData.headingColor,
            fontSize: typographyData.h1Size,
          }}
          className="text-center text-4xl font-semibold mb-3 text-gray-900 dark:text-white"
        >
          {whyChooseUsData.whyChooseUsTitle}
        </h3>

        {/* Subtitle */}
        <p
          style={{
            color: colorSystemData.bodyTextColor,
            fontSize: typographyData.bodySize,
          }}
          className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12"
        >
          {whyChooseUsData.whyChooseUsSubtitle}
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <div
              className="
                    flex flex-col items-center text-center gap-4
                    rounded-xl p-6
                    bg-white 
                    border border-gray-200 dark:border-gray-700
                    shadow-sm hover:shadow-md
                    transition
                  "
            >
              <div className="relative w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <Image
                  src={
                    whyChooseUsData.cardPreviewImageOne
                      ? whyChooseUsData.cardPreviewImageOne
                      : getImageUrl(whyChooseUsData.cardImageOne)
                  }
                  alt={whyChooseUsData.whyChooseUsTitleOne || "Feature icon"}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Content */}
              <div>
                <h3
                  style={{ color: colorSystemData.headingColor }}
                  className="text-lg font-semibold mb-2 line-clamp-1 text-gray-900 dark:text-white"
                >
                  {whyChooseUsData.whyChooseUsTitleOne}
                </h3>

                <p
                  style={{ color: colorSystemData.bodyTextColor }}
                  className="text-gray-600 dark:text-gray-300 line-clamp-2"
                >
                  {whyChooseUsData.whyChooseUsDescriptionOne}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div
              className="
                    flex flex-col items-center text-center gap-4
                    rounded-xl p-6
                    bg-white 
                    border border-gray-200 dark:border-gray-700
                    shadow-sm hover:shadow-md
                    transition
                  "
            >
              {/* Icon */}
              <div className="relative w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <Image
                  src={
                    whyChooseUsData.cardPreviewImageTwo
                      ? whyChooseUsData.cardPreviewImageTwo
                      : getImageUrl(whyChooseUsData.cardImageTwo)
                  }
                  alt={whyChooseUsData.whyChooseUsTitleTwo || "Feature icon"}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Content */}
              <div>
                <h3
                  style={{ color: colorSystemData.headingColor }}
                  className="text-lg font-semibold mb-2 line-clamp-1 text-gray-900 dark:text-white"
                >
                  {whyChooseUsData.whyChooseUsTitleTwo}
                </h3>

                <p
                  style={{ color: colorSystemData.bodyTextColor }}
                  className="text-gray-600 dark:text-gray-300 line-clamp-2"
                >
                  {whyChooseUsData.whyChooseUsDescriptionTwo}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div
              className="
                    flex flex-col items-center text-center gap-4
                    rounded-xl p-6
                    bg-white 
                    border border-gray-200 dark:border-gray-700
                    shadow-sm hover:shadow-md
                    transition
                  "
            >
              {/* Icon */}
              <div className="relative w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <Image
                  src={
                    whyChooseUsData.cardPreviewImageThree
                      ? whyChooseUsData.cardPreviewImageThree
                      : getImageUrl(whyChooseUsData.cardImageThree)
                  }
                  alt={whyChooseUsData.whyChooseUsTitleThree || "Feature icon"}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Content */}
              <div>
                <h3
                  style={{ color: colorSystemData.headingColor }}
                  className="text-lg font-semibold mb-2 line-clamp-1 text-gray-900 dark:text-white"
                >
                  {whyChooseUsData.whyChooseUsTitleThree}
                </h3>

                <p
                  style={{ color: colorSystemData.bodyTextColor }}
                  className="text-gray-600 dark:text-gray-300 line-clamp-2"
                >
                  {whyChooseUsData.whyChooseUsDescriptionThree}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
