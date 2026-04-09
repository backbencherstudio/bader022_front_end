import { getImageUrl } from "@/helper/formatImage";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MiniSiteFooter from "./MiniSiteFooter";

interface MiniSiteData {
  hero_image?: string;
  overlayColor?: string;
  hero_subtitle?: string;
  hero_title?: string;
  hero_description?: string;
  cta_button_text?: string;
  cta_button_text_two?: string;
  background_color?: string;
  about_padding?: string;
  about_hero_image?: string;
  about_description?: string;
  about_title?: string;
  service_title?: string;
  service_description?: string;
  hero_overlay_color?: string | null;
  cta_overlay_color?: string;
  cta_subtitle?: string;
  cta_title?: string;
  cta_padding?: string;
  service_background?: string;
}

interface WhyChooseUs {
  section_title?: string;
  section_subtitle?: string;
  feature_one_image?: string | null;
  feature_one_title?: string;
  feature_one_des?: string;
  feature_two_image?: string | null;
  feature_two_title?: string;
  feature_two_des?: string;
  feature_three_image?: string | null;
  feature_three_title?: string;
  feature_three_des?: string;
  background_color?: string;
}

interface Service {
  image?: string;
  service_name?: string;
  description?: string;
  duration?: string;
}

interface DynamicMiniSiteProps {
  data: {
    minisite: MiniSiteData;
    why_choose_us: WhyChooseUs;
    services: Service[];
    global_setting: any;
  };
}

