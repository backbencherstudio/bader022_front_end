import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FiImage } from "react-icons/fi";

export default function Branding() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem
        value="item-1"
        className="border rounded-md overflow-hidden"
      >
        {" "}
        <AccordionTrigger
          className="
              flex items-center justify-between
              bg-gray-100 dark:bg-gray-700
              px-4 py-3
              hover:bg-gray-200 dark:hover:bg-gray-600
              transition
              [&>svg]:transition-transform
              [&>svg]:-rotate-90
              [&[data-state=open]>svg]:rotate-0
            "
        >
          <span className="font-medium">Branding</span>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance p-2">
          {/* Logo */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Logo{" "}
            </label>

            <label
              className="
                                          mt-2 flex flex-col items-center justify-center
                                          border-2 border-dashed rounded-lg py-8 cursor-pointer
                                          border-gray-300 dark:border-gray-700
                                          bg-gray-50 dark:bg-gray-800
                                          hover:bg-gray-100 dark:hover:bg-gray-700
                                        "
            >
              <FiImage size={26} className="text-gray-400" />
              <span className="text-sm font-medium mt-2 text-gray-600 dark:text-gray-300">
                Upload Logo
              </span>
              <p>JPG or PNG (max 3MB)</p>
              <input type="file" className="hidden" />
            </label>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Logo Position
            </label>{" "}
            <div className="grid grid-cols-3 gap-3">
              <button className=" bg-gray-900 rounded-md p-3">Left</button>
              <button className=" bg-gray-200 rounded-md p-3">Center</button>
              <button className=" bg-gray-200 rounded-md p-3">Right</button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
