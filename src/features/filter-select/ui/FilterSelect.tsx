"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react";

const options = [
  "Newest Listings",
  "Most Popular",
  "Highest Rated",
  "Newest First",
  "Oldest First",
];

export type FilterSelectProps = {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
};

export default function FilterSelect({
  options,
  selected,
  onChange,
}: FilterSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left w-56">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full px-5 py-3 rounded-full border flex items-center justify-center gap-5 transition ${
          open
            ? "border-[#8000FF] text-[#8000FF]"
            : "border-gray-200 text-black"
        }`}
      >
        <div className="flex items-center gap-2">
          <ArrowUpDown size={18} className="text-[#8000FF]" />
          <span className="font-medium">{selected}</span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {open && (
        <div className="absolute mt-2 w-full bg-white rounded-lg shadow z-10">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`w-full text-left px-5 py-2 rounded-md transition font-medium ${
                option === selected
                  ? "bg-gray-100 text-black"
                  : "hover:bg-gray-50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
