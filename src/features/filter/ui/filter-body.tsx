"use client";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { Badge } from "@/shared/ui";
import { FC, useState } from "react";
import { toggleBodyStyle } from "../model/slice";

interface Body {
  value: string;
  count: number;
}

interface Props {
  body: Body[];
  isShowBorder?: boolean;
}

export const FilterBody: FC<Props> = ({ body, isShowBorder = true }) => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.filters.body_style);

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-2 mt-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between flex items-center gap-2 font-inter font-medium text-xl leading-none tracking-normal align-middle cursor-pointer"
      >
        <span>Body Style</span>
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
        <div className="mt-6 flex flex-wrap gap-2">
          {body.map((body) => (
            <div key={body.value} className="flex items-center gap-2 mb-1 ">
              <Badge
                label={body.value}
                active={selected.includes(body.value)}
                onClick={() => dispatch(toggleBodyStyle(body.value))}
              />
            </div>
          ))}
        </div>
      )}

      {isShowBorder && <hr className="h-[1px] bg-[#2B2B2B33] mt-6" />}
    </div>
  );
};
