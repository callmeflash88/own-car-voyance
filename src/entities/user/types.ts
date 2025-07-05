export interface IUpdateProfile {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  gender: string;
  bio: string;
  logo: {
    id: number;
  };
}
