import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileClock } from "lucide-react";
import Image from "next/image";
import React from "react";
export const services = [
  {
    id: 1,
    title: "Hair Treatment",
    description:
      "Experience deep nourishment and revitalization with our professional hair treatment service",
    image: "/images/services1.png",
    duration: "30 min",
    price: 109,
    category: "Hair",
  },
  {
    id: 2,
    title: "Haircut & Styling",
    description:
      "Transform your look with our expert haircut and styling service, tailored to suit your unique features",
    image: "/images/services2.png",
    duration: "40 min",
    price: 112,
    category: "Hair",
  },
  {
    id: 3,
    title: "Hair Coloring",
    description:
      "Enhance your style with our professional hair coloring service, designed to bring richness",
    image: "/images/services3.png",
    duration: "45 min",
    price: 115,
    category: "Color",
  },
  {
    id: 4,
    title: "Hair Extensions",
    description:
      "Elevate your look with our premium hair extensions service, crafted to add instant length",
    image: "/images/services4.png",
    duration: "35 min",
    price: 118,
    category: "Hair",
  },
  {
    id: 5,
    title: "Scalp Treatment & Massage",
    description:
      "Indulge in our soothing scalp treatment and massage, designed to promote relaxation",
    image: "/images/services5.png",
    duration: "50 min",
    price: 120,
    category: "Spa",
  },
  {
    id: 6,
    title: "Hair Straightening or Perming",
    description:
      "Achieve the perfect texture with our professional hair straightening or perming service",
    image: "/images/services6.png",
    duration: "55 min",
    price: 125,
    category: "Hair",
  },
];
export default function Step0({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="All Services" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Services</SelectItem>
          <SelectItem value="hair">Hair Treatment</SelectItem>
          <SelectItem value="beard">Beard Trim</SelectItem>
        </SelectContent>
      </Select>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 md:mt-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700 overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <FileClock />
                  {service.duration}
                </div>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {service.price} SAR
                </span>
              </div>

              <h3 className="font-semibold">{service.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {service.description}
              </p>

              <div className="flex gap-3 pt-3">
                <Button onClick={onNext} className="cursor-pointer py-5">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
