"use client";

import { useI18n } from "@/components/provider/I18nProvider";
import AppSidebar from "../components/AppSidebar";
import TopBar from "../merchant/dashboard/components/shared/Topbar";
import {
  LayoutDashboard,
  LogOut,
  CreditCard,
  Calendar,
  User,
} from "lucide-react";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale, t } = useI18n();
  const navItems = [
    {
      label: t("User.Sidebar.dashboard"),
      href: "/user/dashboard",
      icon: (p: any) => <LayoutDashboard {...p} />,
    },
    {
      label: t("User.Sidebar.bookings"),
      href: "/user/bookings",
      icon: (p: any) => <Calendar {...p} />,
    },
    {
      label: t("User.Sidebar.payments"),
      href: "/user/payments",
      icon: (p: any) => <CreditCard {...p} />,
    },
    {
      label: t("User.Sidebar.profile"),
      href: "/user/profile",
      icon: (p: any) => <User {...p} />,
    },
  ];

  // FOOTER ITEMS
  const footerItems = [
    {
      label: t("User.Sidebar.logout"),
      href: "/user-login",
      icon: (p: any) => <LogOut {...p} />,
      iconClassName: "text-red-400",
      action: "logout",
    },
  ];
  return (
    <div>
      <div>
        <AppSidebar
          navItems={navItems}
          footerItems={footerItems as any}
          logoSrc="/images/image 259.png"
        />
        <TopBar />
        <div
          className={`pl-0 pt-17 ${locale === "ar" ? "lg:pr-70" : "lg:pl-70"}`}
        >
          <div className="border-r min-h-[calc(100vh-70px)] p-4 md:p-5 lg:p-6 relative border-[#E9E9E9] dark:bg-gray-900">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
