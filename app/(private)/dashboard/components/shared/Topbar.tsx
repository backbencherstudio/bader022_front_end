"use client";
import { Sun, Moon, Edit, BellDot } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";

export default function TopBar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="h-20 w-full fixed z-20 border-b border-[#E9E9E9] bg-white/10 backdrop-blur-md flex items-center justify-end px-4 pl-16.5 lg:pl-4">
      {/* Left Side */}
      <div className=" pl-10 hidden lg:block lg:pl-70 flex-1">
        <p className="text-xl font-semibold text-black">
          Welcome back, Carlota!
        </p>
        <p className="text-sm">
          Your booking page is live and ready to accept bookings
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle Icons */}
        <button
          className="p-2.5 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer transition"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {isDarkMode ? (
            <Sun className="w-5.5 h-5.5 text-black" />
          ) : (
            <Moon className="w-5.5 h-5.5 text-black" />
          )}
        </button>

        {/* Notification Icon */}
        <button
          className="p-2.5 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer transition"
          aria-label="Notifications"
        >
          <BellDot className="w-5.5 h-5.5 text-black" />
        </button>

        {/* Visit Website Button */}
        <button className="bg-[#262626] hidden sm:block text-white rounded-full py-2 px-4 hover:bg-[#1f1f1f] transition">
          Visit Website
        </button>
        {/* Profile Icon and User Name */}
        <Dialog>
          <DialogTrigger asChild>
            <button
              className="flex items-center cursor-pointer gap-2 p-3 rounded-full hover:bg-white/10 transition"
              aria-label="Profile"
            >
              <Image
                src={"/images/user1.png"}
                alt="User"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full"
              />
              <div className="text-left">
                <p className="text-black font-semibold">Carlota Monteiro</p>
                <p className="text-black text-[12px]">calota22@gmail.com</p>
              </div>
            </button>
          </DialogTrigger>

          {/* User Profile Dialog */}
          <DialogContent className="p-6 rounded-md w-100">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center mt-6">
                <h2> Carlota Monteiro</h2>
                <button className="bg-[#262626] text-[12px] block sm:hidden text-white rounded-full py-2 px-4 hover:bg-[#1f1f1f] transition">
                  Visit Website
                </button>
              </DialogTitle>
              <DialogDescription>
                You can edit your profile information or settings here.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <Image
                  src={"/images/user1.png"}
                  alt="User"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full"
                />

                <div className="text-left">
                  <p className="text-black font-semibold">Carlota Monteiro</p>
                  <p className="text-black text-[12px]">calota22@gmail.com</p>
                </div>
              </div>
              <div>
                <button className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
