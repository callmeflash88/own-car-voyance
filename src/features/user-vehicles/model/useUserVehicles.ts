"use client";
import {
  useChangeCarStatusMutation,
  useDeleteCarMutation,
  useGetMyVehiclesQuery,
} from "../api/userVehiclesApi";

export const useUserVehicles = () => {
  const {
    data: vehicles,
    isLoading: isMyCarLoading,
    error: myCarError,
  } = useGetMyVehiclesQuery();
  const [
    changeStatus,
    { isLoading: isChangeStatusLoading, error: changeStatusError },
  ] = useChangeCarStatusMutation();
  const [
    deleteMyCar,
    { isLoading: isDeleteCarLoading, error: deleteCarError },
  ] = useDeleteCarMutation();

  return {
    vehicles,
    isMyCarLoading,
    myCarError,
    changeStatus,
    isChangeStatusLoading,
    changeStatusError,
    deleteMyCar,
    isDeleteCarLoading,
    deleteCarError,
  };
};
