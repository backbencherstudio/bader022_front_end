"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Building,
  Info,
  Languages,
  Lock,
  ShieldQuestionMark,
  User,
} from "lucide-react";
import { MdNotifications } from "react-icons/md";
import BusinessSetting from "../../merchant/dashboard/components/settings/Bussiness";
import NotificationSettings from "../../merchant/dashboard/components/settings/Notifications";
import LanguageSettings from "../../merchant/dashboard/components/settings/Languages";
import SupportSettings from "../../merchant/dashboard/components/settings/Support";
import ProfileSection from "../components/settings/ProfileSection";
import ChangePasswordCard from "../components/settings/ChangePassword";
// import BusinessSetting from "../components/sea

// Sidebar component with dynamic content handling
function Sidebar({
  activeSection,
  setActiveSection,
}: {
  activeSection: string;
  setActiveSection: (section: string) => void;
}) {
  return (
    <div className="w-full sm:w-72 p-4 sm:block hidden">
      <ul className="flex flex-col gap-4">
        <li
          className={cn(
            "py-3 px-4 rounded-lg cursor-pointer text-sm font-semibold",
            activeSection === "personal_info"
              ? "bg-gray-300 text-black"
              : "text-muted-foreground hover:bg-muted/30"
          )}
          onClick={() => setActiveSection("personal_info")}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">
              <Info />
            </span>
            Personal Info
          </div>
        </li>
        <li
          className={cn(
            "py-3 px-4 rounded-lg cursor-pointer text-sm font-semibold",
            activeSection === "password"
              ? "bg-gray-300 text-black"
              : "text-muted-foreground hover:bg-muted/30"
          )}
          onClick={() => setActiveSection("password")}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">
              <Lock />
            </span>
            Password
          </div>
        </li>
      </ul>
    </div>
  );
}

// Mobile Sidebar (Hamburger menu)
function MobileSidebar({
  activeSection,
  setActiveSection,
}: {
  activeSection: string;
  setActiveSection: (section: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sm:hidden flex flex-col items-start gap-4 p-4 w-full">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="text-muted-foreground w-full"
      >
        Menu
      </Button>
      {isOpen && (
        <ul className="flex flex-col gap-4 mt-4">
          <li
            className={cn(
              "py-3 px-4 rounded-lg cursor-pointer text-sm font-semibold",
              activeSection === "personal_info"
                ? "bg-gray-300 text-black"
                : "text-muted-foreground hover:bg-muted/30"
            )}
            onClick={() => setActiveSection("personal_info")}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">
                <Info />
              </span>
              Personal Info
            </div>
          </li>
          <li
            className={cn(
              "py-3 px-4 rounded-lg cursor-pointer text-sm font-semibold",
              activeSection === "password"
                ? "bg-gray-300 text-black"
                : "text-muted-foreground hover:bg-muted/30"
            )}
            onClick={() => setActiveSection("password")}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">
                <Lock />
              </span>
              Password
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

  return (
    <div className="border rounded-xl mt-4">
      <h1 className="text-[18px] p-4 font-semibold">
        {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Setting
      </h1>
      <div className="flex flex-col sm:flex-row">
        <MobileSidebar
          setActiveSection={setActiveSection}
          activeSection={activeSection}
        />
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <div className="w-full max-w-4xl">
          {getActiveSectionContent(activeSection)}
        </div>
      </div>
    </div>
  );
}
