import React from "react";
import { useLandingPage } from "../../context/LandingBuilderContext";

export default function Footer() {
  const { footerData } = useLandingPage();
  console.log("====================================");
  console.log(footerData);
  console.log("====================================");
  return (
    <div>
      <h3>{footerData.footerTitle}</h3>
      <h3>{footerData.footerSubTitle}</h3>
    </div>
  );
}
