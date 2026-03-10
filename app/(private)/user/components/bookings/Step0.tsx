import { Button } from "@/components/ui/button";
import { FileClock } from "lucide-react";

interface Step0Props {
  selectedService: any;
  setSelectedService: (service: any) => void;
  data: any;
  onNext: () => void;
}

export default function Step0({
  selectedService,
  setSelectedService,
  data,
  onNext,
}: Step0Props) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <p>Filter by:</p>
        <select
          className="border p-1"
          value={selectedService?.name || ""}
          onChange={(e) => {
            const selected = data?.data?.find(
              (item: any) => item.name === e.target.value
            );
            setSelectedService(selected);
          }}
        >
          <option value="">Select Service</option>
          {data?.data?.map((item: any) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 md:mt-8">
        {data?.data?.map((service: any) => (
          <div
            key={service.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700 overflow-hidden"
          >
            <div className="relative h-48">
              {/* Image section */}
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

              <h3 className="font-semibold">{service.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {service.description}
              </p>

              <div className="flex gap-3 pt-3">
                <Button
                  onClick={() => {
                    setSelectedService(service); // send full object
                    onNext();
                  }}
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
