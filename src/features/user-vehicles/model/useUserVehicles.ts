"use client";
import { useGetMyVehiclesQuery } from "../api/userVehiclesApi";

export const useUserVehicles = () => {
  const { data: vehicles, isLoading, error } = useGetMyVehiclesQuery();

  return { vehicles, isLoading, error };
};
