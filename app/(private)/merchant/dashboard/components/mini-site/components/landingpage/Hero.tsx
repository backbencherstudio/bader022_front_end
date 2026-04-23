import Image from "next/image";
import Link from "next/link";
import { useLandingPage } from "../../context/LandingBuilderContext";
import { getImageUrl } from "@/helper/formatImage";
import { useI18n } from "@/components/provider/I18nProvider";

export default function Hero() {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  const { heroData, brandingData, typographyData, colorSystemData } =
    useLandingPage();
  // console.log("====================================");
  // console.log(brandingData.logo);
  // console.log("====================================");

  return (
    <section className="relative w-full">
      <div className="relative w-full overflow-hidden rounded-md">
        {/* Background Image */}
        {heroData.heroPreviewImage ? (
          <Image
            src={heroData.heroPreviewImage}
            alt="Hero preview"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <Image
            src={getImageUrl(heroData.heroImage) || "/images/heroImage.jpg"}
            alt="Hero background"
            fill
            className="object-cover"
            priority
            unoptimized={true}
          />
        )}
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: heroData.overlayColor,
            opacity: 0.05,
          }}
        />
        {/* Logo */}
        <div
          className={`
            absolute top-4 md:top-6 z-20 w-full px-4 md:px-10
            flex
            ${
              brandingData.position === "center"
                ? "justify-center"
                : brandingData.position === "right"
                  ? "justify-end"
                  : "justify-start"
            }
          `}
        >
          <Image
            src={
              brandingData.brandingLogoPreview
                ? brandingData.brandingLogoPreview
                : getImageUrl(brandingData.logo) || "/images/yourlogo.png"
            }
            alt="Logo"
            width={brandingData.logoSize || 80}
            height={brandingData.logoSize || 40}
            className="object-contain"
            priority
            unoptimized
          />
        </div>
        {/* Content */}
        <div
          className="
    relative z-10
    flex items-center h-full
    px-4 md:px-10 lg:px-16 pt-30 pb-10
  "
        >
          <div className="max-w-5xl ">
            {/* {heroData.heroSubtitle && ( */}
            <h3
              style={{
                color: colorSystemData.headingColor,
                fontSize: Number(typographyData.h2Size),
              }}
              className="text-xs md:text-sm uppercase tracking-wide opacity-90"
            >
              {heroData.heroSubtitle || locale == "ar"
                ? "اعتنِ بشعرك"
                : "Care your hair"}
            </h3>
            {/* )} */}
            <h1
              className="font-bold mt-3 leading-tight lg:w-8/12 "
              style={{
                fontSize: Number(typographyData.h1Size),
                color: colorSystemData.headingColor,
              }}
            >
              {heroData.heroTitle || locale == "ar"
                ? "غذِّ فروة رأسك لنمو شعر قوي وصحي"
                : "Nourish Your Scalp for Strong, Healthy Hair Growth"}
            </h1>
            {/* {heroData.heroDescription && ( */}
            <p
              style={{
                color: colorSystemData.bodyTextColor,
                fontSize: Number(typographyData.bodySize),
              }}
              className="mt-1 text-sm md:text-lg lg:w-8/12 "
            >
              {heroData.heroDescription || locale == "ar"
                ? "يبدأ تعزيز نمو الشعر بفروة رأس صحية ومتوازنة. إن العناية بفروة الرأس توفر الأساس لشعر أقوى وأكثر حيوية، مما يسمح لكل خصلة بالوصول إلى كامل إمكاناتها"
                : "Nourishing hair growth starts with a healthy, balanced scalp. Caring for your scalp provides the foundation for stronger, more vibrant hair, allowing each strand to reach its full potential"}
            </p>
            {/* )} */}
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              {/* {heroData.primaryBtn && ( */}
              <Link href={"/user/bookings/add-booking"}>
                <button
                  style={{
                    backgroundColor: colorSystemData.primaryColor || "gray",
                  }}
                  className="px-6 py-3 rounded-md text-white font-medium transition
                 hover:opacity-90 cursor-pointer"
                >
                  {heroData.primaryBtn || locale == "ar"
                    ? "ابدأ الآن"
                    : "Get Started"}
                </button>
              </Link>
              {/* )} */}

              {/* {heroData.secondaryBtn && ( */}
              <Link href={"/user/bookings/add-booking"}>
                <button
                  style={{
                    // color: colorSystemData.secondaryColor,
                    borderColor: colorSystemData.secondaryColor || "gray",
                  }}
                  className="px-6 py-3 rounded-md border font-medium transition
                 hover:text-white cursor-pointer"
                >
                  {heroData.secondaryBtn || locale == "ar"
                    ? "احجز استشارة"
                    : "Book A Consultation"}
                </button>
              </Link>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
