import React from "react";
import Navbar from "../(Main)/_components/home/Navbar";
import ChooseThePerfectPlan from "../(Main)/_components/home/ChooseThePerfectPlan";
type Props = {
  bgSrc?: string; // "/images/banner_bg.png"
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
    </div>
  );
}
