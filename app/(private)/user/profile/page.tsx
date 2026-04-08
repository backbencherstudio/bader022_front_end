"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Info, Lock } from "lucide-react";
import ProfileSection from "../../admin/components/settings/ProfileSection";
import ChangePasswordCard from "../../admin/components/settings/ChangePassword";
import { useI18n } from "@/components/provider/I18nProvider";

// Sidebar component with dynamic content handling
function Sidebar({ activeSection, setActiveSection, t }: any) {
  return (
    <div className="w-full sm:w-72 p-4 sm:block hidden">
      <ul className="flex flex-col gap-4">
        <li
          className={cn(
            "py-3 px-4 rounded-lg cursor-pointer text-sm font-semibold",
            activeSection === "personal_info"
              ? "bg-gray-300 text-black"
              : "text-muted-foreground hover:bg-muted/30",
          )}
          onClick={() => setActiveSection("personal_info")}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">
              <Info />
            </span>
            {t("Admin.AccountSettings.personalInfo", "Personal Info")}
          </div>
        </li>
        <li
          className={cn(
            "py-3 px-4 rounded-lg cursor-pointer text-sm font-semibold",
            activeSection === "password"
              ? "bg-gray-300 text-black"
              : "text-muted-foreground hover:bg-muted/30",
          )}
          onClick={() => setActiveSection("password")}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">
              <Lock />
            </span>
            {t("Admin.AccountSettings.password", "Password")}
          </div>
        </li>
      </ul>
    </div>
  );
}

// Mobile Sidebar (Hamburger menu)
function MobileSidebar({ activeSection, setActiveSection, t }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sm:hidden flex flex-col items-start gap-4 p-4 w-full">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="text-muted-foreground w-full"
      >
        {t("Admin.AccountSettings.menu", "Menu")}
      </Button>
      {isOpen && (
        <ul className="flex flex-col gap-4 mt-4">
          <li
            className={cn(
              "py-3 px-4 rounded-lg cursor-pointer text-sm font-semibold",
              activeSection === "personal_info"
                ? "bg-gray-300 text-black"
                : "text-muted-foreground hover:bg-muted/30",
            )}
            onClick={() => setActiveSection("personal_info")}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">
                <Info />
              </span>
              {t("Admin.AccountSettings.personalInfo", "Personal Info")}
            </div>
          </li>
          <li
            className={cn(
              "py-3 px-4 rounded-lg cursor-pointer text-sm font-semibold",
              activeSection === "password"
                ? "bg-gray-300 text-black"
                : "text-muted-foreground hover:bg-muted/30",
            )}
            onClick={() => setActiveSection("password")}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">
                <Lock />
              </span>
              {t("Admin.AccountSettings.password", "Password")}
            </div>
          </li>
        </ul>
      )}
    </div>
  );
}

// Dynamic content based on active section
function getActiveSectionContent(activeSection: string) {
  switch (activeSection) {
    case "personal_info":
      return (
        <div>
          <ProfileSection />
        </div>
      );
    case "password":
      return (
        <div>
          <ChangePasswordCard />
        </div>
      );
    case "personal_info":
    default:
      return <ProfileSection />;
  }
}

export default function AccountPage() {
  const [activeSection, setActiveSection] = useState("personal_info");
  const { t, locale } = useI18n();

  const isRTL = locale === "ar";

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="border rounded-xl mt-4">
      <h1 className="text-[18px] p-4 font-semibold">
        {" "}
        {t("Admin.AccountSettings.title")}
      </h1>
      <div className="flex flex-col sm:flex-row">
        <MobileSidebar
          setActiveSection={setActiveSection}
          activeSection={activeSection}
          t={t}
        />
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          t={t}
        />
        <div className="w-full max-w-4xl">
          {getActiveSectionContent(activeSection)}
        </div>
      </div>
    </div>
  );
}
