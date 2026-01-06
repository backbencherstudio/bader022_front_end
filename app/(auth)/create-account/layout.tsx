import CreateAccountProvider from "./context/CreateAccount";

export default function CreateAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <CreateAccountProvider>{children}</CreateAccountProvider>
    </div>
  );
}
