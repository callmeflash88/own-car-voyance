import { Fuel, Gauge, MapPin, Settings } from "lucide-react";
import card1 from "../../../../public/assets/images/car1.png";
import Image from "next/image";
import { ToggleFavorite } from "@/features/toggle-favorite/ui/ToggleFavorite";
import { Vehicle } from "../model/types";

interface Props {
  vehicle: Vehicle;
}

export const VehicleCard = ({ vehicle }: Props) => {
  return (
    <div className="bg-white w-[285px] rounded-xl shadow-sm border border-[#e5e7eb] ">
      <div className="relative">
        {/* <Image src={vehicle.image} alt="car" /> */}
        <Image src={card1} alt="car" />
        <ToggleFavorite vehicleId="1" isFavorite={false} />
      </div>
      <div className="p-5 flex flex-col">
        <h4 className="font-inter font-semibold text-[16px] leading-none tracking-normal">
          {vehicle.title}
        </h4>
        <span className="font-inter font-semibold text-[24px] leading-none tracking-normal mt-2">
          ${vehicle.price}
        </span>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <Gauge />
            <span>{vehicle.mileage} mi</span>
          </div>
          <div>
            <Settings />
            <span>{vehicle.transmission}</span>
          </div>
          <div>
            <Fuel />
            <span>{vehicle.fuel}</span>
          </div>
          <div>
            <MapPin />
            <span>{vehicle.location}</span>
          </div>
        </div>
        <p className="text-[#2B2B2B80] mt-5">{vehicle.date}</p>
      </div>
    </div>
  );
};
