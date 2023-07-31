import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from '../user/dto/user.dto';
import { Public } from 'src/decorators/public.decorator';
import { PublicInterceptor } from 'src/providers/public.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseInterceptors(PublicInterceptor)
  @Public()
  async login(@Body() userDTO: UserDTO) {
    return this.authService.login(userDTO);
  }
}
