import { Fuel, Gauge, MapPin, Settings } from "lucide-react";
import card1 from "../../../../public/assets/images/car1.png";
import Image from "next/image";
import { ToggleFavorite } from "@/features/toggle-favorite/ui/ToggleFavorite";
import { Vehicle } from "../model/types";
import { VehicleAd } from "@/shared/api/carApi";

interface Props {
  vehicle: VehicleAd;
  variant?: "default" | "owner";
  actions?: React.ReactNode;
}

export const VehicleCard = ({
  vehicle,
  variant = "default",
  actions,
}: Props) => {
  return (
    <div className="bg-white w-[100%] rounded-xl shadow-sm border border-[#e5e7eb] ">
      <div className="relative">
        <Image src={card1} alt="car" className="w-full" />
        {/* {variant !== "owner" && (
          <ToggleFavorite
            vehicleId={vehicle.id}
            isFavorite={vehicle.isFavorite}
          />
        )} LATER */}
      </div>
      <div className="p-5 flex flex-col">
        <h4 className="font-inter font-semibold text-[16px] leading-none tracking-normal">
          {vehicle.model}
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
            <span>{vehicle.fuel_type}</span>
          </div>
          <div>
            <MapPin />
            <span>{vehicle.location}</span>
          </div>
        </div>
        {variant === "owner" && (
          <div className="flex justify-between items-center mt-4 gap-2">
            {actions}
          </div>
        )}
        {/* <p className="text-[#2B2B2B80] mt-5">{vehicle.d}</p> LATER */}
      </div>
    </div>
  );
};
