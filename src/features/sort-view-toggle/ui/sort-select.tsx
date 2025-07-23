import { setSort } from "@/features/filter/model/slice";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";

import { Select } from "@/shared/ui";
import { ArrowDownUp } from "lucide-react";

const OPTIONS = [
  { label: "Most Popular", value: "popular-desc" },
  { label: "Price ↑", value: "price-asc" },
  { label: "Price ↓", value: "price-desc" },
];

export const SortSelect = () => {
  const dispatch = useAppDispatch();
  const sort = useAppSelector((state) => state.filters.sort);

  // Составляем value из объекта sort в строку для Select
  const currentValue = `${sort.key}-${sort.value}`;

  const handleChange = (val: string) => {
    const [key, value] = val.split("-") as [string, "asc" | "desc"];
    dispatch(setSort({ key, value }));
  };

  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <div className="flex items-center gap-1 whitespace-nowrap">
        <ArrowDownUp color="#5511EE" size={20} />
        <span className="text-[#2B2B2B80] font-inter font-normal text-[16px]">
          Sort By:
        </span>
      </div>
      <Select
        className="min-w-[160px]"
        value={currentValue}
        onChange={handleChange}
        options={OPTIONS}
        isBordered={false}
      />
    </div>
  );
};
