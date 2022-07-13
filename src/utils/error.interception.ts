import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ErrorException implements ExceptionFilter {
  constructor(private readonly errorMsg?: any) {}
  catch(exception: unknown | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = HttpStatus.BAD_REQUEST;

    response.status(status).json({
      // statusCode: exception.errorMsg.status || status,
      result: exception,
    });
  }
}
