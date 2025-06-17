"use client";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";

import { Checkbox } from "@/shared/ui/checkbox";
import { toggleMake } from "../model/store";

const MAKES = ["BMW", "Tesla", "Ford", "Toyota", "Honda"];

export const FilterMake = () => {
  const selected = useAppSelector((state) => state.filterMake.selected);
  const dispatch = useAppDispatch();

  return (
    <div className="mb-2 mt-6">
      <h3 className="font-inter font-medium text-xl leading-none tracking-normal align-middle">
        Make
      </h3>
      <div className="mt-6">
        {MAKES.map((make) => (
          <div key={make} className="flex items-center gap-2 mb-1 ">
            <Checkbox
              checked={selected.includes(make)}
              onCheckedChange={() => dispatch(toggleMake(make))}
            />

            <span>{make}</span>
          </div>
        ))}
      </div>
      <hr className="h-[1px] bg-[#2B2B2B33] mt-6" />
    </div>
  );
};
