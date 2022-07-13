import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
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
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<any>> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    return next.handle().pipe(
      map((data) => {
        if (isPublic) {
          return;
        } else {
          return {
            statusCode:
              data?.code || context.switchToHttp().getResponse().statusCode,
            message: data?.message,
            result: data?.result,
          };
        }
      }),
    );
  }
}
