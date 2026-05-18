"use client";

import { useI18n } from "@/components/provider/I18nProvider";
import AppSidebar from "../components/AppSidebar";
import TopBar from "../merchant/dashboard/components/shared/Topbar";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  SquareKanban,
  ShoppingCart,
  CreditCard,
  Crown,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale, t } = useI18n();

  // NAV ITEMS (translated)
  const navItems = [
    {
      label: t("Admin.Sidebar.dashboard"),
      href: "/admin/dashboard",
      icon: (p: any) => <LayoutDashboard {...p} />,
    },
    {
      label: t("Admin.Sidebar.merchants"),
      href: "/admin/merchants",
      icon: (p: any) => <ShoppingCart {...p} />,
    },
    {
      label: t("Admin.Sidebar.payments"),
      href: "/admin/payments",
      icon: (p: any) => <CreditCard {...p} />,
    },
    {
      label: t("Admin.Sidebar.subscriptions"),
      href: "/admin/subscriptions",
      icon: (p: any) => <Crown {...p} />,
    },
    {
      label: t("Admin.Sidebar.analytics"),
      href: "/admin/analytics",
      icon: (p: any) => <SquareKanban {...p} />,
    },
  ];

  // FOOTER ITEMS
  const footerItems = [
    {
      label: t("Admin.Sidebar.settings"),
      href: "/admin/settings",
      icon: (p: any) => <Settings {...p} />,
    },
    {
      label: t("Admin.Sidebar.logout"),
      href: "/",
      icon: (p: any) => <LogOut {...p} />,
      iconClassName: "text-red-400",
      action: "logout",
    },
  ];
  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"}>
      <div>
        {" "}
        <AppSidebar
          navItems={navItems}
          footerItems={footerItems as any}
          logoSrc="/images/image 259.png"
        />
      </div>

      <TopBar />

      <div className={`pt-17 ${locale === "ar" ? "lg:pr-70" : "lg:pl-70"}`}>
        <div className="min-h-[calc(100vh-70px)] p-4 md:p-5 lg:p-6 border-[#E9E9E9] border-r dark:bg-gray-900">
          {children}
        </div>
      </div>
    </div>
  );
}
