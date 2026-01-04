import Sidebar from "./components/shared/Sidebar";
import TopBar from "./components/shared/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <Sidebar />
        <TopBar />
        <div className="pl-0 lg:pl-70 pt-17">
          <div className="border-r min-h-[calc(100vh-70px)] p-4 md:p-5 lg:p-6 relative border-[#E9E9E9]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
