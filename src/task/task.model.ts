import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../user/user.model';
// {
//   name:,
//   underscored:true          ==> this used inside the @Table
// }
@Table
export class Task extends Model<Task> {
  @Column
  title: string;

  @Column
  description: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
