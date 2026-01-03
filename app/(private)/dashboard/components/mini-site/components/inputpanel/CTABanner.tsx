import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLandingPage } from "../../context/LandingBuilderContext";
import { FiImage } from "react-icons/fi";
export default function CTABanner() {
  const { ctaBannerData, setCtaBannerData } = useLandingPage();
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem
        value="cta-banner"
        className="border rounded-md overflow-hidden"
      >
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

        <AccordionContent className="flex flex-col gap-4 p-3">
          {/* Title */}
          <div>
            <label className="text-sm font-medium">CTA Title</label>
            <input
              className="w-full border p-2 rounded dark:bg-gray-700"
              value={ctaBannerData.ctaBannerTitle}
              onChange={(e) =>
                setCtaBannerData({
                  ...ctaBannerData,
                  ctaBannerTitle: e.target.value,
                })
              }
              placeholder="CTA Banner Title"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="text-sm font-medium">CTA Subtitle</label>
            <input
              className="w-full border p-2 rounded dark:bg-gray-700"
              value={ctaBannerData.ctaBannerSubTitle}
              onChange={(e) =>
                setCtaBannerData({
                  ...ctaBannerData,
                  ctaBannerSubTitle: e.target.value,
                })
              }
              placeholder="CTA Banner Subtitle"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm font-medium">CTA Image</label>

            <label
              className="
            mt-2 flex flex-col items-center justify-center
            border-2 border-dashed rounded-lg py-8 cursor-pointer
            border-gray-300 dark:border-gray-700
            bg-gray-50 dark:bg-gray-800
          "
            >
              <FiImage size={26} className="text-gray-400" />
              <span className="text-sm mt-2">Click to upload</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const url = URL.createObjectURL(file);
                  setCtaBannerData({
                    ...ctaBannerData,
                    ctaBannerImage: url,
                  });
                }}
              />
            </label>
          </div>

          {/* Background Color */}
          <div>
            <label className="text-sm font-medium">Background Color</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="color"
                value={ctaBannerData.backgroundColor}
                onChange={(e) =>
                  setCtaBannerData({
                    ...ctaBannerData,
                    backgroundColor: e.target.value,
                  })
                }
                className="h-12 w-full cursor-pointer rounded-md"
              />
              <input
                value={ctaBannerData.backgroundColor}
                onChange={(e) =>
                  setCtaBannerData({
                    ...ctaBannerData,
                    backgroundColor: e.target.value,
                  })
                }
                className="p-2 rounded-md dark:bg-white dark:text-black"
              />
            </div>
          </div>

          {/* Overlay Color */}
          <div>
            <label className="text-sm font-medium">Overlay Color</label>
            <input
              type="color"
              value={ctaBannerData.ctaBannerOverlayColor}
              onChange={(e) =>
                setCtaBannerData({
                  ...ctaBannerData,
                  ctaBannerOverlayColor: e.target.value,
                })
              }
              className="h-12 w-full cursor-pointer rounded-md"
            />
          </div>

          {/* Padding */}
          <div>
            <label className="text-sm font-medium">
              Padding ({ctaBannerData.padding}px)
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={ctaBannerData.padding}
              onChange={(e) =>
                setCtaBannerData({
                  ...ctaBannerData,
                  padding: Number(e.target.value),
                })
              }
              className="w-full"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
