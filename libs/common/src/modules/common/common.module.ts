import { Module, type DynamicModule } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AuthGuard, RoleGuard } from '../../guards';
import { ConfigModule, type ConfigModuleOptions } from '@nestjs/config';
import { SharedJwtModule } from '../jwt';

@Module({})
export class CommonModule {
  static register(options?: ConfigModuleOptions): DynamicModule {
    return {
      module: CommonModule,
      imports: [
        SharedJwtModule,
        ConfigModule.forRoot({ isGlobal: true, ...options }),
      ],
      providers: [
        Reflector,
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
        { provide: APP_GUARD, useClass: RoleGuard },
      ],
      exports: [ConfigModule],
    };
  }
}
