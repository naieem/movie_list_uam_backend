import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbmoduleModule } from './dbmodule/dbmodule.module';
import { AuthModule } from './uam/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `env/${process.env.NODE_ENV}.env`,
    }),
    DbmoduleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
