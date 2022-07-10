import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode?: number;
  message?: string;
  result: T;
}

@Injectable()
export class ResponseInterceptor
  implements NestInterceptor<any, Response<any>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<any>> {
    return next.handle().pipe(
      map((data) => ({
        statusCode:
          data.code || context.switchToHttp().getResponse().statusCode,
        message: data.message,
        result: data.result,
      })),
    );
  }
}
