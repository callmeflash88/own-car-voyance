"use client";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { Checkbox } from "@/shared/ui/checkbox";
import { FC } from "react";
import { toggleMake } from "../model/slice";

interface Make {
  value: string;
  count: number;
}

interface Props {
  makes: Make[];
}

export const FilterMake: FC<Props> = ({ makes }) => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.filters.make);

  return (
    <div className="mb-2 mt-6">
      <h3 className="font-inter font-medium text-xl leading-none tracking-normal align-middle">
        Make
      </h3>
      <div className="mt-6">
        {makes.map((make) => (
          <div key={make.value} className="flex items-center gap-2 mb-1">
            <Checkbox
              checked={selected.includes(make.value)}
              onCheckedChange={() => dispatch(toggleMake(make.value))}
            />
            <span>
              {make.value} ({make.count})
            </span>
          </div>
        ))}
      </div>
      <hr className="h-[1px] bg-[#2B2B2B33] mt-6" />
    </div>
  );
};
