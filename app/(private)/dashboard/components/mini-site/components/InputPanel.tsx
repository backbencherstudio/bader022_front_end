"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TbSmartHome } from "react-icons/tb";
import HeroSection from "./inputpanel/HeroSection";
import AboutSection from "./inputpanel/AboutSection";
import CTABanner from "./inputpanel/CTABanner";
import WhyChooseUs from "./inputpanel/WhyChooseUs";
import ServicesPreview from "./inputpanel/ServicesPreview";

export default function InputPanel() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {/* Home Page */}
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <h3 className="flex gap-2 items-center text-xl">
            <TbSmartHome /> Home Page
          </h3>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          {/* Hero Section */}
          <HeroSection />
          {/* About Section */}
          <AboutSection />
          {/*Why Choose Us */}
          <WhyChooseUs />
          {/* Services Preview */}
          <ServicesPreview />
          {/* CTA Banner */}
          <CTABanner />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
