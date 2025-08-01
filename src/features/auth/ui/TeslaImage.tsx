import Image from "next/image";

import tesla from "@/../public/assets/images/tesla.png";

interface Props {
  isMobileView?: boolean;
}

export const TeslaImage = ({ isMobileView }: Props) => {
  if (isMobileView)
    return (
      <div
        className={`absolute w-full max-h-[170px] -left-[23%] bottom-0 z-1 pointer-events-none md:hidden`}
      >
        <Image
          src={tesla}
          alt="car"
          className="w-full scale-x-[-1]"
          height={170}
        />
      </div>
    );

  return (
    <div className="relative mt-12 flex-1">
      <div className="absolute -left-[85%] top-0 h-auto z-0 pointer-events-none max-md:hidden">
        <Image src={tesla} alt="car" className="scale-x-[-1]" priority />
      </div>
    </div>
  );
};
