import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from './config/configer.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [ConfigModule, UserModule, TaskModule, AuthModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
