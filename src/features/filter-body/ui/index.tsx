"use client";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { Badge } from "@/shared/ui";
import { toggleBody } from "../model/slice";

const BODY = ["Sedan", "SUV", "Truck", "Coupe", "Convertible"];

export const FilterBody = () => {
  const selected = useAppSelector((state) => state.filterBody.selected);
  const dispatch = useAppDispatch();

  console.log("selected", selected);

  return (
    <div className="mb-2 mt-6">
      <h3 className="font-inter font-medium text-xl leading-none tracking-normal align-middle">
        Body Style
      </h3>
      <div className="mt-6 flex flex-wrap gap-2">
        {BODY.map((body) => (
          <div key={body} className="flex items-center gap-2 mb-1 ">
            <Badge
              label={body}
              active={selected.includes(body)}
              onClick={() => dispatch(toggleBody(body))}
            />
          </div>
        ))}
      </div>
      <hr className="h-[1px] bg-[#2B2B2B33] mt-6" />
    </div>
  );
};
