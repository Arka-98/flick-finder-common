import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AuthGuard, RoleGuard } from '../../guards';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SharedJwtModule } from '../jwt';

@Module({
  imports: [SharedJwtModule],
  providers: [
    CommonService,
    {
      provide: APP_GUARD,
      useFactory: () =>
        new AuthGuard(new ConfigService(), new JwtService(), new Reflector()),
    },
    { provide: APP_GUARD, useFactory: () => new RoleGuard(new Reflector()) },
  ],
  exports: [CommonService],
})
export class CommonModule {}
