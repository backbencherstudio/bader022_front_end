import React from "react";

type Step1Data = {
  businessName: string;
  bussinessAddress: string;
};

interface Step1Props {
  data: Step1Data;
  onNext: (values: Step1Data) => void;
}

export default function AccountCreated({ data, onNext }: Step1Props) {
  return <div>AccountCreated</div>;
}
