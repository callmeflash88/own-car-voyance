import Image from "next/image";
import card1 from "../../../../public/assets/images/car1.png";
import { Gauge, Fuel, MapPin, Settings } from "lucide-react";
import { UserVehicle } from "../model/types";
import { VehicleAd } from "@/shared/types/car";

interface Props {
  vehicle: VehicleAd;
}

export const UserVehicleCard = ({ vehicle }: Props) => {
  console.log("vehicle", vehicle);
  return (
    <div className="w-full h-[144px] bg-white rounded-[20px] flex overflow-hidden shadow-sm relative group transition-all">
      <div className="w-[180px] h-full relative flex-shrink-0">
        <Image
          src={vehicle?.images[0]}
          alt="Car"
          className="object-cover rounded-l-[20px]"
          fill
          sizes="180px"
        />
      </div>

      <div className="flex flex-1 items-center px-6">
        <div className="flex flex-col w-full gap-3">
          <div className="flex justify-between items-start">
            <h3 className="font-inter font-semibold text-base leading-none tracking-normal">
              {vehicle.make} {vehicle.model} {vehicle.year}
            </h3>
            <div className="text-xl font-semibold text-[#2B2B2B] whitespace-nowrap">
              {vehicle.price}$
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-gray-500 text-sm items-center">
            <span className="flex items-center gap-1">
              <Gauge className="w-4 h-4" />
              {vehicle.mileage} miles
            </span>
            <span className="flex items-center gap-1">
              <Settings className="w-4 h-4" />
              {vehicle.transmission}
            </span>
            <span className="flex items-center gap-1">
              <Fuel className="w-4 h-4" />
              {vehicle.fuel_type}, {vehicle.engine}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {vehicle.location}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
