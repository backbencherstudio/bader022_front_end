export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className=" pt-17">{children}=</div>
    </div>
  );
}
