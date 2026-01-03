"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FiImage } from "react-icons/fi";
import { TbSmartHome } from "react-icons/tb";
import { TfiWorld } from "react-icons/tfi";

const FONT_OPTIONS = [
  { label: "Inter", value: "Inter, sans-serif" },
  { label: "Poppins", value: "Poppins, sans-serif" },
  { label: "Roboto", value: "Roboto, sans-serif" },
  { label: "Montserrat", value: "Montserrat, sans-serif" },
  { label: "Playfair Display", value: "Playfair Display, serif" },
];

export default function LandingPageBuilder() {
  const [data, setData] = useState({
    heroTitle: "",
    heroSubtitle: "",
    heroImage: "",
    primaryBtn: "",
    secondaryBtn: "",
    primaryBtnColor: "#f97316",
    h1Size: 48,
    font: "Inter, sans-serif",

    services: [
      {
        title: "Hair Treatment",
        price: "109 SAR",
        duration: "30 min",
        image: "/service1.png",
      },
      {
        title: "Scalp Therapy",
        price: "149 SAR",
        duration: "45 min",
        image: "/service2.png",
      },
    ],

    ctaTitle: "Your Hair Deserves The Best Care",
    ctaSubtitle: "Book your consultation today",
    ctaButton: "Book Now",
    ctaImage: "/cta.jpg",
  });

  // Hero Section state (reference)
  const [heroData, setHeroData] = useState({
    heroTitle: "",
    heroSubtitle: "",
    heroDescription: "",
    primaryBtn: "",
    secondaryBtn: "",
    heroImage: "",
    imageLeft: true, // boolean is better here
    overlayColor: "#000000",
    heroHeight: 48,
  });

  // About Section
  const [aboutData, setAboutData] = useState({
    aboutTitle: "",
    aboutDescription: "",
    aboutImage: "",
    backgroundColor: "#ffffff",
    padding: 5,
  });

  const [socialLinks, setSocialLinks] = useState([{ icon: "", url: "" }]);
  const [showPoweredBy, setShowPoweredBy] = useState(true);

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { icon: "", url: "" }]);
  };

  const updateSocialLink = (
    index: number,
    field: "icon" | "url",
    value: string
  ) => {
    const updated = [...socialLinks];
    updated[index][field] = value;
    setSocialLinks(updated);
  };

  const removeSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  // why Choose Us

  const [whyChooseUsData, setWhyChooseUsData] = useState({
    whyChooseUsTitle: "",
    whyChooseUsSubtitle: "",
    backgroundColor: "#ffffff",
    featureCards: [
      {
        image: null as string | null,
        title: "",
        description: "",
      },
    ],
  });

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

  // CTA Banner
  const [ctaBannerData, setCtaBannerData] = useState({
    ctaBannerTitle: "",
    ctaBannerSubTitle: "",
    ctaBannerImage: "",
    backgroundColor: "",
    ctaBannerOverlayColor: "",
    padding: 5,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] h-screen dark:bg-gray-900 ">
      {/* ================= LEFT: INPUT PANEL ================= */}
      <div className="border-r space-y-1 bg-gray-50 dark:bg-gray-800 dark:text-white overflow-y-auto shadow m-2 p-3">
        <Accordion type="single" collapsible className="w-full">
          {/* Global Settings */}
          <AccordionItem value="item-1">
            <AccordionTrigger>
              {" "}
              <h3 className="flex gap-2 items-center text-xl">
                <TfiWorld /> Global Settings
              </h3>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {/* Branding */}
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
                    <span className="font-medium">Branding</span>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance p-2">
                    {/* Logo */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Logo{" "}
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
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Logo Position
                      </label>{" "}
                      <div className="grid grid-cols-3 gap-3">
                        <button className=" bg-gray-900 rounded-md p-3">
                          Left
                        </button>
                        <button className=" bg-gray-200 rounded-md p-3">
                          Center
                        </button>
                        <button className=" bg-gray-200 rounded-md p-3">
                          Right
                        </button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              {/* Color System */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem
                  value="item-1"
                  className="border rounded-md overflow-hidden"
                >
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
                    <span className="font-medium">Color System </span>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 p-4 bg-white dark:bg-gray-800">
                    {/* Primary Color */}
                    <div>
                      <label className="text-sm">Primary Color</label>
                      <div className="grid grid-cols-2 gap-5">
                        {/* Color Picker */}
                        <input
                          type="color"
                          value={data.primaryBtnColor}
                          onChange={(e) =>
                            setData({
                              ...data,
                              primaryBtnColor: e.target.value,
                            })
                          }
                          className="cursor-pointer rounded-md h-12 w-full"
                          style={{ backgroundColor: data.primaryBtnColor }}
                        />
                        {/* Color Hex Input */}
                        <input
                          value={data.primaryBtnColor}
                          onChange={(e) =>
                            setData({
                              ...data,
                              primaryBtnColor: e.target.value,
                            })
                          }
                          className="dark:bg-white dark:text-black rounded-md p-3 w-full"
                        />
                      </div>
                    </div>
                    {/* Secondary Color */}
                    <div>
                      <label className="text-sm">Secondary Color</label>
                      <div className="grid grid-cols-2 gap-5">
                        {/* Color Picker */}
                        <input
                          type="color"
                          value={data.primaryBtnColor}
                          onChange={(e) =>
                            setData({
                              ...data,
                              primaryBtnColor: e.target.value,
                            })
                          }
                          className="cursor-pointer rounded-md h-12 w-full"
                          style={{ backgroundColor: data.primaryBtnColor }}
                        />
                        {/* Color Hex Input */}
                        <input
                          value={data.primaryBtnColor}
                          onChange={(e) =>
                            setData({
                              ...data,
                              primaryBtnColor: e.target.value,
                            })
                          }
                          className="dark:bg-white dark:text-black rounded-md p-3 w-full"
                        />
                      </div>
                    </div>
                    {/* Heading Color */}
                    <div>
                      <label className="text-sm">Heading Color</label>
                      <div className="grid grid-cols-2 gap-5">
                        {/* Color Picker */}
                        <input
                          type="color"
                          value={data.primaryBtnColor}
                          onChange={(e) =>
                            setData({
                              ...data,
                              primaryBtnColor: e.target.value,
                            })
                          }
                          className="cursor-pointer rounded-md h-12 w-full"
                          style={{ backgroundColor: data.primaryBtnColor }}
                        />
                        {/* Color Hex Input */}
                        <input
                          value={data.primaryBtnColor}
                          onChange={(e) =>
                            setData({
                              ...data,
                              primaryBtnColor: e.target.value,
                            })
                          }
                          className="dark:bg-white dark:text-black rounded-md p-3 w-full"
                        />
                      </div>
                    </div>
                    {/* Body Text Color */}
                    <div>
                      <label className="text-sm">Body Text Color</label>
                      <div className="grid grid-cols-2 gap-5">
                        {/* Color Picker */}
                        <input
                          type="color"
                          value={data.primaryBtnColor}
                          onChange={(e) =>
                            setData({
                              ...data,
                              primaryBtnColor: e.target.value,
                            })
                          }
                          className="cursor-pointer rounded-md h-12 w-full"
                          style={{ backgroundColor: data.primaryBtnColor }}
                        />
                        {/* Color Hex Input */}
                        <input
                          value={data.primaryBtnColor}
                          onChange={(e) =>
                            setData({
                              ...data,
                              primaryBtnColor: e.target.value,
                            })
                          }
                          className="dark:bg-white dark:text-black rounded-md p-3 w-full"
                        />
                      </div>
                    </div>
                    {/* Button Color */}
                    <div>
                      <label className="text-sm">Button Color</label>
                      <div className="grid grid-cols-2 gap-5">
                        {/* Color Picker */}
                        <input
                          type="color"
                          value={data.primaryBtnColor}
                          onChange={(e) =>
                            setData({
                              ...data,
                              primaryBtnColor: e.target.value,
                            })
                          }
                          className="cursor-pointer rounded-md h-12 w-full"
                          style={{ backgroundColor: data.primaryBtnColor }}
                        />
                        {/* Color Hex Input */}
                        <input
                          value={data.primaryBtnColor}
                          onChange={(e) =>
                            setData({
                              ...data,
                              primaryBtnColor: e.target.value,
                            })
                          }
                          className="dark:bg-white dark:text-black rounded-md p-3 w-full"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              {/* Typography */}
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
                    <span className="font-medium">Typography</span>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance p-2">
                    <div>
                      <label className="text-sm font-medium flex justify-between">
                        H1 Size: <span>{data.h1Size}px</span>
                      </label>

                      <input
                        type="range"
                        min={16}
                        max={96}
                        step={1}
                        value={data.h1Size}
                        onChange={(e) =>
                          setData({ ...data, h1Size: Number(e.target.value) })
                        }
                        className="w-full mt-2 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium flex justify-between">
                        H2 Size: <span>{data.h1Size}px</span>
                      </label>

                      <input
                        type="range"
                        min={16}
                        max={96}
                        step={1}
                        value={data.h1Size}
                        onChange={(e) =>
                          setData({ ...data, h1Size: Number(e.target.value) })
                        }
                        className="w-full mt-2 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        H1 Font Family
                      </label>

                      <select
                        value={data.font}
                        onChange={(e) =>
                          setData({ ...data, font: e.target.value })
                        }
                        className="w-full mt-2 p-2 rounded-md border dark:bg-gray-700"
                      >
                        {FONT_OPTIONS.map((font) => (
                          <option key={font.value} value={font.value}>
                            {font.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium flex justify-between">
                        Body Text Size: <span>{data.h1Size}px</span>
                      </label>

                      <input
                        type="range"
                        min={16}
                        max={96}
                        step={1}
                        value={data.h1Size}
                        onChange={(e) =>
                          setData({ ...data, h1Size: Number(e.target.value) })
                        }
                        className="w-full mt-2 cursor-pointer"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              {/*Layout Settings */}
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
                    <span className="font-medium">Layout Settings</span>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance p-2">
                    <div>
                      <label className="text-sm font-medium flex justify-between">
                        Section Spacing: <span>{data.h1Size}px</span>
                      </label>

                      <input
                        type="range"
                        min={16}
                        max={96}
                        step={1}
                        value={data.h1Size}
                        onChange={(e) =>
                          setData({ ...data, h1Size: Number(e.target.value) })
                        }
                        className="w-full mt-2 cursor-pointer"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              {/* Footer Settings */}
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
                        value={data.heroTitle}
                        onChange={(e) =>
                          setData({ ...data, heroTitle: e.target.value })
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
                        value={data.heroSubtitle}
                        onChange={(e) =>
                          setData({ ...data, heroSubtitle: e.target.value })
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
                          value={data.primaryBtnColor}
                          onChange={(e) =>
                            setData({
                              ...data,
                              primaryBtnColor: e.target.value,
                            })
                          }
                          className="cursor-pointer rounded-md h-12 w-full"
                          style={{ backgroundColor: data.primaryBtnColor }}
                        />
                        {/* Color Hex Input */}
                        <input
                          value={data.primaryBtnColor}
                          onChange={(e) =>
                            setData({
                              ...data,
                              primaryBtnColor: e.target.value,
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
                          value={data.primaryBtnColor}
                          onChange={(e) =>
                            setData({
                              ...data,
                              primaryBtnColor: e.target.value,
                            })
                          }
                          className="cursor-pointer rounded-md h-12 w-full"
                          style={{ backgroundColor: data.primaryBtnColor }}
                        />
                        {/* Color Hex Input */}
                        <input
                          value={data.primaryBtnColor}
                          onChange={(e) =>
                            setData({
                              ...data,
                              primaryBtnColor: e.target.value,
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
                      {socialLinks.map((item, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center"
                        >
                          <input
                            type="text"
                            placeholder="Icon name"
                            value={item.icon}
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

                          {socialLinks.length > 1 && (
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
                      <span className="text-sm font-medium">
                        Show “Powered By Bokli”
                      </span>

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
            </AccordionContent>
          </AccordionItem>
          {/* Home Page */}
        </Accordion>
      </div>

      {/* ================= RIGHT: LANDING PAGE ================= */}
      <div className="overflow-y-auto bg-white dark:bg-gray-900 dark:text-white shadow m-2 p-3">
        {/* HERO */}
        <section className="relative h-[520px]">
          {heroData.heroImage && (
            <Image
              src="/images/heroImage.png"
              alt="Hero"
              fill
              className="object-cover"
            />
          )}

          {/* Overlay auto adapts to dark mode */}
          <div className="relative z-10 max-w-3xl p-16 text-white">
            <h3>{heroData.heroSubtitle}</h3>
            <h1 className="text-4xl font-bold">{heroData.heroTitle}</h1>
            <p className="mt-4 text-lg">{heroData.heroDescription}</p>

            <div className="flex gap-4 mt-6">
              {heroData.primaryBtn && (
                <button className="bg-orange-500 px-6 py-3 rounded text-white">
                  {heroData.primaryBtn}
                </button>
              )}
              {heroData.secondaryBtn && (
                <button className="border px-6 py-3 rounded">
                  {heroData.secondaryBtn}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* About Section */}
        {aboutData?.aboutTitle && (
          <section className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Image */}
              {aboutData?.aboutImage && (
                <div className="relative w-full h-[320px] rounded-xl overflow-hidden">
                  <Image
                    src={aboutData?.aboutImage || "/images/aboutus.png"}
                    alt="About Us"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Content */}
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                  {aboutData.aboutTitle}
                </h3>
                <p className="text-gray-600 mb-6">
                  {aboutData.aboutDescription}
                </p>
                <button className="px-6 py-3 bg-linear-to-r from-[#7153FF] to-[#3CB3FF] text-white rounded-md font-medium">
                  About Us
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Why Choose Us */}
        <section
          style={{ backgroundColor: whyChooseUsData.backgroundColor }}
          className="py-16"
        >
          <div className="container mx-auto px-4">
            {/* Title */}
            <h3 className="text-center text-4xl font-semibold mb-3">
              {whyChooseUsData.whyChooseUsTitle}
            </h3>

            {/* Subtitle */}
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              {whyChooseUsData.whyChooseUsSubtitle}
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseUsData.featureCards.map((item, index) => (
                <div key={index}>
                  <div
                    style={{ backgroundColor: whyChooseUsData.backgroundColor }}
                    className="card flex flex-col items-center text-center gap-4 rounded-xl  shadow"
                  >
                    {item.image && (
                      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100">
                        <Image
                          src="/icons/WhyChooseUs.png"
                          alt={item.title || "Feature icon"}
                          width={28}
                          height={28}
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* SERVICES */}
        <section className="p-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.services.map((s, i) => (
            <div
              key={i}
              className="border rounded-xl overflow-hidden shadow-sm dark:border-gray-700"
            >
              <Image
                src={s.image}
                alt={s.title}
                width={400}
                height={260}
                className="object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm opacity-70">
                  {s.duration} · {s.price}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="relative h-[320px]">
          {ctaBannerData.ctaBannerImage && (
            <Image
              src="/images/ctaBannerImage.png"
              alt="CTA"
              fill
              className="object-cover"
            />
          )}
          <div className="relative z-10 text-center p-20">
            <h2 className="text-3xl font-bold">
              {ctaBannerData.ctaBannerTitle}
            </h2>
            <p className="mt-3">{ctaBannerData.ctaBannerSubTitle}</p>
            <button className="mt-6 bg-orange-500 px-6 py-3 rounded text-white">
              {data.ctaButton}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
