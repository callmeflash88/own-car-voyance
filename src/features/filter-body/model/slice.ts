import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterBodyState {
  selected: string[];
}

const initialState: FilterBodyState = {
  selected: [],
};

const filterMakeSlice = createSlice({
  name: "filterBody",
  initialState,
  reducers: {
    toggleBody: (state, action: PayloadAction<string>) => {
      const body = action.payload;
      if (state.selected.includes(body)) {
        state.selected = state.selected.filter((b) => b !== body);
      } else {
        state.selected.push(body);
      }
    },
  },
});

export const { toggleBody } = filterMakeSlice.actions;
export default filterMakeSlice.reducer;
