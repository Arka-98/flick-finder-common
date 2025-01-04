var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// libs/common/src/modules/common/common.module.ts
import { Module as Module2 } from "@nestjs/common";

// libs/common/src/modules/common/common.service.ts
import { Injectable } from "@nestjs/common";
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
  Injectable()
], CommonService);

// libs/common/src/modules/common/common.module.ts
import { APP_GUARD, Reflector as Reflector3 } from "@nestjs/core";

// libs/common/src/guards/auth.guard.ts
import { Injectable as Injectable2, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

// libs/common/src/decorators/public.decorator.ts
import { SetMetadata } from "@nestjs/common";
var IS_PUBLIC = "isPublic";
var Public = /* @__PURE__ */ __name(() => SetMetadata(IS_PUBLIC, true), "Public");

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
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get("JWT_SECRET")
      });
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
AuthGuard = _ts_decorate2([
  Injectable2(),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [
    typeof ConfigService === "undefined" ? Object : ConfigService,
    typeof JwtService === "undefined" ? Object : JwtService,
    typeof Reflector === "undefined" ? Object : Reflector
  ])
], AuthGuard);

// libs/common/src/guards/role.guard.ts
import { Injectable as Injectable3 } from "@nestjs/common";
import { Reflector as Reflector2 } from "@nestjs/core";

// libs/common/src/decorators/roles.decorator.ts
import { SetMetadata as SetMetadata2 } from "@nestjs/common";
var ROLES_KEY = "roles";
var Roles = /* @__PURE__ */ __name((...roles) => SetMetadata2(ROLES_KEY, roles), "Roles");

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
  Injectable3(),
  _ts_metadata2("design:type", Function),
  _ts_metadata2("design:paramtypes", [
    typeof Reflector2 === "undefined" ? Object : Reflector2
  ])
], RoleGuard);

// libs/common/src/modules/common/common.module.ts
import { ConfigService as ConfigService3 } from "@nestjs/config";
import { JwtService as JwtService2 } from "@nestjs/jwt";

// libs/common/src/modules/jwt/shared-jwt.module.ts
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService as ConfigService2 } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
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
  Module({
    imports: [
      JwtModule.registerAsync({
        global: true,
        imports: [
          ConfigModule
        ],
        useFactory: /* @__PURE__ */ __name(async (configService) => ({
          global: true,
          secret: configService.get("JWT_SECRET"),
          signOptions: {
            expiresIn: "30m"
          }
        }), "useFactory"),
        inject: [
          ConfigService2
        ]
      })
    ],
    exports: [
      JwtModule
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
  Module2({
    imports: [
      SharedJwtModule
    ],
    providers: [
      CommonService,
      {
        provide: APP_GUARD,
        useFactory: /* @__PURE__ */ __name(() => new AuthGuard(new ConfigService3(), new JwtService2(), new Reflector3()), "useFactory")
      },
      {
        provide: APP_GUARD,
        useFactory: /* @__PURE__ */ __name(() => new RoleGuard(new Reflector3()), "useFactory")
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
import { Module as Module3 } from "@nestjs/common";
import { ConfigModule as ConfigModule2, ConfigService as ConfigService4 } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";

// libs/common/src/modules/kafka/kafka.service.ts
import { Inject, Injectable as Injectable4, Logger } from "@nestjs/common";
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
    this.logger = new Logger(_KafkaService.name);
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
  Injectable4(),
  _ts_param(0, Inject(KAFKA_SERVICE_TOKEN)),
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
  Module3({
    imports: [
      ClientsModule.registerAsync([
        {
          imports: [
            ConfigModule2
          ],
          name: KAFKA_SERVICE_TOKEN,
          useFactory: /* @__PURE__ */ __name((configService) => ({
            transport: Transport.KAFKA,
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
            ConfigService4
          ]
        }
      ])
    ],
    providers: [
      KafkaService
    ],
    exports: [
      ClientsModule,
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
import { BadRequestException, Injectable as Injectable5 } from "@nestjs/common";
import { isValidObjectId, Types } from "mongoose";
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
    if (!isValidObjectId(value)) {
      throw new BadRequestException("Invalid ObjectId");
    }
    return Types.ObjectId.createFromHexString(value);
  }
};
ParseObjectIdPipe = _ts_decorate8([
  Injectable5()
], ParseObjectIdPipe);

// libs/common/src/utils/user.util.ts
import crypto from "crypto";
var UserUtil = class {
  static {
    __name(this, "UserUtil");
  }
  static hashPassword(password) {
    const salt = crypto.randomBytes(32).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 1e3, 64, "sha512").toString("hex");
    return [
      hash,
      salt
    ];
  }
  static comparePassword(password, hash, salt) {
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 1e3, 64, "sha512").toString("hex");
    return hashedPassword === hash;
  }
};

// libs/common/src/dto/id-and-timestamp.dto.ts
import { ApiProperty } from "@nestjs/swagger";
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
  ApiProperty(),
  _ts_metadata4("design:type", String)
], IdAndTimestampDto.prototype, "_id", void 0);
_ts_decorate9([
  ApiProperty(),
  _ts_metadata4("design:type", String)
], IdAndTimestampDto.prototype, "createdAt", void 0);
_ts_decorate9([
  ApiProperty(),
  _ts_metadata4("design:type", String)
], IdAndTimestampDto.prototype, "updatedAt", void 0);
export {
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
};
//# sourceMappingURL=index.js.map