import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FiImage } from "react-icons/fi";
import { useLandingPage } from "../../../context/LandingBuilderContext";
export default function FooterSettings() {
  const { footerData, setFooterData } = useLandingPage();
  const [showPoweredBy, setShowPoweredBy] = useState(true);
  //   const addSocialLink = () => {
  //     setSocialLinks([...socialLinks, { icon: "", url: "" }]);
  //   };

  const addSocialLink = () => {
    setFooterData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { icon: "", url: "" }],
    }));
  };

  const updateSocialLink = (
    index: number,
    field: "icon" | "url",
    value: string
  ) => {
    setFooterData((prev) => {
      const updated = [...prev.socialLinks];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, featureCards: updated };
    });
  };

  const removeSocialLink = (index: number) => {
    setFooterData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  //   const updateSocialLink = (
  //     index: number,
  //     field: "icon" | "url",
  //     value: string
  //   ) => {
  //     const updated = [...socialLinks];
  //     updated[index][field] = value;
  //     setSocialLinks(updated);
  //   };

  //   const removeSocialLink = (index: number) => {
  //     setSocialLinks(socialLinks.filter((_, i) => i !== index));
  //   };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem
        value="item-1"
        className="border rounded-md overflow-hidden"
      >
        {" "}
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
          <span className="font-medium">Footer Settings</span>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance p-2">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Footer Title
            </label>
            <input
              className="w-full border p-2 rounded dark:bg-gray-700"
              value={footerData.footerTitle}
              onChange={(e) =>
                setFooterData({ ...footerData, footerTitle: e.target.value })
              }
              placeholder="Footer Title"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Footer Description
            </label>
            <textarea
              className="w-full border p-2 rounded dark:bg-gray-700"
              value={footerData.footerSubTitle}
              onChange={(e) =>
                setFooterData({ ...footerData, footerSubTitle: e.target.value })
              }
              placeholder="Footer Description"
            />
          </div>
          {/*Footer Logo */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Footer Logo{" "}
            </label>

            <label
              className="
                                    mt-2 flex flex-col items-center justify-center
                                    border-2 border-dashed rounded-lg py-8 cursor-pointer
                                    border-gray-300 dark:border-gray-700
                                    bg-gray-50 dark:bg-gray-800
                                    hover:bg-gray-100 dark:hover:bg-gray-700
                                  "
            >
              <FiImage size={26} className="text-gray-400" />
              <span className="text-sm font-medium mt-2 text-gray-600 dark:text-gray-300">
                Upload Logo
              </span>
              <p>JPG or PNG (max 3MB)</p>
              <input type="file" className="hidden" />
            </label>
          </div>
          <div>
            <label className="text-sm">Footer Background</label>

            <div className="grid grid-cols-2 gap-5">
              {/* Color Picker */}
              <input
                type="color"
                value={footerData.footerTextColor}
                onChange={(e) =>
                  setFooterData({
                    ...footerData,
                    footerTextColor: e.target.value,
                  })
                }
                className="cursor-pointer rounded-md h-12 w-full"
                style={{ backgroundColor: footerData.footerTextColor }}
              />
              {/* Color Hex Input */}
              <input
                value={footerData.footerTextColor}
                onChange={(e) =>
                  setFooterData({
                    ...footerData,
                    footerTextColor: e.target.value,
                  })
                }
                className="dark:bg-white dark:text-black rounded-md p-3 w-full"
              />
            </div>
          </div>
          <div>
            <label className="text-sm">Footer Text Color</label>

            <div className="grid grid-cols-2 gap-5">
              {/* Color Picker */}
              <input
                type="color"
                value={footerData.footerTextColor}
                onChange={(e) =>
                  setFooterData({
                    ...footerData,
                    footerTextColor: e.target.value,
                  })
                }
                className="cursor-pointer rounded-md h-12 w-full"
                style={{ backgroundColor: footerData.footerTextColor }}
              />
              {/* Color Hex Input */}
              <input
                value={footerData.footerTextColor}
                onChange={(e) =>
                  setFooterData({
                    ...footerData,
                    footerTextColor: e.target.value,
                  })
                }
                className="dark:bg-white dark:text-black rounded-md p-3 w-full"
              />
            </div>
          </div>
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Social Links</h3>

              <button
                onClick={addSocialLink}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-900 text-white dark:bg-white dark:text-black"
              >
                +
              </button>
            </div>

            {/* Inputs */}
            {footerData.socialLinks.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center"
              >
                <input
                  type="text"
                  placeholder="Icon name"
                  //   value={item.icon}
                  onChange={(e) =>
                    updateSocialLink(index, "icon", e.target.value)
                  }
                  className="w-full p-3 rounded-md border dark:bg-gray-700"
                />

                <input
                  type="url"
                  placeholder="URL"
                  value={item.url}
                  onChange={(e) =>
                    updateSocialLink(index, "url", e.target.value)
                  }
                  className="w-full p-3 rounded-md border dark:bg-gray-700"
                />

                {footerData.socialLinks.length > 1 && (
                  <button
                    onClick={() => removeSocialLink(index)}
                    className="text-red-500 text-sm px-2"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-sm font-medium">Show “Powered By Bokli”</span>

            <button
              onClick={() => setShowPoweredBy(!showPoweredBy)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300
      ${showPoweredBy ? "bg-blue-600" : "bg-gray-400 dark:bg-gray-600"}
    `}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300
        ${showPoweredBy ? "translate-x-6" : "translate-x-0"}
      `}
              />
            </button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
