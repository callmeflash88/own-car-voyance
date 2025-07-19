"use client";
import { CarStatus } from "@/shared/api/carApi";
import {
  useChangeCarStatusMutation,
  useDeleteCarMutation,
  useGetMyVehiclesQuery,
} from "../api/userVehiclesApi";
import { NotificationService } from "@/shared/lib/NotificationService";

export const useUserVehicles = () => {
  const {
    data: vehicles,
    isLoading: isMyCarLoading,
    error: myCarError,
    refetch,
  } = useGetMyVehiclesQuery();
  const [
    changeStatus,
    { isLoading: isChangeStatusLoading, error: changeStatusError },
  ] = useChangeCarStatusMutation();
  const [
    deleteMyCar,
    { isLoading: isDeleteCarLoading, error: deleteCarError },
  ] = useDeleteCarMutation();

  const handleChangeStatus = async (id: number, status: CarStatus) => {
    try {
      await changeStatus({
        id: String(id),
        status:
          status === CarStatus.ACTIVE ? CarStatus.DRAFT : CarStatus.ACTIVE,
      }).unwrap();

      NotificationService.success("Status updated successfully");
      await refetch();
    } catch (error) {
      NotificationService.error("Failed to update status");
    } finally {
      // setLoadingId(null);
    }
  };

  return {
    vehicles,
    isMyCarLoading,
    myCarError,
    changeStatus,
    handleChangeStatus,
    isChangeStatusLoading,
    changeStatusError,
    deleteMyCar,
    isDeleteCarLoading,
    deleteCarError,
  };
};
