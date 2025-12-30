import React from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";

export default function ChooseThePerfectPlan() {
  return (
    <div>
      <div className="container mx-auto py-20">
        <div className="flex flex-col items-center gap-5 py-10">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-semibold">
            Choose The Perfect Plan
          </h2>
          <p className="w-11/12 md:w-9/12 lg:w-5/12 mx-auto text-center text-[#4A4C56]">
            Select the right plan designed to support your growth, streamline
            bookings, and unlock advanced features when needed.
          </p>
          <div className="bg-[#FAFAFA] p-2 flex items-center gap-5  rounded-4xl">
            <button className="bg-linear-to-r from-[#3CB3FF] to-[#7153FF] py-1 px-3 rounded-2xl">
              Monthly
            </button>
            <p className="px-5 bg-linear-to-r from-[#3CB3FF] to-[#7153FF] bg-clip-text text-transparent font-semibold">
              Annual (save over 20%)
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-5">
          <div className="bg-[#F9FAFB] border-amber-50 p-5 rounded-md ">
            <div className="bg-white shadow rounded-md p-5">
              <h3 className="text-xl  font-bold">Basic Plan</h3>
              <p className="py-3">
                Start with essential tools to manage bookings, services, and
                customers efficiently—perfect for growing small businesses.
              </p>
              <p>
                <span className="text-4xl font-bold">Free</span>/month{" "}
              </p>
              <div className="inline-block p-0.5 rounded-md bg-linear-to-r from-[#3CB3FF] to-[#7153FF] my-5">
                <button className="bg-white px-6 py-3 rounded-md font-semibold text-gray-900 flex gap-3 items-center">
                  Try For Free <MdArrowOutward />
                </button>
              </div>
            </div>
            <div className="p-5">
              <p className="flex gap-2 items-center ">
                <IoIosCheckmarkCircleOutline />
                Create only 1 Staff
              </p>
              <p className="flex gap-2 items-center ">
                <IoIosCheckmarkCircleOutline />
                Mini-site locked
              </p>
              <p className="flex gap-2 items-center ">
                <IoIosCheckmarkCircleOutline />
                Limited features
              </p>
              <p className="flex gap-2 items-center ">
                <IoIosCheckmarkCircleOutline />
                Basic analytics
              </p>
              <p className="flex gap-2 items-center ">
                <IoIosCheckmarkCircleOutline />
                Limited customization
              </p>
            </div>
          </div>
          <div className="bg-linear-to-r from-[#3CB3FF] to-[#7153FF] p-5 rounded-md ">
            <div className="bg-[#F9FAFB] shadow rounded-md p-5">
              <h3 className="text-xl  font-bold">Premium Plan</h3>
              <p className="py-3">
                Unlock advanced booking features, multiple branches,
                customization tools, and powerful analytics to scale your
                business effortlessly.
              </p>
              <p>
                <span className="text-4xl font-bold">209 SAR</span>/month{" "}
              </p>

              <button className="bg-linear-to-r from-[#3CB3FF] to-[#7153FF] px-6 py-3 rounded-md font-semibold flex gap-3 items-center text-white my-5">
                Upgrade Premium <MdArrowOutward />
              </button>
            </div>
            <div className="p-5">
              <p className="flex gap-2 items-center text-white">
                <IoIosCheckmarkCircleOutline />
                Create Unlimited Staff
              </p>
              <p className="flex gap-2 items-center text-white">
                <IoIosCheckmarkCircleOutline />
                Mini-site enabled
              </p>
              <p className="flex gap-2 items-center text-white">
                <IoIosCheckmarkCircleOutline />
                Additional features
              </p>
              <p className="flex gap-2 items-center text-white">
                <IoIosCheckmarkCircleOutline />
                Advanced analytics
              </p>
              <p className="flex gap-2 items-center text-white">
                <IoIosCheckmarkCircleOutline />
                Unlimited customization
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
