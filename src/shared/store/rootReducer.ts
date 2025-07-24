import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/model/slice";
import { authApi } from "@/features/auth/api/authApi";
import filtersReducer from "@/features/filter/model/slice";
import searchSliceReducer from "@/features/search/model/searchSlice";

import userSliceReducer from "@/entities/user/model/userSlice";
import { userApi } from "@/entities/user/api/userApi";
import { uploadApi } from "../api/uploadApi";
import { userVehiclesApi } from "@/features/user-vehicles/api/userVehiclesApi";
import { changePasswordApi } from "@/features/change-password/api/changePasswordApi";
import { verifyEmailApi } from "@/features/email-verification/api/verifyEmailApi";
import { verifyApi } from "@/features/auth/api/verifyApi";
import { carApi } from "../api/carApi";
import { webSiteApi } from "../api/webSiteApi";
import { chatSlice } from "./chatSlices";

export const rootReducer = combineReducers({
  auth: authReducer,
  filters: filtersReducer,
  search: searchSliceReducer,
  chat: chatSlice.reducer,
  user: userSliceReducer,
  [carApi.reducerPath]: carApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [webSiteApi.reducerPath]: webSiteApi.reducer,
  [verifyApi.reducerPath]: verifyApi.reducer,
  [verifyEmailApi.reducerPath]: verifyEmailApi.reducer,
  [changePasswordApi.reducerPath]: changePasswordApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [uploadApi.reducerPath]: uploadApi.reducer,
  [userVehiclesApi.reducerPath]: userVehiclesApi.reducer,
});
