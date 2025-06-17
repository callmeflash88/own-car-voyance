import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterMakeState {
  selected: string[];
}

const initialState: FilterMakeState = {
  selected: [],
};

const filterMakeSlice = createSlice({
  name: "filterMake",
  initialState,
  reducers: {
    toggleMake: (state, action: PayloadAction<string>) => {
      const make = action.payload;
      if (state.selected.includes(make)) {
        state.selected = state.selected.filter((m) => m !== make);
      } else {
        state.selected.push(make);
      }
    },
  },
});

export const { toggleMake } = filterMakeSlice.actions;
export default filterMakeSlice.reducer;
