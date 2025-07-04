import { ACCESS_TOKEN } from "@/shared/constants/cookiesKeys";
import { isTokenExpired } from "@/shared/lib/interceptors";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
}

const accessToken = Cookies.get(ACCESS_TOKEN);
const isValidToken = accessToken && !isTokenExpired(accessToken);

const initialState: AuthState = {
  isAuthenticated: Boolean(isValidToken),
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<any>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
