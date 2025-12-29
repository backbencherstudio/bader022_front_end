/** @format */

import Navbar from "./_components/home/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      {/* <Navbar /> */}
      {/* Main Content */}
      <main className="flex-1">{children}</main>
      {/* Footer */}
      Footer
    </div>
  );
}
