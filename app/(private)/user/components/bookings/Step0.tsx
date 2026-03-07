import { Button } from "@/components/ui/button";
import { FileClock } from "lucide-react";

interface Step0Props {
  selectedService: string;
  setSelectedService: (service: string) => void;
  data: any; // বা যদি API টাইপ জানা থাকে, সেটা ব্যবহার করো
  onNext: () => void;
}

export default function Step0({
  selectedService,
  setSelectedService,
  data,
  onNext,
}: Step0Props) {
  console.log(data, "=========1111111111111111111111111");

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <p>Filter by:</p>
        <select
          className="border p-1"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
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
                    setSelectedService(service.name);
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


// import { Button } from "@/components/ui/button";
// import { FileClock } from "lucide-react";


// export default function Step0({ selectedService, setSelectedService, data, onNext }) {

  
//   return (
//     <div>
     
//       <div className="flex items-center gap-4 mb-4">
//         <p>Filter by:</p>
//         <select className="border p-1">
//           {data?.data?.map((item: any) => (
//             <option key={item.id} value={item.name}>
//               {item.name}
//             </option>
//           ))}
//         </select>
//       </div>


//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 md:mt-8">
//         {data?.data?.map((service: any) => (
//           <div
//             key={service.id}
//             className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700 overflow-hidden"
//           >
//             <div className="relative h-48">
//               {/* <Image
//                 src={service.image}
//                 alt={service.title}
//                 fill
//                 className="object-cover"
//               /> */}
//             </div>

//             <div className="p-5 space-y-3">
//               <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
//                 <div className="flex items-center gap-1">
//                   <FileClock />
//                   {service.duration}
//                 </div>
//                 <span className="font-semibold text-gray-900 dark:text-gray-100">
//                   {service.price} SAR
//                 </span>
//               </div>

//               <h3 className="font-semibold">{service.name}</h3>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 {service.description}
//               </p>

//               <div className="flex gap-3 pt-3">
//                 <Button
//                   onClick={onNext}
//                   className="cursor-pointer py-5 bg-gray-400 hover:bg-black text-white"
//                 >
//                   Book Now
//                 </Button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
