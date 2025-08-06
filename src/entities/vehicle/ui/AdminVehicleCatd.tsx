import { VehicleAd } from "@/shared/types/car";
import Image from "next/image";
import card1 from "../../../../public/assets/images/car1.png";
import { CheckCircle2, Heart } from "lucide-react";
import eyeIcon from "@/shared/assets/icons/eye.svg";
import { Button } from "@/shared/ui";
import { IoTrashBin } from "react-icons/io5";
import { Loader2 } from "lucide-react";

interface Props {
  vehicle: any;
  onClick?: () => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export const AdminVehicleCard = ({
  vehicle,
  onClick,
  onDelete,
  isDeleting,
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
      </div>

      <div className="p-5 flex flex-col">
        <h4 className="font-semibold text-[16px]">
          {vehicle.make} {vehicle.model} {vehicle.year}
        </h4>
        <span className="font-semibold text-[24px] mt-2">${vehicle.price}</span>
      </div>

      <div className="flex justify-between items-center mt-4 p-5">
        {/* 1 */}
        <div className="flex items-start gap-2">
          <div>
            <CheckCircle2 color="#00C00A" />
          </div>
          <div className="flex flex-col">
            <p className="text-[#2B2B2B80]">Status</p>
            <p>{vehicle.status}</p>
          </div>
        </div>
        {/* 2 */}
        <div className="flex items-start gap-2">
          <div>
            <Image src={eyeIcon} alt="eye" className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <p className="text-[#2B2B2B80]">Views</p>
            <p>{vehicle._count.popular}</p>
          </div>
        </div>
        {/* 3 */}
        <div className="flex items-start gap-2">
          <div>
            <Heart color="#728CFD" />
          </div>
          <div className="flex flex-col">
            <p className="text-[#2B2B2B80]">Favorites</p>
            <p>{vehicle._count.favorites}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 p-5">
        <Button variant="primary" className="w-full" onClick={onClick}>
          View
        </Button>
        <Button
          variant="danger"
          className="bg-[#EB0909] flex items-center justify-center"
          onClick={() => onDelete(vehicle.id)}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <IoTrashBin />
          )}
        </Button>
      </div>
    </div>
  );
};
