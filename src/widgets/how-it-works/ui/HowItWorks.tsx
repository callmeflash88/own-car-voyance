import Image from "next/image";
import bg from "../../../../public/assets/backgrounds/teslaBg.png";
import firstCard from "../../../../public/assets/images/howItWorks/card1.svg";
import secondCard from "../../../../public/assets/images/howItWorks/card2.svg";
import thirdCard from "../../../../public/assets/images/howItWorks/card3.svg";
import fourhCard from "../../../../public/assets/images/howItWorks/card4.svg";

export const HowItWorks = () => {
  return (
    <section className="relative py-32 flex flex-col justify-start items-start overflow-hidden bg-white">
      {/* Овальный фон */}
      <div className="absolute inset-0 z-0 flex justify-center items-center">
        <div className="w-[90vw] h-[800px] bg-[#5511EE] opacity-10 rounded-full blur-[50px]" />
      </div>

      <div className="w-full flex flex-col justify-center items-center z-10 relative">
        <h3 className="font-inter font-semibold text-[40px] leading-none tracking-normal text-center">
          How It Works?
        </h3>
        <p className="font-inter font-normal text-[16px] leading-[155%] tracking-normal text-center mt-7">
          We make it easy to explore vehicles, verify their history, and connect
          with <br /> trusted sellers — all without leaving your screen.
        </p>
      </div>

      <div className="w-full flex justify-between mt-24 z-10">
        <Image src={bg} alt="how it works" />
        <div className="flex flex-wrap w-1/2">
          <div className="w-1/2 flex flex-col gap-3 items-start">
            <Image src={firstCard} alt="how it works" />
            <p className="font-inter font-medium text-[20px] leading-[26px] tracking-normal align-middle capitalize">
              Enter VIN or Browse Cars
            </p>
            <p className="font-inter font-normal text-[16px] leading-[27px] tracking-normal align-middle">
              Find your perfect vehicle with AI-
              <br />
              powered search that understands
              <br /> your preferences.
            </p>
          </div>
          <div className="w-1/2 flex flex-col gap-3 items-start">
            <Image src={secondCard} alt="how it works" />
            <p className="font-inter font-medium text-[20px] leading-[26px] tracking-normal align-middle capitalize">
              Review Car Details
            </p>
            <p className="font-inter font-normal text-[16px] leading-[27px] tracking-normal align-middle">
              View detailed specs, history
              <br /> reports, and high-quality images of
              <br /> each vehicle.
            </p>
          </div>
          <div className="w-1/2 flex flex-col gap-3 items-start">
            <Image src={thirdCard} alt="how it works" />
            <p className="font-inter font-medium text-[20px] leading-[26px] tracking-normal align-middle capitalize">
              Contact the Seller
            </p>
            <p className="font-inter font-normal text-[16px] leading-[27px] tracking-normal align-middle">
              Use our secure chat system to ask <br /> questions — no personal
              data
              <br /> shared.
            </p>
          </div>
          <div className="w-1/2 flex flex-col gap-3 items-start">
            <Image src={fourhCard} alt="how it works" />
            <p className="font-inter font-medium text-[20px] leading-[26px] tracking-normal align-middle capitalize">
              Buy or Sell With Confidence
            </p>
            <p className="font-inter font-normal text-[16px] leading-[27px] tracking-normal align-middle">
              Whether you're buying or listing a<br /> car, our tools help you
              stay safe
              <br /> and informed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
