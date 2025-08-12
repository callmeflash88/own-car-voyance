import Image from "next/image";
import audi from "../../../../public/assets/images/audi.png";
import { Button } from "@/shared/ui";

export const BottomTransform = () => {
  return (
    <section className="px-4 w-full flex justify-center items-center">
      <div
        className="rounded-[40px] bg-cover bg-center bg-no-repeat lg:h-[500px] w-full py-10 lg:py-32 overflow-hidden"
        style={{ backgroundImage: "url('/assets/backgrounds/bottomBg.jpg')" }}
      >
        <div className="w-full h-full flex flex-col gap-10 px-4 lg:flex-row lg:gap-0 lg:px-20 justify-between items-center">
          <div className="flex flex-col w-full xs:items-center">
            <h3 className="font-inter font-semibold text-[28px] lg:text-[56px] leading-[120%] tracking-[1%] text-[#FFFFFF]">
              Ready to Transform
              <br /> Your Car Experience?
            </h3>
            <p className="text-[#FFFFFFB3] mt-4 text-base lg:text-lg max-w-[400px] lg:max-w-[600px]">
              Join thousands of satisfied users who have discovered a <br />{" "}
              better way to buy and sell vehicles.
            </p>
            <div className="mt-10 flex items-center justify-start gap-3 flex-wrap">
              <Button
                variant="outline"
                size="lg"
                className="flex-1 bg-white text-[#2B2B2B] text-base"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1 text-white text-base"
              >
                Learn More
              </Button>
            </div>
          </div>
          <Image src={audi} alt="car" className="min-w-[320px] w-full" />
        </div>
      </div>
    </section>
  );
};
