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
import { useI18n } from "@/components/provider/I18nProvider";

export default function InputPanel() {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  return (
    <Accordion type="single" collapsible className="w-full">
      {/* Global Settings */}
      <AccordionItem value="item-1">
        <AccordionTrigger>
          {" "}
          <h3 className="flex gap-2 items-center text-xl">
            <TfiWorld />{" "}
            {locale == "ar" ? "الإعدادات العامة" : "Global Settings"}
          </h3>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {/* Branding */}
            <AccordionItem value="branding" className="border rounded-md">
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
                <span className="font-medium">
                  {locale == "ar"
                    ? "الهوية البصرية (العلامة التجارية)"
                    : "Branding"}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <Branding />
              </AccordionContent>
            </AccordionItem>

            {/* Color System */}
            <AccordionItem value="colorsystem" className="border rounded-md">
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
                <span className="font-medium">
                  {locale == "ar" ? "نظام الألوان" : "Color System"}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <ColorSystem />
              </AccordionContent>
            </AccordionItem>

            {/* Typography */}
            <AccordionItem value="typography" className="border rounded-md">
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
                <span className="font-medium">
                  {locale == "ar" ? "الطباعة (تنسيق الخطوط)" : "Typography"}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <Typography />
              </AccordionContent>
            </AccordionItem>

            {/*Layout Settings */}
            <AccordionItem value="settings" className="border rounded-md">
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
                <span className="font-medium">
                  {locale == "ar" ? "إعدادات التخطيط" : "Layout Settings"}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <LayoutSettings />
              </AccordionContent>
            </AccordionItem>

            {/* Footer Settings */}
            <AccordionItem value="footer" className="border rounded-md">
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
                <span className="font-medium">
                  {" "}
                  {locale == "ar" ? "إعدادات التذييل" : "Footer Settings"}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <FooterSettings />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
      {/* Home Page */}
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <h3 className="flex gap-2 items-center text-xl">
            <TbSmartHome /> {locale == "ar" ? "الصفحة الرئيسية" : "Home Page"}
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
                <span className="font-medium">
                  {locale == "ar"
                    ? "قسم البطل (الواجهة الرئيسية)"
                    : "Hero Section"}
                </span>
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
                <span className="font-medium">
                  {" "}
                  {locale == "ar" ? "قسم من نحن" : "About Section"}
                </span>
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
                <span className="font-medium">
                  {" "}
                  {locale == "ar" ? "لماذا تختارنا" : "Why Choose Us"}
                </span>
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
                <span className="font-medium">
                  {locale == "ar" ? "الخدمات" : "Services"}
                </span>
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
                <span className="font-medium">
                  {locale == "ar" ? "بانر" : "CTA Banner "}
                </span>
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
