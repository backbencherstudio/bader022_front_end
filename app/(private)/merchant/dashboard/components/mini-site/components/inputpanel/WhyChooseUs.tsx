import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLandingPage } from "../../context/LandingBuilderContext";
import { FiImage } from "react-icons/fi";

export default function WhyChooseUs() {
  const { whyChooseUsData, setWhyChooseUsData } = useLandingPage();

  // why Choose Us
  const addFeatureCard = () => {
    setWhyChooseUsData((prev) => ({
      ...prev,
      featureCards: [
        ...prev.featureCards,
        { image: "", title: "", description: "" },
      ],
    }));
  };

  const updateFeatureCard = (
    index: number,
    field: "image" | "title" | "description",
    value: string
  ) => {
    setWhyChooseUsData((prev) => {
      const updated = [...prev.featureCards];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, featureCards: updated };
    });
  };

  const removeFeatureCard = (index: number) => {
    setWhyChooseUsData((prev) => ({
      ...prev,
      featureCards: prev.featureCards.filter((_, i) => i !== index),
    }));
  };

  const handleFeatureImageUpload = (index: number, file: File | null) => {
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    updateFeatureCard(index, "image", imageUrl);
  };
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
          <span className="font-medium">Why Choose Us</span>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance p-2">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Section Title
            </label>
            <input
              className="w-full border p-2 rounded dark:bg-gray-700"
              value={whyChooseUsData.whyChooseUsTitle}
              onChange={(e) =>
                setWhyChooseUsData({
                  ...whyChooseUsData,
                  whyChooseUsTitle: e.target.value,
                })
              }
              placeholder="Enter title..."
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Section Subtitle
            </label>
            <input
              className="w-full border p-2 rounded dark:bg-gray-700"
              value={whyChooseUsData.whyChooseUsSubtitle}
              onChange={(e) =>
                setWhyChooseUsData({
                  ...whyChooseUsData,
                  whyChooseUsSubtitle: e.target.value,
                })
              }
              placeholder="Enter Sub title..."
            />
          </div>
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Feature Cards</h3>

              <button
                onClick={addFeatureCard}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-900 text-white dark:bg-white dark:text-black"
              >
                +
              </button>
            </div>

            {whyChooseUsData.featureCards.map((item, index) => (
              <div key={index} className="space-y-3 border rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Feature {index + 1}</h3>
                  {whyChooseUsData.featureCards.length > 1 && (
                    <button
                      onClick={() => removeFeatureCard(index)}
                      className="text-red-500 text-sm"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Image Upload */}
                <label
                  className="mt-2 flex flex-col items-center justify-center
      border-2 border-dashed rounded-lg py-6 cursor-pointer
      border-gray-300 dark:border-gray-700
      bg-gray-50 dark:bg-gray-800"
                >
                  <FiImage size={26} className="text-gray-400" />
                  <span className="text-sm mt-2">Click to upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleFeatureImageUpload(
                        index,
                        e.target.files?.[0] || null
                      )
                    }
                  />
                </label>
                <input
                  className="w-full border p-2 rounded dark:bg-gray-700"
                  value={item.title}
                  onChange={(e) =>
                    updateFeatureCard(index, "title", e.target.value)
                  }
                  placeholder="Title"
                />

                <textarea
                  className="w-full border p-2 rounded dark:bg-gray-700"
                  value={item.description}
                  onChange={(e) =>
                    updateFeatureCard(index, "description", e.target.value)
                  }
                  placeholder="Description"
                />
              </div>
            ))}
          </div>
          <div>
            <label className="text-sm">Background Color</label>

            <div className="grid grid-cols-2 gap-5">
              {/* Background Color */}
              <input
                type="color"
                value={whyChooseUsData.backgroundColor}
                onChange={(e) =>
                  setWhyChooseUsData({
                    ...whyChooseUsData,
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
                      setAboutData({
                        ...aboutData,
                        backgroundColor: e.target.value,
                      })
                    }
                    className="dark:bg-white dark:text-black rounded-md p-3 w-full"
                  /> */}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
