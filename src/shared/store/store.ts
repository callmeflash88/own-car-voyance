import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { authApi } from "@/features/auth/api/authApi";
import { userApi } from "@/entities/user/api/userApi";
import { uploadApi } from "../api/uploadApi";
import { userVehiclesApi } from "@/features/user-vehicles/api/userVehiclesApi";

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      uploadApi.middleware,
      userVehiclesApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
