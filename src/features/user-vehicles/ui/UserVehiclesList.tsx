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
    handleChangeStatus,
    isChangeStatusLoading,
    changeStatusError,
    deleteMyCar,
    isDeleteCarLoading,
    deleteCarError,
  } = useUserVehicles();

  console.log("vehicles", vehicles);

  if (isMyCarLoading) return <p>Loading...</p>;
  if (!vehicles?.data.length) return <p>No active vehicles.</p>;

  return (
    <div className="flex flex-col gap-4 ">
      {vehicles.data.map((vehicle) => (
        <div className="flex items- center gap-5" key={vehicle.id}>
          <UserVehicleCard vehicle={vehicle} />

          {editMode && (
            <div className="flex flex-col gap-2 py-2">
              <Button
                variant="primary"
                className="text-xs px-3 py-2 rounded  text-white font-bold h-full"
                onClick={() =>
                  vehicle.id !== undefined &&
                  handleChangeStatus(vehicle.id, vehicle.status)
                }
              >
                Change to Draft
              </Button>

              <Button
                variant="danger"
                className="text-xs px-3 py-2 rounded  text-white font-bold h-full"
                onClick={() =>
                  vehicle.id !== undefined && deleteMyCar(vehicle.id.toString())
                }
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
