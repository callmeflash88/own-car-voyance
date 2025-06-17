import { Filters } from "@/widgets/filters/ui/filters";
import { ProductsList } from "@/widgets/products-list/ui/products-list";

export default function ProductsListPage() {
  return (
    <div className="flex px-[120px] pt-16 gap-4">
      <div className="min-w-[300px]">
        <Filters />
      </div>
      <div>
        <div className="flex-1 ">
          <ProductsList />
        </div>
      </div>
    </div>
  );
}
