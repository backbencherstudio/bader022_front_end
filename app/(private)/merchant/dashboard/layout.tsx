"use client";

import { useI18n } from "@/components/provider/I18nProvider";
import AppSidebar from "../../components/AppSidebar";
import TopBar from "./components/shared/Topbar";
import {
  LayoutDashboard,
  Handbag,
  Users,
  Globe,
  Settings,
  LogOut,
  SquareKanban,
  Captions,
  Calendar,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authorize } from "@/lib/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t, locale } = useI18n();
  // console.log(t);
  const router = useRouter();

  // NAV ITEMS (translated)
  const navItems = [
    {
      label: t("Merchant.Sidebar.dashboard"),
      href: "/merchant/dashboard",
      icon: (p: any) => <LayoutDashboard {...p} />,
    },
    {
      label: t("Merchant.Sidebar.bookings"),
      href: "/merchant/dashboard/bookings",
      icon: (p: any) => <Calendar {...p} />,
    },
    {
      label: t("Merchant.Sidebar.services"),
      href: "/merchant/dashboard/services",
      icon: (p: any) => <Handbag {...p} />,
    },
    {
      label: t("Merchant.Sidebar.staff"),
      href: "/merchant/dashboard/staff",
      icon: (p: any) => <Users {...p} />,
    },
    {
      label: t("Merchant.Sidebar.mini-site"),
      href: "/merchant/dashboard/mini-site",
      icon: (p: any) => <Globe {...p} />,
    },
    {
      label: t("Merchant.Sidebar.analytics"),
      href: "/merchant/dashboard/analytics",
      icon: (p: any) => <SquareKanban {...p} />,
    },
    {
      label: t("Merchant.Sidebar.transactions"),
      href: "/merchant/dashboard/transactions",
      icon: (p: any) => <Captions {...p} />,
    },
  ];

  // FOOTER ITEMS
  const footerItems = [
    {
      label: t("Merchant.Sidebar.settings"),
      href: "/merchant/dashboard/settings",
      icon: (p: any) => <Settings {...p} />,
    },
    {
      label: t("Merchant.Sidebar.logout"),
      href: "/",
      icon: (p: any) => <LogOut {...p} />,
      iconClassName: "text-red-400",
      action: "logout",
    },
  ];

  // useEffect(() => {
  //   const auth = authorize(["Merchant"]);
  //   if (!auth.authorized) {
  //     router.push("/");
  //   }
  // }, []);
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
