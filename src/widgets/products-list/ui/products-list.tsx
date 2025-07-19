"use client";
import { VehicleCard } from "@/entities/vehicle/ui/VehicleCard";
import { useGetMyFavoriteCarsQuery } from "@/shared/api/carApi";
import { GetMyCarResponse } from "@/shared/types/car";

import { FC, useEffect, useState } from "react";

interface Props {
  vehicles: GetMyCarResponse;
  favorites: any;
}

export const ProductsList: FC<Props> = ({ vehicles, favorites }) => {
  const favoriteIds = favorites?.data?.map((favorite: any) => favorite.id);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {vehicles.data?.length ? (
        vehicles.data.map((vehicle) => (
          <div key={vehicle.id}>
            <VehicleCard
              vehicle={{
                ...vehicle,
                isFavorite: favoriteIds.includes(vehicle.id),
              }}
            />
          </div>
        ))
      ) : (
        <p>Нет доступных автомобилей</p>
      )}
    </div>
  );
};
