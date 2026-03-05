import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBookingHistoryQuery, useBookingServiceQuery } from "@/redux/features/userDashboard/booking";
import { FileClock } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function Step0({ selectedService, setSelectedService, data,onNext }) {
  // const [selectedService, setSelectedService] = useState(""); // service_name state
  // const { data, isLoading, error } = useBookingServiceQuery(selectedService)
  console.log(data, "=========1111111111111111111111111")
  return (
    <div>
      <Select value={selectedService} onValueChange={(value) => setSelectedService(value)}>
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
        {data?.data?.map((service: any) => (
          <div
            key={service.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700 overflow-hidden"
          >
            <div className="relative h-48">
              {/* <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              /> */}
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
                <Button
                  onClick={onNext}
                  className="cursor-pointer py-5 bg-gray-400 hover:bg-black text-white"
                >
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
