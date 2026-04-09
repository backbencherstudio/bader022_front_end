"use client";
import React from "react";
import {
  LandingPageProvider,
  useLandingPage,
} from "../components/mini-site/context/LandingBuilderContext";
import LandingPage from "../components/mini-site/components/LandingPage";
import InputPanel from "../components/mini-site/components/InputPanel";
import { FiSave } from "react-icons/fi";
import MiniSiteCopyLink from "../components/mini-site/components/MiniSiteCopyLink";
import { useAppSelector } from "@/redux/hooks";
import {
  useCreateGlobalSettingMutation,
  useCreateMiniSiteMutation,
  useCreateWhyChooseUsMutation,
} from "@/redux/features/merchant/miniSiteApi";
import { toast } from "sonner";
import Link from "next/link";
import { motion } from "framer-motion";

export default function page() {
  const { user } = useAppSelector((state) => state.auth);

  console.log(user, "=================user");

  const {
    heroData,
    aboutData,
    whyChooseUsData,
    servicesPreviewData,
    ctaBannerData,
    brandingData,
    colorSystemData,
    layoutSettingsData,
    typographyData,
    footerData,
  } = useLandingPage();

  const [createMiniSite, { isLoading: isCreateMiniSiteLoading }] =
    useCreateMiniSiteMutation();
  const [createWhyChooseUs, { isLoading: isCreateWhyChooseUsLoading }] =
    useCreateWhyChooseUsMutation();
  const [createGlobalSetting, { isLoading: isCreateGlobalSettingLoading }] =
    useCreateGlobalSettingMutation();

  const handleSubmit = async () => {
    // console.log(footerData?.showPoweredBy);

    try {
      const formData = new FormData();

      formData.append("hero_title", heroData.heroTitle);
      formData.append("hero_subtitle", heroData.heroSubtitle);
      formData.append("hero_description", heroData.heroDescription);
      formData.append("cta_button_text", heroData.primaryBtn);
      formData.append("cta_button_text_two", heroData.secondaryBtn);
      if (heroData.heroImageFile) {
        formData.append("hero_image", heroData.heroImageFile);
      }
      formData.append("hero_overlay_color", heroData.overlayColor);
      formData.append("about_title", aboutData.aboutTitle);
      formData.append("about_description", aboutData.aboutDescription);
      if (aboutData.aboutImageFile) {
        formData.append("about_hero_image", aboutData.aboutImageFile);
      }
      formData.append("background_color", aboutData.backgroundColor);
      formData.append("about_padding", aboutData.padding as any);
      formData.append("cta_title", ctaBannerData.ctaBannerTitle);
      formData.append("cta_subtitle", ctaBannerData.ctaBannerSubTitle);
      if (ctaBannerData.ctaBannerFile) {
        formData.append("cta_image", ctaBannerData.ctaBannerFile);
      }
      formData.append("cta_overlay_color", ctaBannerData.ctaBannerOverlayColor);
      formData.append("cta_padding", ctaBannerData.padding as any);
      formData.append(
        "service_title",
        servicesPreviewData.servicesPreviewTitle,
      );
      formData.append(
        "service_description",
        servicesPreviewData.servicesPreviewSubtitle,
      );
      formData.append(
        "service_background",
        servicesPreviewData.backgroundColor,
      );

      formData.append("section_title", whyChooseUsData.whyChooseUsTitle);
      formData.append("section_subtitle", whyChooseUsData.whyChooseUsSubtitle);
      if (whyChooseUsData.cardImageOneFile) {
        formData.append("feature_one_image", whyChooseUsData.cardImageOneFile);
      }
      formData.append("feature_one_title", whyChooseUsData.whyChooseUsTitleOne);
      formData.append(
        "feature_one_des",
        whyChooseUsData.whyChooseUsDescriptionOne,
      );
      if (whyChooseUsData.cardImageTwoFile) {
        formData.append("feature_two_image", whyChooseUsData.cardImageTwoFile);
      }
      formData.append("feature_two_title", whyChooseUsData.whyChooseUsTitleTwo);
      formData.append(
        "feature_two_des",
        whyChooseUsData.whyChooseUsDescriptionTwo,
      );
      if (whyChooseUsData.cardImageThreeFile) {
        formData.append(
          "feature_three_image",
          whyChooseUsData.cardImageThreeFile,
        );
      }
      formData.append(
        "feature_three_title",
        whyChooseUsData.whyChooseUsTitleThree,
      );
      formData.append(
        "feature_three_des",
        whyChooseUsData.whyChooseUsDescriptionThree,
      );
      formData.append(
        "feature_background_color",
        whyChooseUsData.backgroundColor,
      );

      if (brandingData.brandingLogoFile) {
        formData.append("branding_logo", brandingData.brandingLogoFile);
      }
      formData.append("logo_position", brandingData.position || "");
      formData.append("logo_size", String(brandingData.logoSize) || "");
      formData.append("primary_color", colorSystemData.primaryColor || "");
      formData.append("secondary_color", colorSystemData.secondaryColor || "");
      formData.append("heading_color", colorSystemData.headingColor || "");
      formData.append("button_color", colorSystemData.buttonColor || "");
      formData.append("body_text_color", colorSystemData.bodyTextColor || "");
      formData.append("typography_h1", String(typographyData.h1Size) || "");
      formData.append("typography_h2", String(typographyData.h1Size) || "");
      formData.append("body_text_size", String(typographyData.bodySize) || "");
      formData.append("font_family", typographyData.fontFamily || "");
      formData.append(
        "section_spacing",
        String(layoutSettingsData.sectionSpacing) || "",
      );
      formData.append("website_name", footerData.footerTitle);
      formData.append("footer_des", footerData.footerSubTitle);
      formData.append("footer_background", footerData.footerBackground);
      formData.append("footer_text_color", footerData.footerTextColor);
      formData.append("facebook_url", footerData.facebookUrl || "");
      formData.append("twitter_url", footerData.twitterUrl || "");
      formData.append("instagram_url", footerData.instagramUrl || "");
      formData.append("linkedin_url", footerData.linkedinUrl || "");
      formData.append("pinterest_url", footerData.pinterestUrl || "");
      formData.append("home", footerData.home || "");
      formData.append("home_url", footerData.homeUrl || "");
      formData.append("about", footerData.about || "");
      formData.append("about_url", footerData.aboutUrl || "");
      formData.append("why_choose_us", footerData.why_choose_us || "");
      formData.append("why_choose_us_url", footerData.why_choose_usUrl || "");
      formData.append("service", footerData.service || "");
      formData.append("service_url", footerData.serviceUrl || "");
      formData.append("contact_us", footerData.contact_us || "");
      formData.append("contact_url", footerData.contactUrl || "");
      formData.append("privacy_policy", footerData.privacy_policy || "");
      formData.append("privacy_policy_url", footerData.privacy_policyUrl || "");
      formData.append("terms_condition", footerData?.terms_condition || "");
      formData.append(
        "terms_conditionUrl",
        footerData?.terms_conditionUrl || "",
      );
      formData.append("contact_info", footerData?.contact_info || "");
      formData.append("contact_email", footerData?.contact_email || "");
      formData.append("country", footerData?.address || "");
      formData.append("turn_off", footerData?.showPoweredBy ? "1" : "0");

      await createMiniSite(formData).unwrap();
      await createWhyChooseUs(formData).unwrap();
      await createGlobalSetting(formData).unwrap();

      toast.success("MiniSite updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create MiniSite");
    }
  };

  return (
    <div className="dark:bg-gray-900 min-h-screen">
      {!user?.miniSiteAccess ? (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white dark:bg-gray-800 rounded-md text-black dark:text-white">
          {/* Gradient Glow Background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-20 blur-3xl dark:opacity-30" />
          </div>
          <div className="flex flex-col items-center text-center px-6">
            {/* Animated Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl"
            >
              The Mini Site feature is not included in your current plan. To
              gain access, please upgrade to the Premium plan.
            </motion.p>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8"
            >
              <Link
                href="/subscription"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-gray-300 px-6 py-3 text-base font-medium transition-all duration-300 hover:border-transparent dark:border-gray-700"
              >
                <span className="absolute inset-0 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative z-10 text-black group-hover:text-white dark:text-white">
                  Go Back Subscription
                </span>
              </Link>
            </motion.div>

            {/* Floating Shapes */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute left-10 top-20 h-16 w-16 rounded-full bg-purple-400/20 blur-xl"
              />
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute right-16 top-32 h-20 w-20 rounded-full bg-pink-400/20 blur-xl"
              />
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 7, repeat: Infinity }}
                className="absolute bottom-20 left-1/3 h-24 w-24 rounded-full bg-indigo-400/20 blur-xl"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          {" "}
          {/* HEADER */}
          <div className="w-full bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-5 flex flex-col gap-4">
            {/* Top row */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Mini-Site Builder
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Customize your booking mini-site
                </p>
              </div>

              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition cursor-pointer"
              >
                <FiSave size={16} />
                Save Changes
              </button>
            </div>
            <MiniSiteCopyLink subdomain={user?.website_domain} />
          </div>
          {/* CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-3 h-screen">
            {/* LEFT: INPUT PANEL */}
            <div className="border-r border-gray-200 dark:border-gray-700 space-y-1 bg-gray-50 dark:bg-gray-800 dark:text-white overflow-y-auto shadow my-3 p-3 rounded-md">
              <InputPanel />
            </div>

            {/* RIGHT: LANDING PAGE */}
            <LandingPage />
          </div>
        </div>
      )}
    </div>
  );
}
