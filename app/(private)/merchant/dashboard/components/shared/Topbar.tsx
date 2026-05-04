"use client";

import {
  Sun,
  Moon,
  BellDot,
  ChevronDown,
  Building2,
  User,
  CreditCard,
  LogOut,
  Check,
} from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useI18n } from "@/components/provider/I18nProvider";
import { getImageUrl } from "@/helper/formatImage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { logout, setCredentials } from "@/redux/features/auth/authSlice";
import { useAllBranchQuery } from "@/redux/features/merchant/branchApi";
import Link from "next/link";
import { baseApi } from "@/redux/api/baseApi";

const LANGS = {
  en: { label: "English", flag: "/images/english_flag.png" },
  ar: { label: "العربية", flag: "/images/arabic_flag.png" },
};

export default function TopBar() {
  const { user } = useAppSelector((state) => state.auth);
  const { setTheme } = useTheme();
  const { locale, setLocale, t } = useI18n();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const isRTL = locale === "ar";
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: branchData, isLoading } = useAllBranchQuery({});
  const [selectedBranch, setSelectedBranch] = useState<string>("Main Branch");

  // console.log(branchData);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(!isDarkMode ? "light" : "dark");
  };

  const handlelogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  const handleBranchSelect = (branch: any) => {
    // Update the UI label
    setSelectedBranch(branch.name);
    // console.log("Selected Branch ID:", branch.id);
    dispatch(
      setCredentials({
        branch: branch?.id,
      }),
    );
    dispatch(
      baseApi.util.invalidateTags([
        "Dashboard",
        "Bookings",
        "Analytics",
        "Services",
      ]),
    );
    router.refresh();

    // Tip: You can also dispatch an action here if you need
    // the branch ID globally in your Redux store
  };

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
        <button
          aria-label={t("Topbar.notifications")}
          className="p-2 sm:p-2.5 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <BellDot className="w-5 h-5 text-black dark:text-white" />
        </button>

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
        <Link
          href={"/"}
          // onClick={handlelogout}
          className="hidden md:block bg-[#262626] cursor-pointer text-white rounded-full py-2 px-4 hover:bg-[#1f1f1f] transition dark:bg-gray-700 hover:dark:bg-gray-600 text-sm"
        >
          {t("Topbar.visitWebsite")}
        </Link>

        {/* Profile Dropdown */}
        <DropdownMenu dir={isRTL ? "rtl" : "ltr"}>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full transition outline-none">
              <Image
                src={
                  getImageUrl(user?.image as string) || "/images/profile.png"
                }
                alt={user?.name || "User"}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
              />
              <div className="hidden md:block text-left">
                <p className="text-black dark:text-white font-semibold text-sm leading-none">
                  {user?.name}
                </p>
                <p className="text-gray-500 dark:text-gray-300 text-xs mt-1">
                  {user?.email}
                </p>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64 p-2">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* Sub-menu for Branch Selection */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex justify-between items-center py-2 cursor-pointer">
                {/* <div className="flex items-center gap-2">
                  <Building2 size={16} />
                  {selectedBranch == "Main Branch"
                    ? "Default Branch"
                    : selectedBranch}
                </div> */}
                <span className="text-[10px] bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded border ml-2">
                  {selectedBranch}
                </span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="w-48">
                  {isLoading ? (
                    <div className="p-2 text-xs text-center text-gray-400">
                      Loading branches...
                    </div>
                  ) : (
                    branchData?.data?.map((branch: any) => (
                      <DropdownMenuItem
                        key={branch.id}
                        onClick={() => handleBranchSelect(branch)}
                        className="flex justify-between items-center cursor-pointer"
                      >
                        {branch.name}
                        {/* Show checkmark if this branch is currently selected */}
                        {selectedBranch === branch.name && (
                          <Check size={14} className="text-green-500" />
                        )}
                      </DropdownMenuItem>
                    ))
                  )}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handlelogout}
              className="flex items-center gap-2 py-2 cursor-pointer text-red-500 focus:text-red-500"
            >
              <LogOut size={16} />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
