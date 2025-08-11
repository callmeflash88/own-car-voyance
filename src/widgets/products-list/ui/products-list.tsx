"use client";
import { VehicleCard } from "@/entities/vehicle/ui/VehicleCard";
import { GetMyCarResponse } from "@/shared/types/car";
import { Button } from "@/shared/ui";
import { useRouter } from "next/navigation";

import { FC } from "react";

interface Props {
  vehicles: GetMyCarResponse;
  favorites: any;
  proceedButton?: boolean;
  isAuthenticated: boolean;
}

export const ProductsList: FC<Props> = ({
  vehicles,
  favorites,
  isAuthenticated,
  proceedButton = false,
}) => {
  const favoriteIds = favorites?.data?.map((favorite: any) => favorite.id);
  const router = useRouter();

  console.log("ProductsList", vehicles);

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-cols-5-3xl gap-4">
      {vehicles.data?.length ? (
        vehicles.data.map((vehicle) => (
          <div key={vehicle.id}>
            <VehicleCard
              isProductList
              vehicle={{
                ...vehicle,
                isFavorite: favoriteIds?.includes(vehicle.id),
              }}
              isAuthenticated={isAuthenticated}
              actions={
                proceedButton && (
                  <Button variant="primary" className="w-full mt-4">
                    Proceed to Order
                  </Button>
                )
              }
              onClick={() => router.push(`/car/${vehicle.id}`)}
            />
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
