"use client";

import { Slider } from "@/shared/ui/slider";
import { useState } from "react";

export const PriceFilter = () => {
  const [range, setRange] = useState<[number, number]>([5000, 30000]);

  return (
    <div className="space-y-4 mt-6">
      <h3 className="font-inter font-medium text-xl leading-none tracking-normal align-middle">
        Price
      </h3>
      <Slider
        min={0}
        max={50000}
        step={1000}
        value={range}
        onValueChange={(val: [number, number]) =>
          setRange([val[0], val[1] ?? val[0]])
        }
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>${range[0]}</span>
        <span>${range[1]}</span>
      </div>
      <hr className="h-[1px] bg-[#2B2B2B33] mt-6" />
    </div>
  );
};
