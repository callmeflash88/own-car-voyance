import { axiosBaseQuery } from "@/shared/lib/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const changePasswordApi = createApi({
  reducerPath: "changePasswordApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    changePassword: builder.mutation<any, any>({
      query: (data) => ({
        url: "user/setting/changePassword",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useChangePasswordMutation } = changePasswordApi;
