import CreateAccountProvider from "./context/CreateAccount";

export default function CreateAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <CreateAccountProvider>{children}</CreateAccountProvider>
    </div>
  );
}
