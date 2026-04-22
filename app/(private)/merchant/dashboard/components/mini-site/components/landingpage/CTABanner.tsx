import Image from "next/image";
import React from "react";
import { useLandingPage } from "../../context/LandingBuilderContext";
import Link from "next/link";
import { getImageUrl } from "@/helper/formatImage";
import { useI18n } from "@/components/provider/I18nProvider";

export default function CTABanner() {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  const { ctaBannerData, colorSystemData, layoutSettingsData, typographyData } =
    useLandingPage();

  return (
    <section
      className="relative"
      style={{ marginTop: layoutSettingsData.sectionSpacing }}
    >
      <div className="relative min-h-90 sm:min-h-80">
        {/* Background Image */}
        {ctaBannerData.ctaPreviewImage ? (
          <Image
            src={
              ctaBannerData.ctaPreviewImage ||
              "/images/mini-site/ctaBannerImage.png"
            }
            alt="CTA"
            fill
            className="object-cover"
            priority
            unoptimized={true}
          />
        ) : (
          <Image
            src={
              getImageUrl(ctaBannerData.ctaBannerImage) ||
              "/images/mini-site/ctaBannerImage.png"
            }
            alt="CTA"
            fill
            className="object-cover"
            priority
            unoptimized={true}
          />
        )}

        {/* Overlay (light + dark) */}
        <div className="absolute inset-0" />

        {/* Content */}
        <div
          style={{
            padding: Number(ctaBannerData.padding) || 40,
          }}
          className="
            relative z-10
            flex flex-col items-center justify-center
            text-center
            px-4 sm:px-8 md:px-16
            py-12 sm:py-16"
        >
          <h2
            style={{
              color: colorSystemData.headingColor,
              fontSize: typographyData.h1Size,
            }}
            className="text-xl sm:text-2xl md:text-3xl font-bold"
          >
            {ctaBannerData.ctaBannerTitle || locale == "ar"
              ? "شعرك يستحق أفضل عناية"
              : "Your Hair Deserves the Best Care"}
          </h2>

          {/* {ctaBannerData.ctaBannerSubTitle && ( */}
          <p
            style={{
              color: colorSystemData.bodyTextColor,
              fontSize: typographyData.bodySize,
            }}
            className="mt-4 mb-6 max-w-2xl text-sm sm:text-base"
          >
            {ctaBannerData.ctaBannerSubTitle || locale == "ar"
              ? "احجز استشارة مع خبراء الشعر المعتمدين لدينا واختبر علاجات احترافية ومخصصة لشعرك. المقاعد محدودة! احجز موعدك الآن"
              : "Book a consultation with our certified hair experts and experience professional, personalized hair treatments. Limited slots available! Secure your appointment"}
          </p>
          {/* )} */}

          <Link href={"/user/bookings/add-booking"}>
            <button
              style={{
                backgroundColor: colorSystemData.primaryColor || "gray",
              }}
              className="
              px-6 py-3 rounded-md
              font-medium            
              transition hover:opacity-90 cursor-pointer
            "
            >
              {locale == "ar" ? "احجز استشارة" : "Book A Consultation"}
            </button>
          </Link>
        </div>
      </div>
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: ctaBannerData.ctaBannerOverlayColor,
          opacity: 0.6,
        }}
      />
    </section>
  );
}
