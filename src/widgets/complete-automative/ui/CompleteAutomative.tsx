import { Button } from "@/shared/ui";
import { CircleCheck, CircleDollarSign, Tag } from "lucide-react";

export const CompleteAutomative = () => {
  return (
    <section
      className="
      px-60
      py-32
      flex
      flex-col
      justify-start
      items-start
      overflow-hidden
      bg-white"
    >
      <div className="w-full flex flex-col justify-center items-center z-10 relative">
        <h3 className="font-inter font-semibold text-[40px] leading-[54px] tracking-normal text-center">
          The Complete
          <br /> Automotive Platform
        </h3>
      </div>
      <div className="w-full flex justify-between mt-24 z-10">
        {/* Card */}
        <div className="w-[317px] flex flex-col justify-between items-between border-b-2 border-[#DFDFDF] pb-7">
          <Tag size={80} />
          <h4 className=" mt-2 font-inter font-semibold text-[20px] leading-[32px] tracking-normal">
            Selling Your Car
          </h4>
          <p className="mt-5 font-inter font-semibold text-[16px] leading-[24px] tracking-normal align-middle">
            List with confidence and reach serious buyers
          </p>
          <p className="mt-2 font-['Plus_Jakarta_Sans'] font-normal text-[16px] leading-[24px] tracking-normal align-middle">
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
        <div className="w-[317px] flex flex-col items-start border-b-2 border-[#DFDFDF] pb-7">
          <CircleDollarSign size={80} />
          <h4 className=" mt-2 font-inter font-semibold text-[20px] leading-[32px] tracking-normal">
            Buying a Car
          </h4>
          <p className="mt-5 font-inter font-semibold text-[16px] leading-[24px] tracking-normal align-middle">
            Make smarter decisions with verified data.s
          </p>
          <p className="mt-2 font-['Plus_Jakarta_Sans'] font-normal text-[16px] leading-[24px] tracking-normal align-middle">
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
        <div className="w-[317px] flex flex-col items-start border-b-2 border-[#DFDFDF] pb-7">
          <CircleCheck size={80} />
          <h4 className=" mt-2 font-inter font-semibold text-[20px] leading-[32px] tracking-normal">
            Check a Vehicle’s History
          </h4>
          <p className="mt-5 font-inter font-semibold text-[16px] leading-[24px] tracking-normal align-middle">
            Know what’s under the hood — before you commit.
          </p>
          <p className="mt-2 font-['Plus_Jakarta_Sans'] font-normal text-[16px] leading-[24px] tracking-normal align-middle">
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
