import { CarStatus } from "../api/carApi";

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

export interface GetMyCarResponse {
  data: VehicleAd[];
  pagination: any;
}
