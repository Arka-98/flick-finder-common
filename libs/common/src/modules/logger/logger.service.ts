import { ConsoleLogger } from '@nestjs/common';
import * as chalk from 'chalk';

export class LoggerService extends ConsoleLogger {
  override debug(message: unknown, context?: unknown): void {
    console.log(chalk);

    super.debug(new chalk.Chalk().blue(message), context);
  }
}
