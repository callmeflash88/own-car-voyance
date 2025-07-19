import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CarStatus,
  UserVehicle,
  Vehicle,
} from "@/entities/vehicle/model/types";
import { axiosBaseQuery } from "@/shared/lib/axiosBaseQuery";
import { GetMyCarResponse } from "@/shared/types/car";

export const userVehiclesApi = createApi({
  reducerPath: "userVehiclesApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getMyVehicles: builder.query<GetMyCarResponse, void>({
      query: () => ({
        url: "user/car/getMyCars",
        method: "GET",
      }),
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
