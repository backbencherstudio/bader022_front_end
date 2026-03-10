import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";

interface FooterData {
  branding_logo?: string;
  website_name?: string;
  footer_des?: string;
  turn_off?: boolean;
  contact_email?: string;
  country?: string;
  home_url?: string;
  home?: string;
  about?: string;
  why_choose_us?: string;
  service?: string;
  contact_info?: string;
  contact_us?: string;
  privacy_policy?: string;
  terms_condition?: string;
  contact_us_url?: string;
  terms_condition_url?: string;
  privacy_policy_url?: string;
}

interface MiniSiteFooterProps {
  data: {
    global_setting: FooterData;
  };
}

export default function MiniSiteFooter({ data }: MiniSiteFooterProps) {
  console.log(data.global_setting);

  return (
    <div>
      <footer
        style={
          {
            //   backgroundColor: footerData.footerBackground || undefined,
            //   color: footerData.footerTextColor || undefined,
            //   marginTop: layoutSettingsData.sectionSpacing,
          }
        }
        className="dark:bg-gray-900 transition-colors"
      >
        {/* Top Section */}
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={
                  //   data.global_setting.branding_logo ||
                  "/images/image 259.png"
                }
                alt={data.global_setting.website_name || ""}
                width={40}
                height={40}
              />
            </div>

            <p className="mt-4 text-sm leading-relaxed max-w-sm opacity-80">
              {data.global_setting.footer_des}
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <Link
                href={"item.url"}
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
                href={"item.url"}
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
                href={"item.url"}
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
                  {data.global_setting.home}
                </Link>
              </li>
              <li>
                <Link href={""} className="hover:text-orange-500 transition">
                  {data.global_setting.about}
                </Link>
              </li>
              <li>
                <Link href={""} className="hover:text-orange-500 transition">
                  {data.global_setting.why_choose_us}
                </Link>
              </li>
              <li>
                <Link href={""} className="hover:text-orange-500 transition">
                  {data.global_setting.service}
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
                  {data.global_setting.contact_us}
                </Link>
              </li>
              <li>
                <Link href={""} className="hover:text-orange-500 transition">
                  {data.global_setting.privacy_policy}
                </Link>
              </li>
              <li>
                <Link href={""} className="hover:text-orange-500 transition">
                  {data.global_setting.terms_condition}
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
                {data.global_setting.contact_info}
              </li>

              <li className="flex items-center gap-3">
                <IconCircle>
                  <FaEnvelope />
                </IconCircle>
                {data.global_setting.contact_email}
              </li>

              <li className="flex items-center gap-3">
                <IconCircle>
                  <FaMapMarkerAlt />
                </IconCircle>
                {data.global_setting.country}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="border-t border-black/10 dark:border-white/10 py-4 text-center text-sm opacity-70"
          //   style={{ color: footerData.footerTextColor || undefined }}
        >
          © {new Date().getFullYear()} {data.global_setting.website_name} | All
          Rights Reserved {data.global_setting.turn_off && "| Powered By Bokli"}
        </div>
      </footer>
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
