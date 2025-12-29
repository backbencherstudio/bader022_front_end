import ChooseThePerfectPlan from "./_components/home/ChooseThePerfectPlan";
import FrequentlyAskedQuestions from "./_components/home/FrequentlyAskedQuestions";
import WhyChooseBokli from "./_components/home/WhyChooseBokli";

import Banner from "./_components/home/Banner";
import CustomerRecommended from "./_components/home/CustomerRecommended";
import GrowYourBusiness from "./_components/home/GrowYourBusiness";
import HowBokliWorks from "./_components/home/HowBokliWorks";
import KeyFeatures from "./_components/home/KeyFeatures";
import MiniWebsiteBuilder from "./_components/home/MiniWebsiteBuilder";
import TrustedCompanies from "./_components/home/TrustedCompanies";
import YourProjects from "./_components/home/YourProjects";
type Props = {
  bgSrc?: string; // "/images/banner_bg.png"
};
/** @format */
export default function HomePage({ bgSrc = "/images/banner_bg.png" }: Props) {
  return (
    <section className="">
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
      <HowBokliWorks />
      <YourProjects />
      <KeyFeatures />
      <MiniWebsiteBuilder />
      <CustomerRecommended />
      <GrowYourBusiness />
      <ChooseThePerfectPlan />
      <WhyChooseBokli />
      <FrequentlyAskedQuestions />
    </section>
  );
}
