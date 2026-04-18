import React from "react";
import CreateDemo from "../_components/book-demo/CreateDemo";
import DetailsDemo from "../_components/book-demo/DetailsDemo";
import WhyChooseBokli from "../_components/book-demo/WhyChooseBokli";

export default function BookDemoPage() {
  return (
    <div className="bg-[#F9FAFB] w-full">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        <CreateDemo />
        <WhyChooseBokli />
      </div>
    </div>
  );
}
