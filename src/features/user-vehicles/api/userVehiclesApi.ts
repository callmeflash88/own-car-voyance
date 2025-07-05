import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CarStatus,
  UserVehicle,
  Vehicle,
} from "@/entities/vehicle/model/types";

export const userVehiclesApi = createApi({
  reducerPath: "userVehiclesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getMyVehicles: builder.query<UserVehicle[], void>({
      query: () => "user/car/getMyCars",
    }),
    changeCarStatus: builder.mutation<
      Vehicle,
      { id: string; status: CarStatus }
    >({
      query: (id) => ({
        url: "user/car/changeMyCarStatus",
        method: "POST",
        body: { id },
      }),
    }),
    deleteCar: builder.mutation<Vehicle, string>({
      query: (id) => ({
        url: "user/car/deleteMyCar",
        method: "POST",
        body: { id },
      }),
    }),
  }),
});

export const {
  useGetMyVehiclesQuery,
  useChangeCarStatusMutation,
  useDeleteCarMutation,
} = userVehiclesApi;
