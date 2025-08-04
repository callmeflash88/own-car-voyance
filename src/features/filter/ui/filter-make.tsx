"use client";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { Checkbox } from "@/shared/ui/checkbox";
import { FC, useState } from "react";
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

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-2 mt-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center gap-2 font-inter font-medium text-xl leading-none tracking-normal align-middle cursor-pointer"
      >
        <span>Make</span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="mt-6">
          {makes.map((make) => (
            <div
              key={make.value}
              className="flex items-center justify-between gap-2 mb-1"
            >
              <label
                htmlFor={make.value}
                className="cursor-pointer text-[#2B2B2B80]"
              >
                {make.value} ({make.count})
              </label>
              <Checkbox
                id={make.value}
                className="cursor-pointer"
                checked={selected.includes(make.value)}
                onCheckedChange={() => dispatch(toggleMake(make.value))}
              />
            </div>
          ))}
        </div>
      )}
      <hr className="h-[1px] bg-[#2B2B2B33] mt-6" />
    </div>
  );
};
