"use client";
import { FiltersState } from "@/features/filter/model/slice";
import { useGetMyFavoriteCarsQuery } from "@/shared/api/carApi";
import {
  FindCarRequest,
  useFindCarMutation,
  useGetFindCarsFiltersQuery,
} from "@/shared/api/webSiteApi";
import { useAppSelector } from "@/shared/lib/hooks";
import { RootState } from "@/shared/store/store";
import { Filters } from "@/widgets/filters/ui/filters";
import { ProductsList } from "@/widgets/products-list/ui/products-list";
import { TopBar } from "@/widgets/top-bar/ui";
import { useEffect, useRef, useState } from "react";

export const mapFiltersToRequest = (filters: FiltersState): FindCarRequest => {
  debugger;
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

export default function ProductsListPage() {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const selectedFilters = useAppSelector((state) => state.filters);

  const { data: favorites, isLoading: isFavoritesLoading } =
    useGetMyFavoriteCarsQuery();
  const { data: filters, isLoading: isFiltersLoading } =
    useGetFindCarsFiltersQuery();

  const [findCar, { data: vehicles, isLoading, error }] = useFindCarMutation();

  useEffect(() => {
    const request = mapFiltersToRequest(selectedFilters);
    findCar(request);
  }, []);

  const handleApplyFIlters = () => {
    const request = mapFiltersToRequest(selectedFilters);
    findCar(request);
  };

  console.log("filters", filters);

  const prevSortRef = useRef(selectedFilters?.sort);

  useEffect(() => {
    const prevSort = prevSortRef.current;
    if (
      prevSort.key !== selectedFilters.sort.key ||
      prevSort.value !== selectedFilters.sort.value
    ) {
      const request = mapFiltersToRequest(selectedFilters);
      findCar(request);
    }
    prevSortRef.current = selectedFilters.sort;
  }, [selectedFilters.sort, findCar]);

  if (error) return <div>Error loading cars</div>;

  return (
    <div className="max-w-[100vw] overflow-auto flex flex-row px-4 lg:px-[120px] pt-10 gap-10">
      <div className="block w-[300px] shrink-0">
        <Filters filters={filters} applyFilters={handleApplyFIlters} />
      </div>
      <div className="w-full">
        <TopBar />

        {isLoading || isFavoritesLoading ? (
          <div className="w-full h-[60vh] flex justify-center items-center">
            <div className="w-12 h-12 border-4 border-[#4E17E5] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {vehicles && (
              <ProductsList
                vehicles={vehicles}
                favorites={favorites}
                isAuthenticated={isAuthenticated}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
