"use client";

import React, { createContext, useContext, useState } from "react";

/* ---------- TYPES ---------- */
type HeroData = {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  primaryBtn: string;
  secondaryBtn: string;
  heroImage: string;
  imageLeft: boolean;
  overlayColor: string;
  heroHeight: number;
};

type AboutData = {
  aboutTitle: string;
  aboutDescription: string;
  aboutImage: string;
  backgroundColor: string;
  padding: number;
};

type FeatureCard = {
  image: string | null;
  title: string;
  description: string;
};

type WhyChooseUsData = {
  whyChooseUsTitle: string;
  whyChooseUsSubtitle: string;
  backgroundColor: string;
  featureCards: FeatureCard[];
};

type ServicesCard = {
  image: string | null;
  title: string;
  description: string;
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
  backgroundColor: string;
  ctaBannerOverlayColor: string;
  padding: number;
};
type BrandingData = {
  logo: string;
  position?: "left" | "center" | "right";
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

type SocialLinks = {
  icon: "facebook" | "twitter" | "instagram" | "pinterest" | "linkedin";
  url: string;
};

type NavigationLink = { label: string; href: string };
type SupportLink = { label: string; href: string };
type ContactInfo = { phone?: string; email?: string; address?: string };

type FooterData = {
  footerTitle: string;
  footerSubTitle: string;
  footerLogo: string;
  footerBackground: string;
  footerTextColor: string;
  socialLinks: SocialLinks[];
  navigation: NavigationLink[];
  support: SupportLink[];
  contact: ContactInfo;
  showPoweredBy: boolean;
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
  const [heroData, setHeroData] = useState<HeroData>({
    heroTitle: "Nourish Your Scalp for Strong, Healthy Hair Growth",
    heroSubtitle: "Care your hair",
    heroDescription:
      "Nourishing hair growth starts with a healthy, balanced scalp. Caring for your scalp provides the foundation for stronger, more vibrant hair, allowing each strand to reach its full potential",
    primaryBtn: "Get Started",
    secondaryBtn: "Book A Consultation",
    heroImage: "",
    imageLeft: true,
    overlayColor: "#000000",
    heroHeight: 48,
  });

  const [aboutData, setAboutData] = useState<AboutData>({
    aboutTitle: "Elevate Your Look with Bespoke Hair Care & Expert",
    aboutDescription:
      "Experience a new level of confidence with hair care tailored uniquely to you. Our expert stylists combine personalized techniques with premium products to enhance your natural beauty Through personalized consultations and expert care, we transform each strand to enhance your overall look with elegance and sophistication.",
    aboutImage: "",
    backgroundColor: "",
    padding: 30,
  });

  const [whyChooseUsData, setWhyChooseUsData] = useState<WhyChooseUsData>({
    whyChooseUsTitle: "Why We’re Right Choice",
    whyChooseUsSubtitle:
      "We take the time to understand your unique needs, ensuring every service is tailored to deliver exceptional results",
    backgroundColor: "",
    featureCards: [
      {
        image: null,
        title: "Certified Hair Experts",
        description:
          "Our team consists of highly trained, certified hair specialists who bring years of experience and professional expertise",
      },
      {
        image: null,
        title: "Certified Hair Experts",
        description:
          "Our team consists of highly trained, certified hair specialists who bring years of experience and professional expertise",
      },
      {
        image: null,
        title: "Certified Hair Experts",
        description:
          "Our team consists of highly trained, certified hair specialists who bring years of experience and professional expertise",
      },
    ],
  });

  const [servicesPreviewData, setServicesPreviewData] =
    useState<ServicesPreviewData>({
      servicesPreviewTitle: "Customized Hair Treatments & Styling to Suit You",
      servicesPreviewSubtitle:
        "Experience revitalizing care and expert styling solutions tailored to every hair type. Our nourishing treatments are designed to restore health",
      serviceViewBtn: "",
      backgroundColor: "",
      servicesCards: [
        {
          image: null,
          title: "Hair Treatment",
          description:
            "Improvement Rule	How Small Consistency Leads to Monumental Results.",
        },
        {
          image: null,
          title: "Hair Treatment",
          description:
            "Improvement Rule	How Small Consistency Leads to Monumental Results.",
        },
        {
          image: null,
          title: "Hair Treatment",
          description:
            "Improvement Rule	How Small Consistency Leads to Monumental Results.",
        },
      ],
    });

  const [ctaBannerData, setCtaBannerData] = useState<CtaBannerData>({
    ctaBannerTitle: "Your Hair Deserves the Best Care",
    ctaBannerSubTitle:
      "Book a consultation with our certified hair experts and experience professional, personalized hair treatments. Limited slots available! Secure your appointment",
    ctaBannerImage: "",
    backgroundColor: "",
    ctaBannerOverlayColor: "",
    padding: 5,
  });
  // Global Settings
  const [brandingData, setBrandingData] = useState<BrandingData>({
    logo: "",
    position: "center",
  });

  const [colorSystemData, setColorSystemData] = useState<ColorSystemData>({
    primaryColor: "#701096",
    secondaryColor: "#235115",
    headingColor: "#221551",
    bodyTextColor: "#111927",
    buttonColor: "#10239F",
  });

  const [typographyData, setTypographyData] = useState<TypographyData>({
    h1Size: 30,
    h2Size: 10,
    bodySize: 10,
    fontFamily: "Inter",
  });

  const [layoutSettingsData, setLayoutSettingsData] =
    useState<LayoutSettingsData>({
      sectionSpacing: 0,
    });

  const [footerData, setFooterData] = useState<FooterData>({
    footerTitle: "",
    footerSubTitle:
      "Start with empathy. I create ideas, challenge assumptions, collaborate with designers, and align stakeholders,",
    footerLogo: "",
    footerBackground: "",
    footerTextColor: "",
    socialLinks: [
      { icon: "facebook", url: "www.facebook.com" },
      { icon: "twitter", url: "www.twitter.com" },
      { icon: "instagram", url: "www.instagram.com" },
      { icon: "pinterest", url: "www.pinterest.com" },
      { icon: "linkedin", url: "www.linkedin.com" },
    ],
    navigation: [
      { label: "Home", href: "#" },
      { label: "About Us", href: "#about" },
      { label: "Why Choose Us", href: "#why-choose-us" },
      { label: "Services", href: "#services" },
    ],
    support: [
      { label: "Contact Us", href: "#contact-us" },
      { label: "Privacy Policy", href: "#privace-policy" },
      { label: "Terms & Conditions", href: "#terms-conditions" },
    ],
    contact: {
      phone: "013456876294",
      email: "barik@example.com",
      address: "UK",
    },
    showPoweredBy: true,
  });

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
