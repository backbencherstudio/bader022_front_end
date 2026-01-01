// "use client";

// import type { ComponentProps, ReactNode } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   ClipboardList,
//   PenSquare,
//   Menu,
//   Handbag,
//   Users,
//   Globe,
// } from "lucide-react";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";

// type NavItem = {
//   label: string;
//   href: string;
//   icon: (props: ComponentProps<"svg">) => ReactNode;
// };

// const NAV_ITEMS: NavItem[] = [
//   {
//     label: "Dashboard",
//     href: "/dashboard",
//     icon: (p) => <LayoutDashboard {...p} />,
//   },
//   {
//     label: "Manage Booking",
//     href: "/manage-booking",
//     icon: (p) => <ClipboardList {...p} />,
//   },
//   {
//     label: "Services",
//     href: "/dashboard/services",
//     icon: (p) => <Handbag {...p} />,
//   },
//   {
//     label: "Staff",
//     href: "/dashboard/staff",
//     icon: (p) => <Users {...p} />,
//   },
//   {
//     label: "Mini-Site",
//     href: "/dashboard/mini-site",
//     icon: (p) => <Globe {...p} />,
//   },
// ];

// function SidebarInner({ pathname }: { pathname: string | null }) {
//   return (
//     <>
//       {/* Header / Logo */}
//       <div className="bg-white dark:bg-black gap-3 px-4 py-5 border-b border-white/10 dark:border-[#555]">
//         <Image
//           src={"/images/image 259.png"}
//           alt="Logo"
//           width={100}
//           height={100}
//           className="rounded-xl"
//           priority
//         />
//         <p className="text-[16px] mt-1.5 text-[#4A4C56] dark:text-white font-medium">
//           Car wash
//         </p>
//         <Button className="text-[11px] uppercase bg-black mt-1.5 text-white dark:bg-gray-700">
//           premium
//         </Button>
//       </div>

//       {/* Nav */}
//       <nav className="p-4 pt-0 space-y-2">
//         {NAV_ITEMS.map((item) => {
//           const active = pathname === item.href;

