"use client";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { setSort, SortType } from "../model/slice";
import { Select } from "@/shared/ui";
import { ArrowDownUp } from "lucide-react";

const OPTIONS: { label: string; value: SortType }[] = [
  { label: "Most Popular", value: "popular" },
  { label: "Price ↑", value: "price-asc" },
  { label: "Price ↓", value: "price-desc" },
];

export const SortSelect = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.sort.sort);

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
        value={value}
        onChange={(e) => dispatch(setSort(value as SortType))}
        options={OPTIONS}
        isBordered={false}
      />
    </div>
  );
};
