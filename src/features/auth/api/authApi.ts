import { axiosBaseQueryWithReauth } from "@/shared/lib/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

interface ILoginPayload {
  email: string;
  password: string;
}

interface IAuthTokens {
  access_token: string;
  refresh_token: string;
}

interface IRegisterPayload {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
  role: string;
}

interface ICheckOtpPayload {
  email: string;
  otp: string;
}

export interface ICreateNewPasswordPayload {
  email: string;
  new_password: string;
  confirm_password: string;
}

interface IForgotPassword {
  email: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<IAuthTokens, ILoginPayload>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<IAuthTokens, IRegisterPayload>({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation<any, IForgotPassword>({
      query: (data) => ({
        url: "auth/recoveryPassword",
        method: "POST",
        body: data,
      }),
    }),
    checkOtp: builder.mutation<any, ICheckOtpPayload>({
      query: (data) => ({
        url: "auth/checkOtp",
        method: "POST",
        body: data,
      }),
    }),
    createNewPassword: builder.mutation<any, ICreateNewPasswordPayload>({
      query: (data) => ({
        url: "auth/recoveryPasswordChangePassword",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useCheckOtpMutation,
  useCreateNewPasswordMutation,
} = authApi;
