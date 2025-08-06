"use client";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { Slider } from "@/shared/ui/slider";
import { setPriceFrom, setPriceTo } from "@/features/filter/model/slice";
import { useState } from "react";

interface Props {
  isShowBorder?: boolean;
}

export const PriceFilter = ({ isShowBorder = true }: Props) => {
  const dispatch = useAppDispatch();

  const priceFrom = useAppSelector((state) => state.filters.price_from) ?? 0;
  const priceTo = useAppSelector((state) => state.filters.price_to) ?? 60000;

  const [isOpen, setIsOpen] = useState(true);

  console.log("IS SHOW BORDER", isShowBorder);

  const handlePriceChange = (val: [number, number]) => {
    dispatch(setPriceFrom(val[0]));
    dispatch(setPriceTo(val[1] ?? val[0]));
  };

  return (
    <div className="space-y-4 mt-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between flex items-center gap-2 font-inter font-medium text-xl leading-none tracking-normal align-middle cursor-pointer"
      >
        <span>Price</span>
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
        <>
          <Slider
            min={0}
            max={10000000}
            step={100}
            value={[priceFrom, priceTo]}
            onValueChange={handlePriceChange}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceFrom}</span>
            <span>${priceTo}</span>
          </div>

          {isShowBorder && <hr className="h-[1px] bg-[#2B2B2B33] mt-6" />}
        </>
      )}
      {isShowBorder && <hr className="h-[1px] bg-[#2B2B2B33] mt-6" />}
    </div>
  );
};
