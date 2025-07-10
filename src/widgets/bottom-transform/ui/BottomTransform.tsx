import Image from "next/image";
import audi from "../../../../public/assets/images/audi.png";
import { Button } from "@/shared/ui";

export const BottomTransform = () => {
  return (
    <section className="px-4 lg:px-20 w-full flex justify-center items-center">
      <div
        className="rounded-[40px] bg-cover bg-center bg-no-repeat py-10 lg:py-32 w-full max-w-[1200px]"
        style={{ backgroundImage: "url('/assets/backgrounds/bottomBg.jpg')" }}
      >
        <div className="w-full h-full flex flex-col-reverse lg:flex-row justify-between items-center gap-10 lg:gap-0">
          {/* Картинка авто */}
          <div className="w-full flex justify-center lg:justify-end">
            <Image
              src={audi}
              alt="car"
              className="w-[80%] max-w-[380px] lg:max-w-[600px] h-auto object-contain"
            />
          </div>

          {/* Контент */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left px-4 lg:px-0">
            <h3 className="font-inter font-semibold text-[28px] lg:text-[56px] leading-[120%] tracking-[1%] text-white">
              Ready to Transform
              <br className="hidden lg:block" /> Your{" "}
              <br className="block lg:hidden" />
              Car Experience?
            </h3>
            <p className="text-[#FFFFFFB3] mt-4 text-base lg:text-lg max-w-[400px]">
              Join thousands of satisfied users who have discovered a better way
              to buy and sell vehicles.
            </p>
            <div className="mt-6 lg:mt-10 flex lg:flex-row items-center justify-center lg:justify-start gap-4 w-full lg:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-[#2B2B2B] w-full lg:w-auto rounded-full px-2 lg:px-8 py-3"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-white border-white w-full lg:w-auto rounded-full px-2 lg:px-8 py-3"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
