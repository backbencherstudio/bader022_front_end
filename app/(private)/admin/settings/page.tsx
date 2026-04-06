"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Info, Lock, KeyRound } from "lucide-react";
import { useI18n } from "@/components/provider/I18nProvider";

import ProfileSection from "../components/settings/ProfileSection";
import ChangePasswordCard from "../components/settings/ChangePassword";
import Tapkey from "../components/settings/Tap-key";

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
            <Info size={18} />
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
            <Lock size={18} />
            {t("Admin.AccountSettings.password", "Password")}
          </div>
        </li>

        <li
          className={cn(
            "py-3 px-4 rounded-lg cursor-pointer text-sm font-semibold",
            activeSection === "tapkey"
              ? "bg-gray-300 text-black"
              : "text-muted-foreground hover:bg-muted/30",
          )}
          onClick={() => setActiveSection("tapkey")}
        >
          <div className="flex items-center gap-2">
            <KeyRound size={18} />
            {t("Admin.AccountSettings.tapKey", "Tap-key")}
          </div>
        </li>
      </ul>
    </div>
  );
}

function MobileSidebar({ activeSection, setActiveSection, t }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sm:hidden flex flex-col items-start gap-4 p-4 w-full">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full"
      >
        {t("Admin.AccountSettings.menu", "Menu")}
      </Button>

      {isOpen && (
        <ul className="flex flex-col gap-4 mt-4 w-full">
          <li
            className={cn(
              "py-3 px-4 rounded-lg cursor-pointer text-sm font-semibold",
              activeSection === "personal_info"
                ? "bg-gray-300 text-black"
                : "text-muted-foreground hover:bg-muted/30",
            )}
            onClick={() => {
              setActiveSection("personal_info");
              setIsOpen(false);
            }}
          >
            <Info size={18} className="inline mr-2" />
            {t("Admin.AccountSettings.personalInfo", "Personal Info")}
          </li>

          <li
            className={cn(
              "py-3 px-4 rounded-lg cursor-pointer text-sm font-semibold",
              activeSection === "password"
                ? "bg-gray-300 text-black"
                : "text-muted-foreground hover:bg-muted/30",
            )}
            onClick={() => {
              setActiveSection("password");
              setIsOpen(false);
            }}
          >
            <Lock size={18} className="inline mr-2" />
            {t("Admin.AccountSettings.password", "Password")}
          </li>

          <li
            className={cn(
              "py-3 px-4 rounded-lg cursor-pointer text-sm font-semibold",
              activeSection === "tapkey"
                ? "bg-gray-300 text-black"
                : "text-muted-foreground hover:bg-muted/30",
            )}
            onClick={() => {
              setActiveSection("tapkey");
              setIsOpen(false);
            }}
          >
            <KeyRound size={18} className="inline mr-2" />
            {t("Admin.AccountSettings.tapKey", "Tap-key")}
          </li>
        </ul>
      )}
    </div>
  );
}

function getActiveSectionContent(activeSection: string) {
  switch (activeSection) {
    case "personal_info":
      return <ProfileSection />;
    case "password":
      return <ChangePasswordCard />;
    case "tapkey":
      return <Tapkey />;
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
      {/* TITLE */}
      <h1 className="text-[18px] p-4 font-semibold">
        {t("Admin.AccountSettings.title")}
      </h1>

      <div className="flex flex-col sm:flex-row">
        <MobileSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
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
