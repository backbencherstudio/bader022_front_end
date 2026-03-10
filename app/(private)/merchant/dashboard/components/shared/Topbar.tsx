"use client";

import { Sun, Moon, Edit, BellDot } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useI18n } from "@/components/provider/I18nProvider";
import { useGetPersonaltHistoryQuery } from "@/redux/features/admin/adminApi";
import { getImageUrl } from "@/helper/formatImage";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

export default function TopBar() {
  // const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_API_URL;

  // const { data, isLoading, refetch } = useGetPersonaltHistoryQuery({});
  const { user } = useAppSelector((state) => state.auth);
  // console.log(user);

  const [isDarkMode, setIsDarkMode] = useState(true);
  const { setTheme } = useTheme();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(!isDarkMode ? "light" : "dark");
  };
  const { t, locale } = useI18n();
  return (
    <header className="h-20 w-full fixed z-20 border-b border-[#E9E9E9] dark:border-[#555] bg-white/10 dark:bg-gray-900 backdrop-blur-md flex items-center justify-end px-4 pl-16.5 lg:pl-4">
      {/* Left Side */}
      <div
        className={`pl-10 hidden lg:block flex-1 ${locale === "ar" ? "lg:pr-70" : "lg:pl-70"}`}
      >
        <p className="text-xl font-semibold mb-1 text-black dark:text-white">
          Welcome back, Carlota!
        </p>
        <p className="text-sm text-black dark:text-gray-300">
          Your booking page is live and ready to accept bookings
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Toggle Icons */}
        <button
          className="p-2.5 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer transition"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {isDarkMode ? (
            <Moon className="w-5.5 h-5.5 text-black dark:text-white" />
          ) : (
            <Sun className="w-5.5 h-5.5 text-black dark:text-white" />
          )}
        </button>

        {/* Notification Icon */}
        <button
          className="p-2.5 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer transition"
          aria-label="Notifications"
        >
          <BellDot className="w-5.5 h-5.5 text-black dark:text-white" />
        </button>

        {/* Visit Website Button */}
        <button className="bg-[#262626] hidden sm:block text-white rounded-full py-2 px-4 hover:bg-[#1f1f1f] transition cursor-pointer dark:bg-gray-700 hover:dark:bg-gray-600">
          Visit Website
        </button>

        {/* Profile Icon and User Name */}
        <Dialog>
          <DialogTrigger asChild>
            <button
              className="flex items-center cursor-pointer gap-2 p-3, pl-0 pr-3 rounded-full transition "
              aria-label="Profile"
            >
              <Image
                src={getImageUrl(user?.name) || "/images/user1.png"}
                alt={user?.name || "User"}
                width={48}
                height={48}
                unoptimized={true}
                className="w-12 h-12 rounded-full object-cover"
              />
              {/* <div className="text-left sm:block hidden">
                <p className="text-black dark:text-white font-semibold">
                  {user?.name}
                </p>
                <p className="text-black dark:text-gray-300 text-[12px]">
                  {user?.email}
                </p>
              </div> */}
            </button>
          </DialogTrigger>

          {/* User Profile Dialog */}
          <DialogContent className="p-6 rounded-md w-100 bg-white dark:bg-[#444]">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center mt-6">
                <h2 className="text-black dark:text-white"> {user?.name}</h2>
                <button className="text-[14px] block sm:hidden text-white rounded-full py-2 px-4 cursor-pointer transition underline">
                  Visit Website
                </button>
              </DialogTitle>
              <DialogDescription className="text-black dark:text-gray-300">
                You can edit your profile information or settings here.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <Image
                  src={getImageUrl(user?.name) || "/images/user1.png"}
                  alt="User"
                  width={48}
                  height={48}
                  unoptimized={true}
                  className="w-12 h-12 rounded-full"
                />
                <div className="text-left">
                  <p className="text-black dark:text-white font-semibold">
                    {user?.name}
                  </p>
                  <p className="text-black dark:text-gray-300 text-[12px]">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div>
                <Link
                  href={"/merchant/dashboard/settings"}
                  className="flex items-center gap-2 text-blue-500 dark:text-blue-300 cursor-pointer"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Link>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
