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
import { getImageUrl } from "@/helper/formatImage";

export default function Footer() {
  const { footerData, layoutSettingsData } = useLandingPage();

  // console.log(footerData.footerLogo);

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
              src={footerData.footerLogo}
              alt={footerData.footerTitle}
              width={40}
              height={40}
              unoptimized
            />
          </div>

          <p className="mt-4 text-sm leading-relaxed max-w-sm opacity-80">
            {footerData.footerSubTitle}
          </p>
          {/* Social Links */}
          <div className="flex gap-3 mt-6">
            <Link
              href={`${footerData.facebookUrl}`}
              target="_blank"
              className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800
                             flex items-center justify-center
                             hover:bg-orange-500 hover:text-white
                             transition"
            >
              {/* {Icon} */}
              <FaFacebookF />
            </Link>
            <Link
              href={`${footerData.instagramUrl}`}
              target="_blank"
              className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800
                             flex items-center justify-center
                             hover:bg-orange-500 hover:text-white
                             transition"
            >
              {/* {Icon} */}
              <FaInstagram />
            </Link>
            <Link
              href={`${footerData.twitterUrl}`}
              target="_blank"
              className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800
                             flex items-center justify-center
                             hover:bg-orange-500 hover:text-white
                             transition"
            >
              {/* {Icon} */}
              <FaTwitter />
            </Link>
          </div>
        </div>

        {/* Navigation */}
        {/* <FooterLinks title="Navigation" links={footerData.navigation} /> */}
        <div>
          <h3 className="font-semibold mb-4">Navigation</h3>
          <ul className="space-y-3 text-sm opacity-90">
            <li>
              <Link href={""} className="hover:text-orange-500 transition">
                {footerData.home}
              </Link>
            </li>
            <li>
              <Link href={""} className="hover:text-orange-500 transition">
                {footerData.about}
              </Link>
            </li>
            <li>
              <Link href={""} className="hover:text-orange-500 transition">
                {footerData.why_choose_us}
              </Link>
            </li>
            <li>
              <Link href={""} className="hover:text-orange-500 transition">
                {footerData.service}
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        {/* <FooterLinks title="Support" links={footerData.support} /> */}
        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-3 text-sm opacity-90">
            <li>
              <Link href={""} className="hover:text-orange-500 transition">
                {footerData.contact_us}
              </Link>
            </li>
            <li>
              <Link href={""} className="hover:text-orange-500 transition">
                {footerData.privacy_policy}
              </Link>
            </li>
            <li>
              <Link href={""} className="hover:text-orange-500 transition">
                {footerData.terms_condition}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <ul className="space-y-4 text-sm opacity-90">
            <li className="flex items-center gap-3">
              <IconCircle>
                <FaPhoneAlt />
              </IconCircle>
              {footerData.contact_info}
            </li>

            <li className="flex items-center gap-3">
              <IconCircle>
                <FaEnvelope />
              </IconCircle>
              {footerData.contact_email}
            </li>

            <li className="flex items-center gap-3">
              <IconCircle>
                <FaMapMarkerAlt />
              </IconCircle>
              {footerData.address}
            </li>
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
