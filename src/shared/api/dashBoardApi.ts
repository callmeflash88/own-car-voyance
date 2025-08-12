import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../lib/axiosBaseQuery";
import { FindCarRequest } from "./webSiteApi";

interface ListingsResponse {
  data: any;
  pagination: any;
}

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getDashboard: builder.query<any, void>({
      query: () => ({
        url: "admin/dashboard",
        method: "GET",
      }),
    }),
    getMostPopularMakes: builder.query<any, void>({
      query: () => ({
        url: "admin/dashboard/mostPopularMakes",
        method: "GET",
      }),
    }),
    getUserRegistrationThisWeek: builder.query<any, void>({
      query: () => ({
        url: "admin/dashboard/userRegistrationThisWeek",
        method: "GET",
      }),
    }),
    getTopSales: builder.query<any, void>({
      query: () => ({
        url: "admin/dashboard/topSales",
        method: "GET",
      }),
    }),
    getUsers: builder.query<any, { page: number; perPage: number }>({
      query: ({ page, perPage }) => ({
        url: "admin/users/",
        method: "GET",
        params: {
          page: page.toString(),
          perPage: perPage.toString(),
        },
      }),
    }),
    getUserById: builder.query<any, string>({
      query: (id) => ({
        url: `admin/users/getUserById/${id}`,
        method: "GET",
      }),
    }),
    blockUnblockUsers: builder.mutation<{ ids: [string] }, any>({
      query: (data) => ({
        url: "admin/users/blockUsers",
        method: "POST",
        body: data,
      }),
    }),
    deleteUsers: builder.mutation<{ ids: [string] }, any>({
      query: (data) => ({
        url: "admin/users/deleteUsers",
        method: "POST",
        body: data,
      }),
    }),
    approveAccount: builder.mutation<any, string>({
      query: (id) => ({
        url: `admin/users/approveUser`,
        method: "POST",
        body: { id },
      }),
    }),
    deleteUserCar: builder.mutation<any, string>({
      query: (id) => ({
        url: `admin/car/deleteCar`,
        method: "POST",
        body: { id },
      }),
    }),
    getAdminCars: builder.mutation<any, FindCarRequest>({
      query: (body) => ({
        url: "admin/car",
        method: "POST",
        body,
      }),
    }),
    deleteCar: builder.mutation<any, string>({
      query: (id) => ({
        url: `admin/car/deleteCar`,
        method: "POST",
        body: { id },
      }),
    }),
    getAdminSettings: builder.query<any, void>({
      query: () => ({
        url: "admin/setting",
        method: "GET",
      }),
    }),
    updateAdminSettings: builder.mutation<any, any>({
      query: (data) => ({
        url: "admin/setting/updateProfile",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation<any, any>({
      query: (data) => ({
        url: "admin/setting/changePassword",
        method: "POST",
        body: data,
      }),
    }),
    inviteTeam: builder.mutation<any, any>({
      query: (data) => ({
        url: "admin/setting/inviteTeam",
        method: "POST",
        body: data,
      }),
    }),
    getTeamMembers: builder.query<any, void>({
      query: () => ({
        url: "admin/setting/getTeamMembers",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useGetMostPopularMakesQuery,
  useGetUserRegistrationThisWeekQuery,
  useGetTopSalesQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useBlockUnblockUsersMutation,
  useDeleteUsersMutation,
  useApproveAccountMutation,
  useDeleteUserCarMutation,
  useGetAdminCarsMutation,
  useDeleteCarMutation,
  useGetAdminSettingsQuery,
  useUpdateAdminSettingsMutation,
  useChangePasswordMutation,
  useInviteTeamMutation,
  useGetTeamMembersQuery,
} = dashboardApi;
