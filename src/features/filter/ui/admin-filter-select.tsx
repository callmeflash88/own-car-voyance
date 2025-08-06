"use client";
import { FC, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { toggleMake } from "../model/slice";

interface Make {
  value: string;
  count: number;
}

interface Props {
  makes: Make[];
  isShowBorder?: boolean;
}

export const AdminFilterMake: FC<Props> = ({ makes, isShowBorder = true }) => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.filters.make);

  const [isOpen, setIsOpen] = useState(false); // dropdown only
  const [search, setSearch] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredMakes = makes.filter((make) =>
    make.value.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggle = (value: string) => {
    dispatch(toggleMake(value));
  };

  const handleRemoveTag = (value: string) => {
    dispatch(toggleMake(value));
  };

  // Закрытие dropdown при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="mb-2 mt-6 relative">
      {/* Заголовок */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center gap-2 font-inter font-medium text-xl leading-none tracking-normal align-middle cursor-pointer"
      >
        <span>Make</span>
        {isShowBorder && (
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </button>

      {/* Поле ввода — ВСЕГДА видно */}
      <input
        type="text"
        placeholder="Search make..."
        value={search}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
        className="w-full mt-4 border border-gray-300 rounded px-2 py-1 focus:outline-none"
      />

      {/* Выпадающий список — показывается ТОЛЬКО если isOpen */}
      {isOpen && filteredMakes.length > 0 && (
        <ul className="absolute z-10 bg-white w-full border border-gray-300 mt-1 rounded max-h-60 overflow-y-auto shadow-lg">
          {filteredMakes.map((make) => (
            <li
              key={make.value}
              onClick={() => handleToggle(make.value)}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                selected.includes(make.value) ? "bg-purple-100" : ""
              }`}
            >
              {make.value} ({make.count})
            </li>
          ))}
        </ul>
      )}

      {/* Выбранные теги */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selected.map((value) => (
            <span
              key={value}
              className="flex items-center gap-1 bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm"
            >
              {value}
              <button
                onClick={() => handleRemoveTag(value)}
                className="ml-1 text-purple-500 hover:text-purple-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {isShowBorder && <hr className="h-[1px] bg-[#2B2B2B33] mt-6" />}
    </div>
  );
};
