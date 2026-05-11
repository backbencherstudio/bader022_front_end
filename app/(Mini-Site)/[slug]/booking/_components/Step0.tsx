"use client";

import { useI18n } from "@/components/provider/I18nProvider";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/helper/formatImage";
import { FileClock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FaLocationPin } from "react-icons/fa6";
import Modal from "@/app/(auth)/_components/Modal";
import { authorize } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
  // console.log(selectedService);
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingService, setPendingService] = useState<any>(null);
  const router = useRouter();

  // console.log(data);

  const handleBooking = (service: any) => {
    setPendingService(service);
    setIsModalOpen(true);
  };

  const handleContinueBokli = () => {
    const service = pendingService;
    const auth = authorize(["User", "Merchant", "Admin"]);

    if (!auth.authorized) {
      toast.error("Please login to proceed with your booking.");
      const currentPath = window.location.pathname + window.location.search;
      router.push(`/user-login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }

    setSelectedService(service);
    setIsModalOpen(false);
    onNext();
  };

  const handleContinueGuest = () => {
    const service = pendingService;
    setSelectedService(service);
    setIsModalOpen(false);
    onNext();
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <p> {locale == "ar" ? "تصفية حسب:" : "Filter by:"}</p>
        <select
          className="border p-1 rounded-md px-2 bg-white text-black dark:bg-gray-800 dark:text-white"
          value={selectedService?.branch_name || ""}
          onChange={(e) => {
            const selected = data?.branches?.find(
              (item: any) => item.branch_name === e.target.value,
            );
            setSelectedService(selected);
          }}
        >
          <option
            value=""
            className="bg-white text-black dark:bg-gray-800 dark:text-white"
          >
            {locale == "ar" ? "" : "Select Branch"}
          </option>
          {data?.branches?.map((item: any) => (
            <option
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
              key={item.id}
              value={item.branch_name}
            >
              {item.branch_name}
            </option>
          ))}
        </select>
      </div>
      {/* {data?.services.length !== 0 ? ( */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 md:mt-8">
        {data?.services?.map((service: any) => (
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
                className=" w-full h-full object-cover "
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
              {/* <span className="font-semibold text-gray-900 dark:text-gray-100">
                {service.name}
              </span> */}

              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold">{service.service_name}</h3>
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
                    handleBooking(service);
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
      {/* ) : (
        <div>Services not available in this Branch</div>
      )} */}

      <button
        onClick={() => window.history.back()}
        className="px-6 py-2 rounded-md border mt-5 cursor-pointer border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        {locale == "ar" ? "العودة" : "Go Back"}
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">
            {locale == "ar" ? "متابعة الحجز" : "Continue Booking"}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {locale == "ar"
              ? "اختر متابعة بحساب بوكلي أو المتابعة كزائر."
              : "Choose to continue with your Bokli account or continue as a guest."}
          </p>

          <div className="flex gap-3 mt-4 justify-end">
            <Button
              onClick={handleContinueBokli}
              className="bg-gray-800 text-white cursor-pointer"
            >
              {locale == "ar"
                ? "متابعة بحساب بوكلي"
                : "Continue with Bokli account"}
            </Button>
            <Button
              onClick={handleContinueGuest}
              className="bg-gray-400 text-white cursor-pointer"
            >
              {locale == "ar" ? "متابعة كزائر" : "Continue as Guest"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
