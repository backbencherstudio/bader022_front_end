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
import { TfiWorld } from "react-icons/tfi";
import Branding from "./inputpanel/globalsettings/Branding";
import FooterSettings from "./inputpanel/globalsettings/FooterSettings";
import ColorSystem from "./inputpanel/globalsettings/ColorSystem";
import Typography from "./inputpanel/globalsettings/Typography";
import LayoutSettings from "./inputpanel/globalsettings/LayoutSettings";

export default function InputPanel() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {/* Global Settings */}
      <AccordionItem value="item-1">
        <AccordionTrigger>
          {" "}
          <h3 className="flex gap-2 items-center text-xl">
            <TfiWorld /> Global Settings
          </h3>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          {/* Branding */}
          <Branding />
          {/* Color System */}
          <ColorSystem />
          {/* Typography */}
          <Typography />
          {/*Layout Settings */}
          <LayoutSettings />
          {/* Footer Settings */}
          <FooterSettings />
        </AccordionContent>
      </AccordionItem>
      {/* Home Page */}
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <h3 className="flex gap-2 items-center text-xl">
            <TbSmartHome /> Home Page
          </h3>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {/* HERO */}
            <AccordionItem value="hero" className="border rounded-md">
              <AccordionTrigger
                className="
        flex items-center justify-between
        bg-gray-100 dark:bg-gray-700
        px-4 py-3
        hover:bg-gray-200 dark:hover:bg-gray-600
        transition
        [&>svg]:transition-transform
        [&>svg]:-rotate-90
        [&[data-state=open]>svg]:rotate-0
      "
              >
                <span className="font-medium">Hero Section</span>
              </AccordionTrigger>
              <AccordionContent>
                <HeroSection />
              </AccordionContent>
            </AccordionItem>

            {/* ABOUT */}
            <AccordionItem value="about" className="border rounded-md">
              <AccordionTrigger
                className="
                      flex items-center justify-between
                      bg-gray-100 dark:bg-gray-700
                      px-4 py-3
                      hover:bg-gray-200 dark:hover:bg-gray-600
                      transition
                      [&>svg]:transition-transform
                      [&>svg]:-rotate-90
                      [&[data-state=open]>svg]:rotate-0
                    "
              >
                <span className="font-medium">About Section</span>
              </AccordionTrigger>
              <AccordionContent>
                <AboutSection />
              </AccordionContent>
            </AccordionItem>

            {/* WHY CHOOSE US */}
            <AccordionItem value="why" className="border rounded-md">
              <AccordionTrigger
                className="
                      flex items-center justify-between
                      bg-gray-100 dark:bg-gray-700
                      px-4 py-3
                      hover:bg-gray-200 dark:hover:bg-gray-600
                      transition
                      [&>svg]:transition-transform
                      [&>svg]:-rotate-90
                      [&[data-state=open]>svg]:rotate-0
                    "
              >
                <span className="font-medium">Why Choose Us</span>
              </AccordionTrigger>
              <AccordionContent>
                <WhyChooseUs />
              </AccordionContent>
            </AccordionItem>

            {/* Services */}
            <AccordionItem value="services" className="border rounded-md">
              <AccordionTrigger
                className="
                      flex items-center justify-between
                      bg-gray-100 dark:bg-gray-700
                      px-4 py-3
                      hover:bg-gray-200 dark:hover:bg-gray-600
                      transition
                      [&>svg]:transition-transform
                      [&>svg]:-rotate-90
                      [&[data-state=open]>svg]:rotate-0
                    "
              >
                <span className="font-medium">Services</span>
              </AccordionTrigger>
              <AccordionContent>
                <ServicesPreview />
              </AccordionContent>
            </AccordionItem>

            {/* CTA Banner */}
            <AccordionItem value="banner" className="border rounded-md">
              <AccordionTrigger
                className="
                      flex items-center justify-between
                      bg-gray-100 dark:bg-gray-700
                      px-4 py-3
                      hover:bg-gray-200 dark:hover:bg-gray-600
                      transition
                      [&>svg]:transition-transform
                      [&>svg]:-rotate-90
                      [&[data-state=open]>svg]:rotate-0
                    "
              >
                <span className="font-medium">CTA Banner</span>
              </AccordionTrigger>
              <AccordionContent>
                <CTABanner />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
