"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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

// libs/common/src/index.ts
var src_exports = {};
__export(src_exports, {
  CommonModule: () => CommonModule,
  CommonService: () => CommonService,
  IS_PUBLIC: () => IS_PUBLIC,
  IdAndTimestampDto: () => IdAndTimestampDto,
  KAFKA_SERVICE_TOKEN: () => KAFKA_SERVICE_TOKEN,
  KafkaModule: () => KafkaModule,
  KafkaService: () => KafkaService,
  ParseObjectIdPipe: () => ParseObjectIdPipe,
  Public: () => Public,
  ROLES_KEY: () => ROLES_KEY,
  Roles: () => Roles,
  RolesEnum: () => RolesEnum,
  SharedJwtModule: () => SharedJwtModule,
  TOPICS: () => TOPICS,
  UserUtil: () => UserUtil
});
module.exports = __toCommonJS(src_exports);

// libs/common/src/modules/common/common.module.ts
var import_common7 = require("@nestjs/common");

// libs/common/src/modules/common/common.service.ts
var import_common = require("@nestjs/common");
function _ts_decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate, "_ts_decorate");
var CommonService = class {
  static {
    __name(this, "CommonService");
  }
};
CommonService = _ts_decorate([
  (0, import_common.Injectable)()
], CommonService);

// libs/common/src/modules/common/common.module.ts
var import_core3 = require("@nestjs/core");

// libs/common/src/guards/auth.guard.ts
var import_common3 = require("@nestjs/common");
var import_config = require("@nestjs/config");
var import_core = require("@nestjs/core");
var import_jwt = require("@nestjs/jwt");

// libs/common/src/decorators/public.decorator.ts
var import_common2 = require("@nestjs/common");
var IS_PUBLIC = "isPublic";
var Public = /* @__PURE__ */ __name(() => (0, import_common2.SetMetadata)(IS_PUBLIC, true), "Public");

// libs/common/src/guards/auth.guard.ts
function _ts_decorate2(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate2, "_ts_decorate");
function _ts_metadata(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata, "_ts_metadata");
var AuthGuard = class {
  static {
    __name(this, "AuthGuard");
  }
  configService;
  jwtService;
  reflector;
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
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get("JWT_SECRET")
      });
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
AuthGuard = _ts_decorate2([
  (0, import_common3.Injectable)(),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [
    typeof import_config.ConfigService === "undefined" ? Object : import_config.ConfigService,
    typeof import_jwt.JwtService === "undefined" ? Object : import_jwt.JwtService,
    typeof import_core.Reflector === "undefined" ? Object : import_core.Reflector
  ])
], AuthGuard);

// libs/common/src/guards/role.guard.ts
var import_common5 = require("@nestjs/common");
var import_core2 = require("@nestjs/core");

// libs/common/src/decorators/roles.decorator.ts
var import_common4 = require("@nestjs/common");
var ROLES_KEY = "roles";
var Roles = /* @__PURE__ */ __name((...roles) => (0, import_common4.SetMetadata)(ROLES_KEY, roles), "Roles");

// libs/common/src/guards/role.guard.ts
function _ts_decorate3(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate3, "_ts_decorate");
function _ts_metadata2(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata2, "_ts_metadata");
var RoleGuard = class {
  static {
    __name(this, "RoleGuard");
  }
  reflector;
  constructor(reflector) {
    this.reflector = reflector;
  }
  canActivate(context) {
    const allowedRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    const user = context.switchToHttp().getRequest().user;
    if (!allowedRoles || !user) {
      return true;
    }
    return allowedRoles.includes(user.role);
  }
};
RoleGuard = _ts_decorate3([
  (0, import_common5.Injectable)(),
  _ts_metadata2("design:type", Function),
  _ts_metadata2("design:paramtypes", [
    typeof import_core2.Reflector === "undefined" ? Object : import_core2.Reflector
  ])
], RoleGuard);

// libs/common/src/modules/common/common.module.ts
var import_config3 = require("@nestjs/config");
var import_jwt3 = require("@nestjs/jwt");

// libs/common/src/modules/jwt/shared-jwt.module.ts
var import_common6 = require("@nestjs/common");
var import_config2 = require("@nestjs/config");
var import_jwt2 = require("@nestjs/jwt");
function _ts_decorate4(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate4, "_ts_decorate");
var SharedJwtModule = class {
  static {
    __name(this, "SharedJwtModule");
  }
};
SharedJwtModule = _ts_decorate4([
  (0, import_common6.Module)({
    imports: [
      import_jwt2.JwtModule.registerAsync({
        global: true,
        imports: [
          import_config2.ConfigModule
        ],
        useFactory: /* @__PURE__ */ __name(async (configService) => ({
          global: true,
          secret: configService.get("JWT_SECRET"),
          signOptions: {
            expiresIn: "30m"
          }
        }), "useFactory"),
        inject: [
          import_config2.ConfigService
        ]
      })
    ],
    exports: [
      import_jwt2.JwtModule
    ]
  })
], SharedJwtModule);

