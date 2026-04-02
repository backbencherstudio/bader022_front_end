import { I18nProvider } from "@/components/provider/I18nProvider";
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import StoreProvider from "@/redux/storeProviders";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "bokli",
  description:
    "Select the right plan designed to support your growth, streamline bookings, and unlock advanced features when needed.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="scroll-smooth" lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<div>Loading</div>}>
          <StoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <I18nProvider>
                <Toaster position="top-center" />
                {children}
              </I18nProvider>
            </ThemeProvider>
          </StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
