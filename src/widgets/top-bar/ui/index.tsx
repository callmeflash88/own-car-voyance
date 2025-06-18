import { SearchInput } from "@/features/search/ui/SearchInput";
import { SortSelect } from "@/features/sort-view-toggle/ui/sort-select";
import { ViewToggle } from "@/features/sort-view-toggle/ui/view-toggle";

export const TopBar = () => {
  return (
    <div className="flex-1 flex justify-between gap-2 items-center mb-8">
      <SearchInput />
      <div className="flex gap-5">
        <SortSelect />
        <ViewToggle />
      </div>
    </div>
  );
};
