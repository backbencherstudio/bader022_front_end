import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

export default function FrequentlyAskedQuestions() {
  return (
    <div className="bg-white">
      <div className="container mx-auto py-20">
        <div className="flex flex-col items-center gap-5 py-10">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-semibold">
            Frequently Asked Questions
          </h2>
          <p className="w-11/12 md:w-9/12 lg:w-5/12 mx-auto text-center text-[#4A4C56]">
            Find quick answers to common questions and learn how Bokli helps
            simplify booking management for your business.
          </p>
        </div>
        <div className="grid  grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <Accordion
              type="single"
              collapsible
              className="w-full flex flex-col gap-5"
              // defaultValue="item-1"
            >
              <AccordionItem
                value="item-1"
                className="bg-white border border-gray-200 shadow-md rounded-md"
              >
                <AccordionTrigger className="mx-4 font-bold">
                  Can I start for free?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance mx-4">
                  <p>
                    Our flagship product combines cutting-edge technology with
                    sleek design. Built with premium materials, it offers
                    unparalleled performance and reliability.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-2"
                className="bg-white border border-gray-200 shadow-md rounded-md"
              >
                <AccordionTrigger className="mx-4 font-bold">
                  Can I accept payments online?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance mx-4">
                  <p>
                    We offer worldwide shipping through trusted courier
                    partners. Standard delivery takes 3-5 business days, while
                    express shipping ensures delivery within 1-2 business days.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-3"
                className="bg-white border border-gray-200 shadow-md rounded-md"
              >
                <AccordionTrigger className="mx-4 font-bold">
                  Can I link my website to my own domain?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance mx-4">
                  <p>
                    We stand behind our products with a comprehensive 30-day
                    return policy. If you&apos;re not completely satisfied,
                    simply return the item in its original condition.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-3"
                className="bg-white border border-gray-200 shadow-md rounded-md"
              >
                <AccordionTrigger className="mx-4 font-bold">
                  Will the system support me if I own a shop?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance mx-4">
                  <p>
                    We stand behind our products with a comprehensive 30-day
                    return policy. If you&apos;re not completely satisfied,
                    simply return the item in its original condition.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div>
            <Accordion
              type="single"
              collapsible
              className="w-full flex flex-col gap-5"
              // defaultValue="item-1"
            >
              <AccordionItem
                value="item-1"
                className="bg-white border border-gray-200 shadow-md rounded-md"
              >
                <AccordionTrigger className="mx-4 font-bold">
                  Do customers need an account?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance mx-4">
                  <p>
                    Our flagship product combines cutting-edge technology with
                    sleek design. Built with premium materials, it offers
                    unparalleled performance and reliability.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-2"
                className="bg-white border border-gray-200 shadow-md rounded-md"
              >
                <AccordionTrigger className="mx-4 font-bold">
                  Can I add multiple branches?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance mx-4">
                  <p>
                    We offer worldwide shipping through trusted courier
                    partners. Standard delivery takes 3-5 business days, while
                    express shipping ensures delivery within 1-2 business days.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-3"
                className="bg-white border border-gray-200 shadow-md rounded-md"
              >
                <AccordionTrigger className="mx-4 font-bold">
                  What do I need to get started?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance mx-4">
                  <p>
                    We stand behind our products with a comprehensive 30-day
                    return policy. If you&apos;re not completely satisfied,
                    simply return the item in its original condition.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="item-4"
                className="bg-white border border-gray-200 shadow-md rounded-md"
              >
                <AccordionTrigger className="mx-4 font-bold">
                  Can I monitor everything on my mobile phone?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance mx-4">
                  <p>
                    We stand behind our products with a comprehensive 30-day
                    return policy. If you&apos;re not completely satisfied,
                    simply return the item in its original condition.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
