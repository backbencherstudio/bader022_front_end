import React from "react";
import { FiImage } from "react-icons/fi";
import { useLandingPage } from "../../../context/LandingBuilderContext";

export default function Branding() {
  const { brandingData, setBrandingData } = useLandingPage();
  return (
    <section className="flex flex-col gap-4 text-balance p-2">
      {/* Logo */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Logo
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
              setBrandingData({ ...brandingData, logo: url });
            }}
          />
        </label>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Logo Position
        </label>

        <div className="grid grid-cols-3 gap-3 mt-2">
          {["left", "center", "right"].map((pos) => (
            <button
              key={pos}
              type="button"
              onClick={() =>
                setBrandingData({
                  ...brandingData,
                  position: pos as "left" | "center" | "right",
                })
              }
              className={`
          rounded-md p-3 text-sm font-medium capitalize
          transition
          ${
            brandingData.position === pos
              ? "bg-gray-900 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }
        `}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
