import Image from "next/image";
import React from "react";
import { useLandingPage } from "../../context/LandingBuilderContext";

export default function ServicesPreview() {
  const { servicesPreviewData } = useLandingPage();
  console.log("====================================");
  console.log(servicesPreviewData.servicesCards);
  console.log("====================================");
  return (
    <section>
      {servicesPreviewData.servicesPreviewTitle && (
        <div className="py-16 bg-[#F3F4F6]">
          {" "}
          <div className="container mx-auto px-4">
            <div className="flex justify-between">
              <div>
                {" "}
                {/* Title */}
                <h3 className="text-center text-4xl font-semibold mb-3">
                  {servicesPreviewData.servicesPreviewTitle}
                </h3>
                {/* Subtitle */}
                <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                  {servicesPreviewData.servicesPreviewSubtitle}
                </p>
              </div>
              <button>view More</button>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesPreviewData.servicesCards.map((item, index) => (
                <div key={index}>
                  {item.image && (
                    // <div
                    //   style={{}}
                    //   className="flex flex-col items-center text-center gap-4 rounded-xl shadow bg-white border-amber-100 py-6 overflow-hidden"
                    // >
                    //   <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100">
                    //     <Image
                    //       src="/icons/WhyChooseUs.png"
                    //       alt={item.title || "Feature icon"}
                    //       width={28}
                    //       height={28}
                    //     />
                    //   </div>
                    //   {/* Content */}
                    //   <div>
                    //     <h3 className="text-lg font-semibold mb-2 line-clamp-1">
                    //       {item.title}
                    //     </h3>

                    //     <p className="text-gray-600 line-clamp-2">
                    //       {item.description}
                    //     </p>
                    //   </div>
                    // </div>
                    <div className="rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition">
                      {/* Image */}
                      <div className="relative h-48 w-full">
                        <Image
                          src="/images/aboutus.png"
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-4">
                        {/* Meta */}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <span>⏱</span>
                            <span>{item.title}</span>
                          </div>
                          <span className="font-semibold text-gray-900">
                            25
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-semibold">{item.title}</h3>

                        {/* Description */}
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {item.description}
                        </p>

                        {/* Button */}
                        <button
                          className="bg-orange-500 text-white hover:bg-orange-600"
                          //               className={`w-fit px-6 py-2 rounded-md text-sm font-medium transition
                          // ${
                          //   primary
                          //     ? "bg-orange-500 text-white hover:bg-orange-600"
                          //     : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                          // }
                          // `}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
