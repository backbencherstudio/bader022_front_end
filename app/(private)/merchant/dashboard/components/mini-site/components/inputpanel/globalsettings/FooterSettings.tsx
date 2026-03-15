import React from "react";
import { FiImage } from "react-icons/fi";
import { useLandingPage } from "../../../context/LandingBuilderContext";

export default function FooterSettings() {
  const { footerData, setFooterData } = useLandingPage();

  // console.log(footerData);

  return (
    <section className="flex flex-col gap-4 text-balance p-2">
      {/* Footer Title */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Web Site Name
        </label>
        <input
          className="w-full border p-2 rounded dark:bg-gray-700"
          value={footerData.footerTitle}
          onChange={(e) =>
            setFooterData({ ...footerData, footerTitle: e.target.value })
          }
          placeholder="Web Site Name"
        />
      </div>

      {/* Footer Description */}
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

      {/* Footer Logo */}
      {/* <div>
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
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const preview = URL.createObjectURL(file);

              setFooterData((prev) => ({
                ...prev,
                footerLogoPreview: preview,
                footerLogoFile: file,
              }));
            }}
          />
        </label>
      </div> */}
      {/* Footer Background Color  */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Footer Background
        </label>
        <div className="grid grid-cols-2 gap-5">
          <input
            type="color"
            value={footerData.footerBackground}
            onChange={(e) =>
              setFooterData({
                ...footerData,
                footerBackground: e.target.value,
              })
            }
            className="cursor-pointer rounded-md h-12 w-full"
          />
          <input
            value={footerData.footerBackground}
            onChange={(e) =>
              setFooterData({
                ...footerData,
                footerBackground: e.target.value,
              })
            }
            className="rounded-md p-3 w-full dark:bg-white dark:text-black"
          />
        </div>
      </div>
      {/* Footer Text Color */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Footer Text Color
        </label>
        <div className="grid grid-cols-2 gap-5">
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
          />
          <input
            value={footerData.footerTextColor}
            onChange={(e) =>
              setFooterData({
                ...footerData,
                footerTextColor: e.target.value,
              })
            }
            className="rounded-md p-3 w-full dark:bg-white dark:text-black"
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Social Links</h3>
        <div className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center">
          <input
            type="text"
            value="Facebook"
            readOnly
            className="w-full p-3 rounded-md border dark:bg-gray-700 bg-gray-100 cursor-not-allowed"
          />
          <input
            type="text"
            placeholder="https://www.facebook.com"
            value={footerData.facebookUrl}
            onChange={(e) =>
              setFooterData({
                ...footerData,
                facebookUrl: e.target.value,
              })
            }
            className="w-full p-3 rounded-md border dark:bg-gray-700"
          />
        </div>
        <div className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center">
          <input
            type="text"
            value="Instagram"
            readOnly
            className="w-full p-3 rounded-md border dark:bg-gray-700 bg-gray-100 cursor-not-allowed"
          />
          <input
            type="text"
            placeholder="https://www.instagram.com"
            value={footerData.instagramUrl}
            onChange={(e) =>
              setFooterData({
                ...footerData,
                instagramUrl: e.target.value,
              })
            }
            className="w-full p-3 rounded-md border dark:bg-gray-700"
          />
        </div>
        <div className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center">
          <input
            type="text"
            value="Twitter"
            readOnly
            className="w-full p-3 rounded-md border dark:bg-gray-700 bg-gray-100 cursor-not-allowed"
          />
          <input
            type="text"
            placeholder="https://www.twitter.com"
            value={footerData.twitterUrl}
            onChange={(e) =>
              setFooterData({
                ...footerData,
                twitterUrl: e.target.value,
              })
            }
            className="w-full p-3 rounded-md border dark:bg-gray-700"
          />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Navigation Links</h3>
        <div className="grid grid-cols-2 gap-2 items-center">
          <input
            type="text"
            placeholder="Home"
            value={footerData.home}
            onChange={(e) =>
              setFooterData({
                ...footerData,
                home: e.target.value,
              })
            }
            className="w-full p-2 border rounded dark:bg-gray-700"
          />
          <input
            type="text"
            placeholder="#home"
            value={footerData.homeUrl}
            onChange={(e) =>
              setFooterData({
                ...footerData,
                homeUrl: e.target.value,
              })
            }
            className="w-full p-2 border rounded dark:bg-gray-700"
          />

          <input
            type="text"
            placeholder="About"
            value={footerData.about}
            onChange={(e) =>
              setFooterData({
                ...footerData,
                about: e.target.value,
              })
            }
            className="w-full p-2 border rounded dark:bg-gray-700"
          />
          <input
            type="text"
            placeholder="#about"
            value={footerData.aboutUrl}
            onChange={(e) =>
              setFooterData({
                ...footerData,
                aboutUrl: e.target.value,
              })
            }
            className="w-full p-2 border rounded dark:bg-gray-700"
          />

          <input
            type="text"
            placeholder="Why Choose Us"
            value={footerData.why_choose_us}
            onChange={(e) =>
              setFooterData({
                ...footerData,
                why_choose_us: e.target.value,
              })
            }
            className="w-full p-2 border rounded dark:bg-gray-700"
          />
          <input
            type="text"
            placeholder="#why-choose-us"
            value={footerData.why_choose_usUrl}
            onChange={(e) =>
              setFooterData({
                ...footerData,
                why_choose_usUrl: e.target.value,
              })
            }
            className="w-full p-2 border rounded dark:bg-gray-700"
          />

          <input
            type="text"
            placeholder="Service"
            value={footerData.service}
            onChange={(e) =>
              setFooterData({
                ...footerData,
                service: e.target.value,
              })
            }
            className="w-full p-2 border rounded dark:bg-gray-700"
          />
          <input
            type="text"
            placeholder="#service"
            value={footerData.serviceUrl}
            onChange={(e) =>
              setFooterData({
                ...footerData,
                serviceUrl: e.target.value,
              })
            }
            className="w-full p-2 border rounded dark:bg-gray-700"
          />
        </div>
      </div>

      {/* Support Links */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Support Links</h3>
        <div className="grid grid-cols-2 gap-2 items-center">
          <input
            type="text"
            value="Contact Us"
            readOnly
            className="w-full p-2 border rounded dark:bg-gray-700"
          />
          <input
            type="text"
            placeholder="#contact-us"
            value={footerData.contactUrl}
            onChange={(e) =>
              setFooterData({
                ...footerData,
                contactUrl: e.target.value,
              })
            }
            className="w-full p-2 border rounded dark:bg-gray-700"
          />
          <input
            type="text"
            value="Privacy Policy"
            readOnly
            className="w-full p-2 border rounded dark:bg-gray-700"
          />
          <input
            type="text"
            placeholder="#privacy-policy"
            value={footerData.privacy_policyUrl}
            onChange={(e) =>
              setFooterData({
                ...footerData,
                privacy_policyUrl: e.target.value,
              })
            }
            className="w-full p-2 border rounded dark:bg-gray-700"
          />
          <input
            type="text"
            value="Terms & Conditions"
            readOnly
            className="w-full p-2 border rounded dark:bg-gray-700"
          />
          <input
            type="text"
            placeholder="#terms-conditions"
            value={footerData.terms_conditionUrl}
            onChange={(e) =>
              setFooterData({
                ...footerData,
                terms_conditionUrl: e.target.value,
              })
            }
            className="w-full p-2 border rounded dark:bg-gray-700"
          />
        </div>
      </div>

      {/* Contact */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Contact Info</h3>
        <input
          type="text"
          placeholder="Contact Number"
          value={footerData.contact_info}
          onChange={(e) =>
            setFooterData({
              ...footerData,
              contact_info: e.target.value,
            })
          }
          className="w-full p-2 border rounded dark:bg-gray-700"
        />
        <input
          type="email"
          placeholder="Email"
          value={footerData.contact_email}
          onChange={(e) =>
            setFooterData({
              ...footerData,
              contact_email: e.target.value,
            })
          }
          className="w-full p-2 border rounded dark:bg-gray-700"
        />
        <input
          type="text"
          placeholder="Address"
          value={footerData.address}
          onChange={(e) =>
            setFooterData({
              ...footerData,
              address: e.target.value,
            })
          }
          className="w-full p-2 border rounded dark:bg-gray-700"
        />
      </div>

      {/* Powered By Toggle */}
      <div className="flex items-center justify-between py-3">
        <span className="text-sm font-medium">Turn Off “Powered By Bokli”</span>
        <button
          onClick={() =>
            setFooterData({
              ...footerData,
              showPoweredBy: !footerData.showPoweredBy as unknown as string,
            })
          }
          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
            footerData.showPoweredBy
              ? "bg-blue-600"
              : "bg-gray-400 dark:bg-gray-600"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
              footerData.showPoweredBy ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </section>
  );
}
