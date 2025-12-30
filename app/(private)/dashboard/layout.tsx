export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      {/* Sidebar */}
      {/* <Sidebar /> */}
      {/* {Topbar} */}
      {/* Main Content */}
      <main className="">{children}</main>
    </div>
  );
}
