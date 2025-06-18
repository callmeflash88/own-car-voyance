"use client";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { Input } from "@/shared/ui";
import { setQuery } from "../model/searchSlice";
import { SearchIcon } from "lucide-react";

export const SearchInput = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.search.query);
  return (
    <>
      <Input
        icon={<SearchIcon color="#5511EE" />}
        iconPosition="left"
        type="text"
        value={value}
        onChange={(e) => dispatch(setQuery(e.target.value))}
        placeholder="Search (Ex. BMW, car parts, reviews)"
        className="!w-[35vw]"
      />
    </>
  );
};
