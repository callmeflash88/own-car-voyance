"use client";
import { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import {
  applyFilters,
  FiltersState,
  resetFilters,
} from "@/features/filter/model/slice";
import {
  useGetFindCarsFiltersQuery,
  FindCarRequest,
} from "@/shared/api/webSiteApi";

import { FilterBody } from "@/features/filter/ui/filter-body";
import { FilterMake } from "@/features/filter/ui/filter-make";
import { PriceFilter } from "@/features/filter/ui/filter-price";
import { FilterYear } from "@/features/filter/ui/filter-year";
import { ConditionFilter } from "@/features/filter/ui/filter-condition";

import { Button } from "@/shared/ui";
import { SlidersVertical, ChevronDown } from "lucide-react";
import { AdminFilterMake } from "@/features/filter/ui/admin-filter-select";

interface Props {
  onClose?: () => void;
}

const mapFiltersToRequest = (filters: FiltersState): FindCarRequest => ({
  page: 1,
  perPage: 20,
  condition: filters.condition ? [filters.condition] : [],
  make: filters.make,
  body_style: filters.body_style,
  price: {
    from: filters.price_from ?? 0,
    to: filters.price_to ?? 10000000,
  },
  year: {
    from: filters.year_from ?? 1990,
    to: filters.year_to ?? new Date().getFullYear(),
  },
  sort: {
    key: filters.sort.key,
    value: filters.sort.value,
  },
});

export default function FilterPanel({ onClose }: Props) {
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector((state) => state.filters);

  const { data: filters } = useGetFindCarsFiltersQuery();

  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [modalTop, setModalTop] = useState(0);

  const toggleOpen = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setModalTop(rect.bottom + 20);
    }
    setIsOpen((prev) => !prev);
  };

  const handleApply = () => {
    dispatch(applyFilters());
    setIsOpen(false);
    onClose?.();
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={handleClose}
        />
      )}

      {/* Filter button */}
      <div
        ref={buttonRef}
        onClick={toggleOpen}
        className="relative z-50 flex items-center gap-2 px-5 py-3 border rounded-2xl border-neutral-300 cursor-pointer hover:shadow-md transition-all bg-white"
      >
        <SlidersVertical className="text-indigo-600" />
        <span className="text-gray-700 font-medium">Filters</span>
        <ChevronDown
          className={`text-gray-500 w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          style={{ top: modalTop, left: 0 }}
          className="absolute z-50 w-[75vw] bg-white border rounded-xl shadow-xl p-6 animate-fade-in"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ConditionFilter isShowBorder={false} />
            <PriceFilter isShowBorder={false} />
            <AdminFilterMake makes={filters?.makes} isShowBorder={false} />
            <FilterYear isShowBorder={false} />
            <FilterBody body={filters?.body_styles} isShowBorder={false} />
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end gap-4">
            <Button
              variant="outline"
              size="md"
              className="px-6 h-10"
              onClick={handleResetFilters}
            >
              Reset
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="px-8 h-10"
              onClick={handleApply}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
