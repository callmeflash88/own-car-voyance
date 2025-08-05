"use client";
import { ArrowRight } from "lucide-react";
import { VehicleCard } from "@/entities/vehicle/ui/VehicleCard";
import { Button } from "@/shared/ui";
import { useAppSelector } from "@/shared/lib/hooks";
import { RootState } from "@/shared/store/store";
import { useFindCarMutation } from "@/shared/api/webSiteApi";
import { useEffect } from "react";

// 🔧 Можешь использовать свои скелетоны или простой плейсхолдер
const VehicleCardSkeleton = () => (
  <div className="w-full h-[300px] bg-gray-200 animate-pulse rounded-lg" />
);

export const FeaturedVehicles = () => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [findCar, { data: vehicles, isLoading, error }] = useFindCarMutation();

  useEffect(() => {
    findCar({ perPage: 4 });
  }, [findCar]);

  return (
    <section className="px-4 lg:px-32 py-20 lg:py-32 flex flex-col justify-start items-start">
      <div className="w-full flex justify-between items-center">
        <h2 className="font-inter font-semibold text-[24px] lg:text-[35px] leading-none tracking-normal">
          Featured Vehicles
        </h2>

        <button className="hidden border-none bg-none lg:flex items-center justify-center gap-2">
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-cols-5-3xl gap-4 mt-12">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <VehicleCardSkeleton key={i} />
          ))
        ) : vehicles?.data?.length ? (
          vehicles.data
            .slice(0, 4)
            .map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))
        ) : (
          <p className="text-gray-500">No featured vehicles available.</p>
        )}
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
