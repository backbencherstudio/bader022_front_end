"use client";
import React from "react";
import WhyChooseUs from "./landingpage/WhyChooseUs";
import Hero from "./landingpage/Hero";
import About from "./landingpage/About";
import CTABanner from "./landingpage/CTABanner";
import ServicesPreview from "./landingpage/ServicesPreview";
import Footer from "./landingpage/Footer";
import { useLandingPage } from "../context/LandingBuilderContext";
export default function LandingPage() {
  const { typographyData } = useLandingPage();
  return (
    <div
      style={{ fontFamily: typographyData.fontFamily }}
      className="border-r border-gray-200 dark:border-gray-700 space-y-1 bg-gray-50 overflow-y-auto shadow my-3 p-3 rounded-md"
    >
      {/* HERO */}
      <Hero />
      {/* About Section */}
      <About />
      {/* Why Choose Us */}
      <WhyChooseUs />
      {/* Services Preview */}
      <ServicesPreview />
      {/* CTA */}
      <CTABanner />
      {/* Footer  */}
      <Footer />
    </div>
  );
}
