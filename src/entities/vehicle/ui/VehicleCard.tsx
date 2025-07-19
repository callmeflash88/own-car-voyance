import { Fuel, Gauge, MapPin, Settings } from "lucide-react";
import Image from "next/image";
import card1 from "../../../../public/assets/images/car1.png";
import { ToggleFavorite } from "@/features/toggle-favorite/ui/ToggleFavorite";
import { EditButton } from "@/features/edit-vehicle-button/ui/EditButton";
import { VehicleAd } from "@/shared/types/car";

interface Props {
  vehicle: VehicleAd & { isFavorite?: boolean };
  variant?: "default" | "owner";
  actions?: React.ReactNode;
}

export const VehicleCard = ({
  vehicle,
  variant = "default",
  actions,
}: Props) => {
  return (
    <div className="bg-white w-full rounded-xl shadow-sm border border-[#e5e7eb]">
      <div className="relative">
        <Image
          src={vehicle.images?.[0] || card1}
          alt={vehicle.model}
          width={500}
          height={300}
          className="w-full h-[200px] object-cover rounded-t-xl"
        />

        {variant !== "owner" && vehicle.id && (
          <ToggleFavorite
            vehicleId={vehicle.id.toString()}
            isFavorite={vehicle.isFavorite ?? false}
          />
        )}

        {variant === "owner" && vehicle.id && (
          <EditButton id={vehicle.id.toString()} />
        )}
      </div>

      <div className="p-5 flex flex-col">
        <h4 className="font-semibold text-[16px]">{vehicle.model}</h4>
        <span className="font-semibold text-[24px] mt-2">${vehicle.price}</span>

        <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <Gauge className="w-4 h-4" />
            <span>{vehicle.mileage} mi</span>
          </div>
          <div className="flex items-center gap-1">
            <Settings className="w-4 h-4" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="w-4 h-4" />
            <span>{vehicle.fuel_type}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{vehicle.location}</span>
          </div>
        </div>

        {actions && (
          <div className="flex justify-between items-center mt-4 gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
