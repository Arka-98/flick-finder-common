import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RolesEnum } from '../enums/roles.enum';
import type { CustomRequest } from '../interfaces/custom-request.interface';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allowedRoles = this.reflector.getAllAndOverride<RolesEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    const user = context.switchToHttp().getRequest<CustomRequest>().user;

    if (!allowedRoles || !user) {
      return true;
    }

    return allowedRoles.includes(user.role);
  }
}
