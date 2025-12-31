// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { Star } from "lucide-react";

// type Testimonial = {
//   quote: string;
//   name: string;
//   title: string;
//   avatar: string; // public path
// };

// const testimonials: Testimonial[] = [
//   {
//     quote:
//       "“Bokli transformed our salon operations. Bookings are seamless, staff management is easy, and customers love our new mini-website experience!”",
//     name: "Al-Qahtani",
//     title: "CEO & Founder ExpressoSoft",
//     avatar: "/images/user1.png",
//   },
//   {
//     quote:
//       "“Since using Bokli, our appointment scheduling is effortless. Analytics help us improve services, and customers consistently return for bookings.”",
//     name: "Talal Al-Hujaili",
//     title: "CEO Sparkle",
//     avatar: "/images/user2.png",
//   },
//   {
//     quote:
//       "“Managing multiple branches was a challenge before Bokli. Now everything is centralized, simple, and our team is more productive than ever.”",
//     name: "Al-Harithii",
//     title: "Founder Softvance",
//     avatar: "/images/user3.png",
//   },
//   {
//     quote:
//       "“Bokli transformed our salon operations. Bookings are seamless, staff management is easy, and customers love our new mini-website experience!”",
//     name: "Al-Qahtani",
//     title: "CEO & Founder ExpressoSoft",
//     avatar: "/images/user1.png",
//   },
//   {
//     quote:
//       "“Since using Bokli, our appointment scheduling is effortless. Analytics help us improve services, and customers consistently return for bookings.”",
//     name: "Talal Al-Hujaili",
//     title: "CEO Sparkle",
//     avatar: "/images/user2.png",
//   },
//   {
//     quote:
//       "“Managing multiple branches was a challenge before Bokli. Now everything is centralized, simple, and our team is more productive than ever.”",
//     name: "Al-Harithii",
//     title: "Founder Softvance",
//     avatar: "/images/user3.png",
//   },
//   {
//     quote:
//       "“Bokli transformed our salon operations. Bookings are seamless, staff management is easy, and customers love our new mini-website experience!”",
//     name: "Al-Qahtani",
//     title: "CEO & Founder ExpressoSoft",
//     avatar: "/images/user1.png",
//   },
//   {
//     quote:
//       "“Since using Bokli, our appointment scheduling is effortless. Analytics help us improve services, and customers consistently return for bookings.”",
//     name: "Talal Al-Hujaili",
//     title: "CEO Sparkle",
//     avatar: "/images/user2.png",
//   },
//   {
//     quote:
//       "“Managing multiple branches was a challenge before Bokli. Now everything is centralized, simple, and our team is more productive than ever.”",
//     name: "Al-Harithii",
//     title: "Founder Softvance",
//     avatar: "/images/user3.png",
//   },
// ];

// // Helper: chunk into pages of n items
// function chunk<T>(arr: T[], size: number) {
//   const res: T[][] = [];
//   for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
//   return res;
// }

// export default function CustomerRecommended() {
//   const [perPage, setPerPage] = useState(3);
//   const [page, setPage] = useState(0);

//   // responsive per page
//   useEffect(() => {
//     const handle = () => {
//       const w = window.innerWidth;
//       if (w < 640) setPerPage(1);
//       else if (w < 1024) setPerPage(2);
//       else setPerPage(3);
//     };
//     handle();
//     window.addEventListener("resize", handle);
//     return () => window.removeEventListener("resize", handle);
//   }, []);

//   const pages = useMemo(() => chunk(testimonials, perPage), [perPage]);

//   // keep page in range when perPage changes
//   useEffect(() => {
//     setPage((p) => Math.min(p, Math.max(0, pages.length - 1)));
//   }, [pages.length]);

//   // Early return to prevent cascading renders
//   if (page >= pages.length && pages.length > 0) {
//     setPage(Math.max(0, pages.length - 1));
//   }

//   // auto slide
//   useEffect(() => {
//     const id = setInterval(() => {
//       setPage((p) => (p + 1) % pages.length);
//     }, 4500);
//     return () => clearInterval(id);
//   }, [pages.length]);

//   const direction = 1;

//   return (
//     <section className="w-full bg-white">
//       <div className="container mx-auto px-4 py-16 md:py-20">
//         {/* Title */}
//         <div className="mx-auto max-w-3xl text-center">
//           <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
//             Our Customers Recommend You
//           </h2>
//           <p className="mt-3 text-sm md:text-[13px] leading-relaxed text-slate-600">
//             Our users love Bokli for its simplicity, speed, and powerful
//             features that transform daily business operations completely.
//           </p>
//         </div>

