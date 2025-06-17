import { FilterBody } from "@/features/filter-body/ui";
import { FilterMake } from "@/features/filter-make/ui/filter-make";
import { FilterYear } from "@/features/filter-year/ui/filter-year";
import { PriceFilter } from "@/features/price-filter/ui/price-filter";
import { Button } from "@/shared/ui";
import { SortAsc } from "lucide-react";

export const Filters = () => {
  return (
    <aside className="py-10 px-6 border w-full max-w-[300px] h-[900px] rounded-[20px]">
      <div className="flex justify-between">
        <h2 className="font-inter font-semibold text-2xl leading-none tracking-normal align-middle">
          Filters
        </h2>
        <SortAsc />
      </div>
      <hr className="h-[1px] bg-[#2B2B2B33] mt-6" />
      <div></div>
      <FilterMake />
      <PriceFilter />
      <FilterBody />
      <FilterYear />
      <Button variant="primary" size="lg" className="mx-auto mt-6 w-full">
        Apply
      </Button>
      {/* Тут могут быть другие фильтры: make, year, etc */}
    </aside>
  );
};
