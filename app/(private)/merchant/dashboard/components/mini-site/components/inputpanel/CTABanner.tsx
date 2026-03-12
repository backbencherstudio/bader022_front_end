import React from "react";
import { useLandingPage } from "../../context/LandingBuilderContext";
import { FiImage } from "react-icons/fi";
export default function CTABanner() {
  const { ctaBannerData, setCtaBannerData } = useLandingPage();
  return (
    <section className="flex flex-col gap-4 p-3">
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

              const preview = URL.createObjectURL(file);

              setCtaBannerData((prev) => ({
                ...prev,
                ctaPreviewImage: preview,
                ctaBannerFile: file,
              }));
            }}
          />
        </label>
      </div>

      {/* Overlay Color */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Overlay Color
        </label>

        <div className="grid grid-cols-2 gap-5">
          <input
            type="color"
            value={ctaBannerData.ctaBannerOverlayColor}
            onChange={(e) =>
              setCtaBannerData({
                ...ctaBannerData,
                ctaBannerOverlayColor: e.target.value,
              })
            }
            className="cursor-pointer rounded-md h-12 w-full"
          />
          <input
            value={ctaBannerData.ctaBannerOverlayColor}
            onChange={(e) =>
              setCtaBannerData({
                ...ctaBannerData,
                ctaBannerOverlayColor: e.target.value,
              })
            }
            className="rounded-md p-3 w-full dark:bg-white dark:text-black"
          />
        </div>
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
              padding: e.target.value,
            })
          }
          className="w-full"
        />
      </div>
    </section>
  );
}
