"use client";
import { useGetMyFavoriteCarsQuery } from "@/shared/api/carApi";
import { ProductsList } from "@/widgets/products-list/ui/products-list";

export default function Favorites() {
  const { data: favorites, isLoading } = useGetMyFavoriteCarsQuery();

  if (isLoading || !favorites) {
    return (
      <div className="w-full h-[60vh] flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-[#4E17E5] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-6 py-4">
      <ProductsList
        vehicles={favorites}
        favorites={favorites}
        proceedButton={true}
        isAuthenticated
      />
    </div>
  );
}
