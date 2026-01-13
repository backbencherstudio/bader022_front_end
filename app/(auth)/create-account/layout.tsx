import CreateAccountProvider from "./context/CreateAccount";

export default function CreateAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 max-h-full">
      <CreateAccountProvider>{children}</CreateAccountProvider>
    </div>
  );
}
