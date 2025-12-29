import Banner from "./_components/Banner";
import TrustedCompanies from "./_components/TrustedCompanies";
type Props = {
  bgSrc?: string; // "/images/banner_bg.png"
};
/** @format */
export default function HomePage({ bgSrc = "/images/banner_bg.png" }: Props) {
  return (
    <section>
      <div
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${bgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Banner />
      </div>
      <TrustedCompanies />
    </section>
  );
}
