import Image from "next/image";

import photoRoomCar from "@/../public/assets/images/3d-car-photoroom.png";

interface Props {
  isMobileView?: boolean;
}

export const PhotoRoomCarImage = ({ isMobileView }: Props) => {
  if (isMobileView)
    return (
      <div
        className={`absolute  max-h-[190px] bottom-0 -right-[25%] z-1 pointer-events-none md:hidden`}
      >
        <Image src={photoRoomCar} alt="car" className="w-full" height={170} />
      </div>
    );

  return (
    <div className="relative mt-12 flex-1">
      <div className="absolute -right-[20%] top-0 h-auto z-0 pointer-events-none max-md:hidden">
        <Image src={photoRoomCar} alt="car" priority />
      </div>
    </div>
  );
};
