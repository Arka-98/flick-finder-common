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

// libs/common/src/modules/common/common.module.ts
import { Module } from "@nestjs/common";

// libs/common/src/modules/common/common.service.ts
import { Injectable } from "@nestjs/common";
var CommonService = class {
};
CommonService = __decorateClass([
  Injectable()
], CommonService);

// libs/common/src/modules/common/common.module.ts
import { APP_GUARD, Reflector as Reflector3 } from "@nestjs/core";

// libs/common/src/guards/auth.guard.ts
import {
  Injectable as Injectable2,
  UnauthorizedException
} from "@nestjs/common";
import "@nestjs/config";
import "@nestjs/core";
import "@nestjs/jwt";

// libs/common/src/enums/roles.enum.ts
var RolesEnum = /* @__PURE__ */ ((RolesEnum6) => {
  RolesEnum6["ADMIN"] = "admin";
  RolesEnum6["VENDOR"] = "vendor";
  RolesEnum6["CUSTOMER"] = "customer";
  RolesEnum6["EXECUTIVE"] = "executive";
  return RolesEnum6;
})(RolesEnum || {});

// libs/common/src/decorators/public.decorator.ts
import { SetMetadata } from "@nestjs/common";
var IS_PUBLIC = "isPublic";
var Public = () => SetMetadata(IS_PUBLIC, true);

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
import "rxjs";

// libs/common/src/decorators/roles.decorator.ts
import { SetMetadata as SetMetadata2 } from "@nestjs/common";
var ROLES_KEY = "roles";
var Roles = (...roles) => SetMetadata2(ROLES_KEY, roles);

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

// libs/common/src/modules/common/common.module.ts
import { ConfigService as ConfigService2 } from "@nestjs/config";
import { JwtService as JwtService2 } from "@nestjs/jwt";
var CommonModule = class {
};
CommonModule = __decorateClass([
  Module({
    providers: [
      CommonService,
      {
        provide: APP_GUARD,
        useFactory: () => new AuthGuard(new ConfigService2(), new JwtService2(), new Reflector3())
      },
      { provide: APP_GUARD, useFactory: () => new RoleGuard(new Reflector3()) }
    ],
    exports: [CommonService]
  })
], CommonModule);

// libs/common/src/constants/index.ts
var TOPICS = {
  USER: {
    CREATED: "user.created",
    UPDATED: "user.updated",
    DELETED: "user.deleted"
  }
};
var KAFKA_SERVICE_TOKEN = "KAFKA_SERVICE";

// libs/common/src/modules/kafka/kafka.module.ts
import { Module as Module2 } from "@nestjs/common";
import { ConfigModule, ConfigService as ConfigService3 } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
var KafkaModule = class {
};
KafkaModule = __decorateClass([
  Module2({
    imports: [
      ClientsModule.registerAsync([
        {
          imports: [ConfigModule],
          name: KAFKA_SERVICE_TOKEN,
          useFactory: async (configService) => ({
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: configService.get("KAFKA_CLIENT_ID"),
                brokers: [configService.get("KAFKA_BROKER") || "localhost:9092"]
              }
            }
          }),
          inject: [ConfigService3]
        }
      ])
    ],
    exports: [ClientsModule]
  })
], KafkaModule);

// libs/common/src/pipes/parse-object-id.pipe.ts
import {
  BadRequestException,
  Injectable as Injectable4
} from "@nestjs/common";
import { isValidObjectId, Types } from "mongoose";
var ParseObjectIdPipe = class {
  transform(value) {
    if (!isValidObjectId(value)) {
      throw new BadRequestException("Invalid ObjectId");
    }
    return Types.ObjectId.createFromHexString(value);
  }
};
ParseObjectIdPipe = __decorateClass([
  Injectable4()
], ParseObjectIdPipe);

// libs/common/src/utils/user.util.ts
import crypto from "crypto";
var UserUtil = class {
  static hashPassword(password) {
    const salt = crypto.randomBytes(32).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 1e3, 64, "sha512").toString("hex");
    return [hash, salt];
  }
  static comparePassword(password, hash, salt) {
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 1e3, 64, "sha512").toString("hex");
    return hashedPassword === hash;
  }
};
export {
  CommonModule,
  CommonService,
  IS_PUBLIC,
  KAFKA_SERVICE_TOKEN,
  KafkaModule,
  ParseObjectIdPipe,
  Public,
  ROLES_KEY,
  Roles,
  RolesEnum,
  TOPICS,
  UserUtil
};
//# sourceMappingURL=index.js.map