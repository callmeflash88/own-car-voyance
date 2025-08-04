"use client";

import { useState } from "react";
import { setCondition } from "@/features/filter/model/slice";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { Badge } from "@/shared/ui";

const Conditions = [
  { key: "All", value: "" },
  { key: "New", value: "new" },
  { key: "Used", value: "used" },
];

export const ConditionFilter = () => {
  const dispatch = useAppDispatch();
  const selectedCondition =
    useAppSelector((state) => state.filters.condition) ?? "";

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="space-y-4 mt-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between flex items-center gap-2 font-inter font-medium text-xl leading-none tracking-normal align-middle cursor-pointer"
      >
        <span>Condition</span>
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
        <div className="flex gap-2">
          {Conditions.map(({ key, value }) => {
            const isSelected = selectedCondition === value;

            return (
              <div key={key}>
                <Badge
                  label={key}
                  active={isSelected}
                  onClick={() => dispatch(setCondition(value))}
                />
              </div>
            );
          })}
        </div>
      )}
      <hr className="h-[1px] bg-[#2B2B2B33] mt-6" />
    </div>
  );
};
