"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Building, Languages, ShieldQuestionMark, User } from "lucide-react";
import { MdNotifications } from "react-icons/md";

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
      <ul>
        <li
          className={cn(
            "py-3 px-4 rounded-lg cursor-pointer text-sm font-semibold",
            activeSection === "account"
              ? "bg-gray-300 text-black"
              : "text-muted-foreground hover:bg-muted/30"
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
              : "text-muted-foreground hover:bg-muted/30"
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
              : "text-muted-foreground hover:bg-muted/30"
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
              : "text-muted-foreground hover:bg-muted/30"
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
              : "text-muted-foreground hover:bg-muted/30"
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
  setActiveSection,
}: {
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
        <ul className="flex flex-col gap-3 mt-4">
          <li
            className="py-3 text-sm text-muted-foreground font-semibold cursor-pointer"
            onClick={() => setActiveSection("account")}
          >
            Account
          </li>
          <li
            className="py-3 text-sm text-muted-foreground font-semibold cursor-pointer"
            onClick={() => setActiveSection("business")}
          >
            Business
          </li>
          <li
            className="py-3 text-sm text-muted-foreground font-semibold cursor-pointer"
            onClick={() => setActiveSection("notifications")}
          >
            Notifications
          </li>
          <li
            className="py-3 text-sm text-muted-foreground font-semibold cursor-pointer"
            onClick={() => setActiveSection("language")}
          >
            Language
          </li>
          <li
            className="py-3 text-sm text-muted-foreground font-semibold cursor-pointer"
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
      <Card>
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
      <Card>
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
        <Button className="bg-primary text-white">Save Change</Button>
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
          <h2 className="text-lg font-semibold">Business Settings</h2>
          <p>Configure your business details here.</p>
        </div>
      );
    case "notifications":
      return (
        <div>
          <h2 className="text-lg font-semibold">Notification Settings</h2>
          <p>Set up your notification preferences here.</p>
        </div>
      );
    case "language":
      return (
        <div>
          <h2 className="text-lg font-semibold">Language Settings</h2>
          <p>Choose your preferred language here.</p>
        </div>
      );
    case "support":
      return (
        <div>
          <h2 className="text-lg font-semibold">Support</h2>
          <p>Need help? Contact our support team here.</p>
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
    <div className="flex flex-col sm:flex-row gap-8 p-8">
      <MobileSidebar setActiveSection={setActiveSection} />
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="w-full max-w-4xl">
        {getActiveSectionContent(activeSection)}
      </div>
    </div>
  );
}
