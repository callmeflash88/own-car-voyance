import { Vehicle } from "@/entities/vehicle/model/types";

import { getFeaturedVehicles } from "../model/getFeaturedVehicles";
import { ArrowRight } from "lucide-react";
import { VehicleCard } from "@/entities/vehicle/ui/VehicleCard";

export const FeaturedVehicles = async () => {
  const vehicles = await getFeaturedVehicles();

  return (
    <section className="px-60 py-32 flex flex-col justify-start items-start">
      <div className="w-full flex justify-between items-center">
        <h2 className="font-inter font-semibold text-[40px] leading-none tracking-normal">
          Featured Vehicles
        </h2>
        <button className="border-none bg-none flex items-center justify-center gap-2">
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="w-full mt-10 flex justify-between flex-wrap gap-4">
        {vehicles.slice(0, 4).map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </section>
  );
};
