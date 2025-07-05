"use client";
import { UserVehicleCard } from "@/entities/vehicle/ui/UserVehicleCard";
import { useUserVehicles } from "../model/useUserVehicles";

export const UserVehiclesList = () => {
  const { vehicles, isLoading } = useUserVehicles();

  if (isLoading) return <p>Loading...</p>;
  if (!vehicles?.length) return <p>No active vehicles.</p>;

  return (
    <div className="flex flex-col gap-4 ">
      {vehicles.map((vehicle) => (
        <UserVehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};
