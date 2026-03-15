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

export default function page() {
  const { user } = useAppSelector((state) => state.auth);
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

      formData.append("branding_logo", brandingData.logo);
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
        "layoutSettingsData",
        String(layoutSettingsData.sectionSpacing) || "",
      );
      formData.append("website_name", footerData.footerTitle);
      if (footerData.footerLogoFile) {
        formData.append("branding_logo", footerData.footerLogoFile);
      }
      formData.append("footer_des", footerData.footerSubTitle);
      formData.append("footer_background", footerData.footerBackground);
      formData.append("footer_text_color", footerData.footerTextColor);
      formData.append("facebook_url", footerData.facebookUrl || "");
      formData.append("twitter_url", footerData.twitterUrl || "");
      formData.append("instagram_url", footerData.instagramUrl || "");
      formData.append("linkedin_url", footerData.linkedinUrl || "");
      formData.append("pinterest_url", footerData.pinterestUrl || "");
      formData.append("home_url", footerData.homeUrl || "");
      formData.append("about_url", footerData.aboutUrl || "");
      formData.append("why_choose_us_url", footerData.why_choose_usUrl || "");
      formData.append("service_url", footerData.serviceUrl || "");
      formData.append("contact_url", footerData.contactUrl || "");
      formData.append("privacy_policy_url", footerData.privacy_policyUrl || "");
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

      toast.success("MiniSite created successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create MiniSite");
    }
  };

  return (
    <div className="dark:bg-gray-900 min-h-screen">
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
  );
}
