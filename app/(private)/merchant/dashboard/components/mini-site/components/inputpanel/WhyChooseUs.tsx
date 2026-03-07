import React from "react";
import { useLandingPage } from "../../context/LandingBuilderContext";
import { FiImage } from "react-icons/fi";

export default function WhyChooseUs() {
  const { whyChooseUsData, setWhyChooseUsData } = useLandingPage();

  // why Choose Us
  // const addFeatureCard = () => {
  //   setWhyChooseUsData((prev) => ({
  //     ...prev,
  //     featureCards: [
  //       ...prev.featureCards,
  //       { image: "", title: "", description: "" },
  //     ],
  //   }));
  // };

  // const updateFeatureCard = (
  //   index: number,
  //   field: "image" | "title" | "description",
  //   value: string
  // ) => {
  //   setWhyChooseUsData((prev) => {
  //     const updated = [...prev.featureCards];
  //     updated[index] = { ...updated[index], [field]: value };
  //     return { ...prev, featureCards: updated };
  //   });
  // };

  // const removeFeatureCard = (index: number) => {
  //   setWhyChooseUsData((prev) => ({
  //     ...prev,
  //     featureCards: prev.featureCards.filter((_, i) => i !== index),
  //   }));
  // };

  // const handleFeatureImageUpload = (index: number, file: File | null) => {
  //   if (!file) return;
  //   const imageUrl = URL.createObjectURL(file);
  //   updateFeatureCard(index, "image", imageUrl);
  // };
  return (
    <section className="flex flex-col gap-4 text-balance p-2">
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
      {/*Image Upload */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Card Image One
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
              setWhyChooseUsData({ ...whyChooseUsData, cardImageOne: url });
            }}
          />
        </label>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Card Title One
        </label>
        <input
          className="w-full border p-2 rounded dark:bg-gray-700"
          value={whyChooseUsData.whyChooseUsTitleOne}
          onChange={(e) =>
            setWhyChooseUsData({
              ...whyChooseUsData,
              whyChooseUsTitleOne: e.target.value,
            })
          }
          placeholder="Enter title..."
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Card Description One
        </label>
        <textarea
          className="w-full border p-2 rounded dark:bg-gray-700"
          value={whyChooseUsData.whyChooseUsDescriptionOne}
          onChange={(e) =>
            setWhyChooseUsData({
              ...whyChooseUsData,
              whyChooseUsDescriptionOne: e.target.value,
            })
          }
          placeholder="Description"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Card Image Two
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
              setWhyChooseUsData({ ...whyChooseUsData, cardImageTwo: url });
            }}
          />
        </label>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Card Title Two
        </label>
        <input
          className="w-full border p-2 rounded dark:bg-gray-700"
          value={whyChooseUsData.whyChooseUsTitleTwo}
          onChange={(e) =>
            setWhyChooseUsData({
              ...whyChooseUsData,
              whyChooseUsTitleTwo: e.target.value,
            })
          }
          placeholder="Enter title..."
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Card Description Two
        </label>
        <textarea
          className="w-full border p-2 rounded dark:bg-gray-700"
          value={whyChooseUsData.whyChooseUsDescriptionTwo}
          onChange={(e) =>
            setWhyChooseUsData({
              ...whyChooseUsData,
              whyChooseUsDescriptionTwo: e.target.value,
            })
          }
          placeholder="Description"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Card Image Three
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
              setWhyChooseUsData({ ...whyChooseUsData, cardImageThree: url });
            }}
          />
        </label>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Card Title Three
        </label>
        <input
          className="w-full border p-2 rounded dark:bg-gray-700"
          value={whyChooseUsData.whyChooseUsTitleThree}
          onChange={(e) =>
            setWhyChooseUsData({
              ...whyChooseUsData,
              whyChooseUsTitleThree: e.target.value,
            })
          }
          placeholder="Enter title..."
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Card Description Three
        </label>
        <textarea
          className="w-full border p-2 rounded dark:bg-gray-700"
          value={whyChooseUsData.whyChooseUsDescriptionThree}
          onChange={(e) =>
            setWhyChooseUsData({
              ...whyChooseUsData,
              whyChooseUsDescriptionThree: e.target.value,
            })
          }
          placeholder="Description"
        />
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
    </section>
  );
}