// libs/common/src/modules/common/common.module.ts
function _ts_decorate5(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate5, "_ts_decorate");
var CommonModule = class {
  static {
    __name(this, "CommonModule");
  }
};
CommonModule = _ts_decorate5([
  (0, import_common7.Module)({
    imports: [
      SharedJwtModule
    ],
    providers: [
      CommonService,
      {
        provide: import_core3.APP_GUARD,
        useFactory: /* @__PURE__ */ __name(() => new AuthGuard(new import_config3.ConfigService(), new import_jwt3.JwtService(), new import_core3.Reflector()), "useFactory")
      },
      {
        provide: import_core3.APP_GUARD,
        useFactory: /* @__PURE__ */ __name(() => new RoleGuard(new import_core3.Reflector()), "useFactory")
      }
    ],
    exports: [
      CommonService
    ]
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
var import_common10 = require("@nestjs/common");
var import_config4 = require("@nestjs/config");
var import_microservices = require("@nestjs/microservices");

// libs/common/src/modules/kafka/kafka.service.ts
var import_common9 = require("@nestjs/common");
function _ts_decorate6(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate6, "_ts_decorate");
function _ts_metadata3(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata3, "_ts_metadata");
function _ts_param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param, "_ts_param");
var KafkaService = class _KafkaService {
  static {
    __name(this, "KafkaService");
  }
  kafkaClient;
  logger;
  constructor(kafkaClient) {
    this.kafkaClient = kafkaClient;
    this.logger = new import_common9.Logger(_KafkaService.name);
  }
  emit(topic, message) {
    this.kafkaClient.emit(topic, message).subscribe({
      next: /* @__PURE__ */ __name(() => {
        this.logger.log(`Event published to kafka topic ${topic}`);
      }, "next"),
      error: /* @__PURE__ */ __name((err) => {
        this.logger.error(`Error publishing event to kafka topic ${topic}: ${err}`);
      }, "error")
    });
  }
};
KafkaService = _ts_decorate6([
  (0, import_common9.Injectable)(),
  _ts_param(0, (0, import_common9.Inject)(KAFKA_SERVICE_TOKEN)),
  _ts_metadata3("design:type", Function),
  _ts_metadata3("design:paramtypes", [
    typeof ClientKafka === "undefined" ? Object : ClientKafka
  ])
], KafkaService);

// libs/common/src/modules/kafka/kafka.module.ts
function _ts_decorate7(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate7, "_ts_decorate");
var KafkaModule = class {
  static {
    __name(this, "KafkaModule");
  }
};
KafkaModule = _ts_decorate7([
  (0, import_common10.Module)({
    imports: [
      import_microservices.ClientsModule.registerAsync([
        {
          imports: [
            import_config4.ConfigModule
          ],
          name: KAFKA_SERVICE_TOKEN,
          useFactory: /* @__PURE__ */ __name((configService) => ({
            transport: import_microservices.Transport.KAFKA,
            options: {
              client: {
                clientId: configService.get("KAFKA_CLIENT_ID"),
                brokers: [
                  configService.get("KAFKA_BROKER") || "localhost:9092"
                ]
              }
            }
          }), "useFactory"),
          inject: [
            import_config4.ConfigService
          ]
        }
      ])
    ],
    providers: [
      KafkaService
    ],
    exports: [
      import_microservices.ClientsModule,
      KafkaService
    ]
  })
], KafkaModule);

// libs/common/src/enums/roles.enum.ts
var RolesEnum = /* @__PURE__ */ function(RolesEnum2) {
  RolesEnum2["ADMIN"] = "admin";
  RolesEnum2["VENDOR"] = "vendor";
  RolesEnum2["CUSTOMER"] = "customer";
  RolesEnum2["EXECUTIVE"] = "executive";
  return RolesEnum2;
}({});

// libs/common/src/pipes/parse-object-id.pipe.ts
var import_common11 = require("@nestjs/common");
var import_mongoose = require("mongoose");
function _ts_decorate8(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate8, "_ts_decorate");
var ParseObjectIdPipe = class {
  static {
    __name(this, "ParseObjectIdPipe");
  }
  transform(value) {
    if (!(0, import_mongoose.isValidObjectId)(value)) {
      throw new import_common11.BadRequestException("Invalid ObjectId");
    }
    return import_mongoose.Types.ObjectId.createFromHexString(value);
  }
};
ParseObjectIdPipe = _ts_decorate8([
  (0, import_common11.Injectable)()
], ParseObjectIdPipe);

// libs/common/src/utils/user.util.ts
var import_crypto = __toESM(require("crypto"), 1);
var UserUtil = class {
  static {
    __name(this, "UserUtil");
  }
  static hashPassword(password) {
    const salt = import_crypto.default.randomBytes(32).toString("hex");
    const hash = import_crypto.default.pbkdf2Sync(password, salt, 1e3, 64, "sha512").toString("hex");
    return [
      hash,
      salt
    ];
  }
  static comparePassword(password, hash, salt) {
    const hashedPassword = import_crypto.default.pbkdf2Sync(password, salt, 1e3, 64, "sha512").toString("hex");
    return hashedPassword === hash;
  }
};

// libs/common/src/dto/id-and-timestamp.dto.ts
var import_swagger = require("@nestjs/swagger");
function _ts_decorate9(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate9, "_ts_decorate");
function _ts_metadata4(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata4, "_ts_metadata");
var IdAndTimestampDto = class {
  static {
    __name(this, "IdAndTimestampDto");
  }
  _id;
  createdAt;
  updatedAt;
};
_ts_decorate9([
  (0, import_swagger.ApiProperty)(),
  _ts_metadata4("design:type", String)
], IdAndTimestampDto.prototype, "_id", void 0);
_ts_decorate9([
  (0, import_swagger.ApiProperty)(),
  _ts_metadata4("design:type", String)
], IdAndTimestampDto.prototype, "createdAt", void 0);
_ts_decorate9([
  (0, import_swagger.ApiProperty)(),
  _ts_metadata4("design:type", String)
], IdAndTimestampDto.prototype, "updatedAt", void 0);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CommonModule,
  CommonService,
  IS_PUBLIC,
  IdAndTimestampDto,
  KAFKA_SERVICE_TOKEN,
  KafkaModule,
  KafkaService,
  ParseObjectIdPipe,
  Public,
  ROLES_KEY,
  Roles,
  RolesEnum,
  SharedJwtModule,
  TOPICS,
  UserUtil
});
//# sourceMappingURL=index.cjs.map