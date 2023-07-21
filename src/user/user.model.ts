import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Task } from '../task/task.model';

@Table
export class User extends Model<User> {
  @Column
  username: string;

  @Column
  password: string;

  @HasMany(() => Task)
  tasks: Task[];
}
