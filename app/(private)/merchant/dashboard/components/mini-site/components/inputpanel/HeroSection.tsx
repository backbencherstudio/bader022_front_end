import React from "react";
import { useLandingPage } from "../../context/LandingBuilderContext";
import { FiImage } from "react-icons/fi";

export default function HeroSection() {
  const { heroData, setHeroData } = useLandingPage();
  return (
    <section className="flex flex-col gap-4 text-balance p-2">
      {" "}
      {/* Hero Title */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Hero Title
        </label>
        <input
          className="w-full border p-2 rounded dark:bg-gray-700"
          value={heroData.heroTitle}
          onChange={(e) =>
            setHeroData({
              ...heroData,
              heroTitle: e.target.value,
            })
          }
          placeholder="Hero Title"
        />
      </div>
      {/* Hero Subtitle */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Hero Subtitle
        </label>
        <input
          className="w-full border p-2 rounded dark:bg-gray-700"
          value={heroData.heroSubtitle}
          onChange={(e) =>
            setHeroData({
              ...heroData,
              heroSubtitle: e.target.value,
            })
          }
          placeholder="Hero Subtitle"
        />
      </div>
      {/* Hero Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          className="w-full border p-2 rounded dark:bg-gray-700"
          value={heroData.heroDescription}
          onChange={(e) =>
            setHeroData({
              ...heroData,
              heroDescription: e.target.value,
            })
          }
          placeholder="Hero description"
        />
      </div>
      {/* CTA Buttons */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          CTA Button Text
        </label>
        <input
          className="w-full border p-2 rounded dark:bg-gray-700"
          value={heroData.primaryBtn}
          onChange={(e) =>
            setHeroData({
              ...heroData,
              primaryBtn: e.target.value,
            })
          }
          placeholder="Primary button"
        />
        <input
          className="w-full border p-2 rounded dark:bg-gray-700"
          value={heroData.secondaryBtn}
          onChange={(e) =>
            setHeroData({
              ...heroData,
              secondaryBtn: e.target.value,
            })
          }
          placeholder="Secondary button"
        />
      </div>
      {/* Hero Image Upload */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Hero Image
        </label>

        <label className="mt-2 flex flex-col items-center justify-center border-2 border-dashed rounded-lg py-8 cursor-pointer border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
          <FiImage size={26} className="text-gray-400" />
          <span className="text-sm font-medium mt-2 text-gray-600 dark:text-gray-300">
            Click to upload
          </span>
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const url = URL.createObjectURL(file);
              setHeroData({ ...heroData, heroImage: url });
            }}
          />
        </label>
      </div>
      {/* Layout Style */}
      {/* <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Layout Style
            </label>
            <div className="grid grid-cols-2 gap-5">
              <button
                onClick={() => setHeroData({ ...heroData, imageLeft: true })}
                className={`rounded-md p-3 ${
                  heroData.imageLeft ? "bg-gray-900 text-white" : "bg-gray-200"
                }`}
              >
                Image Left
              </button>
              <button
                onClick={() => setHeroData({ ...heroData, imageLeft: false })}
                className={`rounded-md p-3 ${
                  !heroData.imageLeft ? "bg-gray-900 text-white" : "bg-gray-200"
                }`}
              >
                Image Right
              </button>
            </div>
          </div> */}
      {/* Overlay Color */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Overlay Color
        </label>

        <div className="grid grid-cols-2 gap-5">
          <input
            type="color"
            value={heroData.overlayColor}
            onChange={(e) =>
              setHeroData({
                ...heroData,
                overlayColor: e.target.value,
              })
            }
            className="cursor-pointer rounded-md h-12 w-full"
          />
          <input
            value={heroData.overlayColor}
            onChange={(e) =>
              setHeroData({
                ...heroData,
                overlayColor: e.target.value,
              })
            }
            className="rounded-md p-3 w-full dark:bg-white dark:text-black"
          />
        </div>
        {/* Hero Heigh */}
        {/* <div className="space-y-2">
              <label className="text-sm font-medium">
                Hero Height ({heroData.heroHeight}px)
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={heroData.heroHeight}
                onChange={(e) =>
                  setHeroData({
                    ...heroData,
                    heroHeight: Number(e.target.value),
                  })
                }
                className="w-full"
              />
            </div> */}
      </div>
    </section>
  );
}
