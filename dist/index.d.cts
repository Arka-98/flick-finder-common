import * as _nestjs_common from '@nestjs/common';
import { CanActivate, ExecutionContext, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';
import * as bson from 'bson';

declare const TOPICS: Record<string, Record<'CREATED' | 'UPDATED' | 'DELETED', string>>;

declare const IS_PUBLIC = "isPublic";
/**
 * Decorator that marks a route as public, disabling authentication checks.
 */
declare const Public: () => _nestjs_common.CustomDecorator<string>;

declare enum RolesEnum {
    ADMIN = "admin",
    VENDOR = "vendor",
    CUSTOMER = "customer",
    EXECUTIVE = "executive"
}

declare const ROLES_KEY = "roles";
/**
 * Decorator to set roles that can access to the decorated controller/action.
 * Use in combination with the RolesGuard to restrict access to certain roles.
 * @param roles - One or multiple roles that can access to the decorated controller/action.
 * @see {@link https://docs.nestjs.com/security/authorization#roles-based-authorization|NestJS - Roles-based authorization}
 */
declare const Roles: (...roles: RolesEnum[]) => _nestjs_common.CustomDecorator<string>;

declare class AuthGuard implements CanActivate {
    private configService;
    private jwtService;
    private reflector;
    constructor(configService: ConfigService, jwtService: JwtService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}

declare class RoleGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}

interface CustomRequest extends Request {
    user?: {
        sub: string;
        username: string;
        role: RolesEnum;
    };
}

declare class ParseObjectIdPipe implements PipeTransform {
    transform(value: string): bson.ObjectId;
}

declare class UserUtil {
    static hashPassword(password: string): string[];
    static comparePassword(password: string, hash: string, salt: string): boolean;
}

export { AuthGuard, type CustomRequest, IS_PUBLIC, ParseObjectIdPipe, Public, ROLES_KEY, RoleGuard, Roles, RolesEnum, TOPICS, UserUtil };
