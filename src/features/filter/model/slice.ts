import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FiltersState {
  make: string[];
  body_style: string[];
  year_from: number | null;
  year_to: number | null;
  price_from: number | null;
  price_to: number | null;
  condition: string | null;
  sort: {
    key: string;
    value: "asc" | "desc";
  };
  readyToApply: boolean;
}

const initialState: FiltersState = {
  make: [],
  body_style: [],
  year_from: null,
  year_to: null,
  price_from: 1000,
  price_to: 250000,
  condition: null,
  sort: {
    key: "popular",
    value: "desc",
  },
  readyToApply: false,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleMake(state, action: PayloadAction<string>) {
      const value = action.payload;
      state.make = state.make.includes(value)
        ? state.make.filter((v) => v !== value)
        : [...state.make, value];
      state.readyToApply = false;
    },
    toggleBodyStyle(state, action: PayloadAction<string>) {
      const value = action.payload;
      state.body_style = state.body_style.includes(value)
        ? state.body_style.filter((v) => v !== value)
        : [...state.body_style, value];
      state.readyToApply = false;
    },
    setYearFrom(state, action: PayloadAction<number | null>) {
      state.year_from = action.payload;
      state.readyToApply = false;
    },
    setYearTo(state, action: PayloadAction<number | null>) {
      state.year_to = action.payload;
      state.readyToApply = false;
    },
    setPriceFrom(state, action: PayloadAction<number>) {
      state.price_from = action.payload;
      state.readyToApply = false;
    },
    setPriceTo(state, action: PayloadAction<number>) {
      state.price_to = action.payload;
      state.readyToApply = false;
    },
    setCondition(state, action: PayloadAction<string | null>) {
      state.condition = action.payload === "" ? null : action.payload;
      state.readyToApply = false;
    },
    resetFilters() {
      return initialState;
    },
    setSort(
      state,
      action: PayloadAction<{ key: string; value: "asc" | "desc" }>
    ) {
      state.sort = action.payload;
      state.readyToApply = false;
    },
    updateFilters(state, action: PayloadAction<Partial<FiltersState>>) {
      Object.assign(state, action.payload);
      state.readyToApply = false;
    },
    applyFilters(state) {
      state.readyToApply = true;
    },
  },
});

export const {
  toggleMake,
  toggleBodyStyle,
  setYearFrom,
  setYearTo,
  setPriceFrom,
  setPriceTo,
  setCondition,
  setSort,
  resetFilters,
  updateFilters,
  applyFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
