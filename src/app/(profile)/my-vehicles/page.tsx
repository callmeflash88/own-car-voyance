"use client";
import { VehicleCard } from "@/entities/vehicle/ui/VehicleCard";
import { CreateNewLisitngCard } from "@/features/create-new-listing-card/CreateNewListingCard";
import { VehicleTab } from "@/features/vehicle-tab/VehicleTab";
import {
  CarStatus,
  useChangeCarStatusMutation,
  useDeleteMyCarMutation,
  useGetMyCarsQuery,
} from "@/shared/api/carApi";
import { NotificationService } from "@/shared/lib/NotificationService";
import { Button } from "@/shared/ui";
import { useState } from "react";
import { IoTrashBin } from "react-icons/io5";

export default function MyVehicles() {
  const [type, setType] = useState<CarStatus.ACTIVE | CarStatus.DRAFT>(
    CarStatus.ACTIVE
  );

  const { data: cars, isLoading, isError, refetch } = useGetMyCarsQuery();

  const [changeCarStatus, { isLoading: isChangingStatus }] =
    useChangeCarStatusMutation();
  const [deleteCar, { isLoading: isDeletingCar }] = useDeleteMyCarMutation();

  const [loadingId, setLoadingId] = useState<number | null>(null);

  const changeStatus = async (id: number, status: CarStatus) => {
    setLoadingId(id);
    try {
      await changeCarStatus({
        id: String(id),
        status:
          status === CarStatus.ACTIVE ? CarStatus.DRAFT : CarStatus.ACTIVE,
      }).unwrap();

      NotificationService.success("Status updated successfully");
      await refetch(); // ✅ обновляем список
    } catch (error) {
      NotificationService.error("Failed to update status");
    } finally {
      setLoadingId(null);
    }
  };

  const deleteMyCar = async (id: number) => {
    setLoadingId(id);
    try {
      await deleteCar(String(id)).unwrap();
      NotificationService.success("Car deleted successfully");
      await refetch(); // ✅ обновляем список
    } catch (error) {
      NotificationService.error("Failed to delete car");
    } finally {
      setLoadingId(null);
    }
  };

  const filteredCars = cars?.data.filter((vehicle) => vehicle.status === type);

  return (
    <div className="px-6 py-4">
      <VehicleTab activeTab={type} onChange={setType} />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10">
        <CreateNewLisitngCard />

        {filteredCars?.length ? (
          filteredCars.map((vehicle) => (
            <div key={vehicle.id}>
              <VehicleCard
                vehicle={vehicle}
                variant="owner"
                actions={
                  <>
                    {vehicle.status === CarStatus.DRAFT && (
                      <Button
                        variant="primary"
                        isLoading={loadingId === vehicle.id}
                        onClick={() =>
                          vehicle.id !== undefined &&
                          changeStatus(vehicle.id, vehicle.status)
                        }
                      >
                        List My Vehicle
                      </Button>
                    )}
                    {vehicle.status === CarStatus.ACTIVE && (
                      <Button
                        variant="primary"
                        isLoading={loadingId === vehicle.id}
                        onClick={() =>
                          vehicle.id !== undefined &&
                          changeStatus(vehicle.id, vehicle.status)
                        }
                      >
                        Remove to Drafts
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      className="bg-[#EB090933]"
                      onClick={() =>
                        vehicle.id !== undefined && deleteMyCar(vehicle.id)
                      }
                    >
                      <IoTrashBin />
                    </Button>
                  </>
                }
              />
            </div>
          ))
        ) : (
          <p>No cars found for this status</p>
        )}
      </div>
    </div>
  );
}
