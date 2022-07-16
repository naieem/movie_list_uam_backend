import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbmoduleModule } from './dbmodule/dbmodule.module';
import { MoviesController } from './movies.controller';
import { AuthModule } from './uam/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `env/${process.env.NODE_ENV}.env`,
    }),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    DbmoduleModule,
    AuthModule,
  ],
  controllers: [AppController, MoviesController],
  providers: [AppService],
})
export class AppModule {}
