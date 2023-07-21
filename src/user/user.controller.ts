import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userDTO: UserDTO) {
    return this.userService.register(userDTO);
  }

  @Post('login')
  async login(@Body() userDTO: UserDTO) {
    return this.userService.login(userDTO);
  }
}
