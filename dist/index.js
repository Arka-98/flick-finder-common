var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __knownSymbol = (name, symbol) =>
  (symbol = Symbol[name]) ? symbol : Symbol.for('Symbol.' + name);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value,
      })
    : (obj[key] = value);
var __name = (target, value) =>
  __defProp(target, 'name', { value, configurable: true });
var __decoratorStart = (base) => [
  ,
  ,
  ,
  __create(base?.[__knownSymbol('metadata')] ?? null),
];
var __decoratorStrings = [
  'class',
  'method',
  'getter',
  'setter',
  'accessor',
  'field',
  'value',
  'get',
  'set',
];
var __expectFn = (fn) =>
  fn !== void 0 && typeof fn !== 'function'
    ? __typeError('Function expected')
    : fn;
var __decoratorContext = (kind, name, done, metadata, fns) => ({
  kind: __decoratorStrings[kind],
  name,
  metadata,
  addInitializer: (fn) =>
    done._
      ? __typeError('Already initialized')
      : fns.push(__expectFn(fn || null)),
});
var __decoratorMetadata = (array, target) =>
  __defNormalProp(target, __knownSymbol('metadata'), array[3]);
var __runInitializers = (array, flags, self, value) => {
  for (var i = 0, fns = array[flags >> 1], n = fns && fns.length; i < n; i++)
    flags & 1 ? fns[i].call(self) : (value = fns[i].call(self, value));
  return value;
};
var __decorateElement = (array, flags, name, decorators, target, extra) => {
  var fn,
    it,
    done,
    ctx,
    access,
    k = flags & 7,
    s = !!(flags & 8),
    p = !!(flags & 16);
  var j = k > 3 ? array.length + 1 : k ? (s ? 1 : 2) : 0,
    key = __decoratorStrings[k + 5];
  var initializers = k > 3 && (array[j - 1] = []),
    extraInitializers = array[j] || (array[j] = []);
  var desc =
    k &&
    (!p && !s && (target = target.prototype),
    k < 5 &&
      (k > 3 || !p) &&
      __getOwnPropDesc(
        k < 4
          ? target
          : {
              get [name]() {
                return __privateGet(this, extra);
              },
              set [name](x) {
                return __privateSet(this, extra, x);
              },
            },
        name,
      ));
  k
    ? p && k < 4 && __name(extra, (k > 2 ? 'set ' : k > 1 ? 'get ' : '') + name)
    : __name(target, name);
  for (var i = decorators.length - 1; i >= 0; i--) {
    ctx = __decoratorContext(k, name, (done = {}), array[3], extraInitializers);
    if (k) {
      (ctx.static = s),
        (ctx.private = p),
        (access = ctx.access =
          { has: p ? (x) => __privateIn(target, x) : (x) => name in x });
      if (k ^ 3)
        access.get = p
          ? (x) =>
              (k ^ 1 ? __privateGet : __privateMethod)(
                x,
                target,
                k ^ 4 ? extra : desc.get,
              )
          : (x) => x[name];
      if (k > 2)
        access.set = p
          ? (x, y) => __privateSet(x, target, y, k ^ 4 ? extra : desc.set)
          : (x, y) => (x[name] = y);
    }
    (it = (0, decorators[i])(
      k
        ? k < 4
          ? p
            ? extra
            : desc[key]
          : k > 4
            ? void 0
            : { get: desc.get, set: desc.set }
        : target,
      ctx,
    )),
      (done._ = 1);
    if (k ^ 4 || it === void 0)
      __expectFn(it) &&
        (k > 4
          ? initializers.unshift(it)
          : k
            ? p
              ? (extra = it)
              : (desc[key] = it)
            : (target = it));
    else if (typeof it !== 'object' || it === null)
      __typeError('Object expected');
    else
      __expectFn((fn = it.get)) && (desc.get = fn),
        __expectFn((fn = it.set)) && (desc.set = fn),
        __expectFn((fn = it.init)) && initializers.unshift(fn);
  }
  return (
    k || __decoratorMetadata(array, target),
    desc && __defProp(target, name, desc),
    p ? (k ^ 4 ? extra : desc) : target
  );
};
var __accessCheck = (obj, member, msg) =>
  member.has(obj) || __typeError('Cannot ' + msg);
var __privateIn = (member, obj) =>
  Object(obj) !== obj
    ? __typeError('Cannot use the "in" operator on this value')
    : member.has(obj);
