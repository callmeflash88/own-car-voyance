"use client";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { Input } from "@/shared/ui";
import { setYearFrom, setYearTo } from "../model/slice";
import { useState } from "react";

interface Props {
  isShowBorder?: boolean;
}

export const FilterYear = ({ isShowBorder = true }: Props) => {
  const dispatch = useAppDispatch();

  const yearFrom = useAppSelector((state) => state.filters.year_from);
  const yearTo = useAppSelector((state) => state.filters.year_to);

  const [isOpen, setIsOpen] = useState(true);

  const handleYearChange = (inputValue: string, type: "from" | "to") => {
    if (!/^(\d*)$/.test(inputValue)) return;
    const value = !inputValue ? null : Number(inputValue);

    if (type === "from") {
      dispatch(setYearFrom(value));
    } else {
      dispatch(setYearTo(value));
    }
  };

  return (
    <div className="mb-2 mt-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between flex items-center gap-2 font-inter font-medium text-xl leading-none tracking-normal align-middle cursor-pointer"
      >
        <span>Year</span>
        {isShowBorder && (
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
        )}
      </button>

      {isOpen && (
        <div className="mt-6 flex justify-between items-center">
          <Input
            placeholder="From"
            onChange={(e) => handleYearChange(e.target.value, "from")}
            value={yearFrom ?? ""}
            className="placeholder:text-center"
          />
          <span className="text-gray-400 mx-1">–</span>
          <Input
            placeholder="To"
            onChange={(e) => handleYearChange(e.target.value, "to")}
            value={yearTo ?? ""}
            className="placeholder:text-center"
          />
        </div>
      )}
      {isShowBorder && <hr className="h-[1px] bg-[#2B2B2B33] mt-6" />}
    </div>
  );
};
