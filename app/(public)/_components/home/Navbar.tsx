"use client";

import { useI18n } from "@/components/provider/I18nProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LANGS = {
  en: { label: "English", flag: "/images/english_flag.png" },
  ar: { label: "Arabic", flag: "/images/arabic_flag.png" },
};

export default function Navbar() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="container w-full mx-auto">
      <header className="px-4 md:px-6 py-5">
        <div
          className={`flex items-center justify-between ${
            locale === "en" ? "" : "flex-row-reverse"
          }`}
        >
          {/* Left Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/images/image 259.png"
              alt="Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </Link>

          {/* Center Nav */}
          <nav className="hidden md:flex items-center gap-8 text-[18px] font-medium text-slate-700">
            <Link href="/" className="hover:text-slate-900 transition">
              {t("Nav.home")}
            </Link>
            <Link href="/services" className="hover:text-slate-900 transition">
              {t("Nav.services")}
            </Link>
            <Link href="/faqs" className="hover:text-slate-900 transition">
              {t("Nav.faqs")}
            </Link>
            <Link href="/pricing" className="hover:text-slate-900 transition">
              {t("Nav.pricing")}
            </Link>
          </nav>

          {/* Right Buttons */}
          <div
            className={`flex items-center gap-4 ${
              locale === "en" ? "" : "flex-row-reverse"
            }`}
          >
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border px-3 py-1 text-[18px] text-slate-700 hover:bg-slate-100 transition cursor-pointer">
                  <Image
                    src={LANGS[locale].flag}
                    alt={`${LANGS[locale].label} flag`}
                    width={23}
                    height={23}
                    className="rounded-sm"
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
                      alt={`${LANGS[key].label} flag`}
                      width={23}
                      height={23}
                      className="rounded-sm"
                    />
                    <span>{LANGS[key].label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Start Free Button */}
            <Button className="rounded-md px-3 py-6 text-white font-semibold text-[16px] hover:opacity-90 cursor-pointer bg-linear-to-l from-[#6366F1] to-[#3B82F6]">
              {t("Nav.button")}{" "}
              <ArrowUpRight
                size={18}
                className={`font-semibold ${
                  locale === "ar" ? "rotate-270" : ""
                }`}
              />
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}
