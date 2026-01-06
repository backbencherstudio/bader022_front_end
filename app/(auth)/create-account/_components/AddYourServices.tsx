import React from "react";
type Step2Data = {
  serviceName: string;
};

interface Step2Props {
  data: Step2Data;
  onNext: (values: Step2Data) => void;
  onPrevious: () => void;
}
export default function AddYourServices({
  data,
  onNext,
  onPrevious,
}: Step2Props) {
  return <div>AddYourServices</div>;
}
