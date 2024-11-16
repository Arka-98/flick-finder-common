import type { Request } from 'express';
import { RolesEnum } from '../enums/roles.enum';

export interface CustomRequest extends Request {
  user?: {
    sub: string;
    username: string;
    role: RolesEnum;
  };
}
