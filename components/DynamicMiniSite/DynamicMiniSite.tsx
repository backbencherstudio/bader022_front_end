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
  hero_overlay_color?: string;
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
  console.log("loggg============", data.global_setting.branding_logo);
  return (
    <div>
      {/* hero section  */}
      <section className="relative w-full">
        <div className="relative w-full h-[70vh] overflow-hidden">
          {/* Background Image */}
          <Image
            src={getImageUrl(data?.minisite?.hero_image)}
            alt="Hero background"
            fill
            className="object-cover"
            priority
            unoptimized={true}
          />

          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: data.minisite.hero_overlay_color,
              opacity: 0.05,
            }}
          />

          {/* Logo */}
          <div
            className={`
                        absolute top-4 md:top-6 z-20 w-full px-4 md:px-10
                        flex
                        ${
                          data.global_setting.logo_position === "center"
                            ? "justify-center"
                            : data.global_setting.logo_position === "right"
                              ? "justify-end"
                              : "justify-start"
                        }
                    `}
          >
            <Image
              src={getImageUrl(data.global_setting.branding_logo)}
              alt="Logo"
              width={data.global_setting.logo_size || 120}
              height={data.global_setting.logo_size || 40}
              className="object-contain"
              priority
              unoptimized={true}
            />
          </div>

          {/* Content */}
          <div
            className="lg:w-10/12 mx-auto
        relative z-10
        flex items-center h-full
        px-4 md:px-10 lg:px-16 pt-30 pb-10
    "
          >
            <div
              className="
            max-w-6xl
            text-white
            text-left
        "
            >
              <h3
                style={{
                  color: data.global_setting.heading_color,
                  fontSize: data.global_setting.typography_h2,
                }}
                className="text-xs md:text-sm uppercase tracking-wide opacity-90 text-white"
              >
                {data.minisite.hero_subtitle}
              </h3>

              <h1
                className="font-bold mt-3 leading-tight lg:w-8/12 text-white "
                style={{
                  color: data.global_setting.heading_color,
                  fontSize: data.global_setting.typography_h1,
                }}
              >
                {data.minisite.hero_title}
              </h1>

              <p
                style={{
                  color: data.global_setting.body_text_color,
                  fontSize: data.global_setting.body_text_size,
                }}
                className="mt-1 text-sm md:text-lg lg:w-8/12 text-white "
              >
                {data.minisite.hero_description}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href={"/user/bookings/add-booking"}>
                  <button
                    style={{
                      backgroundColor: data.global_setting.primary_color,
                    }}
                    className="px-6 py-3 rounded-md text-white font-medium transition
                                 hover:opacity-90 cursor-pointer"
                  >
                    {data.minisite.cta_button_text}
                  </button>
                </Link>
                <Link href={"/user/bookings/add-booking"}>
                  <button
                    style={{
                      color: data.global_setting.secondary_color,
                      borderColor: data.global_setting.secondary_color,
                    }}
                    className="px-6 py-3 rounded-md border font-medium transition
                                 hover:text-white cursor-pointer"
                  >
                    {data.minisite.cta_button_text_two}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section  */}
      <section
        style={{
          backgroundColor: data.minisite.background_color || "transparent",
          // marginTop: data.global_setting.section_spacing,
          paddingTop: `${data.minisite.about_padding}px`,
          paddingBottom: `${data.minisite.about_padding}px`,
        }}
        className="transition-colors dark:bg-gray-900"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <div className="relative w-full h-[320px] rounded-xl overflow-hidden shadow-md dark:shadow-black/40">
              <Image
                src={getImageUrl(data?.minisite?.about_hero_image)}
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
                  color: data.global_setting.heading_color,
                  fontSize: data.global_setting.typography_h1,
                }}
                className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white"
              >
                {data.minisite.about_title}
              </h3>

              <p
                style={{
                  color: data.global_setting.body_text_color,
                  fontSize: data.global_setting.body_text_size,
                }}
                className="text-gray-600 dark:text-gray-300 mb-6"
              >
                {data.minisite.about_description}
              </p>

              <button
                style={{
                  backgroundColor: data.global_setting.primary_color,
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
          backgroundColor: data.minisite.background_color || "transparent",
          // marginTop: data.global_setting.section_spacing,
        }}
        className="py-16 transition-colors"
      >
        <div className="container mx-auto px-4">
          {/* Title */}
          <h3
            style={{
              color: data.global_setting.heading_color,
              fontSize: data.global_setting.typography_h1,
            }}
            className="text-center text-4xl font-semibold mb-3 text-gray-900 dark:text-white"
          >
            {data.why_choose_us.section_title}
          </h3>

          {/* Subtitle */}
          <p
            style={{
              color: data.global_setting.body_text_color,
              fontSize: data.global_setting.body_text_size,
            }}
            className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12"
          >
            {data.why_choose_us.section_subtitle}
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
                {/* Icon */}
                <div className="relative w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <Image
                    src={
                      getImageUrl(
                        data.why_choose_us.feature_one_image as string,
                      ) || "/icons/Icon.png"
                    }
                    alt={data.why_choose_us.feature_one_title || "Feature icon"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Content */}
                <div>
                  <h3
                    style={{ color: data.global_setting.heading_color }}
                    className="text-lg font-semibold mb-2 line-clamp-1 text-gray-900 dark:text-white"
                  >
                    {data.why_choose_us.feature_one_title}
                  </h3>

                  <p
                    style={{ color: data.global_setting.body_text_color }}
                    className="text-gray-600 dark:text-gray-300 line-clamp-2"
                  >
                    {data.why_choose_us.feature_one_des}
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
                      getImageUrl(
                        data.why_choose_us.feature_two_image as string,
                      ) || "/icons/Icon.png"
                    }
                    alt={data.why_choose_us.feature_two_title || "Feature icon"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Content */}
                <div>
                  <h3
                    style={{ color: data.global_setting.heading_color }}
                    className="text-lg font-semibold mb-2 line-clamp-1 text-gray-900 dark:text-white"
                  >
                    {data.why_choose_us.feature_two_title}
                  </h3>

                  <p
                    style={{ color: data.global_setting.body_text_color }}
                    className="text-gray-600 dark:text-gray-300 line-clamp-2"
                  >
                    {data.why_choose_us.feature_two_des}
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
                      getImageUrl(
                        data.why_choose_us.feature_three_image as string,
                      ) || "/icons/Icon.png"
                    }
                    alt={
                      data.why_choose_us.feature_three_title || "Feature icon"
                    }
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Content */}
                <div>
                  <h3
                    style={{ color: data.global_setting.heading_color }}
                    className="text-lg font-semibold mb-2 line-clamp-1 text-gray-900 dark:text-white"
                  >
                    {data.why_choose_us.feature_three_title}
                  </h3>

                  <p
                    style={{ color: data.global_setting.body_text_color }}
                    className="text-gray-600 dark:text-gray-300 line-clamp-2"
                  >
                    {data.why_choose_us.feature_three_des}
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
          backgroundColor: data.minisite.service_background,
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
                color: data.global_setting.heading_color,
                fontSize: data.global_setting.typography_h1,
              }}
              className="text-4xl lg:w-6/12 font-semibold text-gray-900 dark:text-white mb-3"
            >
              {data.minisite.service_title}
            </h3>

            <div className="flex flex-col md:flex-row gap-4 md:justify-between">
              {/* Subtitle */}
              <p
                style={{
                  color: data.global_setting.body_text_color,
                  fontSize: data.global_setting.body_text_size,
                }}
                className="text-gray-600 dark:text-gray-300 max-w-4xl"
              >
                {data.minisite.service_description}
              </p>
              <button
                style={{
                  backgroundColor: data.global_setting.primary_color,
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
                      alt={item.service_name || "title"}
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
                        <span>{item.service_name}</span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {item.duration}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.service_name}
                    </h3>

                    {/* Description */}
                    <p
                      //   style={{ fontSize: typographyData.bodySize }}
                      className="text-gray-600 dark:text-gray-300 line-clamp-2"
                    >
                      {item.description}
                    </p>

                    {/* Button */}
                    <Link href={"/user/bookings/add-booking"}>
                      <button
                        style={{
                          backgroundColor: data.global_setting.primary_color,
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
        <div className="relative min-h-[360px] sm:min-h-[320px]">
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
              padding: data.minisite.cta_padding,
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
                color: data.global_setting.heading_color,
                fontSize: data.global_setting.typography_h1,
              }}
              className="text-xl sm:text-2xl md:text-3xl font-bold"
            >
              {data.minisite.cta_title}
            </h2>

            <p
              style={{
                color: data.global_setting.body_text_color,
                fontSize: data.global_setting.body_text_size,
              }}
              className="mt-4 mb-6 max-w-2xl text-sm sm:text-base text-gray-200"
            >
              {data.minisite.cta_subtitle}
            </p>

            <Link href={"/user/bookings/add-booking"}>
              <button
                style={{
                  backgroundColor: data.global_setting.primary_color,
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
            backgroundColor: data.minisite.cta_overlay_color,
            opacity: 0.6,
          }}
        />
      </section>

      <MiniSiteFooter data={data} />
    </div>
  );
}
