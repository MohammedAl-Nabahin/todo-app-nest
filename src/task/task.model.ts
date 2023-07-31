import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../user/user.model';

@Table({ paranoid: true, timestamps: true })
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

  @Column
  updatedAt?: Date;

  @Column
  createdAt?: Date;

  @Column
  deletedAt?: Date;
}
