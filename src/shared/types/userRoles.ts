export type User = {
  id: number;
  full_name: string;
  email: string;
  role: 1 | 2 | 3;
  status: USER_STATUS;
  created_at: string;
};
export const UserRole = {
  Buyer: 1,
  Seller: 2,
  Admin: 3,
} as const;

export enum USER_STATUS {
  ACTIVE = 1,
  SUSPENDED = 2,
  BLOCK = 3,
}

export const roleLabels: Record<
  (typeof UserRole)[keyof typeof UserRole],
  string
> = {
  [UserRole.Buyer]: "Buyer",
  [UserRole.Seller]: "Seller",
  [UserRole.Admin]: "Admin",
};

export const statusLabels: Record<USER_STATUS, string> = {
  [USER_STATUS.ACTIVE]: "Active",
  [USER_STATUS.SUSPENDED]: "Suspended",
  [USER_STATUS.BLOCK]: "Blocked",
};
