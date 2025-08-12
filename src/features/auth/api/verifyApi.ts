import { axiosBaseQueryWithReauth } from "@/shared/lib/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const verifyApi = createApi({
  reducerPath: "verifyApi",
  baseQuery: axiosBaseQueryWithReauth,
  endpoints: (builder) => ({
    sendPhoneVerification: builder.mutation<any, void>({
      query: (data) => ({
        url: "user/setting/verificationPhone",
        method: "POST",
        body: data,
      }),
    }),
    checkPhoneVerification: builder.mutation<any, any>({
      query: (data) => ({
        url: "user/setting/checkVerificationPhone",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSendPhoneVerificationMutation,
  useCheckPhoneVerificationMutation,
} = verifyApi;
