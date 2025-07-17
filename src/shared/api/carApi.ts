import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../lib/axiosBaseQuery";

export enum CarStatus {
  DRAFT = 1,
  ACTIVE = 2,
}

export interface VehicleAd {
  id?: number;
  make: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  condition: string;
  location: string;
  body_style: string;
  transmission: string;
  exterior_color: string;
  interior_color: string;
  fuel_type: string;
  drive_type: string;
  engine: string;
  number_of_seats: string;
  features: string[];
  description: string;
  images: string[];
  status: CarStatus;
}

interface GetMyCarResponse {
  data: VehicleAd[];
  pagination: any;
}

export const carApi = createApi({
  reducerPath: "carApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    createCar: builder.mutation<any, VehicleAd>({
      query: (data) => ({
        url: "user/car/create",
        method: "POST",
        body: data,
      }),
    }),
    getMyCars: builder.query<GetMyCarResponse, void>({
      query: () => ({
        url: "user/car/getMyCars",
        method: "GET",
      }),
    }),
    changeCarStatus: builder.mutation<any, { id: string; status: CarStatus }>({
      query: (data) => ({
        url: "user/car/changeMyCarStatus",
        method: "POST",
        body: data,
      }),
    }),
    deleteMyCar: builder.mutation<any, string>({
      query: (id) => ({
        url: "user/car/deleteMyCar",
        method: "POST",
        body: { id },
      }),
    }),
  }),
});

export const {
  useCreateCarMutation,
  useGetMyCarsQuery,
  useChangeCarStatusMutation,
  useDeleteMyCarMutation,
} = carApi;
