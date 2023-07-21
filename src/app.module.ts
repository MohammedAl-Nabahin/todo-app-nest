import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [ConfigModule, UserModule, TaskModule],
})
export class AppModule {}
