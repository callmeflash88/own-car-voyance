"use client";
import { UserVehicleCard } from "@/entities/vehicle/ui/UserVehicleCard";
import { useUserVehicles } from "../model/useUserVehicles";
import { useState } from "react";
import { Button } from "@/shared/ui";
import { CarStatus } from "@/entities/vehicle/model/types";

interface Props {
  editMode?: boolean;
}

export const UserVehiclesList = ({ editMode }: Props) => {
  const {
    vehicles,
    isMyCarLoading,
    changeStatus,
    isChangeStatusLoading,
    changeStatusError,
    deleteMyCar,
    isDeleteCarLoading,
    deleteCarError,
  } = useUserVehicles();

  if (isMyCarLoading) return <p>Loading...</p>;
  if (!vehicles?.length) return <p>No active vehicles.</p>;

  return (
    <div className="flex flex-col gap-4 ">
      {vehicles.map((vehicle) => (
        <div className="flex items- center gap-5" key={vehicle.id}>
          <UserVehicleCard />

          {editMode && (
            <div className="flex flex-col gap-2 py-2">
              <Button
                variant="primary"
                className="text-xs px-3 py-2 rounded  text-white font-bold h-full"
                onClick={() =>
                  changeStatus({
                    id: vehicle.id.toString(),
                    status: CarStatus.DRAFT,
                  })
                }
              >
                Change to Draft
              </Button>
              <Button
                variant="outline"
                className="text-xs px-3 py-2 rounded  font-bold h-full"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                className="text-xs px-3 py-2 rounded  text-white font-bold h-full"
                onClick={() => deleteMyCar(vehicle.id.toString())}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
