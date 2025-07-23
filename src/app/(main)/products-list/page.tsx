"use client";
import { useGetMyFavoriteCarsQuery } from "@/shared/api/carApi";
import {
  useFindCarQuery,
  useGetFindCarsFiltersQuery,
} from "@/shared/api/webSiteApi";
import { useAppSelector } from "@/shared/lib/hooks";
import { RootState } from "@/shared/store/store";
import { Filters } from "@/widgets/filters/ui/filters";
import { ProductsList } from "@/widgets/products-list/ui/products-list";
import { TopBar } from "@/widgets/top-bar/ui";
import { useState } from "react";

export default function ProductsListPage() {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const selectedFilters = useAppSelector((state) => state.filters);

  const { data: vehicles, isLoading } = useFindCarQuery();
  const { data: favorites, isLoading: isFavoritesLoading } =
    useGetMyFavoriteCarsQuery();
  const { data: filters, isLoading: isFiltersLoading } =
    useGetFindCarsFiltersQuery();

  console.log("Is Authenticated:", isAuthenticated);

  return (
    <div className="max-w-[100vw] overflow-auto flex flex-row px-4 lg:px-[120px] pt-10 gap-10">
      <div className="block w-[300px] shrink-0">
        <Filters filters={filters} />
      </div>
      <div className="w-full">
        {isLoading || isFavoritesLoading ? (
          <div className="w-full h-[60vh] flex justify-center items-center">
            <div className="w-12 h-12 border-4 border-[#4E17E5] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <TopBar />
            <ProductsList
              vehicles={vehicles}
              favorites={favorites}
              isAuthenticated={isAuthenticated}
            />
          </>
        )}
      </div>
    </div>
  );
}
