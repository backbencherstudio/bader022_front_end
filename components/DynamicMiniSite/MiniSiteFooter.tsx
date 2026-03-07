import Image from "next/image";
import Link from "next/link";
import React from "react";

interface FooterData {
  branding_logo?: string;
  website_name?: string;
  footer_des?: string;
  turn_off?: boolean;
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
                {/* {Icon} */}Icon
              </Link>
            </div>
          </div>

          {/* Navigation */}
          {/* <FooterLinks title="Navigation" links={footerData.navigation} /> */}

          {/* Support */}
          {/* <FooterLinks title="Support" links={footerData.support} /> */}

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-4 text-sm opacity-90">
              {/* {footerData.contact?.phone && (
                <li className="flex items-center gap-3">
                  <IconCircle>
                    <FaPhoneAlt />
                  </IconCircle>
                  {footerData.contact.phone}
                </li>
              )} */}
              {/* {footerData.contact?.email && (
                <li className="flex items-center gap-3">
                  <IconCircle>
                    <FaEnvelope />
                  </IconCircle>
                  {footerData.contact.email}
                </li>
              )} */}
              {/* {footerData.contact?.address && (
                <li className="flex items-center gap-3">
                  <IconCircle>
                    <FaMapMarkerAlt />
                  </IconCircle>
                  {footerData.contact.address}
                </li>
              )} */}
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
