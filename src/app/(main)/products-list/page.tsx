import { Filters } from "@/widgets/filters/ui/filters";
import { ProductsList } from "@/widgets/products-list/ui/products-list";
import { TopBar } from "@/widgets/top-bar/ui";

export default function ProductsListPage() {
  return (
    <div className="max-w-[100vw] overflow-auto flex flex-row px-4 lg:px-[120px] pt-10 gap-10">
      <div className="block w-[300px] shrink-0">
        <Filters />
      </div>
      <div className="">
        <TopBar />
        <ProductsList />
      </div>
    </div>
  );
}
