import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from '../enums/roles.enum';

export const ROLES_KEY = 'roles';
/**
 * Decorator to set roles that can access to the decorated controller/action.
 * Use in combination with the RolesGuard to restrict access to certain roles.
 * @param roles - One or multiple roles that can access to the decorated controller/action.
 * @see {@link https://docs.nestjs.com/security/authorization#roles-based-authorization|NestJS - Roles-based authorization}
 */
export const Roles = (...roles: RolesEnum[]) => SetMetadata(ROLES_KEY, roles);
