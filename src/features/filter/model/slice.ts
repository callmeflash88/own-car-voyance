// features/filters/model/slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  make: string[];
  body_style: string[];
  year_from: number | null;
  year_to: number | null;
  price_from: number | null;
  price_to: number | null;
}

const initialState: FiltersState = {
  make: [],
  body_style: [],
  year_from: null,
  year_to: null,
  price_from: null,
  price_to: null,
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
    },
    toggleBodyStyle(state, action: PayloadAction<string>) {
      const value = action.payload;
      state.body_style = state.body_style.includes(value)
        ? state.body_style.filter((v) => v !== value)
        : [...state.body_style, value];
    },
    setYearFrom(state, action: PayloadAction<number>) {
      state.year_from = action.payload;
    },
    setYearTo(state, action: PayloadAction<number>) {
      state.year_to = action.payload;
    },
    setPriceFrom(state, action: PayloadAction<number>) {
      state.price_from = action.payload;
    },
    setPriceTo(state, action: PayloadAction<number>) {
      state.price_to = action.payload;
    },
    resetFilters() {
      return initialState;
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
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
