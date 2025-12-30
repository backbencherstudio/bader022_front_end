import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

type Props = {
  bgSrc?: string; // "/images/banner_bg.png"
};

export default function GrowYourBusiness({
  bgSrc = "/images/growbusiness2.png",
}: Props) {
  return (
    <div
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section className="relative container">
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto text-center">
            <h1 className="text-[28px] leading-tight text-white md:text-[44px] xl:text-[60px] md:leading-[1.2] font-bold">
              Simplify Appointments and
              <br className="hidden md:block" />
              Grow your Business Instantly.{" "}
            </h1>

            <p className="mt-4 text-[16px] md:text-[18px] text-white leading-relaxed">
              Try Bokli’s easy booking system instantly and explore essential
              features built to support your
              <br />
              <span>business from day one.</span>
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="outline"
                className="h-12 rounded-md  text-[16px] px-4 font-semibold text-white bg-linear-to-l from-indigo-500 to-blue-500 hover:text-white bg-white/60 hover:bg-white border-none cursor-pointer"
              >
                Start Accepting Bookings Today
                <ArrowUpRight size={18} className="font-semibold" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
