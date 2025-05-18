import type { RolesEnum } from '../enums';

export interface IUser {
  name: string;
  email: string;
  phone: string;
  dob: Date;
  role: RolesEnum;
  password: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  blocked?: boolean;
}
