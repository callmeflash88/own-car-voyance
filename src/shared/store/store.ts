import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { authApi } from "@/features/auth/api/authApi";
import { userApi } from "@/entities/user/api/userApi";
import { uploadApi } from "../api/uploadApi";
import { userVehiclesApi } from "@/features/user-vehicles/api/userVehiclesApi";
import { changePasswordApi } from "@/features/change-password/api/changePasswordApi";
import { verifyEmailApi } from "@/features/email-verification/api/verifyEmailApi";
import { verifyApi } from "@/features/auth/api/verifyApi";
import { carApi } from "../api/carApi";
import { webSiteApi } from "../api/webSiteApi";

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      webSiteApi.middleware,
      verifyApi.middleware,
      userApi.middleware,
      changePasswordApi.middleware,
      uploadApi.middleware,
      userVehiclesApi.middleware,
      verifyEmailApi.middleware,
      carApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
