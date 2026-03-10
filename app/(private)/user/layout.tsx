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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authorize } from "@/lib/auth";

const USER_NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/user/dashboard",
    icon: (p: any) => <LayoutDashboard {...p} />,
  },
  {
    label: "Bookings",
    href: "/user/bookings",
    icon: (p: any) => <Calendar {...p} />,
  },
  {
    label: "Payments",
    href: "/user/payments",
    icon: (p: any) => <CreditCard {...p} />,
  },
  {
    label: "Profile",
    href: "/user/profile",
    icon: (p: any) => <User {...p} />,
  },
];

export const USER_FOOTER_ITEMS = [
  {
    label: "Logout",
    href: "/",
    icon: (p: any) => <LogOut {...p} />,
    iconClassName: "text-red-400",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale } = useI18n();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      const auth = authorize(["User"]);
      if (!auth.authorized) {
        router.push("/");
      }
    }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <AppSidebar
        navItems={USER_NAV_ITEMS}
        footerItems={USER_FOOTER_ITEMS}
        logoSrc="/images/image 259.png"
        // title="Car wash"
        badgeText="premium"
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
  );
}