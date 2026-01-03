"use client";
import React from "react";
import WhyChooseUs from "./landingpage/WhyChooseUs";
import Hero from "./landingpage/Hero";
import About from "./landingpage/About";
import CTABanner from "./landingpage/CTABanner";
import ServicesPreview from "./landingpage/ServicesPreview";
export default function LandingPage() {
  return (
    <div className="overflow-y-auto bg-white dark:bg-gray-900 dark:text-white shadow m-2 p-3">
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
    </div>
  );
}
