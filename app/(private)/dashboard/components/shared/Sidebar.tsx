"use client";

import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  CalendarClock,
  PenSquare,
  Menu,
} from "lucide-react";
import logo from "@/public/Logo.png";

// shadcn
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type NavItem = {
  label: string;
  href: string;
  icon: (props: ComponentProps<"svg">) => ReactNode;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/user/dashboard",
    icon: (p) => <LayoutDashboard {...p} />,
  },
  {
    label: "Manage Booking",
    href: "/user/manage-booking",
    icon: (p) => <ClipboardList {...p} />,
  },
  {
    label: "Schedule Calendar",
    href: "/user/schedule-calender",
    icon: (p) => <CalendarClock {...p} />,
  },
  { label: "Blog", href: "/user/blog", icon: (p) => <PenSquare {...p} /> },
];

function SidebarInner({ pathname }: { pathname: string | null }) {
  return (
    <>
      {/* Header / Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <Image
          src={logo}
          alt="Logo"
          width={156}
          height={156}
          className="rounded-xl"
          priority
        />
      </div>

      {/* Nav */}
      <nav className="p-4 pt-0 space-y-2">
        {NAV_ITEMS.map((item) => {
          const active =
            pathname === item.href || pathname?.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "group flex items-center gap-3 px-4 py-3 rounded-xl transition",
                "focus:outline-none focus:ring-2 focus:ring-white/30",
                active
                  ? "bg-[#1141CB1A] text-[#1141CB]"
                  : "text-black/80 hover:text-[#1141CB] hover:bg-[#1141CB1A]",
              ].join(" ")}
              aria-current={active ? "page" : undefined}
            >
              <span className="shrink-0">
                {
                  item.icon({
                    className: [
                      "h-5 w-5 transition",
                      active
                        ? "opacity-100"
                        : "opacity-90 group-hover:opacity-100",
                    ].join(" "),
                  }) as ReactNode
                }
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto px-6 py-4 text-xs text-white/60 border-t border-white/10">
        © {new Date().getFullYear()} Your Brand
      </div>
    </>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile: Drawer trigger + drawer content */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger
            aria-label="Open menu"
            className="fixed left-4 top-4 z-50 inline-flex items-center justify-center rounded-md border border-[#E9E9E9] bg-white/70 backdrop-blur px-2.5 py-2 text-black/80"
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 w-[280px] bg-foreground border-r border-[#E9E9E9] overflow-hidden"
          >
            <div className="flex min-h-screen flex-col">
              <SidebarInner pathname={pathname} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: Original fixed sidebar (unchanged UI) */}
      <aside
        className="hidden lg:flex w-[280px] fixed min-h-screen bg-foreground border-r border-[#E9E9E9]
                    top-0 flex-col z-50"
      >
        <SidebarInner pathname={pathname} />
      </aside>
    </>
  );
}
