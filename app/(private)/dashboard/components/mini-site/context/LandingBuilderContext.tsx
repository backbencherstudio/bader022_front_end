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

type SocialLinks = {
  icon: string | null;
  url: string;
};
type FooterData = {
  footerTitle: string;
  footerSubTitle: string;
  footerLogo: string;
  footerBackground: string;
  footerTextColor: string;
  socialLinks: SocialLinks[];
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
    heroTitle: "",
    heroSubtitle: "",
    heroDescription: "",
    primaryBtn: "",
    secondaryBtn: "",
    heroImage: "",
    imageLeft: true,
    overlayColor: "#000000",
    heroHeight: 48,
  });

  const [aboutData, setAboutData] = useState<AboutData>({
    aboutTitle: "",
    aboutDescription: "",
    aboutImage: "",
    backgroundColor: "#ffffff",
    padding: 5,
  });

  const [whyChooseUsData, setWhyChooseUsData] = useState<WhyChooseUsData>({
    whyChooseUsTitle: "",
    whyChooseUsSubtitle: "",
    backgroundColor: "#ffffff",
    featureCards: [{ image: null, title: "", description: "" }],
  });

  const [servicesPreviewData, setServicesPreviewData] =
    useState<ServicesPreviewData>({
      servicesPreviewTitle: "",
      servicesPreviewSubtitle: "",
      serviceViewBtn: "",
      backgroundColor: "",
      servicesCards: [{ image: null, title: "", description: "" }],
    });

  const [ctaBannerData, setCtaBannerData] = useState<CtaBannerData>({
    ctaBannerTitle: "",
    ctaBannerSubTitle: "",
    ctaBannerImage: "",
    backgroundColor: "",
    ctaBannerOverlayColor: "",
    padding: 5,
  });

  const [footerData, setFooterData] = useState<FooterData>({
    footerTitle: "",
    footerSubTitle: "",
    footerLogo: "",
    footerBackground: "",
    footerTextColor: "",
    socialLinks: [{ icon: null, url: "" }],
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
