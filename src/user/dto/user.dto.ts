import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Role } from 'src/auth/roles/role.enum';

export class UserDTO {
  @IsString()
  @Length(3, 20)
  @IsNotEmpty()
  username: string;
  @IsString()
  @Length(3, 20)
  @IsNotEmpty()
  password: string;
  role?: Role;
  isAdmin?: boolean;
}
