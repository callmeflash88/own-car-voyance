import Image from "next/image";
import { FC } from "react";
import { formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";
import { useDeleteUserCarMutation } from "@/shared/api/dashBoardApi";

interface AdminUserVehicleCardProps {
  car: {
    id: number;
    make: string;
    model: string;
    year: number;
    price: number;
    status: number;
    created_at: string;
    images: string[];
    _count: {
      favorites: number;
      popular: number;
    };
  };
  onDeleted?: (id: number) => void;
}

const CAR_STATUS_LABELS: Record<number, string> = {
  1: "Draft",
  2: "Active",
  3: "Sold",
};

const CAR_STATUS_CLASSES: Record<number, string> = {
  1: "text-gray-500",
  2: "text-green-600",
  3: "text-red-600",
};

export const AdminUserVehicleCard: FC<AdminUserVehicleCardProps> = ({
  car,
  onDeleted,
}) => {
  const [deleteCar, { isLoading }] = useDeleteUserCarMutation();

  const statusText = CAR_STATUS_LABELS[car.status] ?? "Unknown";
  const statusClass = CAR_STATUS_CLASSES[car.status] ?? "text-gray-400";
  const timeAgo = formatDistanceToNow(new Date(car.created_at), {
    addSuffix: true,
  });

  const handleDelete = async () => {
    try {
      await deleteCar(car.id.toString()).unwrap();
      onDeleted?.(car.id);
    } catch (error) {
      console.error("Failed to delete car:", error);
      alert("Something went wrong while deleting the vehicle.");
    }
  };

  return (
    <div className="w-full h-[144px] bg-white rounded-[20px] flex overflow-hidden shadow-sm relative group transition-all mt-5">
      <div className="w-[180px] h-full relative flex-shrink-0">
        <Image
          src={car.images[0]}
          alt="Car"
          className="object-cover rounded-l-[20px]"
          fill
          sizes="180px"
        />
      </div>

      <div className="flex flex-1 items-center px-6">
        <div className="flex flex-col w-full gap-3">
          <div className="flex flex-col items-start">
            <h3 className="font-inter font-semibold text-[16px] leading-none tracking-normal">
              {car.make} {car.model} {car.year}
            </h3>
            <div className="text-xl font-semibold text-[#2B2B2B] whitespace-nowrap">
              {car.price}$
            </div>
            <div className="flex items-center text-sm mt-3 gap-3 text-gray-600">
              <span className={statusClass}>{statusText}</span>
              <span className="text-gray-300">|</span>
              <span className="text-blue-600">{car._count.popular} views</span>
              <span className="text-gray-300">|</span>
              <span className="text-blue-600">
                {car._count.favorites} favorites
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">{timeAgo}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-end pr-5 pb-5">
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="bg-red-100 hover:bg-red-200 transition p-3 rounded-full disabled:opacity-50"
        >
          <Trash2 className="text-red-600 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
