import React from "react";
import { LandingPageProvider } from "../components/mini-site/context/LandingBuilderContext";
import LandingPage from "../components/mini-site/components/LandingPage";
import InputPanel from "../components/mini-site/components/InputPanel";
import { FiCopy, FiSave } from "react-icons/fi";
import MiniSiteCopyLink from "../components/mini-site/components/MiniSiteCopyLink";

export default function page() {
  return (
    <LandingPageProvider>
      <div className="dark:bg-gray-900 min-h-screen">
        {/* HEADER */}
        <div className="w-full bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-5 flex flex-col gap-4">
          {/* Top row */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Mini-Site Builder
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Customize your booking mini-site
              </p>
            </div>

            <button className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
              <FiSave size={16} />
              Save Changes
            </button>
          </div>

          {/* Bottom row */}
          {/* <div className="flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 w-full">
              <span className="shrink-0">Live at:</span>

              <input
                value="bokli.com"
                readOnly
                className="w-full bg-transparent outline-none text-gray-900 dark:text-white font-medium"
              />
            </div>

            <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition shrink-0">
              <FiCopy size={16} />
              Copy Link
            </button>
          </div> */}
          <MiniSiteCopyLink />
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-3 h-screen">
          {/* LEFT: INPUT PANEL */}
          <div className="border-r border-gray-200 dark:border-gray-700 space-y-1 bg-gray-50 dark:bg-gray-800 dark:text-white overflow-y-auto shadow my-3 p-3 rounded-md">
            <InputPanel />
          </div>

          {/* RIGHT: LANDING PAGE */}
          <LandingPage />
        </div>
      </div>
    </LandingPageProvider>
  );
}
