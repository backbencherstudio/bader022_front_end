"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLandingPage } from "../../../context/LandingBuilderContext";

const FONT_OPTIONS = [
  { label: "Inter", value: "Inter" },
  { label: "Roboto", value: "Roboto" },
  { label: "Poppins", value: "Poppins" },
  { label: "Montserrat", value: "Montserrat" },
  { label: "DM Sans", value: "DM Sans" },
];

export default function Typography() {
  const { typographyData, setTypographyData } = useLandingPage();

  const update = (key: string, value: any) => {
    setTypographyData({
      ...typographyData,
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
          <span className="font-medium">Typography</span>
        </AccordionTrigger>

        <AccordionContent className="flex flex-col gap-4 text-balance p-4">
          {/* H1 Size */}
          <RangeField
            label="H1 Size"
            value={typographyData.h1Size}
            onChange={(v) => update("h1Size", v)}
          />

          {/* H2 Size */}
          <RangeField
            label="H2 Size"
            value={typographyData.h2Size}
            onChange={(v) => update("h2Size", v)}
          />

          {/* Body Size */}
          <RangeField
            label="Body Text Size"
            value={typographyData.bodySize}
            onChange={(v) => update("bodySize", v)}
          />

          {/* Font Family */}
          <div>
            <label className="text-sm font-medium">Font Family</label>
            <select
              value={typographyData.fontFamily}
              onChange={(e) => update("fontFamily", e.target.value)}
              className="w-full mt-2 p-2 rounded-md border dark:bg-gray-700"
            >
              {FONT_OPTIONS.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

/* ---------------------------------- */
/* Reusable Range Component            */
/* ---------------------------------- */
function RangeField({
  label,
  value = 16,
  onChange,
}: {
  label: string;
  value?: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium flex justify-between">
        {label}: <span>{value}px</span>
      </label>
      <input
        type="range"
        min={12}
        max={96}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full mt-2 cursor-pointer"
      />
    </div>
  );
}
