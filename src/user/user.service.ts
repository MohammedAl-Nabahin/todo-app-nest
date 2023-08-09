import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserDTO } from './dto/user.dto';
import { Role } from 'src/auth/roles/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async register(userDTO: UserDTO): Promise<User> {
    const existingUser = await this.userModel.findOne({
      where: { username: userDTO.username },
    });

    if (existingUser) {
      throw new ConflictException(
        'A user with the same username already exists',
      );
    }
    return this.userModel.create(userDTO);
  }

  async registerAdmin(userDTO: UserDTO, adminId: number): Promise<User> {
    const admin = await this.findById(adminId);

    if (!admin) {
      throw new UnauthorizedException('Only admins can register new users');
    }

    if (admin || admin.role == Role.Admin) {
      const newUserDTO: UserDTO = {
        ...userDTO,
        role: Role.Admin,
        isAdmin: true,
      };
      console.log(newUserDTO);

      return this.userModel.create(newUserDTO);
    }
    throw new UnauthorizedException('Only admins can register new users');
  }

  async login(userDTO: UserDTO): Promise<User | null> {
    return this.userModel.findOne({
      where: {
        username: userDTO.username.toLowerCase(),
        password: userDTO.password.toLowerCase(),
      },
    });
  }

  async findById(id: number): Promise<User | null> {
    const user = this.userModel.findOne({
      where: { id },
    });
    return user || null;
  }
}
