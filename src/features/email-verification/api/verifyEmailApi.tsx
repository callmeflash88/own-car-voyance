import { axiosBaseQuery } from "@/shared/lib/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const verifyEmailApi = createApi({
  reducerPath: "verifyEmailApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    verifyEmail: builder.mutation<void, void>({
      query: () => ({
        url: "user/setting/verificationEmail",
        method: "POST",
      }),
    }),
  }),
});

export const { useVerifyEmailMutation } = verifyEmailApi;
