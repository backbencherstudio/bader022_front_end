import LandingPage from "@/app/(private)/merchant/dashboard/components/mini-site/components/LandingPage";
import { LandingPageProvider } from "@/app/(private)/merchant/dashboard/components/mini-site/context/LandingBuilderContext";
import React from "react";

export default function DynamicMiniSitePage() {
  return (
    <div>
      <LandingPageProvider>
        <LandingPage />
      </LandingPageProvider>
    </div>
  );
}
