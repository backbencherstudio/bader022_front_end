"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLandingPage } from "../../../context/LandingBuilderContext";

export default function LayoutSettings() {
  const { layoutSettingsData, setLayoutSettingsData } = useLandingPage();

  const update = (key: string, value: number) => {
    setLayoutSettingsData({
      ...layoutSettingsData,
      [key]: value,
    });
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem
        value="item-1"
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
          <span className="font-medium">Layout Settings</span>
        </AccordionTrigger>

        <AccordionContent className="flex flex-col gap-4 text-balance p-4">
          {/* Section Spacing */}
          <div>
            <label className="text-sm font-medium flex justify-between">
              Section Spacing:
              <span>{layoutSettingsData.sectionSpacing || 0}px</span>
            </label>

            <input
              type="range"
              min={0}
              max={120}
              step={1}
              value={layoutSettingsData.sectionSpacing}
              onChange={(e) => update("sectionSpacing", Number(e.target.value))}
              className="w-full mt-2 cursor-pointer"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
