var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// libs/common/src/common.module.ts
import { Module } from "@nestjs/common";

// libs/common/src/common.service.ts
import { Injectable } from "@nestjs/common";
var CommonService = class {
};
CommonService = __decorateClass([
  Injectable()
], CommonService);

// libs/common/src/common.module.ts
import { APP_GUARD } from "@nestjs/core";

// libs/common/src/guards/auth.guard.ts
import {
  Injectable as Injectable2,
  UnauthorizedException
} from "@nestjs/common";
import "@nestjs/config";
import "@nestjs/core";
import "@nestjs/jwt";

// libs/common/src/decorators/public.decorator.ts
import { SetMetadata } from "@nestjs/common";
var IS_PUBLIC = "isPublic";

// libs/common/src/guards/auth.guard.ts
var AuthGuard = class {
  constructor(configService, jwtService, reflector) {
    this.configService = configService;
    this.jwtService = jwtService;
    this.reflector = reflector;
  }
  async canActivate(context) {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC, [
      context.getHandler(),
      context.getClass()
    ]);
    if (isPublic) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: this.configService.get("JWT_SECRET") });
      req["user"] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
  extractTokenFromHeader(request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" && token;
  }
};
AuthGuard = __decorateClass([
  Injectable2()
], AuthGuard);

// libs/common/src/guards/role.guard.ts
import {
  Injectable as Injectable3
} from "@nestjs/common";
import "@nestjs/core";

// libs/common/src/decorators/roles.decorator.ts
import { SetMetadata as SetMetadata2 } from "@nestjs/common";
var ROLES_KEY = "roles";

// libs/common/src/guards/role.guard.ts
var RoleGuard = class {
  constructor(reflector) {
    this.reflector = reflector;
  }
  canActivate(context) {
    const allowedRoles = this.reflector.getAllAndOverride(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    const user = context.switchToHttp().getRequest().user;
    if (!allowedRoles || !user) {
      return true;
    }
    return allowedRoles.includes(user.role);
  }
};
RoleGuard = __decorateClass([
  Injectable3()
], RoleGuard);

// libs/common/src/common.module.ts
var CommonModule = class {
};
CommonModule = __decorateClass([
  Module({
    providers: [
      CommonService,
      { provide: APP_GUARD, useClass: AuthGuard },
      { provide: APP_GUARD, useClass: RoleGuard }
    ],
    exports: [CommonService]
  })
], CommonModule);
export {
  CommonModule,
  CommonService
};
//# sourceMappingURL=index.js.map