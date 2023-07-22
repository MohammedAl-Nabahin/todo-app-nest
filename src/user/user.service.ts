import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserDTO } from './dto/user.dto';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async register(userDTO: UserDTO): Promise<User> {
    return this.userModel.create(userDTO);
  }

  async login(userDTO: UserDTO): Promise<User | null> {
    return this.userModel.findOne({
      where: {
        username: {
          [Op.iLike]: userDTO.username,
        },
        password: {
          [Op.iLike]: userDTO.password,
        },
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
