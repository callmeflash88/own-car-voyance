"use client";
import { VehicleCard } from "@/entities/vehicle/ui/VehicleCard";
import { useGetMyFavoriteCarsQuery } from "@/shared/api/carApi";
import { GetMyCarResponse } from "@/shared/types/car";
import { Button } from "@/shared/ui";
import { useRouter } from "next/navigation";

import { FC, useEffect, useState } from "react";

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {vehicles.data?.length ? (
        vehicles.data.map((vehicle) => (
          <div key={vehicle.id}>
            <VehicleCard
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
