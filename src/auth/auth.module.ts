import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { JwtStrategy } from './guard/jwt.strategy';

@Module({
  imports: [
    UserModule,
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret: 'k',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
