"use client";

import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export type SidebarItem = {
  label: string;
  href: string;
  icon?: (props: ComponentProps<"svg">) => ReactNode;
  iconClassName?: string;
};

type Props = {
  navItems: SidebarItem[];
  footerItems?: SidebarItem[];
  logoSrc?: string;
  title?: string;
  badgeText?: string;

  pathname?: string | null; // optional override
};

function SidebarLink({
  item,
  pathname,
}: {
  item: SidebarItem;
  pathname: string | null;
}) {
  const active = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={[
        "group flex items-center gap-3 px-4 py-3 rounded-xl transition cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-white/30",
        active
          ? "bg-black text-white dark:bg-gray-800 dark:text-white"
          : "text-black dark:text-white hover:text-white hover:bg-black dark:hover:bg-gray-700",
      ].join(" ")}
      aria-current={active ? "page" : undefined}
    >
      {item.icon && (
        <span className="shrink-0">
          {item.icon({
            className: [
              "h-5 w-5 transition",
              item.iconClassName || "",
              active ? "opacity-100" : "opacity-90 group-hover:opacity-100",
            ].join(" "),
          })}
        </span>
      )}

      <span className="text-sm font-medium">{item.label}</span>
    </Link>
  );
}

function SidebarInner({
  navItems,
  footerItems,
  pathname,
  logoSrc,
  title,
  badgeText,
}: Props & { pathname: string | null }) {
  return (
    <>
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 gap-3 -mt-5 px-4 pb-5 border-b border-white/10 dark:border-[#555]">
        {logoSrc && (
          <>
            {" "}
            <Image
              src="/images/Logo_dark.png"
              alt="Logo"
              width={150}
              height={100}
              className="rounded dark:hidden mt-5"
              priority
            />
            <Image
              src="/images/Logo-White.png"
              alt="Logo"
              width={200}
              height={100}
              className="rounded hidden dark:block -ml-15"
              priority
            />
          </>
        )}

        {title && (
          <p className="text-[16px] -mt-10 text-[#4A4C56] dark:text-white font-medium">
            {title}
          </p>
        )}

        {badgeText && (
          <Button className="text-[11px] uppercase bg-black mt-1.5 text-white dark:bg-gray-700">
            {badgeText}
          </Button>
        )}
      </div>

      {/* Nav */}
      <nav className="p-4 pt-0 space-y-2">
        {navItems.map((item) => (
          <div key={item.href} className="mt-6">
            <SidebarLink item={item} pathname={pathname} />
          </div>
        ))}
      </nav>

      {/* Footer */}
      {footerItems?.length ? (
        <div className="mt-auto px-6 py-8 space-y-2">
          {footerItems.map((item) => (
            <div key={item.href} className="mt-6">
              <SidebarLink item={item} pathname={pathname} />
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default function AppSidebar(props: Props) {
  const currentPathname = usePathname();
  const pathname = props.pathname ?? currentPathname;

  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden overflow-auto dark:bg-gray-900">
        <Sheet>
          <SheetTrigger
            aria-label="Open menu"
            className="fixed left-3 top-5.5 z-50 inline-flex items-center justify-center rounded-md border border-[#E9E9E9] bg-white/70 backdrop-blur px-2.5 py-2 text-black/80 dark:bg-gray-600 dark:hover:bg-gray-500 cursor-pointer dark:text-white"
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="p-0 w-70 bg-foreground border-r border-[#E9E9E9] dark:border-[#555] overflow-auto"
          >
            <div className="bg-white dark:bg-gray-900 flex-col">
              <SidebarInner {...props} pathname={pathname} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop */}
      <aside className="hidden dark:bg-gray-900 lg:flex w-70 fixed min-h-screen overflow-auto border-r border-[#E9E9E9] dark:border-[#555] top-0 flex-col z-50">
        <SidebarInner {...props} pathname={pathname} />
      </aside>
    </>
  );
}
