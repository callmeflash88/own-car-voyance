import { Fuel, Gauge, MapPin, Settings } from "lucide-react";
import Image from "next/image";
import card1 from "../../../../public/assets/images/car1.png";
import { ToggleFavorite } from "@/features/toggle-favorite/ui/ToggleFavorite";
import { EditButton } from "@/features/edit-vehicle-button/ui/EditButton";
import { VehicleAd } from "@/shared/types/car";
import speedIcon from "@/shared/assets/icons/vehicle-card/speed.svg";
import { formatRelativeTime } from "@/shared/lib/utils";

interface Props {
  vehicle: VehicleAd & { isFavorite?: boolean };
  variant?: "default" | "owner";
  actions?: React.ReactNode;
  onClick?: () => void;
  isAuthenticated?: boolean;
  isProductList?: boolean;
}

export const VehicleCard = ({
  vehicle,
  variant = "default",
  actions,
  isAuthenticated,
  isProductList,
  onClick,
}: Props) => {
  console.log("vehicle", vehicle);
  return (
    <div
      className="bg-white w-full rounded-xl shadow-sm border border-[#e5e7eb]"
      onClick={variant !== "owner" ? onClick : undefined}
    >
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
            isAuthenticated={isAuthenticated ?? false}
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
          <div
            className={`flex ${
              isProductList ? "flex-col items-start" : "flex-row items-center"
            }   gap-1`}
          >
            <Image src={speedIcon} alt="speed" className="w-4 h-4" />
            <span>{vehicle.mileage} miles</span>
          </div>
          <div
            className={`flex ${
              isProductList ? "flex-col items-start" : "flex-row items-center"
            }   gap-1`}
          >
            <Settings className="w-4 h-4" />
            <span>{vehicle.transmission}</span>
          </div>
          <div
            className={`flex ${
              isProductList ? "flex-col items-start" : "flex-row items-center"
            }   gap-1`}
          >
            <Fuel className="w-4 h-4" />
            <span>
              {vehicle.fuel_type} {vehicle.engine}
            </span>
          </div>
          <div
            className={`flex ${
              isProductList ? "flex-col items-start" : "flex-row items-center"
            }   gap-1`}
          >
            <MapPin className="w-4 h-4" />
            <span>{vehicle.location}</span>
          </div>
        </div>

        <div className="mt-5 text-sm text-[#2B2B2B80]">
          {formatRelativeTime(vehicle.created_at)}
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
