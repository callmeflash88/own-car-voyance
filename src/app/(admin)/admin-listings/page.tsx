"use client";
import { AdminVehicleCard } from "@/entities/vehicle/ui/AdminVehicleCatd";
import { FiltersState, updateFilters } from "@/features/filter/model/slice";
import {
  useDeleteCarMutation,
  useDeleteUserCarMutation,
  useGetAdminCarsMutation,
} from "@/shared/api/dashBoardApi";
import { FindCarRequest } from "@/shared/api/webSiteApi";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { useEffect, useState } from "react";

const mapFiltersToRequest = (filters: FiltersState): FindCarRequest => {
  return {
    page: 1,
    perPage: 20,
    condition: filters.condition ? [filters.condition] : [],
    make: filters.make,
    body_style: filters.body_style,
    price: {
      from: filters.price_from ?? 0,
      to: filters.price_to ?? 10000000,
    },
    year: {
      from: filters.year_from ?? 1990,
      to: filters.year_to ?? new Date().getFullYear(),
    },
    sort: {
      key: filters.sort.key,
      value: filters.sort.value,
    },
  };
};

export default function AdminListings() {
  const selectedFilters = useAppSelector((state) => state.filters);
  const [findCar, { data: listings, isLoading }] = useGetAdminCarsMutation();
  const [deleteCar] = useDeleteUserCarMutation();
  const dispatch = useAppDispatch();

  // ✅ 1. Загрузка при первом заходе на страницу
  useEffect(() => {
    const request = mapFiltersToRequest(selectedFilters);
    findCar(request);
  }, []); // только при первом рендере

  // ✅ 2. Загрузка по кнопке "Apply Filter"
  useEffect(() => {
    if (selectedFilters.readyToApply) {
      const request = mapFiltersToRequest(selectedFilters);
      findCar(request);
      dispatch(updateFilters({ readyToApply: false }));
    }
  }, [selectedFilters.readyToApply]);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const onCarDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteCar(id).unwrap();
      // возможно стоит перезапросить данные, если удалили
      const request = mapFiltersToRequest(selectedFilters);
      await findCar(request);
    } catch (error) {
      console.error("Failed to delete car", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-[100vw] overflow-auto flex flex-col px-4  lg:px-[60px] pt-10 gap-10">
      <div className="text-[#2B2B2B80]">
        Total listings: {listings?.pagination?.total || 0}
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-xl text-gray-500">
          Loading listings...
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {listings?.data.length ? (
            listings.data.map((vehicle: any) => (
              <div key={vehicle.id}>
                <AdminVehicleCard
                  vehicle={vehicle}
                  onDelete={onCarDelete}
                  isDeleting={deletingId === vehicle.id}
                />
              </div>
            ))
          ) : (
            <p>No active vehicles.</p>
          )}
        </div>
      )}
    </div>
  );
}
