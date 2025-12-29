/** @format */

import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Navbar />
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
