import { getFeaturedVehicles } from "../model/getFeaturedVehicles";
import { ArrowRight } from "lucide-react";
import { VehicleCard } from "@/entities/vehicle/ui/VehicleCard";
import { Button } from "@/shared/ui";

export const FeaturedVehicles = async () => {
  const vehicles = await getFeaturedVehicles();

  return (
    <section className="px-4 lg:px-32 py-5 lg:py-32 flex flex-col justify-start items-start">
      <div className="w-full flex justify-between items-center">
        <h2 className="font-inter font-semibold text-[24px] lg:text-[35px] leading-none tracking-normal">
          Featured Vehicles
        </h2>

        <button className="hidden border-none bg-none lg:flex items-center justify-center gap-2">
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="w-full mt-10 flex flex-col lg:flex-row justify-between gap-4">
        {/* {vehicles.slice(0, 4).map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))} LATER*/}
      </div>

      <div className="w-full lg:hidden flex justify-center mt-12">
        <Button
          variant="outline"
          size="md"
          className="!w-full !flex"
          iconRight={<ArrowRight className="w-4 h-4" />}
        >
          View All
        </Button>
      </div>
    </section>
  );
};
