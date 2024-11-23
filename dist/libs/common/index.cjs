"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// libs/common/src/index.ts
var src_exports = {};
__export(src_exports, {
  CommonModule: () => CommonModule,
  CommonService: () => CommonService,
  IS_PUBLIC: () => IS_PUBLIC,
  KAFKA_SERVICE_TOKEN: () => KAFKA_SERVICE_TOKEN,
  KafkaModule: () => KafkaModule,
  ParseObjectIdPipe: () => ParseObjectIdPipe,
  Public: () => Public,
  ROLES_KEY: () => ROLES_KEY,
  Roles: () => Roles,
  RolesEnum: () => RolesEnum,
  TOPICS: () => TOPICS,
  UserUtil: () => UserUtil
});
module.exports = __toCommonJS(src_exports);

// libs/common/src/modules/common/common.module.ts
var import_common6 = require("@nestjs/common");

// libs/common/src/modules/common/common.service.ts
var import_common = require("@nestjs/common");
var CommonService = class {
};
CommonService = __decorateClass([
  (0, import_common.Injectable)()
], CommonService);

// libs/common/src/modules/common/common.module.ts
var import_core3 = require("@nestjs/core");

// libs/common/src/guards/auth.guard.ts
var import_common3 = require("@nestjs/common");
var import_config = require("@nestjs/config");
var import_core = require("@nestjs/core");
var import_jwt = require("@nestjs/jwt");

// libs/common/src/enums/roles.enum.ts
var RolesEnum = /* @__PURE__ */ ((RolesEnum6) => {
  RolesEnum6["ADMIN"] = "admin";
  RolesEnum6["VENDOR"] = "vendor";
  RolesEnum6["CUSTOMER"] = "customer";
  RolesEnum6["EXECUTIVE"] = "executive";
  return RolesEnum6;
})(RolesEnum || {});

// libs/common/src/decorators/public.decorator.ts
var import_common2 = require("@nestjs/common");
var IS_PUBLIC = "isPublic";
var Public = () => (0, import_common2.SetMetadata)(IS_PUBLIC, true);

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
      throw new import_common3.UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: this.configService.get("JWT_SECRET") });
      req["user"] = payload;
    } catch {
      throw new import_common3.UnauthorizedException();
    }
    return true;
  }
  extractTokenFromHeader(request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" && token;
  }
};
AuthGuard = __decorateClass([
  (0, import_common3.Injectable)()
], AuthGuard);

// libs/common/src/guards/role.guard.ts
var import_common5 = require("@nestjs/common");
var import_core2 = require("@nestjs/core");
var import_rxjs = require("rxjs");

// libs/common/src/decorators/roles.decorator.ts
var import_common4 = require("@nestjs/common");
var ROLES_KEY = "roles";
var Roles = (...roles) => (0, import_common4.SetMetadata)(ROLES_KEY, roles);

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
  (0, import_common5.Injectable)()
], RoleGuard);

// libs/common/src/modules/common/common.module.ts
var import_config2 = require("@nestjs/config");
var import_jwt2 = require("@nestjs/jwt");
var CommonModule = class {
};
CommonModule = __decorateClass([
  (0, import_common6.Module)({
    providers: [
      CommonService,
      {
        provide: import_core3.APP_GUARD,
        useFactory: () => new AuthGuard(new import_config2.ConfigService(), new import_jwt2.JwtService(), new import_core3.Reflector())
      },
      { provide: import_core3.APP_GUARD, useFactory: () => new RoleGuard(new import_core3.Reflector()) }
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
var import_common8 = require("@nestjs/common");
var import_config3 = require("@nestjs/config");
var import_microservices = require("@nestjs/microservices");
var KafkaModule = class {
};
KafkaModule = __decorateClass([
  (0, import_common8.Module)({
    imports: [
      import_microservices.ClientsModule.registerAsync([
        {
          imports: [import_config3.ConfigModule],
          name: KAFKA_SERVICE_TOKEN,
          useFactory: async (configService) => ({
            transport: import_microservices.Transport.KAFKA,
            options: {
              client: {
                clientId: configService.get("KAFKA_CLIENT_ID"),
                brokers: [configService.get("KAFKA_BROKER") || "localhost:9092"]
              }
            }
          }),
          inject: [import_config3.ConfigService]
        }
      ])
    ],
    exports: [import_microservices.ClientsModule]
  })
], KafkaModule);

// libs/common/src/pipes/parse-object-id.pipe.ts
var import_common9 = require("@nestjs/common");
var import_mongoose = require("mongoose");
var ParseObjectIdPipe = class {
  transform(value) {
    if (!(0, import_mongoose.isValidObjectId)(value)) {
      throw new import_common9.BadRequestException("Invalid ObjectId");
    }
    return import_mongoose.Types.ObjectId.createFromHexString(value);
  }
};
ParseObjectIdPipe = __decorateClass([
  (0, import_common9.Injectable)()
], ParseObjectIdPipe);

// libs/common/src/utils/user.util.ts
var import_crypto = __toESM(require("crypto"), 1);
var UserUtil = class {
  static hashPassword(password) {
    const salt = import_crypto.default.randomBytes(32).toString("hex");
    const hash = import_crypto.default.pbkdf2Sync(password, salt, 1e3, 64, "sha512").toString("hex");
    return [hash, salt];
  }
  static comparePassword(password, hash, salt) {
    const hashedPassword = import_crypto.default.pbkdf2Sync(password, salt, 1e3, 64, "sha512").toString("hex");
    return hashedPassword === hash;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
//# sourceMappingURL=index.cjs.map