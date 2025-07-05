import { axiosBaseQuery } from "@/shared/lib/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IUpdateProfile } from "../types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getUser: builder.query<any, void>({
      query: () => ({
        url: "user/profile",
      }),
    }),
    updateUserProfile: builder.mutation<any, Partial<IUpdateProfile>>({
      query: (body) => ({
        url: "user/profile/update",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserProfileMutation } = userApi;
