import Image from "next/image";
import React from "react";
import { useLandingPage } from "../../context/LandingBuilderContext";
import Link from "next/link";
import { getImageUrl } from "@/helper/formatImage";
import { useI18n } from "@/components/provider/I18nProvider";

export default function ServicesPreview() {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  const {
    servicesPreviewData,
    colorSystemData,
    layoutSettingsData,
    typographyData,
  } = useLandingPage();

  // console.log(servicesPreviewData.servicesCards);

  return (
    <section
      style={{
        backgroundColor: servicesPreviewData.backgroundColor,
        marginTop: layoutSettingsData.sectionSpacing,
      }}
      className="py-16 transition-colors"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-12">
          {/* Title */}
          <h3
            style={{
              color: colorSystemData.headingColor,
              fontSize: typographyData.h1Size,
            }}
            className="text-4xl lg:w-6/12 font-semibold mb-3"
          >
            {servicesPreviewData.servicesPreviewTitle || locale == "ar"
              ? "علاجات وتصفيف شعر مخصص يناسبك"
              : "Customized Hair Treatments & Styling to Suit You"}
          </h3>

          <div className="flex flex-col md:flex-row gap-4 md:justify-between">
            {/* Subtitle */}
            <p
              style={{
                color: colorSystemData.bodyTextColor,
                fontSize: typographyData.bodySize,
              }}
              className="max-w-xl"
            >
              {servicesPreviewData.servicesPreviewSubtitle || locale == "ar"
                ? "استمتع بعناية متجددة وحلول تصفيف احترافية مصممة لتناسب جميع أنواع الشعر. تم تصميم علاجاتنا المغذية لاستعادة صحة الشعر."
                : "Experience revitalizing care and expert styling solutions tailored to every hair type. Our nourishing treatments are designed to restore health"}
            </p>
            <button
              style={{
                backgroundColor: colorSystemData.primaryColor || "gray",
              }}
              className="px-6 py-3 rounded-md font-medium transition
                 hover:opacity-90 cursor-pointer"
            >
              {locale == "ar" ? "عرض المزيد" : "View More"}
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
          border border-gray-200
          shadow-sm hover:shadow-md
          transition
        "
              >
                {/* Image */}
                <div className="relative h-48 w-full">
                  <Image
                    src={
                      getImageUrl(item.image as string) ||
                      "/placeholder-image.png"
                    }
                    alt={item.title || "Service"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Content */}
                <div
                  style={{ color: colorSystemData.bodyTextColor }}
                  className="p-5 space-y-4"
                >
                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span>⏱</span>
                      <span>{item.title || "Service"}</span>
                    </div>

                    <span className="font-semibold ">{item.duration}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold ">
                    {item.title || "Service"}
                  </h3>

                  {/* Description */}
                  <p
                    style={{ fontSize: typographyData.bodySize }}
                    className=" line-clamp-2"
                  >
                    {item.description}
                  </p>

                  {/* Button */}
                  <Link href="/user/bookings/add-booking">
                    <button
                      style={{
                        backgroundColor: colorSystemData.primaryColor || "gray",
                      }}
                      className="
                px-5 py-2 rounded-md font-medium
                transition hover:opacity-90 cursor-pointer
              "
                    >
                      {locale == "ar" ? "احجز الآن" : "Book Now"}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
