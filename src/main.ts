import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ResponseInterceptor } from './utils/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { ErrorException } from './utils/error.interception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: true,
  });
  app.use(cookieParser());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new ErrorException());
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  await app.listen(port);
  console.log('Environment running ' + process.env.NODE_ENV);
  console.log('App started at port ' + port);
}
bootstrap();
