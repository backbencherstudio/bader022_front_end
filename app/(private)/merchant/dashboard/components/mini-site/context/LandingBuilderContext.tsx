"use client";

import { useMiniSiteByDomainNameQuery } from "@/redux/features/merchant/miniSiteApi";
import { useAppSelector } from "@/redux/hooks";
import React, { createContext, useContext, useEffect, useState } from "react";

/* ---------- TYPES ---------- */
type HeroData = {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  primaryBtn: string;
  secondaryBtn: string;
  heroImage: string;
  heroPreviewImage: string;
  heroImageFile?: File | null;
  imageLeft: boolean;
  overlayColor: string;
  heroHeight: number;
};

type AboutData = {
  aboutTitle: string;
  aboutDescription: string;
  aboutImage: string;
  aboutPreviewImage: string;
  aboutImageFile?: File | null;
  backgroundColor: string;
  padding: string;
};

type WhyChooseUsData = {
  whyChooseUsTitle: string;
  whyChooseUsSubtitle: string;
  backgroundColor: string;
  cardImageOne: string;
  whyChooseUsTitleOne: string;
  whyChooseUsDescriptionOne: string;
  cardImageTwo: string;
  whyChooseUsTitleTwo: string;
  whyChooseUsDescriptionTwo: string;
  cardImageThree: string;
  whyChooseUsTitleThree: string;
  whyChooseUsDescriptionThree: string;
  cardPreviewImageOne: string;
  cardImageOneFile: File | null;
  cardPreviewImageTwo: string;
  cardImageTwoFile: File | null;
  cardPreviewImageThree: string;
  cardImageThreeFile: File | null;
};

type ServicesCard = {
  image: string | null;
  title: string;
  description: string;
  duration?: string;
};
type ServicesPreviewData = {
  servicesPreviewTitle: string;
  servicesPreviewSubtitle: string;
  serviceViewBtn: string;
  backgroundColor: string;
  servicesCards: ServicesCard[];
};

type CtaBannerData = {
  ctaBannerTitle: string;
  ctaBannerSubTitle: string;
  ctaBannerImage: string;
  ctaPreviewImage: string;
  ctaBannerFile: File | null;
  backgroundColor: string;
  ctaBannerOverlayColor: string;
  padding: string;
};
type BrandingData = {
  logo: string;
  position?: "left" | "center" | "right";
  logoSize: number;
};

type ColorSystemData = {
  primaryColor?: string;
  secondaryColor?: string;
  headingColor?: string;
  bodyTextColor?: string;
  buttonColor?: string;
};

type TypographyData = {
  h1Size?: number;
  h2Size?: number;
  bodySize?: number;
  fontFamily?: string;
};

type LayoutSettingsData = {
  sectionSpacing?: number;
};

// type SocialLinks = {
//   icon: "facebook" | "twitter" | "instagram" | "pinterest" | "linkedin";
//   url: string;
// };

// type NavigationLink = { label: string; href: string };
// type SupportLink = { label: string; href: string };

type FooterData = {
  footerTitle: string;
  footerSubTitle: string;
  footerLogo: string;
  footerLogoPreview: string;
  footerLogoFile: File | null;
  footerBackground: string;
  footerTextColor: string;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  pinterestUrl?: string;
  home?: string;
  homeUrl?: string;
  about?: string;
  aboutUrl?: string;
  why_choose_us?: string;
  why_choose_usUrl?: string;
  service?: string;
  serviceUrl?: string;
  contact_us?: string;
  contactUrl?: string;
  privacy_policy?: string;
  privacy_policyUrl?: string;
  terms_condition?: string;
  terms_conditionUrl?: string;
  contact_info?: string;
  contact_email?: string;
  address?: string;
  // socialLinks: SocialLinks[];
  // navigation: NavigationLink[];
  // support: SupportLink[];
  showPoweredBy: boolean | string;
};

