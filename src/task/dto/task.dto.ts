import { IsString, Length } from 'class-validator';

export class TaskDTO {
  @IsString()
  @Length(3, 20)
  title: string;
  @IsString()
  @Length(3, 50)
  description: string;
  userId: number;
}
