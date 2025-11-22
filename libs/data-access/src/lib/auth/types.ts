// Client-safe auth types and enums

export enum UserRole {
  SHOPPER = 'SHOPPER',
  VENDOR = 'VENDOR',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export interface UserWithRole {
  id: string;
  email: string;
  role: UserRole;
  status: string;
}
