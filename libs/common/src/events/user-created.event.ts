import type { RolesEnum } from '../enums';

export interface UserCreatedEvent {
  name: string;
  email: string;
  phone: number;
  dob: string;
  role: RolesEnum;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
