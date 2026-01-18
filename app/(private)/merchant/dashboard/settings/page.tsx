"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Building, Languages, ShieldQuestionMark, User } from "lucide-react";
import { MdNotifications } from "react-icons/md";
import BusinessSetting from "../components/settings/Bussiness";
import NotificationSettings from "../components/settings/Notifications";
import LanguageSettings from "../components/settings/Languages";
import SupportSettings from "../components/settings/Support";

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
            activeSection === "account"
              ? "bg-gray-300 text-black"
              : "text-muted-foreground hover:bg-muted/30",
          )}
          onClick={() => setActiveSection("account")}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">
              <User />
            </span>
            Account
          </div>
        </li>
        <li
          className={cn(
            "py-3 px-4 rounded-lg cursor-pointer text-sm font-semibold",
            activeSection === "business"
              ? "bg-gray-300 text-black"
              : "text-muted-foreground hover:bg-muted/30",
          )}
          onClick={() => setActiveSection("business")}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">
              <Building />
            </span>
            Business
          </div>
        </li>
        <li
          className={cn(
            "py-3 px-4 rounded-lg cursor-pointer text-sm font-semibold",
            activeSection === "notifications"
              ? "bg-gray-300 text-black"
              : "text-muted-foreground hover:bg-muted/30",
          )}
          onClick={() => setActiveSection("notifications")}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">
              <MdNotifications size={24} />
            </span>
            Notifications
          </div>
        </li>
        <li
          className={cn(
            "py-3 px-4 rounded-lg cursor-pointer text-sm font-semibold",
            activeSection === "language"
              ? "bg-gray-300 text-black"
              : "text-muted-foreground hover:bg-muted/30",
          )}
          onClick={() => setActiveSection("language")}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">
              <Languages />
            </span>
            Language
          </div>
        </li>
        <li
          className={cn(
            "py-3 px-4 rounded-lg cursor-pointer text-sm font-semibold",
            activeSection === "support"
              ? "bg-gray-300 text-black"
              : "text-muted-foreground hover:bg-muted/30",
          )}
          onClick={() => setActiveSection("support")}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">
              <ShieldQuestionMark />
            </span>
            Support
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
              activeSection === "account"
                ? "bg-gray-300 text-black"
                : "text-muted-foreground hover:bg-muted/30",
            )}
            onClick={() => setActiveSection("account")}
          >
            Account
          </li>
          <li
            className={cn(
              "py-3 px-4 rounded-lg cursor-pointer text-sm font-semibold",
              activeSection === "business"
                ? "bg-gray-300 text-black"
                : "text-muted-foreground hover:bg-muted/30",
            )}
            onClick={() => setActiveSection("business")}
          >
            Business
          </li>
          <li
            className={cn(
              "py-3 px-4 rounded-lg cursor-pointer text-sm font-semibold",
              activeSection === "notifications"
                ? "bg-gray-300 text-black"
                : "text-muted-foreground hover:bg-muted/30",
            )}
            onClick={() => setActiveSection("notifications")}
          >
            Notifications
          </li>
          <li
            className={cn(
              "py-3 px-4 rounded-lg cursor-pointer text-sm font-semibold",
              activeSection === "language"
                ? "bg-gray-300 text-black"
                : "text-muted-foreground hover:bg-muted/30",
            )}
            onClick={() => setActiveSection("language")}
          >
            Language
          </li>
          <li
            className={cn(
              "py-3 px-4 rounded-lg cursor-pointer text-sm font-semibold",
              activeSection === "support"
                ? "bg-gray-300 text-black"
                : "text-muted-foreground hover:bg-muted/30",
            )}
            onClick={() => setActiveSection("support")}
          >
            Support
          </li>
        </ul>
      )}
    </div>
  );
}

// Information Form for Account
function AccountSettingsForm() {
  return (
    <div className="flex flex-col gap-8 p-6 w-full">
      <Card className="border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold">Full Name *</label>
              <Input className="mt-2" placeholder="Enter full name" />
            </div>
            <div>
              <label className="block text-sm font-semibold">
                Email Address *
              </label>
              <Input className="mt-2" placeholder="john.doe@example.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold">
                Phone Number *
              </label>
              <Input className="mt-2" placeholder="Enter phone number" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Change Password Section */}
      <Card className="border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold">
                Current Password *
              </label>
              <Input
                className="mt-2"
                placeholder="Enter current password"
                type="password"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">
                New Password *
              </label>
              <Input
                className="mt-2"
                placeholder="Enter new password"
                type="password"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">
                Confirm New Password *
              </label>
              <Input
                className="mt-2"
                placeholder="Confirm new password"
                type="password"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Change Button */}
      <div className="flex justify-end">
        <Button className="cursor-pointer">Save Change</Button>
      </div>
    </div>
  );
}

// Dynamic content based on active section
function getActiveSectionContent(activeSection: string) {
  switch (activeSection) {
    case "business":
      return (
        <div>
          <BusinessSetting />
        </div>
      );
    case "notifications":
      return (
        <div>
          <NotificationSettings />
        </div>
      );
    case "language":
      return (
        <div>
          <LanguageSettings />
        </div>
      );
    case "support":
      return (
        <div>
          <SupportSettings />
        </div>
      );
    case "account":
    default:
      return <AccountSettingsForm />;
  }
}

export default function AccountPage() {
  const [activeSection, setActiveSection] = useState("account");

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
