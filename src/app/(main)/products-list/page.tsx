"use client";
import { FiltersState } from "@/features/filter/model/slice";
import { cn } from "@/lib/utils";
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

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    const request = mapFiltersToRequest(selectedFilters);
    findCar(request);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFiltersOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;

      // Apply styles to prevent scrolling on mobile Chrome
      document.body.style.position = "fixed";
      document.body.style.height = "100%";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      // Store scroll position for restoration
      document.body.dataset.scrollY = scrollY.toString();
    } else {
      // Restore the scroll position
      const scrollY = document.body.dataset.scrollY;

      // Remove the fixed positioning
      document.body.style.position = "";
      document.body.style.height = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
      }

      // Clean up the data attribute
      delete document.body.dataset.scrollY;
    }
  }, [isFiltersOpen]);

  const handleApplyFIlters = () => {
    const request = mapFiltersToRequest(selectedFilters);
    findCar(request);
  };

  const handleOpenFilters = () => {
    setIsFiltersOpen(true);
  };

  const handleCloseFilters = () => {
    setIsFiltersOpen(false);
  };

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
    <div className="max-w-[100vw] overflow-auto flex flex-row px-4 md:px-[90px] lg:px-[120px] pt-10 gap-10">
      <div
        className={cn(
          "fixed inset-0 bg-[#2B2B2B99] z-10 flex justify-center overflow-y-auto pt-[140px] pb-[40px] md:relative md:bg-transparent md:w-[300px] md:shrink-0 md:py-0",
          isFiltersOpen ? "flex" : "hidden",
          "md:block"
        )}
      >
        <Filters
          isOpen={isFiltersOpen}
          filters={filters}
          applyFilters={handleApplyFIlters}
          handleCloseFilters={handleCloseFilters}
        />
      </div>
      <div className="w-full">
        <TopBar handleOpenFilters={handleOpenFilters} />

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