var __privateGet = (obj, member, getter) => (
  __accessCheck(obj, member, 'read from private field'),
  getter ? getter.call(obj) : member.get(obj)
);
var __privateSet = (obj, member, value, setter) => (
  __accessCheck(obj, member, 'write to private field'),
  setter ? setter.call(obj, value) : member.set(obj, value),
  value
);
var __privateMethod = (obj, member, method) => (
  __accessCheck(obj, member, 'access private method'), method
);

// src/constants/index.ts
var TOPICS = {
  USER: {
    CREATED: 'user.created',
    UPDATED: 'user.updated',
    DELETED: 'user.deleted',
  },
};

// src/decorators/public.decorator.ts
import { SetMetadata } from '@nestjs/common';
var IS_PUBLIC = 'isPublic';
var Public = () => SetMetadata(IS_PUBLIC, true);

// src/decorators/roles.decorator.ts
import { SetMetadata as SetMetadata2 } from '@nestjs/common';

// src/enums/roles.enum.ts
var RolesEnum = /* @__PURE__ */ ((RolesEnum6) => {
  RolesEnum6['ADMIN'] = 'admin';
  RolesEnum6['VENDOR'] = 'vendor';
  RolesEnum6['CUSTOMER'] = 'customer';
  RolesEnum6['EXECUTIVE'] = 'executive';
  return RolesEnum6;
})(RolesEnum || {});

// src/decorators/roles.decorator.ts
var ROLES_KEY = 'roles';
var Roles = (...roles) => SetMetadata2(ROLES_KEY, roles);

// src/guards/auth.guard.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import '@nestjs/config';
import '@nestjs/core';
import '@nestjs/jwt';
var _AuthGuard_decorators, _init;
_AuthGuard_decorators = [Injectable()];
var AuthGuard = class {
  constructor(configService, jwtService, reflector) {
    this.configService = configService;
    this.jwtService = jwtService;
    this.reflector = reflector;
  }
  async canActivate(context) {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
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
        secret: this.configService.get('JWT_SECRET'),
      });
      req['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
  extractTokenFromHeader(request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' && token;
  }
};
_init = __decoratorStart(null);
AuthGuard = __decorateElement(
  _init,
  0,
  'AuthGuard',
  _AuthGuard_decorators,
  AuthGuard,
);
__runInitializers(_init, 1, AuthGuard);

// src/guards/role.guard.ts
import { Injectable as Injectable2 } from '@nestjs/common';
import '@nestjs/core';
var _RoleGuard_decorators, _init2;
_RoleGuard_decorators = [Injectable2()];
var RoleGuard = class {
  constructor(reflector) {
    this.reflector = reflector;
  }
  canActivate(context) {
    const allowedRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const user = context.switchToHttp().getRequest().user;
    if (!allowedRoles || !user) {
      return true;
    }
    return allowedRoles.includes(user.role);
  }
};
_init2 = __decoratorStart(null);
RoleGuard = __decorateElement(
  _init2,
  0,
  'RoleGuard',
  _RoleGuard_decorators,
  RoleGuard,
);
__runInitializers(_init2, 1, RoleGuard);

// src/pipes/parse-object-id.pipe.ts
import { BadRequestException, Injectable as Injectable3 } from '@nestjs/common';
import { isValidObjectId, Types } from 'mongoose';
var _ParseObjectIdPipe_decorators, _init3;
_ParseObjectIdPipe_decorators = [Injectable3()];
var ParseObjectIdPipe = class {
  transform(value) {
    if (!isValidObjectId(value)) {
      throw new BadRequestException('Invalid ObjectId');
    }
    return Types.ObjectId.createFromHexString(value);
  }
};
_init3 = __decoratorStart(null);
ParseObjectIdPipe = __decorateElement(
  _init3,
  0,
  'ParseObjectIdPipe',
  _ParseObjectIdPipe_decorators,
  ParseObjectIdPipe,
);
__runInitializers(_init3, 1, ParseObjectIdPipe);

// src/utils/user.util.ts
import crypto from 'crypto';
var UserUtil = class {
  static hashPassword(password) {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto
      .pbkdf2Sync(password, salt, 1e3, 64, 'sha512')
      .toString('hex');
    return [hash, salt];
  }
  static comparePassword(password, hash, salt) {
    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 1e3, 64, 'sha512')
      .toString('hex');
    return hashedPassword === hash;
  }
};
export {
  AuthGuard,
  IS_PUBLIC,
  ParseObjectIdPipe,
  Public,
  ROLES_KEY,
  RoleGuard,
  Roles,
  RolesEnum,
  TOPICS,
  UserUtil,
};