//           return (
//             <div>
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={[
//                   "group flex items-center gap-3 px-4 py-3 mt-6 rounded-xl transition",
//                   "focus:outline-none focus:ring-2 focus:ring-white/30",
//                   active
//                     ? "bg-black text-white dark:bg-gray-800 dark:text-white"
//                     : "text-black dark:text-white hover:text-white hover:bg-black dark:hover:bg-gray-700",
//                 ].join(" ")}
//                 aria-current={active ? "page" : undefined}
//               >
//                 <span className="shrink-0">
//                   {
//                     item.icon({
//                       className: [
//                         "h-5 w-5 transition",
//                         active
//                           ? "opacity-100"
//                           : "opacity-90 group-hover:opacity-100",
//                       ].join(" "),
//                     }) as ReactNode
//                   }
//                 </span>
//                 <span className="text-sm font-medium">{item.label}</span>
//               </Link>
//             </div>
//           );
//         })}
//       </nav>

//       {/* Footer */}
//       <div className="mt-auto px-6 py-4 text-xs text-white/60 border-t border-white/10 dark:border-[#555]">
//         © {new Date().getFullYear()} Your Brand
//       </div>
//     </>
//   );
// }

// export default function Sidebar() {
//   const pathname = usePathname();

//   return (
//     <>
//       {/* Mobile: Drawer trigger + drawer content */}
//       <div className="lg:hidden">
//         <Sheet>
//           <SheetTrigger
//             aria-label="Open menu"
//             className="fixed left-4 top-5.5 z-50 inline-flex items-center justify-center rounded-md border border-[#E9E9E9] bg-white/70 backdrop-blur px-2.5 py-2 text-black/80 dark:bg-gray-600 dark:hover:bg-gray-500 cursor-pointer dark:text-white"
//           >
//             <Menu className="h-5 w-5" />
//           </SheetTrigger>
//           <SheetContent
//             side="left"
//             className="p-0 w-70 bg-foreground border-r border-[#E9E9E9] dark:border-[#555] overflow-hidden"
//           >
//             <div className="flex min-h-screen bg-white dark:bg-black flex-col">
//               <SidebarInner pathname={pathname} />
//             </div>
//           </SheetContent>
//         </Sheet>
//       </div>

//       {/* Desktop: Original fixed sidebar (unchanged UI) */}
//       <aside className="hidden lg:flex w-70 fixed min-h-screen border-r border-[#E9E9E9] dark:border-[#555] top-0 flex-col z-50">
//         <SidebarInner pathname={pathname} />
//       </aside>
//     </>
//   );
// }

"use client";

import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  PenSquare,
  Menu,
  Handbag,
  Users,
  Globe,
  Settings,
  LogOut,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type NavItem = {
  label: string;
  href: string;
  icon: (props: ComponentProps<"svg">) => ReactNode;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (p) => <LayoutDashboard {...p} />,
  },
  {
    label: "Manage Booking",
    href: "/manage-booking",
    icon: (p) => <ClipboardList {...p} />,
  },
  {
    label: "Services",
    href: "/dashboard/services",
    icon: (p) => <Handbag {...p} />,
  },
  {
    label: "Staff",
    href: "/dashboard/staff",
    icon: (p) => <Users {...p} />,
  },
  {
    label: "Mini-Site",
    href: "/dashboard/mini-site",
    icon: (p) => <Globe {...p} />,
  },
];

function SidebarInner({ pathname }: { pathname: string | null }) {
  return (
    <>
      {/* Header / Logo */}
      <div className="bg-white dark:bg-black gap-3 px-4 py-5 border-b border-white/10 dark:border-[#555]">
        <Image
          src={"/images/image 259.png"}
          alt="Logo"
          width={100}
          height={100}
          className="rounded-xl"
          priority
        />
        <p className="text-[16px] mt-1.5 text-[#4A4C56] dark:text-white font-medium">
          Car wash
        </p>
        <Button className="text-[11px] uppercase bg-black mt-1.5 text-white dark:bg-gray-700">
          premium
        </Button>
      </div>

      {/* Nav */}
      <nav className="p-4 pt-0 space-y-2">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;

          return (
            <div key={item.href}>
              <Link
                href={item.href}
                className={[
                  "group flex items-center gap-3 px-4 py-3 mt-6 rounded-xl transition",
                  "focus:outline-none focus:ring-2 focus:ring-white/30",
                  active
                    ? "bg-black text-white dark:bg-gray-800 dark:text-white"
                    : "text-black dark:text-white hover:text-white hover:bg-black dark:hover:bg-gray-700",
                ].join(" ")}
                aria-current={active ? "page" : undefined}
              >
                <span className="shrink-0">
                  {item.icon({
                    className: [
                      "h-5 w-5 transition",
                      active
                        ? "opacity-100"
                        : "opacity-90 group-hover:opacity-100",
                    ].join(" "),
                  })}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Footer with Settings & Logout */}
      <div className="mt-auto px-6 py-4 space-y-2">
        <Link
          href="/settings"
          className="group flex items-center gap-3 px-4 py-3 rounded-xl transition text-black dark:text-white hover:text-white hover:bg-black dark:hover:bg-gray-700"
        >
          <Settings className="h-5 w-5" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
        <Link
          href="/logout"
          className="group flex items-center gap-3 px-4 py-3 rounded-xl transition text-black dark:text-white hover:text-white hover:bg-black dark:hover:bg-gray-700"
        >
          <LogOut className="h-5 w-5 text-red-700" />
          <span className="text-sm font-medium">Logout</span>
        </Link>
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
            className="fixed left-4 top-5.5 z-50 inline-flex items-center justify-center rounded-md border border-[#E9E9E9] bg-white/70 backdrop-blur px-2.5 py-2 text-black/80 dark:bg-gray-600 dark:hover:bg-gray-500 cursor-pointer dark:text-white"
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 w-70 bg-foreground border-r border-[#E9E9E9] dark:border-[#555] overflow-hidden"
          >
            <div className="flex min-h-screen bg-white dark:bg-black flex-col">
              <SidebarInner pathname={pathname} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: Original fixed sidebar (unchanged UI) */}
      <aside className="hidden lg:flex w-70 fixed min-h-screen border-r border-[#E9E9E9] dark:border-[#555] top-0 flex-col z-50">
        <SidebarInner pathname={pathname} />
      </aside>
    </>
  );
}
