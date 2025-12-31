"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import en from "@/messages/en.json";
import ar from "@/messages/ar.json";

type Locale = "en" | "ar";
type Messages = typeof en;

const MESSAGE_MAP: Record<Locale, Messages> = { en, ar };

type I18nContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (path: string) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

function getValueByPath(obj: any, path: string) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const stored = localStorage.getItem("locale") as Locale | null;
    return (stored === "en" || stored === "ar") ? stored : "en";
  });

  useEffect(() => {
    localStorage.setItem("locale", locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const t = useMemo(() => {
    return (path: string) => {
      const value = getValueByPath(MESSAGE_MAP[locale], path);
      return typeof value === "string" ? value : path;
    };
  }, [locale]);

  function setLocale(l: Locale) {
    setLocaleState(l);
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
