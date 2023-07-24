import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UserDTO {
  @IsString()
  @Length(3, 20)
  @IsNotEmpty()
  username: string;
  @IsString()
  @Length(3, 20)
  @IsNotEmpty()
  password: string;
}
