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
  useCreateMiniSiteMutation,
  useCreateWhyChooseUsMutation,
} from "@/redux/features/merchant/miniSiteApi";
import { toast } from "sonner";

export default function page() {
  const { user } = useAppSelector((state) => state.auth);
  const {
    heroData,
    aboutData,
    ctaBannerData,
    whyChooseUsData,
    colorSystemData,
    layoutSettingsData,
    typographyData,
  } = useLandingPage();

  const [createMiniSite, { isLoading: isCreateMiniSiteLoading }] =
    useCreateMiniSiteMutation();
  const [createWhyChooseUs, { isLoading: isCreateWhyChooseUsLoading }] =
    useCreateWhyChooseUsMutation();

  const handleSubmit = async () => {
    console.log("====================================");
    console.log(whyChooseUsData);
    console.log("====================================");

    try {
      const formData = new FormData();

      formData.append("hero_title", heroData.heroTitle);
      formData.append("hero_subtitle", heroData.heroSubtitle);
      formData.append("hero_description", heroData.heroDescription);
      formData.append("cta_button_text", heroData.primaryBtn);
      formData.append("cta_button_text_two", heroData.secondaryBtn);
      formData.append("hero_overlay_color", heroData.overlayColor);
      formData.append("about_title", aboutData.aboutTitle);
      formData.append("about_description", aboutData.aboutDescription);
      formData.append("background_color", aboutData.backgroundColor);
      formData.append("about_padding", aboutData.padding as any);
      formData.append("cta_title", ctaBannerData.ctaBannerTitle);
      formData.append("cta_subtitle", ctaBannerData.ctaBannerSubTitle);
      formData.append("cta_overlay_color", ctaBannerData.ctaBannerOverlayColor);
      formData.append("cta_padding", ctaBannerData.padding as any);

      formData.append("section_title", whyChooseUsData.whyChooseUsTitle);
      formData.append("section_subtitle", whyChooseUsData.whyChooseUsSubtitle);
      formData.append("feature_one_title", whyChooseUsData.whyChooseUsTitleOne);
      formData.append(
        "feature_one_des",
        whyChooseUsData.whyChooseUsDescriptionOne,
      );
      formData.append("feature_two_title", whyChooseUsData.whyChooseUsTitleTwo);
      formData.append(
        "feature_two_des",
        whyChooseUsData.whyChooseUsDescriptionTwo,
      );
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

      // await createMiniSite(formData).unwrap();
      await createWhyChooseUs(formData).unwrap();

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
