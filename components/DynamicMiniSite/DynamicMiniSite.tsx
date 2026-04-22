import { getImageUrl } from "@/helper/formatImage";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MiniSiteFooter from "./MiniSiteFooter";
import { useI18n } from "../provider/I18nProvider";

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
    website_domain: string;
    minisite: MiniSiteData;
    why_choose_us: WhyChooseUs;
    services: Service[];
    global_setting: any;
  };
}

export default function DynamicMiniSite({ data }: DynamicMiniSiteProps) {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  // console.log("loggg============", data);
  return (
    <div>
      {/* hero section */}
      <section className="relative w-full bg-gray-50 dark:bg-gray-800 dark:text-white">
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
              backgroundColor: data?.minisite?.hero_overlay_color || "",
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
                  {data?.minisite?.hero_subtitle || locale == "ar"
                    ? "اعتنِ بشعرك"
                    : "Care your hair"}
                </h3>

                {/* Title */}
                <h1
                  style={{ color: data?.global_setting?.heading_color }}
                  className="font-bold mt-3 leading-tight 
                       text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                >
                  {data?.minisite?.hero_title || locale == "ar"
                    ? "غذِّ فروة رأسك لنمو شعر قوي وصحي"
                    : "Nourish Your Scalp for Strong, Healthy Hair Growth"}
                </h1>

                {/* Description */}
                <p
                  style={{ color: data?.global_setting?.body_text_color }}
                  className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl"
                >
                  {data?.minisite?.hero_description || locale == "ar"
                    ? "يبدأ تعزيز نمو الشعر بفروة رأس صحية ومتوازنة. إن العناية بفروة الرأس توفر الأساس لشعر أقوى وأكثر حيوية، مما يسمح لكل خصلة بالوصول إلى كامل إمكاناتها"
                    : "Nourishing hair growth starts with a healthy, balanced scalp. Caring for your scalp provides the foundation for stronger, more vibrant hair, allowing each strand to reach its full potential"}
                </p>

                {/* Buttons */}
                <div
                  className="
              flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6
              items-center lg:items-start
              justify-center lg:justify-start
            "
                >
                  <Link href={`/${data?.website_domain}/booking`}>
                    <button
                      style={{
                        backgroundColor:
                          data?.global_setting?.primary_color || "gray",
                      }}
                      className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-md text-white font-medium transition hover:opacity-90 cursor-pointer"
                    >
                      {data?.minisite?.cta_button_text || locale == "ar"
                        ? "ابدأ الآن"
                        : "Get Started"}
                    </button>
                  </Link>

                  <Link href={`/${data?.website_domain}/booking`}>
                    <button
                      style={{
                        color: data?.global_setting?.secondary_color,
                        borderColor: data?.global_setting?.secondary_color,
                      }}
                      className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-md border font-medium transition hover:bg-white/10 cursor-pointer"
                    >
                      {data?.minisite?.cta_button_text_two || locale == "ar"
                        ? "احجز استشارة"
                        : "Book A Consultation"}
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
        id="#about"
        style={{
          backgroundColor: data?.minisite?.background_color || "transparent",
          // marginTop: data.global_setting.section_spacing,
          paddingTop: `${data?.minisite?.about_padding || 40}px`,
          paddingBottom: `${data?.minisite?.about_padding}px`,
        }}
        className="transition-colors"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-md ">
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
                className="text-2xl md:text-3xl font-semibold mb-4"
              >
                {data?.minisite?.about_title || locale == "ar"
                  ? "ارتقِ بإطلالتك مع العناية المخصصة بالشعر والخبرة الاحترافية"
                  : "Elevate Your Look with Bespoke Hair Care & Expert"}
              </h3>

              <p
                style={{
                  color: data?.global_setting?.body_text_color,
                  fontSize: data?.global_setting?.body_text_size,
                }}
                className="mb-6"
              >
                {data?.minisite?.about_description || locale == "ar"
                  ? "اختبر مستوى جديدًا من الثقة مع عناية بالشعر مصممة خصيصًا لك. يجمع خبراؤنا في تصفيف الشعر بين التقنيات الشخصية والمنتجات الفاخرة لإبراز جمالك الطبيعي. من خلال الاستشارات المخصصة والرعاية الاحترافية، نمنح كل خصلة لمسة تحول تعزز إطلالتك العامة بالأناقة والرقي."
                  : "Experience a new level of confidence with hair care tailored uniquely to you. Our expert stylists combine personalized techniques with premium products to enhance your natural beauty Through personalized consultations and expert care, we transform each strand to enhance your overall look with elegance and sophistication."}
              </p>

              <button
                style={{
                  backgroundColor:
                    data?.global_setting?.primary_color || "gray",
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

      {/* WhyChooseUs Section  */}
      <section
        id="#why-choose-us"
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
            className="text-center text-4xl font-semibold mb-3"
          >
            {data?.why_choose_us?.section_title || locale == "ar"
              ? "لماذا نحن الخيار الأمثل"
              : "Why We’re Right Choice"}
          </h3>

          {/* Subtitle */}
          <p
            style={{
              color: data?.global_setting?.body_text_color,
              fontSize: data?.global_setting?.body_text_size,
            }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            {data?.why_choose_us?.section_subtitle || locale == "ar"
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
                          border border-gray-100
                          shadow-sm hover:shadow-md
                          transition
                        "
              >
                {/* Icon */}
                <div className="relative w-14 h-14 rounded-full overflow-hidden">
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
                    {data?.why_choose_us?.feature_one_title || locale == "ar"
                      ? "خبراء شعر معتمدون"
                      : "Certified Hair Experts"}
                  </h3>

                  <p
                    style={{ color: data?.global_setting?.body_text_color }}
                    className=" line-clamp-2"
                  >
                    {data?.why_choose_us?.feature_one_des || locale == "ar"
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
                          border border-gray-100 
                          shadow-sm hover:shadow-md
                          transition
                        "
              >
                {/* Icon */}
                <div className="relative w-14 h-14 rounded-full  overflow-hidden">
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
                    className="text-lg font-semibold mb-2 line-clamp-1 "
                  >
                    {data?.why_choose_us?.feature_two_title || locale == "ar"
                      ? "منتجات معتمدة من إدارة الغذاء والدواء (FDA)"
                      : "FDA-Approved Products"}
                  </h3>

                  <p
                    style={{ color: data?.global_setting?.body_text_color }}
                    className=" line-clamp-2"
                  >
                    {data?.why_choose_us?.feature_two_des || locale == "ar"
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
                          border border-gray-100 
                          shadow-sm hover:shadow-md
                          transition
                        "
              >
                {/* Icon */}
                <div className="relative w-14 h-14 rounded-full overflow-hidden">
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
                    className="text-lg font-semibold mb-2 line-clamp-1 "
                  >
                    {data?.why_choose_us?.feature_three_title || locale == "ar"
                      ? "علاج مخصص حسب احتياجاتك"
                      : "Personalized Treatment"}
                  </h3>

                  <p
                    style={{ color: data?.global_setting?.body_text_color }}
                    className=" line-clamp-2"
                  >
                    {data?.why_choose_us?.feature_three_des || locale == "ar"
                      ? "نقوم بتخصيص كل علاج للشعر ليتناسب مع ملمس شعرك الفريد، واهتماماتك، وأهدافك، لضمان نتائج مصممة خصيصًا لك"
                      : "We customize every hair treatment to match your unique texture, concerns, and goals, ensuring results that are tailored"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section  */}

      <section
        id="#services"
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
              className="text-4xl lg:w-6/12 font-semibold mb-3"
            >
              {data?.minisite?.service_title || locale == "ar"
                ? "علاجات وتصفيف شعر مخصص يناسبك"
                : "Customized Hair Treatments & Styling to Suit You"}
            </h3>

            <div className="flex flex-col md:flex-row gap-4 md:justify-between">
              {/* Subtitle */}
              <p
                style={{
                  color: data?.global_setting?.body_text_color,
                  fontSize: data?.global_setting?.body_text_size,
                }}
                className=" max-w-4xl"
              >
                {data?.minisite?.service_description || locale == "ar"
                  ? "استمتع بعناية متجددة وحلول تصفيف احترافية مصممة لتناسب جميع أنواع الشعر. تم تصميم علاجاتنا المغذية لاستعادة صحة الشعر."
                  : "Experience revitalizing care and expert styling solutions tailored to every hair type. Our nourishing treatments are designed to restore health"}
              </p>
              <Link href={`/${data?.website_domain}/booking`}>
                <button
                  style={{
                    backgroundColor:
                      data?.global_setting?.primary_color || "gray",
                  }}
                  className="px-6 py-3 rounded-md  font-medium transition
                 hover:opacity-90 cursor-pointer"
                >
                  {locale == "ar" ? "عرض المزيد" : "View More"}
                </button>
              </Link>
            </div>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.services.map((item, index) => (
              <div key={index}>
                <div
                  className="
                    rounded-2xl overflow-hidden
                    border border-gray-100 
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
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span>⏱</span>
                        <span>{item?.service_name}</span>
                      </div>
                      <span className="font-semibold">{item?.duration}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold ">
                      {item?.service_name}
                    </h3>

                    {/* Description */}
                    <p
                      //   style={{ fontSize: typographyData.bodySize }}
                      className=" line-clamp-2"
                    >
                      {item?.description}
                    </p>

                    {/* Button */}
                    <Link href={`/${data?.website_domain}/booking`}>
                      <button
                        style={{
                          backgroundColor:
                            data?.global_setting?.primary_color || "gray",
                        }}
                        className="
                px-5 py-2 rounded-md
                text-white font-medium
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

      {/* CTA Banner Section  */}
      <section
        id="#banner"
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
          <div className="absolute inset-0" />

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
          "
          >
            <h2
              style={{
                color: data?.global_setting?.heading_color,
                fontSize: data?.global_setting?.typography_h1,
              }}
              className="text-xl sm:text-2xl md:text-3xl font-bold"
            >
              {data?.minisite?.cta_title || locale == "ar"
                ? "شعرك يستحق أفضل عناية"
                : "Your Hair Deserves the Best Care"}
            </h2>

            <p
              style={{
                color: data?.global_setting?.body_text_color,
                fontSize: data?.global_setting?.body_text_size,
              }}
              className="mt-4 mb-6 max-w-2xl text-sm sm:text-base"
            >
              {data?.minisite?.cta_subtitle || locale == "ar"
                ? "احجز استشارة مع خبراء الشعر المعتمدين لدينا واختبر علاجات احترافية ومخصصة لشعرك. المقاعد محدودة! احجز موعدك الآن"
                : "Book a consultation with our certified hair experts and experience professional, personalized hair treatments. Limited slots available! Secure your appointment"}
            </p>

            <Link href={`/${data?.website_domain}/booking`}>
              <button
                style={{
                  backgroundColor:
                    data?.global_setting?.primary_color || "gray",
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
            backgroundColor: data?.minisite?.cta_overlay_color,
            opacity: 0.6,
          }}
        />
      </section>

      <MiniSiteFooter data={data} />
    </div>
  );
}
