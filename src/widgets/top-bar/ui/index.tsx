import { SearchInput } from "@/features/search/ui/SearchInput";
import { SortSelect } from "@/features/sort-view-toggle/ui/sort-select";
import { SlidersVertical } from "lucide-react";
// import { ViewToggle } from "@/features/sort-view-toggle/ui/view-toggle";

interface Props {
  handleOpenFilters: () => void;
}

export const TopBar = ({ handleOpenFilters }: Props) => {
  return (
    <div className="flex-1 flex justify-between gap-2 items-center mb-8 flex-col lg:flex-row">
      <div className="flex-1 w-full lg:max-w-[500px]">
        <SearchInput />
      </div>
      <div className="flex gap-2 w-full xs:gap-5 lg:w-auto">
        <div
          className="flex items-center gap-2 px-5 bg-white border border-gray-200 rounded-[20px] md:hidden"
          onClick={handleOpenFilters}
        >
          <SlidersVertical className="text-[#5511EE]" />
          <span className="hidden font-medium xxs:inline">Filters</span>
        </div>
        <SortSelect />
      </div>
    </div>
  );
};
