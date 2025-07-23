"use client";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { Badge } from "@/shared/ui";

import { FC } from "react";
import { toggleBodyStyle } from "../model/slice";

interface Body {
  value: string;
  count: number;
}

interface Props {
  body: Body[];
}

export const FilterBody: FC<Props> = ({ body }) => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.filters.body_style);

  return (
    <div className="mb-2 mt-6">
      <h3 className="font-inter font-medium text-xl leading-none tracking-normal align-middle">
        Body Style
      </h3>
      <div className="mt-6 flex flex-wrap gap-2">
        {body.map((body) => (
          <div key={body.value} className="flex items-center gap-2 mb-1 ">
            <Badge
              label={body.value}
              active={selected.includes(body.value)}
              // onClick={() => onChange(body.value)}
              onClick={() => dispatch(toggleBodyStyle(body.value))}
            />
          </div>
        ))}
      </div>
      <hr className="h-[1px] bg-[#2B2B2B33] mt-6" />
    </div>
  );
};
