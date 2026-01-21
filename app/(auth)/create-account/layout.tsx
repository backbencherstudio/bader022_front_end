import Link from "next/link";
import CreateAccountProvider from "./context/CreateAccount";
import Image from "next/image";

export default function CreateAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-linear-to-r from-purple-200 to-indigo-200 h-screen">
      <div className="p-5">
        {" "}
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/image 259.png"
            alt="Logo"
            width={100}
            height={100}
            className="object-contain"
          />
        </Link>
      </div>
      <CreateAccountProvider>{children}</CreateAccountProvider>
    </div>
  );
}
