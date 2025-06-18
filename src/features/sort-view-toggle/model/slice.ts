import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SortType = "popular" | "price-asc" | "price-desc";
export type ViewType = "grid" | "list";

interface SortViewState {
  sort: SortType;
  view: ViewType;
}

const initialState: SortViewState = {
  sort: "popular",
  view: "grid",
};

export const sortViewSlice = createSlice({
  name: "sortView",
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
    },
    setView: (state, action: PayloadAction<ViewType>) => {
      state.view = action.payload;
    },
  },
});

export const { setSort, setView } = sortViewSlice.actions;
export default sortViewSlice.reducer;
