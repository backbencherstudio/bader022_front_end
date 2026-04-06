/* eslint-disable react-hooks/static-components */
"use client";

import { useI18n } from "@/components/provider/I18nProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/redux/hooks";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LANGS = {
  en: { label: "English", flag: "/images/english_flag.png" },
  ar: { label: "Arabic", flag: "/images/arabic_flag.png" },
};

export default function Navbar() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  // console.log(user);

  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");

  // Listen for hash changes to update the active state
  useEffect(() => {
    // Set initial hash
    setActiveHash(window.location.hash);

    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const NavLinks = ({ onClick }: { onClick?: () => void }) => {
    const links = [
      { name: t("Nav.home"), href: "/", hash: "" },
      { name: t("Nav.services"), href: "/#services", hash: "#services" },
      { name: t("Nav.faqs"), href: "/#faq-section", hash: "#faq-section" },
      { name: t("Nav.pricing"), href: "/pricing", hash: "" },
    ];

    return (
      <>
        {links.map((link) => {
          // 1. If it's a hash link, check if pathname matches AND hash matches
          // 2. If it's a regular page, check if pathname matches exactly
          const isHashLink = link.href.includes("#");
          const isActive = isHashLink
            ? pathname === "/" && activeHash === link.hash
            : pathname === link.href && activeHash === "";

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => {
                if (onClick) onClick();
                // Manually set hash for instant UI update on click
                if (isHashLink) setActiveHash(link.hash);
                else setActiveHash("");
              }}
              className={`
                px-4 py-2 rounded-lg transition-all duration-200
                hover:bg-slate-100 hover:text-indigo-600
                ${isActive ? "bg-slate-100 text-indigo-600" : "text-black"}
              `}
            >
              {link.name}
            </Link>
          );
        })}
      </>
    );
  };

  return (
    <div className=" mx-auto bg-white z-50 fixed  w-full ">
      <header className="px-4 md:px-6 py-5 container mx-auto  ">
        <div
          className={`flex items-center justify-between ${
            locale === "ar" ? "flex-row-reverse" : ""
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/image 259.png"
              alt="Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-[18px] font-semibold text-black">
            <NavLinks />
          </nav>

          {/* Right Side */}
          <div
            className={`flex items-center gap-3 ${
              locale === "ar" ? "flex-row-reverse" : ""
            }`}
          >
            {/* Language */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border px-3 py-1 text-[16px] text-slate-700 hover:bg-slate-100 cursor-pointer">
                  <Image
                    src={LANGS[locale].flag}
                    alt={LANGS[locale].label}
                    width={22}
                    height={22}
                  />
                  <span className="uppercase">{locale}</span>
                  <ChevronDown size={14} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-40">
                {(Object.keys(LANGS) as Array<"en" | "ar">).map((key) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => setLocale(key)}
                    className="cursor-pointer flex items-center gap-2"
                  >
                    <Image
                      src={LANGS[key].flag}
                      alt={LANGS[key].label}
                      width={22}
                      height={22}
                    />
                    <span>{LANGS[key].label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA (desktop only) */}

            {user?.role === "Merchant" ? (
              <Link
                href={"/merchant/dashboard"}
                className="hidden md:flex rounded-md px-3 py-3 bg-red-500 from-blue-500 to-indigo-500 text-white font-semibold text-[16px]"
              >
                {/* {t("Nav.button")}
                <ArrowUpRight
                  size={18}
                  className={locale === "ar" ? "rotate-270" : ""}
                /> */}
                Dashboard
              </Link>
            ) : (
              <Link
                href={"/login"}
                className="hidden md:flex rounded-md px-3 py-3 bg-linear-to-r from-blue-500 to-indigo-500 text-white font-semibold text-[16px]"
              >
                {t("Nav.button")}
                <ArrowUpRight
                  size={18}
                  className={locale === "ar" ? "rotate-270" : ""}
                />
              </Link>
            )}

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 text-black"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div
            className={`md:hidden absolute left-0 right-0 top-full z-50 bg-white border-t   shadow-md ${
              locale === "ar" ? "text-right" : "text-left"
            }`}
          >
            <nav className="flex flex-col gap-4 px-6 py-6 text-[18px] font-semibold text-black">
              <NavLinks onClick={() => setOpen(false)} />
              <Link href={"/login"}>
                <Button
                  onClick={() => setOpen(false)}
                  className="mt-4 w-full rounded-md py-4 bg-linear-to-r from-blue-500 to-indigo-500 text-white font-semibold flex items-center"
                >
                  {t("Nav.button")}
                  <ArrowUpRight
                    size={18}
                    className={locale === "ar" ? "rotate-270" : ""}
                  />
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
