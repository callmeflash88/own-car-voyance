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
  vin_code: string;
  images: string[];
  status: CarStatus;
  created_at: string;
}

export interface CarSeller {
  id: number;
  created_at: string;
  bio: string;
  email: string;
  email_verification: boolean;
  full_name: string;
  phone: string;
  register_verification: boolean;
  _count: {
    cars: number;
  };
}

export interface CarById extends VehicleAd {
  seller: CarSeller;
  updated_at: string;
}

export interface GetMyCarResponse {
  data: VehicleAd[];
  pagination: any;
}
