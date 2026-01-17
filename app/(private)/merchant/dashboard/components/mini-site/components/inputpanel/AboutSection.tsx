import React from "react";
import { useLandingPage } from "../../context/LandingBuilderContext";
import { FiImage } from "react-icons/fi";

export default function AboutSection() {
  const { aboutData, setAboutData } = useLandingPage();
  return (
    <section className="flex flex-col gap-4 text-balance p-2">
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          About Title
        </label>
        <input
          className="w-full border p-2 rounded dark:bg-gray-700"
          value={aboutData.aboutTitle}
          onChange={(e) =>
            setAboutData({
              ...aboutData,
              aboutTitle: e.target.value,
            })
          }
          placeholder="About Title"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          About Description
        </label>
        <textarea
          className="w-full border p-2 rounded dark:bg-gray-700"
          value={aboutData.aboutDescription}
          onChange={(e) =>
            setAboutData({
              ...aboutData,
              aboutDescription: e.target.value,
            })
          }
          placeholder="Description"
        />
      </div>
      {/* About Image Upload */}
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
              setAboutData({ ...aboutData, aboutImage: url });
            }}
          />
        </label>
      </div>
      <div>
        <label className="text-sm">Background Color</label>

        <div className="grid grid-cols-2 gap-5">
          {/* Background Color */}
          <input
            type="color"
            value={aboutData.backgroundColor}
            onChange={(e) =>
              setAboutData({
                ...aboutData,
                backgroundColor: e.target.value,
              })
            }
            className="cursor-pointer rounded-md h-12 w-full"
            // style={{ backgroundColor: data.primaryBtnColor }}
          />
          {/* Color Hex Input */}
          {/* <input
                    value={data.primaryBtnColor}
                    onChange={(e) =>
                      setData({
                        ...data,
                        primaryBtnColor: e.target.value,
                      })
                    }
                    className="dark:bg-white dark:text-black rounded-md p-3 w-full"
                  /> */}
        </div>
      </div>
      <div>
        <label className="text-sm font-medium flex justify-between">
          Padding: <span>{aboutData.padding}px</span>
        </label>

        <input
          type="range"
          min={16}
          max={96}
          step={1}
          value={aboutData.padding}
          onChange={(e) =>
            setAboutData({
              ...aboutData,
              padding: Number(e.target.value),
            })
          }
          className="w-full mt-2 cursor-pointer"
        />
      </div>
    </section>
  );
}
