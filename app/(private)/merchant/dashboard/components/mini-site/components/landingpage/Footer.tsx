"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { useLandingPage } from "../../context/LandingBuilderContext";

const SOCIAL_ICON_MAP: Record<string, React.ReactNode> = {
  facebook: <FaFacebookF />,
  twitter: <FaTwitter />,
  instagram: <FaInstagram />,
  linkedin: <FaLinkedinIn />,
  pinterest: <FaPinterestP />,
};

export default function Footer() {
  const { footerData, layoutSettingsData } = useLandingPage();

  return (
    <footer
      style={{
        backgroundColor: footerData.footerBackground || undefined,
        color: footerData.footerTextColor || undefined,
        marginTop: layoutSettingsData.sectionSpacing,
      }}
      className="dark:bg-gray-900 transition-colors"
    >
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <Image
              src={footerData.footerLogo || "/images/image 259.png"}
              alt={footerData.footerTitle}
              width={40}
              height={40}
            />
          </div>

          <p className="mt-4 text-sm leading-relaxed max-w-sm opacity-80">
            {footerData.footerSubTitle}
          </p>

          {/* Social Links */}
          <div className="flex gap-3 mt-6">
            {footerData.socialLinks?.map((item, index) => {
              if (!item.url) return null;

              const Icon = SOCIAL_ICON_MAP[item.icon];
              if (!Icon) return null;

              return (
                <Link
                  key={index}
                  href={item.url}
                  target="_blank"
                  className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800
                             flex items-center justify-center
                             hover:bg-orange-500 hover:text-white
                             transition"
                >
                  {Icon}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <FooterLinks title="Navigation" links={footerData.navigation} />

        {/* Support */}
        <FooterLinks title="Support" links={footerData.support} />

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <ul className="space-y-4 text-sm opacity-90">
            {footerData.contact?.phone && (
              <li className="flex items-center gap-3">
                <IconCircle>
                  <FaPhoneAlt />
                </IconCircle>
                {footerData.contact.phone}
              </li>
            )}
            {footerData.contact?.email && (
              <li className="flex items-center gap-3">
                <IconCircle>
                  <FaEnvelope />
                </IconCircle>
                {footerData.contact.email}
              </li>
            )}
            {footerData.contact?.address && (
              <li className="flex items-center gap-3">
                <IconCircle>
                  <FaMapMarkerAlt />
                </IconCircle>
                {footerData.contact.address}
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t border-black/10 dark:border-white/10 py-4 text-center text-sm opacity-70"
        style={{ color: footerData.footerTextColor || undefined }}
      >
        © {new Date().getFullYear()} {footerData.footerTitle} | All Rights
        Reserved {footerData.showPoweredBy && "| Powered By Bokli"}
      </div>
    </footer>
  );
}

/* ---------------------------------- */
/* Reusable Components                */
/* ---------------------------------- */

function FooterLinks({
  title,
  links = [],
}: {
  title: string;
  links?: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-semibold mb-4">{title}</h3>
      <ul className="space-y-3 text-sm opacity-90">
        {links.map((item, i) => (
          <li key={i}>
            <Link href={item.href} className="hover:text-orange-500 transition">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function IconCircle({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800
                    flex items-center justify-center opacity-80"
    >
      {children}
    </div>
  );
}
