import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/model/slice";
import { authApi } from "@/features/auth/api/authApi";
import filterMakeReducer from "@/features/filter-make/model/store";
import filterBodyReducer from "@/features/filter-body/model/slice";
import filterYearReducer from "@/features/filter-year/model/slice";
import searchSliceReducer from "@/features/search/model/searchSlice";
import sortViewSliceReducer from "@/features/sort-view-toggle/model/slice";
import userSliceReducer from "@/entities/user/model/userSlice";
import { userApi } from "@/entities/user/api/userApi";
import { uploadApi } from "../api/uploadApi";
import { userVehiclesApi } from "@/features/user-vehicles/api/userVehiclesApi";
import { changePasswordApi } from "@/features/change-password/api/changePasswordApi";
import { verifyEmailApi } from "@/features/email-verification/api/verifyEmailApi";

export const rootReducer = combineReducers({
  auth: authReducer,
  filterMake: filterMakeReducer,
  filterBody: filterBodyReducer,
  filterYear: filterYearReducer,
  search: searchSliceReducer,
  sort: sortViewSliceReducer,
  user: userSliceReducer,
  [authApi.reducerPath]: authApi.reducer,
  [verifyEmailApi.reducerPath]: verifyEmailApi.reducer,
  [changePasswordApi.reducerPath]: changePasswordApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [uploadApi.reducerPath]: uploadApi.reducer,
  [userVehiclesApi.reducerPath]: userVehiclesApi.reducer,
});
