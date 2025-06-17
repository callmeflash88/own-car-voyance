import Image from "next/image";
import audi from "../../../../public/assets/images/audi.png";
import { Button } from "@/shared/ui";

export const BottomTransform = () => {
  return (
    <section className="px-20 w-full flex justify-center items-center">
      <div
        className="rounded-[40px] bg-cover bg-center bg-no-repeat h-[400px] w-[90vw] "
        style={{ backgroundImage: "url('/assets/backgrounds/bottomBg.jpg')" }}
      >
        <div className="w-full h-full flex px-20 justify-between items-center">
          <div className="flex flex-col ">
            <h3 className="font-inter font-semibold text-[56px] leading-[120%] tracking-[1%] text-[#FFFFFF]">
              Ready to Transform
              <br /> Your Car Experience?
            </h3>
            <p className="text-[#FFFFFF80]">
              Join thousands of satisfied users who have discovered a <br />{" "}
              better way to buy and sell vehicles.
            </p>
            <div className="mt-10 flex items-center justify-start gap-3">
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-[#2B2B2B"
              >
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="text-white">
                Learn More
              </Button>
            </div>
          </div>
          <Image src={audi} alt="car" className="w-[600px]" />
        </div>
      </div>
    </section>
  );
};
