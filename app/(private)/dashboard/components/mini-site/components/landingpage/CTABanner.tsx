import Image from "next/image";
import React from "react";
import { useLandingPage } from "../../context/LandingBuilderContext";

export default function CTABanner() {
  const { ctaBannerData } = useLandingPage();
  return (
    <section>
      {ctaBannerData.ctaBannerTitle && (
        <div className="relative h-[320px]">
          {ctaBannerData.ctaBannerImage && (
            <Image
              src="/images/ctaBannerImage.png"
              alt="CTA"
              fill
              className="object-cover"
            />
          )}
          <div className="relative z-10 text-center p-20">
            <h2 className="text-3xl font-bold">
              {ctaBannerData.ctaBannerTitle}
            </h2>
            <p className="mt-3">{ctaBannerData.ctaBannerSubTitle}</p>
            <button className="mt-6 bg-orange-500 px-6 py-3 rounded text-white">
              Book A Consultation
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
