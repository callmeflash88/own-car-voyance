import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/model/slice";
import { authApi } from "@/features/auth/api/authApi";

export const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});
