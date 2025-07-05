export interface Vehicle {
  id: string;
  title: string;
  year: number;
  mileage: number;
  transmission: string;
  fuel: string;
  engine: string;
  location: string;
  price: number;
  image: string;
  isFavorite: boolean;
  date: string;
}

export enum CarStatus {
  DRAFT = 1,
  ACTIVE = 2,
}

export interface CarImage {
  id: number;
  url: string;
  type: string;
  file_name: string;
  created_at: string; // можно заменить на Date, если вы будете парсить дату
}

export interface UserVehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  condition: string;
  location: string;
  body_style: string; // если это число по смыслу, можно поменять на number
  transmission: string;
  exterior_color: string;
  interior_color: string;
  fuel_type: string;
  drive_type: string;
  engine: string;
  number_of_seats: string; // если это число, можно заменить на number
  features: string[];
  description: string;
  images: CarImage[];
  status: number;
}
