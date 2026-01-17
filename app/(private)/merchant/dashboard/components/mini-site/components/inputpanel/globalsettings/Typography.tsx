"use client";

import React from "react";
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
    <section className="flex flex-col gap-4 text-balance p-4">
      {" "}
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
    </section>
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
