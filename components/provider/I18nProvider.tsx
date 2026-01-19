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
type TranslateParams = Record<string, string | number>;

const MESSAGE_MAP: Record<Locale, Messages> = { en, ar };

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;

  /** Translate string values */
  t: (key: string, params?: TranslateParams) => string;

  /** Read non-string values (arrays / objects) */
  get: <T = unknown>(key: string) => T;
}

const I18nContext = createContext<I18nContextType | null>(null);

/* ------------------ Helpers ------------------ */

/** Safely read nested JSON values using dot notation */
function getValueByPath(obj: any, path: string) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

/** Replace {{param}} placeholders */
function interpolate(text: string, params?: TranslateParams) {
  if (!params) return text;

  return Object.entries(params).reduce((result, [key, value]) => {
    return result.replace(new RegExp(`{{\\s*${key}\\s*}}`, "g"), String(value));
  }, text);
}

/* ------------------ Provider ------------------ */

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  /** Load locale from localStorage */
  useEffect(() => {
    const stored = localStorage.getItem("locale") as Locale | null;
    if (stored === "en" || stored === "ar") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocaleState(stored);
    }
    setMounted(true);
  }, []);

  /** Persist locale & set HTML direction */
  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem("locale", locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale, mounted]);

  /** Translate strings */
  const t = useMemo(() => {
    return (key: string, params?: TranslateParams) => {
      const raw = getValueByPath(MESSAGE_MAP[locale], key);

      if (typeof raw !== "string") return key;

      return interpolate(raw, params);
    };
  }, [locale]);

  /** Read arrays / objects */
  const get = useMemo(() => {
    return <T = unknown,>(key: string): T => {
      return getValueByPath(MESSAGE_MAP[locale], key) as T;
    };
  }, [locale]);

  function setLocale(locale: Locale) {
    setLocaleState(locale);
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, get }}>
      {children}
    </I18nContext.Provider>
  );
}

/* ------------------ Hook ------------------ */

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
