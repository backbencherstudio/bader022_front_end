import React from "react";
import CreateDemo from "../_components/book-demo/CreateDemo";
import DetailsDemo from "../_components/book-demo/DetailsDemo";

export default function BookDemoPage() {
  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 my-20">
      <CreateDemo />
      <DetailsDemo />
    </div>
  );
}
