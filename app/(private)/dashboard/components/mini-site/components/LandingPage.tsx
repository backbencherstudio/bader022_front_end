"use client";
import React from "react";
import WhyChooseUs from "./landingpage/WhyChooseUs";
import Hero from "./landingpage/Hero";
import About from "./landingpage/About";
import CTABanner from "./landingpage/CTABanner";
import ServicesPreview from "./landingpage/ServicesPreview";
export default function LandingPage() {
  return (
    <div className="border-r border-gray-200 dark:border-gray-700 space-y-1 bg-gray-50 dark:bg-gray-800 dark:text-white overflow-y-auto shadow m-2 p-3 rounded-md">
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
