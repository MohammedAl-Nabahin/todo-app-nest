import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import { Task } from '../task/task.model';
import { Role } from 'src/auth/roles/role.enum';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @HasMany(() => Task)
  tasks: Task[];

  @Column
  role: Role;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isAdmin: boolean;
}
