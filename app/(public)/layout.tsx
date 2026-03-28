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
    const auth = authorize(["User"]);
    if (auth.authorized) {
      router.push("/user/dashboard");
    }
  }, []);
  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content */}
      <Navbar />
      <main className="flex-1 mt-20 md:mt-22">{children}</main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
