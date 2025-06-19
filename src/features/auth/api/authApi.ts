import { axiosBaseQuery } from "@/shared/lib/axiosBaseQuery";
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
  password: string;
  confirm_password: string;
  role: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
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
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
