import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../user/user.model';
import { DataTypes } from 'sequelize';

@Table({ paranoid: true, timestamps: true })
export class Task extends Model<Task> {
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
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

  @Column
  updatedBy?: number;

  @Column
  createdBy?: number;

  @Column
  deletedBy?: number;
}
