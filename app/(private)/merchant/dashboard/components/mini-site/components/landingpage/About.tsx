import Image from "next/image";
import React from "react";
import { useLandingPage } from "../../context/LandingBuilderContext";
import { getImageUrl } from "@/helper/formatImage";
import { useI18n } from "@/components/provider/I18nProvider";

export default function About() {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  const { aboutData, colorSystemData, layoutSettingsData, typographyData } =
    useLandingPage();

  // console.log(colorSystemData.buttonColor);

  return (
    <section
      style={{
        backgroundColor: aboutData.backgroundColor || "transparent",
        marginTop: layoutSettingsData.sectionSpacing,
        paddingTop: Number(aboutData.padding) || 40,
        paddingBottom: Number(aboutData.padding),
      }}
      className="transition-colors"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-md">
            {aboutData.aboutPreviewImage ? (
              <Image
                src={aboutData.aboutPreviewImage}
                alt="About Us"
                fill
                className="object-cover"
                priority
                unoptimized={true}
              />
            ) : (
              <Image
                src={
                  getImageUrl(aboutData.aboutImage) ||
                  "/images/miniwebsitebuilder2.png"
                }
                alt="About Us"
                fill
                className="object-cover"
                priority
                unoptimized={true}
              />
            )}
          </div>

          {/* Content */}
          <div>
            <h3
              style={{
                color: colorSystemData.headingColor,
                fontSize: typographyData.h1Size,
              }}
              className="text-2xl md:text-3xl font-semibold mb-4"
            >
              {aboutData.aboutTitle || locale == "ar"
                ? "ارتقِ بإطلالتك مع العناية المخصصة بالشعر والخبرة الاحترافية"
                : "Elevate Your Look with Bespoke Hair Care & Expert"}
            </h3>

            <p
              style={{
                color: colorSystemData.bodyTextColor,
                fontSize: typographyData.bodySize,
              }}
              className="mb-6"
            >
              {aboutData.aboutDescription || locale == "ar"
                ? "اختبر مستوى جديدًا من الثقة مع عناية بالشعر مصممة خصيصًا لك. يجمع خبراؤنا في تصفيف الشعر بين التقنيات الشخصية والمنتجات الفاخرة لإبراز جمالك الطبيعي. من خلال الاستشارات المخصصة والرعاية الاحترافية، نمنح كل خصلة لمسة تحول تعزز إطلالتك العامة بالأناقة والرقي."
                : "Experience a new level of confidence with hair care tailored uniquely to you. Our expert stylists combine personalized techniques with premium products to enhance your natural beauty Through personalized consultations and expert care, we transform each strand to enhance your overall look with elegance and sophistication."}
            </p>

            <button
              style={{
                backgroundColor: colorSystemData.primaryColor || "gray",
              }}
              className="
                px-6 py-3 rounded-md font-medium
                transition hover:opacity-90
              "
            >
              {locale == "ar" ? "من نحن" : "About Us"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
