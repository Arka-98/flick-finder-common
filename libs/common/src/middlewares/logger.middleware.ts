import {
  HttpStatus,
  Injectable,
  Logger,
  type NestMiddleware,
} from '@nestjs/common';
import { type NextFunction, type Request, type Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly loggerService = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const { method, path, ip } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const logMethod =
        res.statusCode >= HttpStatus.BAD_REQUEST ? 'error' : 'log';

      this.loggerService[logMethod](
        `${method} ${path} ${res.statusCode} ${ip} ${userAgent}`,
      );
    });

    next();
  }
}