type LandingContextType = {
  heroData: HeroData;
  setHeroData: React.Dispatch<React.SetStateAction<HeroData>>;

  aboutData: AboutData;
  setAboutData: React.Dispatch<React.SetStateAction<AboutData>>;

  whyChooseUsData: WhyChooseUsData;
  setWhyChooseUsData: React.Dispatch<React.SetStateAction<WhyChooseUsData>>;

  servicesPreviewData: ServicesPreviewData;
  setServicesPreviewData: React.Dispatch<
    React.SetStateAction<ServicesPreviewData>
  >;

  ctaBannerData: CtaBannerData;
  setCtaBannerData: React.Dispatch<React.SetStateAction<CtaBannerData>>;

  // Global Setting
  brandingData: BrandingData;
  setBrandingData: React.Dispatch<React.SetStateAction<BrandingData>>;

  colorSystemData: ColorSystemData;
  setColorSystemData: React.Dispatch<React.SetStateAction<ColorSystemData>>;

  typographyData: TypographyData;
  setTypographyData: React.Dispatch<React.SetStateAction<TypographyData>>;

  layoutSettingsData: LayoutSettingsData;
  setLayoutSettingsData: React.Dispatch<
    React.SetStateAction<LayoutSettingsData>
  >;

  footerData: FooterData;
  setFooterData: React.Dispatch<React.SetStateAction<FooterData>>;
};

/* ---------- CONTEXT ---------- */
const LandingPageContext = createContext<LandingContextType | null>(null);

