import Image from "next/image";
import React from "react";
import { useLandingPage } from "../../context/LandingBuilderContext";
import { getImageUrl } from "@/helper/formatImage";
import { useI18n } from "@/components/provider/I18nProvider";

export default function WhyChooseUs() {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  const {
    whyChooseUsData,
    colorSystemData,
    layoutSettingsData,
    typographyData,
  } = useLandingPage();

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
          className="text-center text-4xl font-semibold mb-3"
        >
          {whyChooseUsData.whyChooseUsTitle || locale == "ar"
            ? "لماذا نحن الخيار الأمثل"
            : "Why We’re Right Choice"}
        </h3>

        {/* Subtitle */}
        <p
          style={{
            color: colorSystemData.bodyTextColor,
            fontSize: typographyData.bodySize,
          }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          {whyChooseUsData.whyChooseUsSubtitle || locale == "ar"
            ? "نأخذ الوقت لفهم احتياجاتك الفريدة، لضمان أن كل خدمة مصممة خصيصًا لتحقيق نتائج استثنائية."
            : "We take the time to understand your unique needs, ensuring every service is tailored to deliver exceptional results"}
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <div
              className="
                    flex flex-col items-center text-center gap-4
                    rounded-xl p-6
                    border border-gray-200
                    shadow-sm hover:shadow-md
                    transition
                  "
            >
              <div className="relative w-14 h-14 rounded-full overflow-hidden">
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
                  className="text-lg font-semibold mb-2 line-clamp-1"
                >
                  {whyChooseUsData.whyChooseUsTitleOne || locale == "ar"
                    ? "خبراء شعر معتمدون"
                    : "Certified Hair Experts"}
                </h3>

                <p
                  style={{ color: colorSystemData.bodyTextColor }}
                  className="line-clamp-3"
                >
                  {whyChooseUsData.whyChooseUsDescriptionOne || locale == "ar"
                    ? "يتكون فريقنا من خبراء شعر معتمدين وذوي تدريب عالي، يتمتعون بسنوات من الخبرة والاحترافية في تقديم أفضل خدمات العناية بالشعر"
                    : "Our team consists of highly trained, certified hair specialists who bring years of experience and professional expertise"}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div
              className="
                    flex flex-col items-center text-center gap-4
                    rounded-xl p-6
                    border border-gray-200
                    shadow-sm hover:shadow-md
                    transition
                  "
            >
              {/* Icon */}
              <div className="relative w-14 h-14 rounded-full overflow-hidden">
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
                  className="text-lg font-semibold mb-2 line-clamp-1"
                >
                  {whyChooseUsData.whyChooseUsTitleTwo || locale == "ar"
                    ? "منتجات معتمدة من إدارة الغذاء والدواء (FDA)"
                    : "FDA-Approved Products"}
                </h3>

                <p
                  style={{ color: colorSystemData.bodyTextColor }}
                  className="line-clamp-3"
                >
                  {whyChooseUsData.whyChooseUsDescriptionTwo || locale == "ar"
                    ? "نستخدم فقط منتجات معتمدة من هيئة الغذاء والدواء (FDA) وتلبي أعلى معايير السلامة والجودة، لضمان أن كل علاج يتم بأمان وفعالية"
                    : "We use only FDA-approved products that meet the highest safety and quality standards, ensuring every treatment"}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div
              className="
                    flex flex-col items-center text-center gap-4
                    rounded-xl p-6
                    border border-gray-200
                    shadow-sm hover:shadow-md
                    transition
                  "
            >
              {/* Icon */}
              <div className="relative w-14 h-14 rounded-full overflow-hidden">
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
                  className="text-lg font-semibold mb-2 line-clamp-1"
                >
                  {whyChooseUsData.whyChooseUsTitleThree || locale == "ar"
                    ? "علاج مخصص حسب احتياجاتك"
                    : "Personalized Treatment"}
                </h3>

                <p
                  style={{ color: colorSystemData.bodyTextColor }}
                  className=" line-clamp-3"
                >
                  {whyChooseUsData.whyChooseUsDescriptionThree || locale == "ar"
                    ? "نقوم بتخصيص كل علاج للشعر ليتناسب مع ملمس شعرك الفريد، واهتماماتك، وأهدافك، لضمان نتائج مصممة خصيصًا لك"
                    : "We customize every hair treatment to match your unique texture, concerns, and goals, ensuring results that are tailored"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
