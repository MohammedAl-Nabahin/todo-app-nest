import { Module } from '@nestjs/common';
import { ConfigModule } from './config/configer.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule, UserModule, TaskModule, AuthModule],
  providers: [],
})
export class AppModule {}
