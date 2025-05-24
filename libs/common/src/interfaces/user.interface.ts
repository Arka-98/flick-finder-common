import type { RolesEnum } from '../enums';

export interface IUserEvent {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: RolesEnum;
}
