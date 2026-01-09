"use client";
import AppSidebar from "../components/AppSidebar";
import TopBar from "../merchant/dashboard/components/shared/Topbar";
import {
  LayoutDashboard,
  LogOut,
  CreditCard,
  Calendar,
  User,
} from "lucide-react";

const USER_NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
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
    href: "/logout",
    icon: (p: any) => <LogOut {...p} />,
    iconClassName: "text-red-400",
  },
];
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <AppSidebar
          navItems={USER_NAV_ITEMS}
          footerItems={USER_FOOTER_ITEMS}
          logoSrc="/images/image 259.png"
          title="Car wash"
          badgeText="premium"
        />
        <TopBar />
        <div className="pl-0 lg:pl-70 pt-17">
          <div className="border-r min-h-[calc(100vh-70px)] p-4 md:p-5 lg:p-6 relative border-[#E9E9E9]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
