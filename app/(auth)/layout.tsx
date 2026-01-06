export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
