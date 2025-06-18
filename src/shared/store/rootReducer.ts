import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/model/slice";
import { authApi } from "@/features/auth/api/authApi";
import filterMakeReducer from "@/features/filter-make/model/store";
import filterBodyReducer from "@/features/filter-body/model/slice";
import filterYearReducer from "@/features/filter-year/model/slice";
import searchSliceReducer from "@/features/search/model/searchSlice";
import sortViewSliceReducer from "@/features/sort-view-toggle/model/slice";

export const rootReducer = combineReducers({
  auth: authReducer,
  filterMake: filterMakeReducer,
  filterBody: filterBodyReducer,
  filterYear: filterYearReducer,
  search: searchSliceReducer,
  sort: sortViewSliceReducer,
  [authApi.reducerPath]: authApi.reducer,
});
