"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
  CommonService: () => CommonService
});
module.exports = __toCommonJS(src_exports);

// libs/common/src/common.module.ts
var import_common6 = require("@nestjs/common");

// libs/common/src/common.service.ts
var import_common = require("@nestjs/common");
var CommonService = class {
};
CommonService = __decorateClass([
  (0, import_common.Injectable)()
], CommonService);

// libs/common/src/common.module.ts
var import_core3 = require("@nestjs/core");

// libs/common/src/guards/auth.guard.ts
var import_common3 = require("@nestjs/common");
var import_config = require("@nestjs/config");
var import_core = require("@nestjs/core");
var import_jwt = require("@nestjs/jwt");

// libs/common/src/decorators/public.decorator.ts
var import_common2 = require("@nestjs/common");
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

// libs/common/src/decorators/roles.decorator.ts
var import_common4 = require("@nestjs/common");
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
  (0, import_common5.Injectable)()
], RoleGuard);

// libs/common/src/common.module.ts
var CommonModule = class {
};
CommonModule = __decorateClass([
  (0, import_common6.Module)({
    providers: [
      CommonService,
      { provide: import_core3.APP_GUARD, useClass: AuthGuard },
      { provide: import_core3.APP_GUARD, useClass: RoleGuard }
    ],
    exports: [CommonService]
  })
], CommonModule);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CommonModule,
  CommonService
});
//# sourceMappingURL=index.cjs.map