//         {/* Slider */}
//         <div className="mt-10">
//           <div className="relative overflow-hidden">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={`${perPage}-${page}`}
//                 initial={{ x: 60 * direction, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 exit={{ x: -60 * direction, opacity: 0 }}
//                 transition={{ duration: 0.5, ease: "easeOut" }}
//                 className="grid gap-6"
//                 style={{
//                   gridTemplateColumns: `repeat(${perPage}, minmax(0, 1fr))`,
//                 }}
//               >
//                 {pages[page]?.map((t) => (
//                   <div
//                     key={t.name}
//                     className="rounded-xl bg-linear-to-br from-blue-50 via-white to-blue-200 px-6 py-8 md:py-10"
//                   >
//                     {/* stars */}
//                     <div className="flex items-center gap-1 text-blue-600">
//                       {Array.from({ length: 5 }).map((_, i) => (
//                         <Star key={i} className="h-5 w-5 fill-indigo-600" />
//                       ))}
//                     </div>

//                     {/* quote */}
//                     <p className="mt-4 text-[16px] leading-relaxed text-slate-700">
//                       {t.quote}
//                     </p>

//                     {/* person */}
//                     <div className="mt-6 flex items-center gap-3">
//                       <div className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-200">
//                         <Image
//                           src={t.avatar}
//                           alt={t.name}
//                           fill
//                           className="object-cover"
//                         />
//                       </div>
//                       <div>
//                         <p className="text-[20px] font-semibold text-slate-900">
//                           {t.name}
//                         </p>
//                         <p className="text-[11px] text-slate-500">{t.title}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Dots */}
//           <div className="mt-8 flex items-center justify-center gap-2">
//             {pages.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setPage(i)}
//                 className={[
//                   "h-2.5 w-2.5 rounded-full transition cursor-pointer",
//                   i === page ? "bg-indigo-500" : "bg-slate-300",
//                 ].join(" ")}
//                 aria-label={`Go to slide ${i + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";
import { useI18n } from "@/components/provider/I18nProvider";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
  avatar: string;
};

// Helper: chunk into pages of n items
function chunk<T>(arr: T[], size: number) {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
  return res;
}

export default function CustomerRecommended() {
  const { t, locale } = useI18n();

  const testimonials = useMemo(() => {
    const value = t("Testimonials.items");
    return Array.isArray(value) ? (value as Testimonial[]) : [];
  }, [t]);

  const [perPage, setPerPage] = useState(3);
  const [page, setPage] = useState(0);

  // responsive per page
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

  // keep page in range when pages change
  useEffect(() => {
    if (pages.length === 0) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage((p) => Math.min(p, pages.length - 1));
  }, [pages.length]);

  // auto slide
  useEffect(() => {
    if (pages.length <= 1) return;

    const id = setInterval(() => {
      setPage((p) => (p + 1) % pages.length);
    }, 4500);

    return () => clearInterval(id);
  }, [pages.length]);

  const direction = locale === "ar" ? -1 : 1;

  return (
    <section className="w-full bg-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Title */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            {t("Testimonials.title")}
          </h2>

          <p className="mt-3 text-sm md:text-[13px] leading-relaxed text-slate-600">
            {t("Testimonials.subtitle")}
          </p>
        </div>

        {/* Slider */}
        <div className="mt-10">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${perPage}-${page}`}
                initial={{ x: 60 * direction, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -60 * direction, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="grid gap-6"
                style={{
                  gridTemplateColumns: `repeat(${perPage}, minmax(0, 1fr))`,
                }}
              >
                {pages[page]?.map((item, idx) => (
                  <div
                    key={`${item.name}-${idx}`}
                    className={`rounded-xl bg-linear-to-br from-blue-50 via-white to-blue-200 px-6 py-8 md:py-10 ${
                      locale === "ar" ? "text-right" : ""
                    }`}
                  >
                    {/* stars */}
                    <div
                      className={`flex items-center gap-1 text-blue-600 ${
                        locale === "ar" ? "justify-end" : ""
                      }`}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-indigo-600" />
                      ))}
                    </div>

                    {/* quote */}
                    <p className="mt-4 text-[16px] leading-relaxed text-slate-700">
                      {item.quote}
                    </p>

                    {/* person */}
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
                        <p className="text-[20px] font-semibold text-slate-900">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          {pages.length > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={[
                    "h-2.5 w-2.5 rounded-full transition cursor-pointer",
                    i === page ? "bg-indigo-500" : "bg-slate-300",
                  ].join(" ")}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
