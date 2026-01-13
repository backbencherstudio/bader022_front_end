import Navbar from "../_components/home/Navbar";
import ChooseThePerfectPlan from "../_components/home/ChooseThePerfectPlan";
import GrowYourBusiness from "../_components/home/GrowYourBusiness";
import { FeatureComparison } from "../_components/pricing/FeatureComparison";
type Props = {
  bgSrc?: string;
};

export default function page({ bgSrc = "/images/banner_bg.png" }: Props) {
  return (
    <div>
      <div
        className="relative w-full overflow-hidden"
        style={{
          backgroundImage: `url(${bgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Navbar />
        <ChooseThePerfectPlan />
      </div>
      <div className="bg-white">
        <FeatureComparison />
      </div>
      <GrowYourBusiness />
    </div>
  );
}
