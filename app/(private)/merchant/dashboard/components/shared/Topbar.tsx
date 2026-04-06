"use client";

import { Sun, Moon, BellDot, ChevronDown } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useI18n } from "@/components/provider/I18nProvider";
import { getImageUrl } from "@/helper/formatImage";
import { useAppSelector } from "@/redux/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LANGS = {
  en: { label: "English", flag: "/images/english_flag.png" },
  ar: { label: "العربية", flag: "/images/arabic_flag.png" },
};

export default function TopBar() {
  const { user } = useAppSelector((state) => state.auth);
  const { setTheme } = useTheme();
  const { locale, setLocale, t } = useI18n();

  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(!isDarkMode ? "light" : "dark");
  };

  const isRTL = locale === "ar";

  return (
    <header
      dir={isRTL ? "rtl" : "ltr"}
      className={`h-20 w-full fixed z-20 border-b border-[#E9E9E9] dark:border-[#555] 
      bg-white/10 dark:bg-gray-900 backdrop-blur-md flex items-center
      justify-between px-20 ${isRTL ? "lg:pr-80" : "lg:pl-80"}`}
    >
      {/* LEFT (Welcome) */}
      <div className="hidden lg:block flex-1">
        <p className="text-lg xl:text-xl font-semibold text-black dark:text-white">
          {t("Topbar.welcome", { name: user?.name || "User" })}
        </p>
        <p className="text-xs sm:text-sm text-black dark:text-gray-300">
          {t("Topbar.subtitle")}
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label={t("Topbar.toggleTheme")}
          className="p-2 sm:p-2.5 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {isDarkMode ? (
            <Moon className="w-5 h-5 text-black dark:text-white" />
          ) : (
            <Sun className="w-5 h-5 text-black dark:text-white" />
          )}
        </button>

        {/* Notifications */}
        {/* <button
          aria-label={t("Topbar.notifications")}
          className="p-2 sm:p-2.5 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <BellDot className="w-5 h-5 text-black dark:text-white" />
        </button> */}

        {/* Language Switch */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full border px-2 sm:px-3 py-1 text-sm text-slate-700 hover:bg-slate-100 dark:text-white">
              <Image
                src={LANGS[locale].flag}
                alt={LANGS[locale].label}
                width={20}
                height={20}
              />
              <span className="uppercase hidden sm:block">{locale}</span>
              <ChevronDown size={14} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40">
            {(Object.keys(LANGS) as Array<"en" | "ar">).map((key) => (
              <DropdownMenuItem
                key={key}
                onClick={() => setLocale(key)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Image
                  src={LANGS[key].flag}
                  alt={LANGS[key].label}
                  width={20}
                  height={20}
                />
                <span>{LANGS[key].label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Visit Website */}
        <button className="hidden md:block bg-[#262626] text-white rounded-full py-2 px-4 hover:bg-[#1f1f1f] transition dark:bg-gray-700 hover:dark:bg-gray-600 text-sm">
          {t("Topbar.visitWebsite")}
        </button>

        {/* Profile */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 rounded-full transition">
              <Image
                src={
                  getImageUrl(user?.image as string) || "/images/profile.png"
                }
                alt={user?.name || "User"}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />

              {/* Hide on mobile */}
              <div className="hidden md:block text-left">
                <p className="text-black dark:text-white font-semibold text-sm">
                  {user?.name}
                </p>
                <p className="text-gray-500 dark:text-gray-300 text-xs">
                  {user?.email}
                </p>
              </div>
            </button>
          </DialogTrigger>
        </Dialog>
      </div>
    </header>
  );
}
