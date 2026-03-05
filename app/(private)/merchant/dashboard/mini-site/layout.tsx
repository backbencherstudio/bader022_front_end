import { LandingPageProvider } from "../components/mini-site/context/LandingBuilderContext";

export default function MinisiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingPageProvider>{children}</LandingPageProvider>
    </>
  );
}
