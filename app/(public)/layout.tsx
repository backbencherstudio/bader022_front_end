/** @format */
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "./_components/Footer";
import Navbar from "./_components/home/Navbar";
import { authorize } from "@/lib/auth";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    const auth = authorize(["User", "Merchant", "Admin"]);

    if (auth.authorized) {
      const role = auth.user?.role;

      const roleRedirectMap: Record<string, string> = {
        Admin: "/admin/dashboard",
        Merchant: "/merchant/dashboard",
        User: "/user/dashboard",
      };

      router.push(roleRedirectMap[role] || "/");
    }
  }, []);
  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content */}
      <Navbar />
      <main className="flex-1 mt-20 md:mt-20 overflow-hidden">{children}</main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
