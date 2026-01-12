"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, cubicBezier } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";
import { useI18n } from "@/components/provider/I18nProvider";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
  avatar: string;
};

function chunk<T>(arr: T[], size: number) {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
  return res;
}

/* ------------------ Scroll Card Variant ------------------ */
const cardVariant = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: cubicBezier(0.25, 0.1, 0.25, 1),
    },
  },
};

export default function CustomerRecommended() {
  const { t, locale } = useI18n();

  const testimonials = useMemo(() => {
    const value = t("Testimonials.items");
    return Array.isArray(value) ? (value as Testimonial[]) : [];
  }, [t]);

  const [perPage, setPerPage] = useState(3);
  const [page, setPage] = useState(0);

  /* ---------------- Responsive per page ---------------- */
  useEffect(() => {
    const handle = () => {
      const w = window.innerWidth;
      if (w < 640) setPerPage(1);
      else if (w < 1024) setPerPage(2);
      else setPerPage(3);
    };
    handle();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  const pages = useMemo(
    () => chunk(testimonials, perPage),
    [testimonials, perPage]
  );

  useEffect(() => {
    if (pages.length === 0) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage((p) => Math.min(p, pages.length - 1));
  }, [pages.length]);

  /* ---------------- Auto slide (slow) ---------------- */
  useEffect(() => {
    if (pages.length <= 1) return;

    const id = setInterval(() => {
      setPage((p) => (p + 1) % pages.length);
    }, 6000);

    return () => clearInterval(id);
  }, [pages.length]);

  return (
    <section className="w-full bg-white">
      <div className="container mx-auto px-4 py-16 md:py-20">
        {/* ---------------- Title ---------------- */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.7 }}
          transition={{
            duration: 0.9,
            ease: cubicBezier(0.25, 0.1, 0.25, 1),
          }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            {t("Testimonials.title")}
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {t("Testimonials.subtitle")}
          </p>
        </motion.div>

        {/* ---------------- Cards ---------------- */}
        <div className="mt-14 grid gap-6">
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: `repeat(${perPage}, minmax(0, 1fr))`,
            }}
          >
            {pages[page]?.map((item, idx) => (
              <motion.div
                key={`${item.name}-${idx}`}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: false,
                  amount: 0.6, // 🔥 trigger on scroll
                }}
                className={`rounded-xl bg-linear-to-br from-blue-50 via-white to-blue-200 px-6 py-8 md:py-10 ${
                  locale === "ar" ? "text-right" : ""
                }`}
              >
                {/* Stars */}
                <div
                  className={`flex items-center gap-1 text-blue-600 ${
                    locale === "ar" ? "justify-end" : ""
                  }`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-indigo-600" />
                  ))}
                </div>

                {/* Quote */}
                <p className="mt-4 text-[16px] leading-relaxed text-slate-700">
                  {item.quote}
                </p>

                {/* Person */}
                <div
                  className={`mt-6 flex items-center gap-3 ${
                    locale === "ar" ? "flex-row-reverse justify-end" : ""
                  }`}
                >
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-200">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-[18px] font-semibold text-slate-900">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-slate-500">{item.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ---------------- Dots ---------------- */}
        {pages.length > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={[
                  "h-2.5 w-2.5 rounded-full transition cursor-pointer",
                  i === page ? "bg-indigo-500" : "bg-slate-300",
                ].join(" ")}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
