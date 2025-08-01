import Image from "next/image";

import audi from "@/../public/assets/images/audi.png";

interface Props {
  isMobileView?: boolean;
}

export const AudiImage = ({ isMobileView }: Props) => {
  if (isMobileView)
    return (
      <div className="absolute w-full -bottom-3 -left-[65%] z-1 pointer-events-none md:hidden">
        <Image src={audi} alt="car" className="w-full" height={170} />
      </div>
    );

  return (
    <div className="relative mt-12 flex-1">
      <div className="absolute -left-[18%] top-0 h-auto z-0 pointer-events-none max-md:hidden">
        <Image src={audi} alt="car" priority />
      </div>
    </div>
  );
};
