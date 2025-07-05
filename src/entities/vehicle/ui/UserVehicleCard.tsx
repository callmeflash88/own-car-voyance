import Image from "next/image";
import card1 from "../../../../public/assets/images/car1.png";
import { Gauge, Fuel, MapPin, Settings } from "lucide-react";
import { UserVehicle } from "../model/types";

interface Props {
  vehicle?: UserVehicle;
}

export const UserVehicleCard = ({ vehicle }: Props) => {
  return (
    <div className="w-full h-[144px] bg-white rounded-[20px] flex overflow-hidden shadow-sm relative group transition-all">
      <div className={`relative h-full flex-shrink-0 transition-all `}>
        <Image
          src={card1}
          alt="Car"
          fill
          className="object-cover"
          sizes="180px"
        />
      </div>

      <div className="flex flex-1 items-center px-6">
        <div className="flex flex-col w-full gap-3">
          <div className="flex justify-between items-start">
            <h3 className="font-inter font-semibold text-base leading-none tracking-normal">
              {/* {vehicle.make} {vehicle.model} {vehicle.year} */}
              Merceds S-class
            </h3>
            <div className="text-xl font-semibold text-[#2B2B2B] whitespace-nowrap">
              {/* ${vehicle.price} */}
              $100,000
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-gray-500 text-sm items-center">
            <span className="flex items-center gap-1">
              <Gauge className="w-4 h-4" />
              {/* {vehicle.mileage} miles */}
              142,000 km
            </span>
            <span className="flex items-center gap-1">
              <Settings className="w-4 h-4" />
              {/* {vehicle.transmission} */}
              Automatic
            </span>
            <span className="flex items-center gap-1">
              <Fuel className="w-4 h-4" />
              {/* {vehicle.fuel_type}, {vehicle.engine} */}
              Petrol, 3.0
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {/* {vehicle.location} */}
              New York
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
