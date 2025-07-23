import { FilterBody } from "@/features/filter/ui/filter-body";
import { ConditionFilter } from "@/features/filter/ui/filter-condition";
import { FilterMake } from "@/features/filter/ui/filter-make";
import { PriceFilter } from "@/features/filter/ui/filter-price";
import { FilterYear } from "@/features/filter/ui/filter-year";
import { useAppSelector } from "@/shared/lib/hooks";
import { Button } from "@/shared/ui";
import { SortAsc } from "lucide-react";
import { FC, useState } from "react";

interface Props {
  filters: any;
  applyFilters: () => void;
}

export const Filters: FC<Props> = ({ filters, applyFilters }) => {
  const selectedFilters = useAppSelector((state) => state.filters);

  return (
    <aside className="py-10 px-6 border w-full max-w-[300px] h-[900px] rounded-[20px]">
      <div className="flex justify-between">
        <h2 className="font-inter font-semibold text-2xl leading-none tracking-normal align-middle">
          Filters
        </h2>
        <SortAsc />
      </div>
      <hr className="h-[1px] bg-[#2B2B2B33] mt-6" />

      <ConditionFilter />

      {filters?.makes && <FilterMake makes={filters.makes} />}

      <PriceFilter />

      {filters?.body_styles && <FilterBody body={filters.body_styles} />}

      <FilterYear />

      <Button
        variant="primary"
        size="lg"
        className="mx-auto mt-6 w-full"
        onClick={() => {
          console.log("Фильтры при нажатии Apply:", selectedFilters);
          applyFilters();
          // тут можно отправлять selectedFilters в fetch-запрос или роут
        }}
      >
        Apply
      </Button>
    </aside>
  );
};
