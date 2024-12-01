import { ClientKafka } from '@nestjs/microservices';
import { KafkaMessage } from 'kafkajs';
import * as _nestjs_common from '@nestjs/common';
import { PipeTransform } from '@nestjs/common';
import { Request } from 'express';
import * as bson from 'bson';

declare class CommonModule {
}

declare class CommonService {
}

declare class SharedJwtModule {
}

declare class KafkaModule {
}

declare const TOPICS: {
    readonly USER: {
        readonly CREATED: "user.created";
        readonly UPDATED: "user.updated";
        readonly DELETED: "user.deleted";
    };
};
declare const KAFKA_SERVICE_TOKEN: "KAFKA_SERVICE";

declare class KafkaService {
    private readonly kafkaClient;
    private readonly logger;
    constructor(kafkaClient: ClientKafka);
    emit(topic: (typeof TOPICS)[keyof typeof TOPICS][keyof (typeof TOPICS)[keyof typeof TOPICS]], message: KafkaMessage): void;
}

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

export { CommonModule, CommonService, type CustomRequest, IS_PUBLIC, KAFKA_SERVICE_TOKEN, KafkaModule, KafkaService, ParseObjectIdPipe, Public, ROLES_KEY, Roles, RolesEnum, SharedJwtModule, TOPICS, UserUtil };
