// features/admin-users/model/selectedUsersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  selectedIds: string[];
};

const initialState: State = {
  selectedIds: [],
};

const selectedUsersSlice = createSlice({
  name: "selectedUsers",
  initialState,
  reducers: {
    toggleUser(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter((item) => item !== id);
      } else {
        state.selectedIds.push(id);
      }
    },
    clearSelected(state) {
      state.selectedIds = [];
    },
  },
});

export const { toggleUser, clearSelected } = selectedUsersSlice.actions;
export default selectedUsersSlice.reducer;
