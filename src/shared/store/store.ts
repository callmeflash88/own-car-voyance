import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { authApi } from "@/features/auth/api/authApi";
import { userApi } from "@/entities/user/api/userApi";

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
