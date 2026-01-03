import React from "react";
import { LandingPageProvider } from "../components/mini-site/context/LandingBuilderContext";
import LandingPage from "../components/mini-site/components/LandingPage";
import InputPanel from "../components/mini-site/components/InputPanel";

export default function page() {
  return (
    <LandingPageProvider>
      <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] h-screen dark:bg-gray-900 ">
        {/* ================= LEFT: INPUT PANEL ================= */}
        <div className="border-r space-y-1 bg-gray-50 dark:bg-gray-800 dark:text-white overflow-y-auto shadow m-2 p-3">
          <InputPanel />
        </div>
        {/* ================= RIGHT: LANDING PAGE ================= */}
        <LandingPage />
      </div>
    </LandingPageProvider>
  );
}
