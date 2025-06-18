"use client";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { setView } from "../model/slice";
import { Grid3x3, Rows2 } from "lucide-react";

export const ViewToggle = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.sort.view);

  return (
    <div className="flex gap-2">
      <button
        className={`px-3 py-1 border rounded ${
          value === "grid" ? "bg-gray-200" : ""
        }`}
        onClick={() => dispatch(setView("grid"))}
      >
        <Grid3x3 fill="#2B2B2B" color="white" />
      </button>
      <button
        className={`px-3 py-1 border rounded ${
          value === "list" ? "bg-gray-200" : ""
        }`}
        onClick={() => dispatch(setView("list"))}
      >
        <Rows2 fill="#2B2B2B" color="white" />
      </button>
    </div>
  );
};
