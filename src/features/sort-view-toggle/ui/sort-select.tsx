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
    <div className="flex-1 flex items-center gap-2 whitespace-nowrap md:flex-auto">
      <Select
        name="sort-by"
        className="min-w-[160px] font-medium bg-white border border-gray-200 rounded-[20px]"
        fieldClassName="py-4 rounded-[20px]"
        value={currentValue}
        onChange={handleChange}
        options={OPTIONS}
        isBordered={false}
        icon={<ArrowDownUp color="#5511EE" size={20} />}
      />
    </div>
  );
};
