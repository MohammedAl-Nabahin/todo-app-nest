import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { User } from 'src/decorators/user.decorator';
import IUserInterface from './user.interface';
import * as UserModel from './user.model';
import { TransactionInterceptor } from 'src/providers/transaction.interceptor';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @Public()
  @UseInterceptors(TransactionInterceptor)
  async register(@Body() userDTO: UserDTO) {
    return this.userService.register(userDTO);
  }

  @Post('register/admin')
  @Roles(Role.Admin, Role.User)
  @UseInterceptors(TransactionInterceptor)
  async registerAdmin(
    @Body() userDTO: UserDTO,
    @User() user: IUserInterface,
  ): Promise<UserModel.User> {
    return this.userService.registerAdmin(userDTO, user.sub);
  }
}