export default function DynamicMiniSite({ data }: DynamicMiniSiteProps) {
  console.log("loggg============", data);
  return (
    <div>
      {/* hero section */}
      <section className="relative w-full">
        <div className="relative w-full min-h-[65vh] sm:min-h-[75vh] lg:min-h-[90vh] overflow-hidden">
          {/* Background Image */}
          <Image
            src={
              getImageUrl(data?.minisite?.hero_image) || "/images/heroImage.png"
            }
            alt="Hero background"
            fill
            priority
            unoptimized
            className="object-cover object-center sm:object-center lg:object-cover"
          />

          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: data?.minisite?.hero_overlay_color || "#808080",
              opacity: 0.25,
            }}
          />

          {/* Logo */}
          <div
            className={`
        absolute top-4 sm:top-6 z-20 w-full px-4 sm:px-6 lg:px-10 flex
        ${
          data?.global_setting?.logo_position === "center"
            ? "justify-center"
            : data?.global_setting?.logo_position === "right"
              ? "justify-end"
              : "justify-start"
        }
      `}
          >
            <Image
              src={
                getImageUrl(data?.global_setting?.branding_logo) ||
                "/images/image 259.png"
              }
              alt="Logo"
              width={120}
              height={40}
              className="object-contain w-25 sm:w-30 md:w-35 h-auto"
              priority
              unoptimized
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-16 py-16 sm:py-20 mt-20 md:mt-30 lg:mt-40">
            <div className="w-full container mx-auto">
              {/* Responsive alignment wrapper */}
              <div
                className="max-w-2xl lg:max-w-5xl 
                        text-center lg:text-left 
                        mx-auto lg:mx-0"
              >
                {/* Subtitle */}
                <h3
                  style={{ color: data?.global_setting?.heading_color }}
                  className="text-xs sm:text-sm uppercase tracking-wide opacity-90"
                >
                  {data?.minisite?.hero_subtitle || "Care your hair"}
                </h3>

                {/* Title */}
                <h1
                  style={{ color: data?.global_setting?.heading_color }}
                  className="font-bold mt-3 leading-tight 
                       text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                >
                  {data?.minisite?.hero_title ||
                    "Nourish Your Scalp for Strong, Healthy Hair Growth"}
                </h1>

                {/* Description */}
                <p
                  style={{ color: data?.global_setting?.body_text_color }}
                  className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl"
                >
                  {data?.minisite?.hero_description ||
                    "Nourishing hair growth starts with a healthy, balanced scalp. Caring for your scalp provides the foundation for stronger, more vibrant hair."}
                </p>

                {/* Buttons */}
                <div
                  className="
              flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6
              items-center lg:items-start
              justify-center lg:justify-start
            "
                >
                  <Link href="/user/bookings/add-booking">
                    <button
                      style={{
                        backgroundColor: data?.global_setting?.primary_color,
                      }}
                      className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-md text-white font-medium transition hover:opacity-90"
                    >
                      {data?.minisite?.cta_button_text || "Get Started"}
                    </button>
                  </Link>

                  <Link href="/user/bookings/add-booking">
                    <button
                      style={{
                        color: data?.global_setting?.secondary_color,
                        borderColor: data?.global_setting?.secondary_color,
                      }}
                      className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-md border font-medium transition hover:bg-white/10"
                    >
                      {data?.minisite?.cta_button_text_two ||
                        "Book A Consultation"}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section  */}
      <section
        style={{
          backgroundColor: data?.minisite?.background_color || "transparent",
          // marginTop: data.global_setting.section_spacing,
          paddingTop: `${data?.minisite?.about_padding || 40}px`,
          paddingBottom: `${data?.minisite?.about_padding}px`,
        }}
        className="transition-colors dark:bg-gray-900"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-md dark:shadow-black/40">
              <Image
                src={
                  getImageUrl(data?.minisite?.about_hero_image) ||
                  "/images/miniwebsitebuilder2.png"
                }
                alt="About Us"
                fill
                className="object-cover"
                priority
                unoptimized={true}
              />
            </div>

            {/* Content */}
            <div>
              <h3
                style={{
                  color: data?.global_setting?.heading_color,
                  fontSize: data?.global_setting?.typography_h1,
                }}
                className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white"
              >
                {data?.minisite?.about_title ||
                  "Elevate Your Look with Bespoke Hair Care & Expert"}
              </h3>

              <p
                style={{
                  color: data?.global_setting?.body_text_color,
                  fontSize: data?.global_setting?.body_text_size,
                }}
                className="text-gray-600 dark:text-gray-300 mb-6"
              >
                {data?.minisite?.about_description ||
                  "Experience a new level of confidence with hair care tailored uniquely to you. Our expert stylists combine personalized techniques with premium products to enhance your natural beauty Through personalized consultations and expert care, we transform each strand to enhance your overall look with elegance and sophistication."}
              </p>

              <button
                style={{
                  backgroundColor: data?.global_setting?.primary_color,
                }}
                className="
                      px-6 py-3 rounded-md
                      text-white font-medium
                      transition hover:opacity-90
                    "
              >
                About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WhyChooseUs Section  */}
      <section
        style={{
          backgroundColor: data?.minisite?.background_color || "transparent",
          // marginTop: data.global_setting.section_spacing,
        }}
        className="py-16 transition-colors"
      >
        <div className="container mx-auto px-4">
          {/* Title */}
          <h3
            style={{
              color: data?.global_setting?.heading_color,
              fontSize: data?.global_setting?.typography_h1,
            }}
            className="text-center text-4xl font-semibold mb-3 text-gray-900 dark:text-white"
          >
            {data?.why_choose_us?.section_title || "Why We’re Right Choice"}
          </h3>

          {/* Subtitle */}
          <p
            style={{
              color: data?.global_setting?.body_text_color,
              fontSize: data?.global_setting?.body_text_size,
            }}
            className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12"
          >
            {data?.why_choose_us?.section_subtitle ||
              "We take the time to understand your unique needs, ensuring every service is tailored to deliver exceptional results"}
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <div
                className="
                          flex flex-col items-center text-center gap-4
                          rounded-xl p-6
                          bg-gray-100 text-black dark:bg-gray-700 dark:text-white
                          border border-gray-200 dark:border-gray-700
                          shadow-sm hover:shadow-md
                          transition
                        "
              >
                {/* Icon */}
                <div className="relative w-14 h-14 rounded-full bg-gray-100 text-black dark:bg-gray-700 dark:text-white overflow-hidden">
                  <Image
                    src={
                      getImageUrl(
                        data?.why_choose_us?.feature_one_image as string,
                      ) || "/icons/Icon.png"
                    }
                    alt={
                      data?.why_choose_us?.feature_one_title || "Feature icon"
                    }
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Content */}
                <div>
                  <h3
                    style={{ color: data?.global_setting?.heading_color }}
                    className="text-lg font-semibold mb-2 line-clamp-1 text-gray-900 dark:text-white"
                  >
                    {data?.why_choose_us?.feature_one_title ||
                      "Certified Hair Experts"}
                  </h3>

                  <p
                    style={{ color: data?.global_setting?.body_text_color }}
                    className="text-gray-600 dark:text-gray-300 line-clamp-2"
                  >
                    {data?.why_choose_us?.feature_one_des ||
                      "Our team consists of highly trained, certified hair specialists who bring years of experience and professional expertise"}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div
                className="
                          flex flex-col items-center text-center gap-4
                          rounded-xl p-6
                          bg-gray-100 text-black dark:bg-gray-700 dark:text-white
                          border border-gray-200 dark:border-gray-700
                          shadow-sm hover:shadow-md
                          transition
                        "
              >
                {/* Icon */}
                <div className="relative w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <Image
                    src={
                      getImageUrl(
                        data?.why_choose_us?.feature_two_image as string,
                      ) || "/icons/Icon.png"
                    }
                    alt={
                      data?.why_choose_us?.feature_two_title || "Feature icon"
                    }
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Content */}
                <div>
                  <h3
                    style={{ color: data?.global_setting?.heading_color }}
                    className="text-lg font-semibold mb-2 line-clamp-1 text-gray-900 dark:text-white"
                  >
                    {data?.why_choose_us?.feature_two_title ||
                      "FDA-Approved Products"}
                  </h3>

                  <p
                    style={{ color: data?.global_setting?.body_text_color }}
                    className="text-gray-600 dark:text-gray-300 line-clamp-2"
                  >
                    {data?.why_choose_us?.feature_two_des ||
                      "We use only FDA-approved products that meet the highest safety and quality standards, ensuring every treatment"}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div
                className="
                          flex flex-col items-center text-center gap-4
                          rounded-xl p-6
                         bg-gray-100 text-black dark:bg-gray-700 dark:text-white
                          border border-gray-200 dark:border-gray-700
                          shadow-sm hover:shadow-md
                          transition
                        "
              >
                {/* Icon */}
                <div className="relative w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <Image
                    src={
                      getImageUrl(
                        data?.why_choose_us?.feature_three_image as string,
                      ) || "/icons/Icon.png"
                    }
                    alt={
                      data?.why_choose_us?.feature_three_title || "Feature icon"
                    }
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Content */}
                <div>
                  <h3
                    style={{ color: data?.global_setting?.heading_color }}
                    className="text-lg font-semibold mb-2 line-clamp-1 text-gray-900 dark:text-white"
                  >
                    {data?.why_choose_us?.feature_three_title ||
                      "Personalized Treatment"}
                  </h3>

                  <p
                    style={{ color: data?.global_setting?.body_text_color }}
                    className="text-gray-600 dark:text-gray-300 line-clamp-2"
                  >
                    {data?.why_choose_us?.feature_three_des ||
                      "We customize every hair treatment to match your unique texture, concerns, and goals, ensuring results that are tailored"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section  */}

      <section
        style={{
          backgroundColor: data?.minisite?.service_background,
          //   marginTop: layoutSettingsData.sectionSpacing,
        }}
        className="py-16 transition-colors"
      >
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col gap-4 mb-12">
            {/* Title */}
            <h3
              style={{
                color: data?.global_setting?.heading_color,
                fontSize: data?.global_setting?.typography_h1,
              }}
              className="text-4xl lg:w-6/12 font-semibold text-gray-900 dark:text-white mb-3"
            >
              {data?.minisite?.service_title ||
                "Customized Hair Treatments & Styling to Suit You"}
            </h3>

            <div className="flex flex-col md:flex-row gap-4 md:justify-between">
              {/* Subtitle */}
              <p
                style={{
                  color: data?.global_setting?.body_text_color,
                  fontSize: data?.global_setting?.body_text_size,
                }}
                className="text-gray-600 dark:text-gray-300 max-w-4xl"
              >
                {data?.minisite?.service_description ||
                  "Experience revitalizing care and expert styling solutions tailored to every hair type. Our nourishing treatments are designed to restore health"}
              </p>
              <button
                style={{
                  backgroundColor: data?.global_setting?.primary_color,
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
            {data.services.map((item, index) => (
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
                      src={"/images/mini-site/service1.png"}
                      alt={item?.service_name || "title"}
                      fill
                      className="object-cover"
                      unoptimized={true}
                    />
                  </div>

                  {/* Content */}
                  <div
                    // style={{ color: colorSystemData.bodyTextColor }}
                    className="p-5 space-y-4"
                  >
                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <span>⏱</span>
                        <span>{item?.service_name}</span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {item?.duration}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item?.service_name}
                    </h3>

                    {/* Description */}
                    <p
                      //   style={{ fontSize: typographyData.bodySize }}
                      className="text-gray-600 dark:text-gray-300 line-clamp-2"
                    >
                      {item?.description}
                    </p>

                    {/* Button */}
                    <Link href={"/user/bookings/add-booking"}>
                      <button
                        style={{
                          backgroundColor: data?.global_setting?.primary_color,
                        }}
                        className="
                px-5 py-2 rounded-md
                text-white font-medium
                transition hover:opacity-90 cursor-pointer
              "
                      >
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner Section  */}

      <section
        className="relative"
        // style={{ marginTop: layoutSettingsData.sectionSpacing }}
      >
        <div className="relative min-h-90 sm:min-h-80">
          {/* Background Image */}
          <Image
            src={
              //   ctaBannerData.ctaBannerImage ||
              "/images/mini-site/ctaBannerImage.png"
            }
            alt="CTA"
            fill
            className="object-cover"
            priority
            unoptimized={true}
          />

          {/* Overlay (light + dark) */}
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />

          {/* Content */}
          <div
            style={{
              padding: data?.minisite?.cta_padding || 40,
            }}
            className="
            relative z-10
            flex flex-col items-center justify-center
            text-center
            px-4 sm:px-8 md:px-16
            py-12 sm:py-16
            text-white
          "
          >
            <h2
              style={{
                color: data?.global_setting?.heading_color,
                fontSize: data?.global_setting?.typography_h1,
              }}
              className="text-xl sm:text-2xl md:text-3xl font-bold"
            >
              {data?.minisite?.cta_title || "Your Hair Deserves the Best Care"}
            </h2>

            <p
              style={{
                color: data?.global_setting?.body_text_color,
                fontSize: data?.global_setting?.body_text_size,
              }}
              className="mt-4 mb-6 max-w-2xl text-sm sm:text-base text-gray-200"
            >
              {data?.minisite?.cta_subtitle ||
                "Book a consultation with our certified hair experts and experience professional, personalized hair treatments. Limited slots available! Secure your appointment"}
            </p>

            <Link href={"/user/bookings/add-booking"}>
              <button
                style={{
                  backgroundColor: data?.global_setting?.primary_color,
                }}
                className="
              px-6 py-3 rounded-md
              text-white font-medium            
              transition hover:opacity-90 cursor-pointer
            "
              >
                Book A Consultation
              </button>
            </Link>
          </div>
        </div>
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: data?.minisite?.cta_overlay_color,
            opacity: 0.6,
          }}
        />
      </section>

      <MiniSiteFooter data={data} />
    </div>
  );
}
