import { Button } from "@/shared/ui";
import { CircleCheck, CircleDollarSign, Tag } from "lucide-react";
import dollarIcon from "../../../../public/assets/icons/dollar.svg";
import Image from "next/image";

export const CompleteAutomative = () => {
  return (
    <section
      className="w-full max-w-[1200px] mx-auto px-4 py-4 lg:py-32
      flex flex-col justify-start items-start overflow-hidden bg-white"
    >
      <div className="w-full flex flex-col justify-center items-center z-10 relative">
        <h3 className="font-inter font-semibold text-[24px] lg:text-[40px] lg:leading-[54px] tracking-normal text-center">
          The Complete
          <br className="hidden lg:block" /> Automotive Platform
        </h3>
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-between items-center lg:items-stretch mt-14 lg:mt-24 z-10 gap-5">
        {/* Card */}
        <div className="w-full sm:max-w-[317px] flex flex-col justify-between items-between border-b-2 border-[#DFDFDF] pb-7">
          <div className="flex flex-row lg:flex-col lg:items-start items-center lg:gap-0 gap-5">
            <Tag size={80} />
            <h4 className=" mt-2 font-inter font-semibold text-[20px] leading-[32px] tracking-normal">
              Selling Your Car
            </h4>
          </div>

          <p className="mt-5 font-inter font-semibold text-[16px] leading-[24px] tracking-normal align-middle">
            List with confidence and reach serious buyers
          </p>
          <p className="mt-2 font-plus-jakarta-sans font-normal text-[16px] leading-[24px] tracking-normal align-middle">
            Post your car in just a few steps. With VIN validation, photo
            uploads, and built-in messaging, your listing looks more
            professional and builds buyer trust from the start.
          </p>
          <Button variant="primary" size="lg" className="w-full mt-5">
            <span className="font-inter font-normal text-[16px] leading-[27px] tracking-normal align-middle">
              Sell your Car
            </span>
          </Button>
        </div>
        {/* Card */}
        <div className="w-full sm:max-w-[317px] flex flex-col justify-between items-start border-b-2 border-[#DFDFDF] pb-7 mt-5">
          {/* <CircleDollarSign size={80} /> */}
          <div className="flex flex-row lg:flex-col lg:items-start items-center lg:gap-0 gap-5">
            <Image src={dollarIcon} alt="dollar icon" />
            <h4 className=" mt-2 font-inter font-semibold text-[20px] leading-[32px] tracking-normal">
              Buying a Car
            </h4>
          </div>

          <p className="mt-5 font-inter font-semibold text-[16px] leading-[24px] tracking-normal align-middle">
            Make smarter decisions with verified data
          </p>
          <p className="mt-2 font-plus-jakarta-sans font-normal text-[16px] leading-[24px] tracking-normal align-middle">
            Before you buy, check the VIN to uncover accident history, mileage
            fraud, and ownership records. Our platform gives you access to
            trustworthy listings and real-time seller communication — all in one
            place.
          </p>
          <Button variant="primary" size="lg" className="w-full mt-5">
            <span className="font-inter font-normal text-[16px] leading-[27px] tracking-normal align-middle">
              Buy a Car
            </span>
          </Button>
        </div>
        {/* Card */}
        <div className="w-full sm:max-w-[317px] flex flex-col justify-between items-start border-b-2 border-[#DFDFDF] pb-7 mt-5">
          <div className="flex flex-row lg:flex-col lg:items-start items-center lg:gap-0 gap-5">
            <CircleCheck size={80} />
            <h4 className=" mt-2 font-inter font-semibold text-[20px] leading-[32px] tracking-normal">
              Check a Vehicle’s History
            </h4>
          </div>
          <p className="mt-5 font-inter font-semibold text-[16px] leading-[24px] tracking-normal align-middle">
            Know what’s under the hood — before you commit.
          </p>
          <p className="mt-2 font- font-normal text-[16px] leading-[24px] tracking-normal align-middle">
            Our VIN check tool gives you instant access to a vehicle’s
            background: accidents, mileage, service records, ownership changes,
            and more. Avoid costly surprises and buy with confidence.
          </p>
          <Button variant="primary" size="lg" className="w-full mt-5">
            <span className="font-inter font-normal text-[16px] leading-[27px] tracking-normal align-middle">
              Check VIN
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};
