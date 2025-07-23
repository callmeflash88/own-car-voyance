"use client";
import { useAppDispatch } from "@/shared/lib/hooks";
import { Input } from "@/shared/ui";
import { setYearFrom, setYearTo } from "../model/slice";

export const FilterYear = () => {
  // const { yearFrom, yearTo } = useAppSelector((state) => state.filterYear);
  const dispatch = useAppDispatch();

  return (
    <div className="mb-2 mt-6">
      <h3 className="font-inter font-medium text-xl leading-none tracking-normal align-middle">
        Year
      </h3>
      <div className="mt-6 flex justify-between items-center">
        <Input
          placeholder="From"
          onChange={(e) => dispatch(setYearFrom(Number(e.target.value)))}
          //   value={yearFrom}
          className="w-[48%]"
        />
        <span className="text-gray-400 mx-1">–</span>
        <Input
          placeholder="To"
          onChange={(e) => dispatch(setYearTo(Number(e.target.value)))}
          //   value={yearTo}
          className="w-[48%]"
        />
      </div>
    </div>
  );
};
