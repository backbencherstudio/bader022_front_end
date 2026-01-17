"use client";

import React from "react";
import { useLandingPage } from "../../../context/LandingBuilderContext";

export default function ColorSystem() {
  const { colorSystemData, setColorSystemData } = useLandingPage();

  const handleChange = (key: string, value: string) => {
    setColorSystemData({
      ...colorSystemData,
      [key]: value,
    });
  };

  return (
    <section className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-800">
      {/* Primary Color */}
      <ColorField
        label="Primary Color"
        value={colorSystemData.primaryColor}
        onChange={(v) => handleChange("primaryColor", v)}
      />

      {/* Secondary Color */}
      <ColorField
        label="Secondary Color"
        value={colorSystemData.secondaryColor}
        onChange={(v) => handleChange("secondaryColor", v)}
      />

      {/* Heading Color */}
      <ColorField
        label="Heading Color"
        value={colorSystemData.headingColor}
        onChange={(v) => handleChange("headingColor", v)}
      />

      {/* Body Text Color */}
      <ColorField
        label="Body Text Color"
        value={colorSystemData.bodyTextColor}
        onChange={(v) => handleChange("bodyTextColor", v)}
      />

      {/* Button Color */}
      <ColorField
        label="Button Color"
        value={colorSystemData.buttonColor}
        onChange={(v) => handleChange("buttonColor", v)}
      />
    </section>
  );
}

/* ---------------------------------- */
/* Reusable Color Input Component     */
/* ---------------------------------- */
function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="grid grid-cols-2 gap-5 mt-2">
        <input
          type="color"
          value={value || "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="cursor-pointer rounded-md h-12 w-full"
        />
        <input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="dark:bg-white dark:text-black rounded-md p-3 w-full"
        />
      </div>
    </div>
  );
}
