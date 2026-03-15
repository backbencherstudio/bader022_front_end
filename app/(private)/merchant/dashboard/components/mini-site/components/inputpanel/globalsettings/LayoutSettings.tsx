"use client";

import React from "react";
import { useLandingPage } from "../../../context/LandingBuilderContext";

export default function LayoutSettings() {
  const { layoutSettingsData, setLayoutSettingsData } = useLandingPage();

  console.log(layoutSettingsData.sectionSpacing);

  const update = (key: string, value: number) => {
    setLayoutSettingsData({
      ...layoutSettingsData,
      [key]: value,
    });
  };

  return (
    <section className="flex flex-col gap-4 text-balance p-4">
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
    </section>
  );
}
