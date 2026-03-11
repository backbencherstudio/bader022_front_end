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
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
import { useEffect } from "react";
import { authorize } from "@/lib/auth";
>>>>>>> 2a5d0b605647fb2b26c7f39e8e0dec65bda817d6

const MERCHANT_NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: (p: any) => <LayoutDashboard {...p} />,
  },
  {
    label: "Merchants",
    href: "/admin/merchants",
    icon: (p: any) => <ShoppingCart {...p} />,
  },
  {
    label: "Payments",
    href: "/admin/payments",
    icon: (p: any) => <CreditCard {...p} />,
  },
  {
    label: "Subscriptions",
    href: "/admin/subscriptions",
    icon: (p: any) => <Crown {...p} />,
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: (p: any) => <SquareKanban {...p} />,
  },
];

export const MERCHANT_FOOTER_ITEMS = [
  {
    label: "Settings",
    href: "/admin/settings",
    icon: (p: any) => <Settings {...p} />,
  },
  {
    label: "Logout",
    href: "/",
    icon: (p: any) => <LogOut {...p} />,
    iconClassName: "text-red-400",
    action: "logout",
  },
];
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale } = useI18n();
<<<<<<< HEAD

  const router = useRouter();
  const [loading, setLoading] = useState(true);

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

=======
  const router = useRouter();
  useEffect(() => {
    const auth = authorize(["Admin"]);
    if (!auth.authorized) {
      router.push("/login");
    }
  }, []);
>>>>>>> 2a5d0b605647fb2b26c7f39e8e0dec65bda817d6
  return (
    <div>
      <div>
        <AppSidebar
          navItems={MERCHANT_NAV_ITEMS}
          footerItems={MERCHANT_FOOTER_ITEMS as any}
          logoSrc="/images/image 259.png"
          // title="Car wash"
          // badgeText="premium"
        />
        <TopBar />
        <div
          className={`pl-0 pt-17 ${locale === "ar" ? "lg:pr-70" : "lg:pl-70"}`}
        >
          <div className="border-r min-h-[calc(100vh-70px)] p-4 md:p-5 lg:p-6 relative border-[#E9E9E9] dark:bg-gray-900 ">
            <Toaster className="top-0 items-center" />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
