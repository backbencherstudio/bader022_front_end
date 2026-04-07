"use client";

import { useI18n } from "@/components/provider/I18nProvider";
import Link from "next/link";
import {
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa6";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, locale } = useI18n();

  const isRTL = locale === "ar";

  return (
    <motion.footer
      className="bg-linear-to-br from-blue-50 via-white to-blue-200"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-16">
        {/* Top section */}
        <div
          className={`grid gap-10 md:grid-cols-4 ${isRTL ? "text-right" : ""}`}
        >
          {/* Brand */}
          <div>
            <div
              className={`flex items-center gap-2 ${
                isRTL ? "flex-row-reverse justify-end" : ""
              }`}
            >
              <span className="text-3xl font-bold text-blue-600">B</span>
              <span className="text-xl font-semibold text-black">Bokli</span>
            </div>

            <p className="mt-4 text-sm text-gray-600 max-w-xs">
              {t("Footer.brandDesc")}
            </p>

            {/* <div className={`mt-6 flex gap-4 ${isRTL ? "justify-end" : ""}`}>
              <Link href="https://instagram.com" target="_blank">
                <div className="flex h-10 w-10 items-center justify-center rounded-full cursor-pointer bg-linear-to-r from-[#3CB3FF] to-[#7153FF] text-white">
                  <FaInstagram />
                </div>
              </Link>

              <Link href="https://x.com" target="_blank">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow text-gray-600 hover:bg-linear-to-r from-[#3CB3FF] to-[#7153FF] hover:text-white transition">
                  <FaXTwitter />
                </div>
              </Link>

              <Link href="https://youtube.com" target="_blank">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow text-gray-600 hover:bg-linear-to-r from-[#3CB3FF] to-[#7153FF] hover:text-white transition">
                  <FaYoutube />
                </div>
              </Link>
            </div> */}
            <div className={`mt-6 flex gap-4 ${isRTL ? "justify-end" : ""}`}>
              {/* LinkedIn */}
              <Link href="https://linkedin.com" target="_blank">
                <div className="flex h-10 w-10 items-center justify-center rounded-full cursor-pointer bg-linear-to-r from-[#3CB3FF] to-[#7153FF] text-white">
                  <FaLinkedinIn />
                </div>
              </Link>
              {/* Facebook */}
              <Link href="https://facebook.com" target="_blank">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow text-gray-600 hover:bg-blue-600 hover:text-white transition">
                  <FaFacebookF />
                </div>
              </Link>
              {/* Instagram */}
              <Link href="https://instagram.com" target="_blank">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow text-gray-600 hover:bg-linear-to-r from-[#3CB3FF] to-[#7153FF] hover:text-white transition">
                  <FaInstagram />
                </div>
              </Link>

              {/* X (Twitter) */}
              <Link href="https://x.com" target="_blank">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow text-gray-600 hover:bg-linear-to-r from-[#3CB3FF] to-[#7153FF] hover:text-white transition">
                  <FaXTwitter />
                </div>
              </Link>

              {/* YouTube */}
              <Link href="https://youtube.com" target="_blank">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow text-gray-600 hover:bg-linear-to-r from-[#3CB3FF] to-[#7153FF] hover:text-white transition">
                  <FaYoutube />
                </div>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <FooterColumn title={t("Footer.quickLinks.title")}>
            <FooterLink href="/">{t("Footer.quickLinks.home")}</FooterLink>
            <FooterLink href="/#services">
              {t("Footer.quickLinks.services")}
            </FooterLink>
            <FooterLink href="/#faq-section">
              {t("Footer.quickLinks.faqs")}
            </FooterLink>
            <FooterLink href="/pricing">
              {t("Footer.quickLinks.pricing")}
            </FooterLink>
            <FooterLink href="/privacy-policy">
              {t("Footer.quickLinks.privacy")}
            </FooterLink>
          </FooterColumn>

          {/* Areas Served */}
          <FooterColumn title={t("Footer.areasServed.title")}>
            <FooterText>{t("Footer.areasServed.one")}</FooterText>
            <FooterText>{t("Footer.areasServed.two")}</FooterText>
            <FooterText>{t("Footer.areasServed.three")}</FooterText>
            <FooterText>{t("Footer.areasServed.four")}</FooterText>
            <FooterLink href="/terms">
              {t("Footer.areasServed.terms")}
            </FooterLink>
          </FooterColumn>

          {/* Contact */}
          <FooterColumn title={t("Footer.contact.title")}>
            <FooterText>{t("Footer.contact.desc")}</FooterText>
            {/* <FooterText className="mt-3 font-medium">
              {t("Footer.contact.phone")}
            </FooterText>
            <FooterText>{t("Footer.contact.email")}</FooterText> */}
            <FooterText>{t("Footer.contact.address")}</FooterText>
          </FooterColumn>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gray-200" />

        {/* Bottom bar */}
        <div
          className={`flex flex-col items-center justify-between gap-4 text-gray-500 md:flex-row ${
            isRTL ? "md:flex-row-reverse" : ""
          }`}
        >
          <span>
            © {currentYear} Bokli. {t("Footer.copyright")}
          </span>

          <Link href="/terms" className="hover:text-blue-600 transition">
            {t("Footer.terms")}
          </Link>
        </div>
      </div>
    </motion.footer>
  );
}

/* Helper Components */

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-4 text-xl font-bold text-[#111927]">{title}</h4>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="text-[#111927] hover:text-blue-600 transition">
      {children}
    </Link>
  );
}

function FooterText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`text-[#111927] ${className}`}>{children}</p>;
}
