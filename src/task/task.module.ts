import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/guard/jwt.strategy';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Task]),
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret: 'k',
    }),
  ],
  controllers: [TaskController],
  providers: [TaskService, JwtStrategy, AuthService, UserService],
})
export class TaskModule {}
