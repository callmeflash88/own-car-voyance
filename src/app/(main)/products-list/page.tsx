"use client";
import { useGetMyFavoriteCarsQuery } from "@/shared/api/carApi";
import { useFindCarQuery } from "@/shared/api/webSiteApi";
import { Filters } from "@/widgets/filters/ui/filters";
import { ProductsList } from "@/widgets/products-list/ui/products-list";
import { TopBar } from "@/widgets/top-bar/ui";

export default function ProductsListPage() {
  const { data: vehicles, isLoading } = useFindCarQuery();
  const { data: favorites, isLoading: isFavoritesLoading } =
    useGetMyFavoriteCarsQuery();

  console.log("Vehicles", vehicles);

  return (
    <div className="max-w-[100vw] overflow-auto flex flex-row px-4 lg:px-[120px] pt-10 gap-10">
      <div className="block w-[300px] shrink-0">
        <Filters />
      </div>
      <div className="w-full">
        {isLoading || isFavoritesLoading ? (
          <div className="w-full h-[60vh] flex justify-center items-center">
            <div className="w-12 h-12 border-4 border-[#4E17E5] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <TopBar />
            <ProductsList vehicles={vehicles} favorites={favorites} />
          </>
        )}
      </div>
    </div>
  );
}
