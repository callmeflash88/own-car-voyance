import Image from "next/image";

import secondPhotoRoomCar from "@/../public/assets/images/3d-car-photoroom2.png";

export const SecondPhotoRoomCarImage = () => {
  return (
    <div className="relative mt-12 flex-1">
      <div className="absolute -left-[20%] top-0 h-auto z-0 pointer-events-none max-md:hidden">
        <Image src={secondPhotoRoomCar} alt="car" priority />
      </div>
    </div>
  );
};
