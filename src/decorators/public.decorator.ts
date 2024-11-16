import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = 'isPublic';
/**
 * Decorator that marks a route as public, disabling authentication checks.
 */
export const Public = () => SetMetadata(IS_PUBLIC, true);
