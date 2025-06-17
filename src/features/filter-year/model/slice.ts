import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterYearState {
  yearFrom: number;
  yearTo: number;
}

const initialState: FilterYearState = {
  yearFrom: 0,
  yearTo: 0,
};

const filterYearSlice = createSlice({
  name: "filterYear",
  initialState,
  reducers: {
    setYearFrom: (state, action: PayloadAction<number>) => {
      state.yearFrom = action.payload;
    },
    setYearTo: (state, action: PayloadAction<number>) => {
      state.yearTo = action.payload;
    },
  },
});

export const { setYearFrom, setYearTo } = filterYearSlice.actions;
export default filterYearSlice.reducer;
