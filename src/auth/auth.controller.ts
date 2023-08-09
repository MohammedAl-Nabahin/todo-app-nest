import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from '../user/dto/user.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  async login(@Body() userDTO: UserDTO) {
    return this.authService.login(userDTO);
  }
}
