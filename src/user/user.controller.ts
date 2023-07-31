import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { Public } from 'src/decorators/public.decorator';
import { PublicInterceptor } from 'src/providers/public.interceptor';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UseInterceptors(PublicInterceptor)
  @Public()
  async register(@Body() userDTO: UserDTO) {
    return this.userService.register(userDTO);
  }
}
