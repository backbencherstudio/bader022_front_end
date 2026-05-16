import { useI18n } from "@/components/provider/I18nProvider";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/helper/formatImage";
import { useAllPublicBranchQuery } from "@/redux/features/userDashboard/booking";
import Image from "next/image";
import { FaLocationPin } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";

interface Step0Props {
  setSelectedService: (service: any) => void;
  selectedBranchId: string;
  setSelectedBranchId: (branchId: string) => void;
  data: any;
  onNext: () => void;
}

export default function Step0({
  setSelectedService,
  selectedBranchId,
  setSelectedBranchId,
  data,
  onNext,
}: Step0Props) {
  const { locale } = useI18n();

  const { data: BranchData } = useAllPublicBranchQuery({});

  const filteredServices = selectedBranchId
    ? data?.data?.filter(
        (service: any) => String(service.branch_id) === selectedBranchId,
      )
    : data?.data;

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <p> {locale == "ar" ? "تصفية حسب:" : "Filter by:"}</p>
        <select
          className="border p-1 rounded-md px-2 bg-white text-black dark:bg-gray-800 dark:text-white"
          value={selectedBranchId}
          onChange={(e) => {
            setSelectedBranchId(e.target.value);
            setSelectedService(null);
          }}
        >
          <option
            value=""
            className="bg-white text-black dark:bg-gray-800 dark:text-white"
          >
            {locale == "ar" ? "اختر الفرع" : "Select Branch"}
          </option>
          {BranchData?.data?.map((item: any) => (
            <option
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
              key={item.id}
              value={String(item.id)}
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 md:mt-8">
        {filteredServices?.map((service: any) => (
          <div
            key={service.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700 overflow-hidden"
          >
            <div className="relative h-48">
              {/* Image section */}
              <Image
                src={getImageUrl(service.image)}
                alt={service.name}
                height={300}
                width={500}
                unoptimized={true}
                className=" w-full h-full object-cover"
              />
            </div>

            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <FiClock />
                  {service.duration}
                </div>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {service.price} SAR
                </span>
              </div>
              {/* <span className="font-semibold text-gray-900 dark:text-gray-100">
                {service.name}
              </span> */}

              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold">{service.name}</h3>
                <p className="flex items-center gap-1">
                  <FaLocationPin /> {service?.branch_name}
                </p>
              </div>
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
                  {locale == "ar" ? "احجز الآن" : "Book Now"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
