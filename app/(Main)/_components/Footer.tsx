/** @format */
"use client";
import Link from "next/link";
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-linear-to-br from-blue-50 via-white to-blue-200">
      <div className="container mx-auto px-4 py-16">
        {/* Top section */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-blue-600">B</span>
              <span className="text-xl font-semibold">Bokli</span>
            </div>

            <p className="mt-4 text-sm text-gray-600 max-w-xs">
              Smart booking management for modern service businesses.
            </p>

            <div className="mt-6 flex gap-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <div className="flex h-10 w-10 items-center justify-center rounded-full transition cursor-pointer bg-linear-to-r from-[#3CB3FF] to-[#7153FF] text-white">
                  <FaInstagram />
                </div>
              </Link>

              <Link
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <div className="flex h-10 w-10 items-center justify-center rounded-full transition cursor-pointer bg-white shadow text-gray-600 hover:bg-linear-to-r from-[#3CB3FF] to-[#7153FF] hover:text-white">
                  <FaXTwitter />
                </div>
              </Link>

              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <div className="flex h-10 w-10 items-center justify-center rounded-full transition cursor-pointer bg-white shadow text-gray-600 hover:bg-linear-to-r from-[#3CB3FF] to-[#7153FF] hover:text-white">
                  <FaYoutube />
                </div>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <FooterColumn title="Quick Links">
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/features">Features</FooterLink>
            <FooterLink href="/faq">FAQs</FooterLink>
            <FooterLink href="/pricing">Pricing</FooterLink>
            <FooterLink href="/contact">Contact us</FooterLink>
          </FooterColumn>

          {/* Areas Served */}
          <FooterColumn title="Areas served">
            <FooterText>Subscription Management System</FooterText>
            <FooterText>Booking Management System</FooterText>
            <FooterText>Nursery management system</FooterText>
            <FooterText>Car wash management system</FooterText>
            <FooterLink href="/terms">Terms & Conditions</FooterLink>
          </FooterColumn>

          {/* Contact */}
          <FooterColumn title="Contact us">
            <FooterText>
              Do you have questions about your order or a product of your
              choice?
            </FooterText>
            <FooterText className="mt-3 font-medium">
              +48 (0) 3165-83887
            </FooterText>
            <FooterText>Bokli@gmail.com</FooterText>
            <FooterText>23 Main Street, NY, USA</FooterText>
          </FooterColumn>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gray-200" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-gray-500 md:flex-row">
          <span>© {currentYear} Bokli. All Rights Reserved.</span>
          <Link href="/terms" className="hover:text-blue-600">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}

{
  /* Helper Components */
}

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
