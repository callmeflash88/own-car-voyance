import { axiosBaseQueryWithReauth } from "@/shared/lib/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IUpdateProfile } from "../types";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["Profile"],
  baseQuery: axiosBaseQueryWithReauth,
  endpoints: (builder) => ({
    getUser: builder.query<any, void>({
      query: () => ({
        url: "user/profile",
      }),
      providesTags: [{ type: "Profile", id: "PROFILE" }],
    }),
    updateUserProfile: builder.mutation<any, Partial<IUpdateProfile>>({
      query: (body) => ({
        url: "user/profile/update",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Profile", id: "PROFILE" }],
    }),
  }),
});

export const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useUpdateUserProfileMutation,
} = userApi;
