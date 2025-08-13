import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQueryWithReauth } from "../lib/axiosBaseQuery";
import { VehicleAd } from "../types/car";

export enum CarStatus {
  DRAFT = 1,
  ACTIVE = 2,
}

export interface UpdateVehicleAd {
  id: number;
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
  images: any[];
  status: CarStatus;
}

interface GetMyCarResponse {
  data: VehicleAd[];
  pagination: any;
}

export const carApi = createApi({
  reducerPath: "carApi",
  baseQuery: axiosBaseQueryWithReauth,
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
    getMyCarById: builder.query<any, string>({
      query: (id) => ({
        url: `user/car/getCar/${id}`,
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
    updateMyCar: builder.mutation<any, UpdateVehicleAd>({
      query: (data) => ({
        url: "user/car/update",
        method: "POST",
        body: data,
      }),
    }),
    getMyFavoriteCars: builder.query<GetMyCarResponse, void>({
      query: () => ({
        url: "user/favorite/myFavorites",
        method: "GET",
      }),
    }),
    addToFavorite: builder.mutation<any, string>({
      query: (id) => ({
        url: "user/favorite/addFavorite",
        method: "POST",
        body: { id },
      }),
    }),
    deleteFromFavorite: builder.mutation<any, string>({
      query: (id) => ({
        url: "user/favorite/deleteFavorite",
        method: "POST",
        body: { id },
      }),
    }),
    messageSeller: builder.mutation<any, any>({
      query: (data) => ({
        url: "user/car/messageSeller",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateCarMutation,
  useGetMyCarsQuery,
  useChangeCarStatusMutation,
  useDeleteMyCarMutation,
  useGetMyCarByIdQuery,
  useUpdateMyCarMutation,
  useGetMyFavoriteCarsQuery,
  useLazyGetMyFavoriteCarsQuery,
  useAddToFavoriteMutation,
  useDeleteFromFavoriteMutation,
  useMessageSellerMutation,
} = carApi;
