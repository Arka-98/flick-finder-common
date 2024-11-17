import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, RoleGuard } from './guards';

@Module({
  providers: [
    CommonService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
  ],
  exports: [CommonService],
})
export class CommonModule {}
