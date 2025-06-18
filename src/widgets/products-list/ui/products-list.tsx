import { VehicleCard } from "@/entities/vehicle/ui/VehicleCard";
import { getFeaturedVehicles } from "@/widgets/featured-vehicles/model/getFeaturedVehicles";

export const ProductsList = async () => {
  const vehicles = await getFeaturedVehicles();

  return (
    <div className="flex flex-wrap justify-between gap-4">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};
