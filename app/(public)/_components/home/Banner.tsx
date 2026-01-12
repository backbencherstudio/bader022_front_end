// "use client";

// import { cubicBezier, motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { ArrowUpRight } from "lucide-react";
// import Image from "next/image";
// import Navbar from "./Navbar";
// import { useI18n } from "@/components/provider/I18nProvider";

// /* ------------------ Animation Variants ------------------ */

// const containerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const itemVariants = {
//   hidden: {
//     opacity: 0,
//     y: 20,
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.5,
//       ease: cubicBezier(0.0, 0.0, 0.2, 1),
//     },
//   },
// };

// const imageVariants = {
//   hidden: {
//     opacity: 0,
//     y: 32,
//     scale: 0.98,
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.7,
//       ease: cubicBezier(0.0, 0.0, 0.2, 1),
//     },
//   },
// };

// export default function Banner() {
//   const { t, locale } = useI18n();

//   return (
//     <section className="relative container">
//       <Navbar />

//       {/* Text Content */}
//       <motion.div
//         className="relative z-10 container mx-auto px-4 py-16 md:py-20"
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: false, amount: 0.35 }}
//       >
//         <div className="mx-auto text-center">
//           <motion.h1
//             variants={itemVariants}
//             className="text-[28px] leading-tight md:text-[44px] xl:text-[60px] md:leading-[1.2] font-bold text-slate-900"
//           >
//             {t("Banner.titleLine1")} <br className="hidden md:block" />
//             {t("Banner.titleLine2")}
//           </motion.h1>

//           <motion.p
//             variants={itemVariants}
//             className="mt-4 text-[16px] md:text-[18px] leading-relaxed text-black"
//           >
//             {t("Banner.subtitleLine1")}
//             <br />
//             <span>{t("Banner.subtitleLine2")}</span>
//           </motion.p>

//           <motion.div
//             variants={itemVariants}
//             className="mt-6 flex flex-wrap items-center justify-center gap-3"
//           >
//             <Button className="h-12 rounded-md px-4 text-[16px] font-semibold text-white cursor-pointer bg-linear-to-l from-indigo-500 to-blue-500 hover:opacity-90">
//               {t("Banner.primaryBtn")}
//               <ArrowUpRight
//                 size={18}
//                 className={`ml-1 font-semibold ${
//                   locale === "ar" ? "rotate-270" : ""
//                 }`}
//               />
//             </Button>

//             <Button
//               variant="outline"
//               className="h-12 rounded-md text-[16px] px-4 font-semibold text-slate-700 border-indigo-400 bg-white! hover:text-black backdrop-blur hover:bg-white cursor-pointer"
//             >
//               {t("Banner.secondaryBtn")}
//               <ArrowUpRight
//                 size={18}
//                 className={`ml-1 font-semibold ${
//                   locale === "ar" ? "rotate-270" : ""
//                 }`}
//               />
//             </Button>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Hero Image */}
//       <motion.div
//         className="mt-10"
//         variants={imageVariants}
//         initial="visible"
//         whileInView="visible"
//         viewport={{ once: false, amount: 0.3 }}
//       >
//         <Image
//           src="/images/dashboard.png"
//           alt="Dashboard preview"
//           width={1600}
//           height={1000}
//           className="object-contain"
//           priority
//         />
//       </motion.div>
//     </section>
//   );
// }

"use client";

import { cubicBezier, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Navbar from "./Navbar";
import { useI18n } from "@/components/provider/I18nProvider";

/* ------------------ Variants ------------------ */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: cubicBezier(0, 0, 0.2, 1),
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: cubicBezier(0, 0, 0.2, 1),
    },
  },
};

export default function Banner() {
  const { t, locale } = useI18n();

  return (
    <section className="relative container mx-auto">
      <Navbar />

      {/* TEXT is the trigger */}
      <motion.div
        className="relative z-10 px-4 pt-16 md:pt-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.35, // trigger when TEXT is visible
        }}
      >
        <div className="mx-auto text-center">
          <motion.h1
            variants={itemVariants}
            className="text-[28px] md:text-[44px] xl:text-[60px] font-bold text-slate-900"
          >
            {t("Banner.titleLine1")}
            <br className="hidden md:block" />
            {t("Banner.titleLine2")}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 text-[16px] md:text-[18px] text-black"
          >
            {t("Banner.subtitleLine1")}
            <br />
            {t("Banner.subtitleLine2")}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex justify-center gap-3"
          >
            <Button className="h-12 px-4 bg-gradient-to-l from-indigo-500 to-blue-500 text-white">
              {t("Banner.primaryBtn")}
              <ArrowUpRight
                size={18}
                className={`ml-1 ${locale === "ar" ? "rotate-270" : ""}`}
              />
            </Button>

            <Button variant="outline" className="h-12 px-4">
              {t("Banner.secondaryBtn")}
              <ArrowUpRight
                size={18}
                className={`ml-1 ${locale === "ar" ? "rotate-270" : ""}`}
              />
            </Button>
          </motion.div>
        </div>

        {/* Image still participates in stagger, but does NOT trigger it */}
        <motion.div variants={imageVariants} className="mt-10 mx-auto pb-10">
          <Image
            src="/images/dashboard.png"
            alt="Dashboard preview"
            width={1600}
            height={1000}
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
