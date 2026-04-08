"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Building,
  Eye,
  EyeOff,
  KeyRound,
  Languages,
  ShieldQuestionMark,
  User,
} from "lucide-react";
import { MdNotifications } from "react-icons/md";
import BusinessSetting from "../components/settings/Bussiness";
import NotificationSettings from "../components/settings/Notifications";
import LanguageSettings from "../components/settings/Languages";
import SupportSettings from "../components/settings/Support";
import { useAppSelector } from "@/redux/hooks";
import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import MerchantTapkey from "../components/settings/MerchantTapkey";
import MerchantProfile from "../components/settings/MerchantProfile";
import { useI18n } from "@/components/provider/I18nProvider";

type PasswordFormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

// Sidebar component with dynamic content handling
function Sidebar({ activeSection, setActiveSection, t }: any) {
  const { locale } = useI18n();
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
            {/* Account */}
            {t("Admin.AccountSettings.personalInfo", "Personal Info")}
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
            {/* Business{" "} */}
            {locale === "ar" ? "الأعمال" : "Business"}
          </div>
        </li>
        {/* <li
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
        </li> */}
        {/* <li
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
        </li> */}
        {/* <li
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
        </li> */}
        {/* Tap-key */}
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

// Mobile Sidebar (Hamburger menu)
function MobileSidebar({ activeSection, setActiveSection, t }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useI18n();
  const isRTL = locale === "ar";

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
              activeSection === "account"
                ? "bg-gray-300 text-black"
                : "text-muted-foreground hover:bg-muted/30",
            )}
            onClick={() => setActiveSection("account")}
          >
            {/* Account */}
            {t("Admin.AccountSettings.personalInfo", "Personal Info")}
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
            {/* Business{" "} */}
            {locale === "ar" ? "الأعمال" : "Business"}
          </li>
          {/* <li
            className={cn(
              "py-3 px-4 rounded-lg cursor-pointer text-sm font-semibold",
              activeSection === "notifications"
                ? "bg-gray-300 text-black"
                : "text-muted-foreground hover:bg-muted/30",
            )}
            onClick={() => setActiveSection("notifications")}
          >
            Notifications
          </li> */}
          {/* <li
            className={cn(
              "py-3 px-4 rounded-lg cursor-pointer text-sm font-semibold",
              activeSection === "language"
                ? "bg-gray-300 text-black"
                : "text-muted-foreground hover:bg-muted/30",
            )}
            onClick={() => setActiveSection("language")}
          >
            Language
          </li> */}
          {/* <li
            className={cn(
              "py-3 px-4 rounded-lg cursor-pointer text-sm font-semibold",
              activeSection === "support"
                ? "bg-gray-300 text-black"
                : "text-muted-foreground hover:bg-muted/30",
            )}
            onClick={() => setActiveSection("support")}
          >
            Support
          </li> */}
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

// Information Form for Account
function AccountSettingsForm() {
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const form = useForm<PasswordFormData>();

  const onSubmit = async (data: PasswordFormData) => {
    try {
      await changePassword({
        id: user?.id,
        body: {
          current_password: data.oldPassword,
          new_password: data.newPassword,
          new_password_confirmation: data.confirmPassword,
        },
      }).unwrap();

      toast.success(t("ChangePassword.success"));
      form.reset();
    } catch (error: any) {
      toast.error(t("ChangePassword.error"));
    }
  };

  return (
    <div className="flex flex-col gap-8 p-6 w-full">
      {/* <Card className="border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold">Full Name *</label>
              <Input className="mt-2" placeholder={user?.name} />
            </div>
            <div>
              <label className="block text-sm font-semibold">
                Email Address *
              </label>
              <Input className="mt-2" placeholder={user?.email} />
            </div>
            <div>
              <label className="block text-sm font-semibold">
                Phone Number *
              </label>
              <Input className="mt-2" placeholder={user?.phone} />
            </div>
          </div>
        </CardContent>
      </Card> */}
      <MerchantProfile />

      {/* Change Password Section */}

      <Card className="rounded-xl p-8 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
        <h3 className="text-[18px] font-semibold mb-4">
          {t("ChangePassword.title")}
        </h3>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Old Password */}
          <div>
            <label className="text-[14px] font-medium">
              {t("ChangePassword.oldPassword")}
            </label>

            <div className="relative">
              <Input
                type={showOld ? "text" : "password"}
                placeholder={t("ChangePassword.oldPlaceholder")}
                {...form.register("oldPassword", {
                  required: t("ChangePassword.validation.oldRequired"),
                })}
                className="w-full py-5 mt-2"
              />

              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${
                  isRTL ? "left-4" : "right-4"
                }`}
              >
                {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {form.formState.errors.oldPassword && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.oldPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="text-[14px] font-medium">
              {t("ChangePassword.newPassword")}
            </label>

            <div className="relative">
              <Input
                type={showNew ? "text" : "password"}
                placeholder={t("ChangePassword.newPlaceholder")}
                {...form.register("newPassword", {
                  required: t("ChangePassword.validation.newRequired"),
                  minLength: {
                    value: 6,
                    message: t("ChangePassword.validation.min"),
                  },
                })}
                className="w-full py-5 mt-2"
              />

              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${
                  isRTL ? "left-4" : "right-4"
                }`}
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {form.formState.errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-[14px] font-medium">
              {t("ChangePassword.confirmPassword")}
            </label>

            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                placeholder={t("ChangePassword.confirmPlaceholder")}
                {...form.register("confirmPassword", {
                  required: t("ChangePassword.validation.confirmRequired"),
                  validate: (value) =>
                    value === form.getValues("newPassword") ||
                    t("ChangePassword.validation.match"),
                })}
                className="w-full py-5 mt-2"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${
                  isRTL ? "left-4" : "right-4"
                }`}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {form.formState.errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              className="cursor-pointer"
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? t("ChangePassword.changing")
                : t("ChangePassword.save")}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

// Dynamic content based on active section
function getActiveSectionContent(activeSection: string, t: any) {
  switch (activeSection) {
    case "business":
      return <BusinessSetting />;
    // case "notifications":
    //   return (
    //     <div>
    //       <NotificationSettings />
    //     </div>
    //   );
    // case "language":
    //   return <LanguageSettings />;
    case "support":
      return <SupportSettings />;
    case "tapkey":
      return <MerchantTapkey />;
    case "account":
    default:
      return <AccountSettingsForm />;
  }
}

export default function AccountPage() {
  const [activeSection, setActiveSection] = useState("account");
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";

  return (
    <div className="border rounded-xl mt-4">
      <h1 className="text-[18px] p-4 font-semibold">
        {/* {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Setting */}
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
          {getActiveSectionContent(activeSection, t)}
        </div>
      </div>
    </div>
  );
}
