import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { UserDTO } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDTO: UserDTO): Promise<User> {
    return this.userService.register(userDTO);
  }

  async validateUserById(id: number): Promise<User | null> {
    return this.userService.findById(id);
  }

  async login(userDTO: UserDTO): Promise<{ accessToken: string }> {
    const user = await this.userService.login(userDTO);
    if (!user) {
      throw new HttpException(
        'Invalid credentials, username or password is wrong',
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = {
      sub: user.id,
      username: user.username,
      password: user.password,
      isAdmin: user.isAdmin,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
