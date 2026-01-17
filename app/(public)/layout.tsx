/** @format */
import Footer from "./_components/Footer";
import Navbar from "./_components/home/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
