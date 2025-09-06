import { ConsoleLogger } from '@nestjs/common';
import chalk from 'chalk';

export class LoggerService extends ConsoleLogger {
  override debug(message: unknown, context?: unknown): void {
    super.debug(chalk.blue(message), context);
  }
}
