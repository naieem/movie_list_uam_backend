import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));
  app.useGlobalFilters(new ErrorException());
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const cookieTokenName = configService.get<string>('TOKEN_COOKIE_NAME');
  // swagger
  const config = new DocumentBuilder()
    .setTitle('Movie listing api')
    .setDescription(
      'Apis for authentication,authorization and  movie listing for front end application',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addCookieAuth(cookieTokenName)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // swagger end
  await app.listen(port);
  console.log('Environment running ' + process.env.NODE_ENV);
  console.log('App started at port ' + port);
}
bootstrap();