/* ---------- PROVIDER ---------- */
export function LandingPageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAppSelector((state) => state.auth);
  const domain = user?.website_domain;
  const { data } = useMiniSiteByDomainNameQuery(`${domain}`);
  console.log(data);

  const [heroData, setHeroData] = useState<HeroData>({
    heroTitle: "",
    heroSubtitle: "",
    heroDescription: "",
    primaryBtn: "",
    secondaryBtn: "",
    heroImage: "",
    heroPreviewImage: "",
    heroImageFile: null,
    imageLeft: true,
    overlayColor: "",
    heroHeight: 48,
  });

  const [aboutData, setAboutData] = useState<AboutData>({
    aboutTitle: "",
    aboutDescription: "",
    aboutImage: "",
    aboutPreviewImage: "",
    aboutImageFile: null,
    backgroundColor: "",
    padding: "",
  });

  const [whyChooseUsData, setWhyChooseUsData] = useState<WhyChooseUsData>({
    whyChooseUsTitle: "",
    whyChooseUsSubtitle: "",
    backgroundColor: "",
    cardImageOne: "",
    cardPreviewImageOne: "",
    cardImageOneFile: null,
    whyChooseUsTitleOne: "",
    whyChooseUsDescriptionOne: "",
    cardImageTwo: "",
    cardPreviewImageTwo: "",
    cardImageTwoFile: null,
    whyChooseUsTitleTwo: "",
    whyChooseUsDescriptionTwo: "",
    cardPreviewImageThree: "",
    cardImageThreeFile: null,
    cardImageThree: "",
    whyChooseUsTitleThree: "",
    whyChooseUsDescriptionThree: "",
  });

  const [servicesPreviewData, setServicesPreviewData] =
    useState<ServicesPreviewData>({
      servicesPreviewTitle: "",
      servicesPreviewSubtitle: "",
      serviceViewBtn: "",
      backgroundColor: "",
      servicesCards: [],
    });

  const [ctaBannerData, setCtaBannerData] = useState<CtaBannerData>({
    ctaBannerTitle: "",
    ctaBannerSubTitle: "",
    ctaBannerImage: "",
    ctaPreviewImage: "",
    ctaBannerFile: null,
    backgroundColor: "",
    ctaBannerOverlayColor: "",
    padding: "",
  });
  // Global Settings
  const [brandingData, setBrandingData] = useState<BrandingData>({
    logo: "",
    position: "center",
    logoSize: 100,
  });

  const [colorSystemData, setColorSystemData] = useState<ColorSystemData>({
    primaryColor: "#d98526",
    secondaryColor: "#235115",
    headingColor: "#221551",
    bodyTextColor: "#111927",
    buttonColor: "#10239F",
  });

  const [typographyData, setTypographyData] = useState<TypographyData>({
    h1Size: 26,
    h2Size: 10,
    bodySize: 16,
    fontFamily: "Inter",
  });

  const [layoutSettingsData, setLayoutSettingsData] =
    useState<LayoutSettingsData>({
      sectionSpacing: 0,
    });

  const [footerData, setFooterData] = useState<FooterData>({
    footerTitle: "",
    footerSubTitle: "",
    footerLogo: "",
    footerLogoPreview: "",
    footerLogoFile: null,
    footerBackground: "",
    footerTextColor: "",
    facebookUrl: "",
    twitterUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
    pinterestUrl: "",
    home: "Home",
    homeUrl: "",
    about: "About",
    aboutUrl: "",
    why_choose_us: "Why Choose Us",
    why_choose_usUrl: "",
    service: "Services",
    serviceUrl: "",
    contact_us: "Contact Us",
    contactUrl: "",
    privacy_policy: "Privacy Policy",
    privacy_policyUrl: "",
    terms_condition: "Terms & Conditions",
    terms_conditionUrl: "",
    contact_info: "",
    contact_email: "",
    address: "",
    showPoweredBy: false,
  });

  useEffect(() => {
    if (!data?.data) return;

    const api = data.data;

    /* HERO */
    if (api.minisite) {
      setHeroData((prev) => ({
        ...prev,
        heroTitle: api.minisite.hero_title || prev.heroTitle,
        heroSubtitle: api.minisite.hero_subtitle || prev.heroSubtitle,
        heroDescription: api.minisite.hero_description || prev.heroDescription,
        primaryBtn: api.minisite.cta_button_text || prev.primaryBtn,
        secondaryBtn: api.minisite.cta_button_text_two || prev.secondaryBtn,
        overlayColor: api.minisite.hero_overlay_color || prev.overlayColor,
        heroImage: api.minisite.hero_image || prev.heroImage,
      }));
    }

    /* ABOUT */
    if (api.minisite) {
      setAboutData((prev) => ({
        ...prev,
        aboutTitle: api.minisite.about_title || prev.aboutTitle,
        aboutDescription:
          api.minisite.about_description || prev.aboutDescription,
        aboutImage: api.minisite.about_hero_image || prev.aboutImage,
        backgroundColor: api.minisite.background_color || prev.backgroundColor,
        padding: api.minisite.about_padding || prev.padding,
      }));
    }

    /* WHY CHOOSE US */
    if (api.why_choose_us) {
      setWhyChooseUsData((prev) => ({
        ...prev,
        whyChooseUsTitle:
          api.why_choose_us.section_title || prev.whyChooseUsTitle,
        whyChooseUsSubtitle:
          api.why_choose_us.section_subtitle || prev.whyChooseUsSubtitle,
        backgroundColor:
          api.why_choose_us.background_color || prev.backgroundColor,

        cardImageOne: api.why_choose_us.feature_one_image,
        whyChooseUsTitleOne: api.why_choose_us.feature_one_title || "",
        whyChooseUsDescriptionOne: api.why_choose_us.feature_one_des || "",

        cardImageTwo: api.why_choose_us.feature_two_image,
        whyChooseUsTitleTwo: api.why_choose_us.feature_two_title || "",
        whyChooseUsDescriptionTwo: api.why_choose_us.feature_two_des || "",

        cardImageThree: api.why_choose_us.feature_three_image,
        whyChooseUsTitleThree: api.why_choose_us.feature_three_title || "",
        whyChooseUsDescriptionThree: api.why_choose_us.feature_three_des || "",
      }));
    }

    /* SERVICES */
    if (api.services || api.minisite) {
      setServicesPreviewData((prev) => ({
        ...prev,
        servicesPreviewTitle:
          api.minisite.service_title || prev.servicesPreviewTitle,
        servicesPreviewSubtitle:
          api.minisite.service_description || prev.servicesPreviewSubtitle,
        backgroundColor:
          api.minisite.service_background || prev.backgroundColor,
        servicesCards: api.services.map((service: any) => ({
          image: service.image || null,
          title: service.name,
          description: service.description,
          duration: service.duration,
        })),
      }));
    }

    /* cta Banner */
    if (api.minisite) {
      setCtaBannerData((prev) => ({
        ...prev,
        ctaBannerTitle: api.minisite.cta_title || prev.ctaBannerTitle,
        ctaBannerSubTitle: api.minisite.cta_subtitle || prev.ctaBannerSubTitle,
        ctaBannerImage: api.minisite.cta_image || prev.ctaBannerImage,
        // backgroundColor: api.minisite.cta_button_url || prev.backgroundColor,
        ctaBannerOverlayColor:
          api.minisite.cta_overlay_color || prev.ctaBannerOverlayColor,
        padding: api.minisite.cta_padding || prev.padding,
      }));
    }

    /* GLOBAL BRANDING */
    // if (api.global_setting) {
    //   setBrandingData((prev) => ({
    //     ...prev,
    //     logo: api.global_setting.branding_logo || "",
    //     position: api.global_setting.logo_position || "center",
    //     logoSize: Number(api.global_setting.logo_size) || 100,
    //   }));
    // }

    /* FOOTER */
    if (api.global_setting) {
      setFooterData((prev) => ({
        ...prev,
        footerTitle: api.global_setting.website_name || prev.footerTitle,
        footerSubTitle: api.global_setting.footer_des || prev.footerSubTitle,
        footerLogo: api.global_setting.branding_logo || prev.footerLogo,
        footerBackground:
          api.global_setting.footer_background || prev.footerBackground,
        footerTextColor:
          api.global_setting.footer_text_color || prev.footerTextColor,
        facebookUrl: api.global_setting.facebook_url || prev.facebookUrl,
        twitterUrl: api.global_setting.twitter_url || prev.twitterUrl,
        instagramUrl: api.global_setting.instagram_url || prev.instagramUrl,
        linkedinUrl: api.global_setting.linkedin_url || prev.linkedinUrl,
        pinterestUrl: api.global_setting.pinterest_url || prev.pinterestUrl,
        homeUrl: api.global_setting.home_url || prev.homeUrl,
        aboutUrl: api.global_setting.about_url || prev.aboutUrl,
        why_choose_usUrl:
          api.global_setting.why_choose_us_url || prev.why_choose_usUrl,
        serviceUrl: api.global_setting.service_url || prev.serviceUrl,
        contactUrl: api.global_setting.contact_url || prev.contactUrl,
        privacy_policyUrl:
          api.global_setting.privacy_policy_url || prev.privacy_policyUrl,
        terms_conditionUrl:
          api.global_setting.terms_condition_url || prev.terms_conditionUrl,
        contact_info: api.global_setting.contact_info || prev.contact_info,
        contact_email: api.global_setting.contact_email || prev.contact_email,
        address: api.global_setting.country || prev.address,
        showPoweredBy: api.global_setting.turn_off || prev.showPoweredBy,
      }));
    }
  }, [data]);

  return (
    <LandingPageContext.Provider
      value={{
        heroData,
        setHeroData,
        aboutData,
        setAboutData,
        whyChooseUsData,
        setWhyChooseUsData,
        servicesPreviewData,
        setServicesPreviewData,
        ctaBannerData,
        setCtaBannerData,
        footerData,
        setFooterData,
        brandingData,
        setBrandingData,
        colorSystemData,
        setColorSystemData,
        typographyData,
        setTypographyData,
        layoutSettingsData,
        setLayoutSettingsData,
      }}
    >
      {children}
    </LandingPageContext.Provider>
  );
}

/* ---------- HOOK ---------- */
export const useLandingPage = () => {
  const context = useContext(LandingPageContext);
  if (!context) {
    throw new Error("useLandingPage must be used inside LandingPageProvider");
  }
  return context;
};
