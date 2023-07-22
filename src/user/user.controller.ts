import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body(new ValidationPipe()) userDTO: UserDTO) {
    return this.userService.register(userDTO);
  }
}
